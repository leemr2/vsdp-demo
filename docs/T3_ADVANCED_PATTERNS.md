# Advanced T3 + Claude Patterns for VSDP

Once you have the basic integration working, these patterns show how to make Claude truly context-aware by integrating it with your simulators and dashboards.

---

## Pattern 1: Claude Querying Simulation Data

When a user asks about trials or patients, Claude should reference real simulation data.

### Step 1: Create Simulator Router

Create `src/server/api/routers/simulators.ts`:

```typescript
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { calculateTrialMetrics } from "~/server/lib/simulators/trial-recruitment";
import { predictPatientRisk } from "~/server/lib/simulators/clinical-ai";

export const simulatorsRouter = createTRPCRouter({
  /**
   * Get trial recruitment simulation results
   * Claude can call this to get real numbers
   */
  getTrialMetrics: publicProcedure
    .input(
      z.object({
        condition: z.enum(["amd", "glaucoma", "myopia", "diabetic_retinopathy"]),
        targetEnrollment: z.number().default(500),
        monitoringFrequency: z.enum(["daily", "weekly", "monthly"]).default("weekly"),
      })
    )
    .query(async ({ input }) => {
      // Run your simulation
      const metrics = calculateTrialMetrics(input);

      return {
        condition: input.condition,
        eligiblePatients: metrics.eligiblePatients,
        enrollmentComparison: {
          traditional: {
            timeToEnroll: metrics.traditional.time,
            unit: metrics.traditional.unit,
            costPerPatient: 50000,
          },
          vsdp: {
            timeToEnroll: metrics.vsdp.time,
            unit: metrics.vsdp.unit,
            costPerPatient: 25000,
          },
          speedImprovement: `${((metrics.traditional.time / (metrics.vsdp.time / 4)) * 100).toFixed(0)}% faster`,
          costSavings: metrics.costSavings,
        },
        statisticalPowerCurve: metrics.statisticalPowerCurve,
      };
    }),

  /**
   * Get patient digital twin prediction
   */
  getPatientPrediction: publicProcedure
    .input(
      z.object({
        patientId: z.string(),
        lookAheadMonths: z.number().default(6),
      })
    )
    .query(async ({ input }) => {
      // In real app, fetch actual patient data
      // For demo, generate synthetic
      const prediction = predictPatientRisk(input.patientId);

      return {
        patientId: input.patientId,
        riskScore: prediction.riskScore,
        predictedProgression: prediction.progression,
        recommendedIntervention: prediction.intervention,
        interventionTiming: prediction.interventionDate,
        confidence: prediction.confidence,
      };
    }),

  /**
   * Population health metrics
   */
  getPopulationMetrics: publicProcedure.query(async () => {
    return {
      totalPatientsMonitored: 6000000,
      practicesInNetwork: 3000,
      averagePatientsPerPractice: 2000,
      conditionsTracked: ["myopia", "glaucoma", "AMD", "diabetic_retinopathy"],
      earlyDetectionRate: 0.73,
      interventionLeadTime: 189, // days
      dataQuality: {
        completeness: 0.89,
        imageQuality: 0.91,
      },
    };
  }),
});
```

### Step 2: Add to Root Router

Update `src/server/api/root.ts`:

```typescript
import { appRouter as oldRouter } from "~/server/api/root"; // your existing
import { simulatorsRouter } from "./routers/simulators";

export const appRouter = createTRPCRouter({
  // ... existing routers
  simulators: simulatorsRouter,
});
```

---

## Pattern 2: Claude Calling Simulators via tRPC

Now enhance the Claude router to call simulators when relevant:

Create `src/server/lib/claude-tools.ts`:

```typescript
import { type inferRouterInputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";

type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Tool definitions Claude can use
 * These describe what data Claude can request
 */
export const CLAUDE_TOOLS = [
  {
    name: "get_trial_metrics",
    description:
      "Get trial recruitment metrics comparing traditional vs VSDP approach for a specific condition",
    input_schema: {
      type: "object" as const,
      properties: {
        condition: {
          type: "string",
          enum: ["amd", "glaucoma", "myopia", "diabetic_retinopathy"],
          description: "Eye condition for trial",
        },
        targetEnrollment: {
          type: "number",
          description: "Target enrollment number (default 500)",
        },
      },
      required: ["condition"],
    },
  },
  {
    name: "get_population_metrics",
    description:
      "Get Vision Source network-wide metrics: total patients, practices, early detection rates",
    input_schema: {
      type: "object" as const,
      properties: {},
    },
  },
  {
    name: "get_patient_prediction",
    description:
      "Get AI risk prediction for a specific patient (demo data)",
    input_schema: {
      type: "object" as const,
      properties: {
        patientId: {
          type: "string",
          description: "Patient ID",
        },
        lookAheadMonths: {
          type: "number",
          description: "How far ahead to predict (1-24 months)",
        },
      },
      required: ["patientId"],
    },
  },
];

/**
 * Execute Claude's tool requests
 * When Claude wants data, this function gets it
 */
export async function executeTool(
  toolName: string,
  toolInput: Record<string, any>,
  caller: {
    simulatorsRouter: typeof simulatorsRouter;
  }
) {
  try {
    switch (toolName) {
      case "get_trial_metrics": {
        // Type-safe call to your simulator
        const result = await caller.simulatorsRouter.getTrialMetrics(toolInput);
        return result;
      }

      case "get_population_metrics": {
        const result = await caller.simulatorsRouter.getPopulationMetrics();
        return result;
      }

      case "get_patient_prediction": {
        const result = await caller.simulatorsRouter.getPatientPrediction(
          toolInput
        );
        return result;
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error) {
    return {
      error: `Tool execution failed: ${(error as Error).message}`,
    };
  }
}
```

### Step 3: Update Claude Lib to Use Tools

Update `src/server/lib/claude.ts` with tool use support:

```typescript
import Anthropic from "@anthropic-ai/sdk";
import { env } from "~/env";
import { CLAUDE_TOOLS, executeTool } from "./claude-tools";

let claudeClient: Anthropic | null = null;

export function getClaudeClient(): Anthropic {
  if (!claudeClient) {
    claudeClient = new Anthropic({
      apiKey: env.ANTHROPIC_API_KEY,
      timeout: 30000,
    });
  }
  return claudeClient;
}

/**
 * Enhanced Claude function with tool use
 * Claude can now call your simulators!
 */
export async function sendClaudeMessageWithTools(params: {
  message: string;
  stakeholder: string;
  previousMessages?: { role: "user" | "assistant"; content: string }[];
  tools?: typeof CLAUDE_TOOLS;
  toolExecutor?: (name: string, input: Record<string, any>) => Promise<any>;
}): Promise<string> {
  const client = getClaudeClient();
  const tools = params.tools || CLAUDE_TOOLS;

  try {
    let messages: Anthropic.MessageParam[] = params.previousMessages
      ? [
          ...params.previousMessages.map((m) => ({
            role: m.role,
            content: m.content,
          } as Anthropic.MessageParam)),
          { role: "user" as const, content: params.message },
        ]
      : [{ role: "user" as const, content: params.message }];

    // Keep looping while Claude wants to use tools
    let response = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 2048,
      system: getStakeholderSystemPrompt(params.stakeholder),
      tools: tools as Anthropic.Tool[],
      messages: messages,
    });

    // Handle tool use in a loop (Claude might use multiple tools)
    while (response.stop_reason === "tool_use") {
      const toolUseBlocks = response.content.filter(
        (block) => block.type === "tool_use"
      );

      // Add assistant response to messages
      messages.push({
        role: "assistant",
        content: response.content,
      });

      // Execute each tool call
      const toolResults: Anthropic.ToolResultBlockParam[] = [];

      for (const toolUse of toolUseBlocks) {
        if (toolUse.type !== "tool_use") continue;

        try {
          const result = params.toolExecutor
            ? await params.toolExecutor(toolUse.name, toolUse.input)
            : null;

          toolResults.push({
            type: "tool_result",
            tool_use_id: toolUse.id,
            content: JSON.stringify(result || {}),
          });
        } catch (error) {
          toolResults.push({
            type: "tool_result",
            tool_use_id: toolUse.id,
            content: JSON.stringify({
              error: (error as Error).message,
            }),
            is_error: true,
          });
        }
      }

      // Add tool results to messages
      messages.push({
        role: "user",
        content: toolResults,
      });

      // Get Claude's next response (now with tool results)
      response = await client.messages.create({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 2048,
        system: getStakeholderSystemPrompt(params.stakeholder),
        tools: tools as Anthropic.Tool[],
        messages: messages,
      });
    }

    // Extract final text response
    const textContent = response.content.find((block) => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text in final response");
    }

    return textContent.text;
  } catch (error) {
    console.error("Claude with tools error:", error);
    throw error;
  }
}

// Keep the original function for backwards compatibility
export async function sendClaudeMessage(params: {
  message: string;
  stakeholder: string;
  previousMessages?: { role: "user" | "assistant"; content: string }[];
}): Promise<string> {
  return sendClaudeMessageWithTools({
    ...params,
    tools: undefined, // Disable tools for simple usage
  });
}
```

---

## Pattern 3: Update tRPC Router to Use Tools

Update `src/server/api/routers/claude.ts`:

```typescript
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  sendClaudeMessageWithTools,
  getClaudeClient,
} from "~/server/lib/claude";
import { CLAUDE_TOOLS, executeTool } from "~/server/lib/claude-tools";
import { claudeMessageSchema, claudeResponseSchema } from "./types";
import { TRPCError } from "@trpc/server";

// Access to simulators (you'll need to pass this via context)
// For now, shown as a type hint

export const claudeRouter = createTRPCRouter({
  ask: publicProcedure
    .input(claudeMessageSchema)
    .output(claudeResponseSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        // Determine if this stakeholder should have tool access
        const shouldUsTools =
          input.stakeholder === "pharma" || input.stakeholder === "provider";

        const response = await sendClaudeMessageWithTools({
          message: input.message,
          stakeholder: input.stakeholder,
          previousMessages: input.context?.previousMessages,
          // Only enable tools for certain stakeholders
          tools: shouldUsTools ? CLAUDE_TOOLS : undefined,
          // Pass your tool executor
          toolExecutor: shouldUsTools
            ? async (toolName: string, toolInput: Record<string, any>) => {
                // In a real implementation, call your actual simulators
                // For now, return mock data
                console.log(
                  `[Claude Tool] ${toolName}`,
                  JSON.stringify(toolInput, null, 2)
                );

                // This is where you'd call your actual simulator functions
                // const result = await callSimulator(toolName, toolInput);
                // return result;

                // Mock response for demo
                if (toolName === "get_trial_metrics") {
                  return {
                    condition: toolInput.condition,
                    eligiblePatients: 15000,
                    enrollmentComparison: {
                      traditional: {
                        timeToEnroll: 18,
                        unit: "months",
                        costPerPatient: 50000,
                      },
                      vsdp: {
                        timeToEnroll: 6,
                        unit: "weeks",
                        costPerPatient: 25000,
                      },
                      speedImprovement: "1300% faster",
                      costSavings: "$18,750,000",
                    },
                  };
                }

                if (toolName === "get_population_metrics") {
                  return {
                    totalPatientsMonitored: 6000000,
                    practicesInNetwork: 3000,
                    earlyDetectionRate: 0.73,
                    interventionLeadTime: 189,
                  };
                }

                return {};
              }
            : undefined,
        });

        return {
          message: response,
          followUpSuggestions: [
            "How would this work for my practice?",
            "What's the first step to get started?",
            "Can you show me specific ROI numbers?",
          ],
        };
      } catch (error) {
        console.error("Claude ask error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get response from Claude",
          cause: error,
        });
      }
    }),

  /**
   * Alternative: Ask with explicit tool use
   * Useful if you want to force tool calls for specific questions
   */
  askWithTools: publicProcedure
    .input(claudeMessageSchema)
    .output(claudeResponseSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const response = await sendClaudeMessageWithTools({
          message: input.message,
          stakeholder: input.stakeholder,
          previousMessages: input.context?.previousMessages,
          tools: CLAUDE_TOOLS, // Always use tools
          toolExecutor: async (toolName: string, toolInput: Record<string, any>) => {
            // Your tool executor implementation
            return {};
          },
        });

        return { message: response };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Tool use failed",
        });
      }
    }),
});
```

---

## Pattern 4: Custom System Prompt for Tool-Aware Claude

Update your stakeholder prompts to mention available tools:

```typescript
export function getStakeholderSystemPromptWithTools(stakeholder: string): string {
  const basePrompt = getStakeholderSystemPrompt(stakeholder);

  if (stakeholder === "pharma") {
    return `${basePrompt}

IMPORTANT: You have access to simulation tools:
- get_trial_metrics: Get recruitment speed & cost comparison for a specific condition
- get_population_metrics: Get Vision Source network statistics
- get_patient_prediction: Get AI prediction for a specific patient

When answering questions about:
- "How long would recruitment take?" → Use get_trial_metrics
- "How many eligible patients are there?" → Use get_trial_metrics or get_population_metrics
- "What are your patient numbers?" → Use get_population_metrics
- "What's the risk for patient X?" → Use get_patient_prediction

Always call relevant tools to provide specific, accurate data instead of estimates.
Format results clearly with specific numbers.`;
  }

  return basePrompt;
}
```

---

## Pattern 5: Real Simulator Functions

Create `src/server/lib/simulators/trial-recruitment.ts`:

```typescript
/**
 * Calculate trial recruitment metrics
 * This is from your architecture document
 */
export function calculateTrialMetrics(params: {
  condition: string;
  targetEnrollment?: number;
  monitoringFrequency?: string;
}) {
  const totalPractices = 3000;
  const avgPatientsPerPractice = 2000;

  // Condition prevalence estimates
  const prevalence: Record<string, number> = {
    amd: 0.08,
    glaucoma: 0.05,
    myopia: 0.35,
    diabetic_retinopathy: 0.04,
  };

  const prevalenceRate = prevalence[params.condition] || 0.05;
  const eligiblePatients = Math.floor(
    totalPractices * avgPatientsPerPractice * prevalenceRate
  );

  // Traditional recruitment: 3-4% monthly enrollment
  const traditionalMonthlyEnrollment = eligiblePatients * 0.035;
  const traditionalMonths = Math.ceil((params.targetEnrollment || 500) / traditionalMonthlyEnrollment);

  // VSDP: 70% direct invitation acceptance, 4 weeks per cohort
  const vsdpAcceptanceRate = 0.70;
  const vsdpWeeklyEnrollment = (eligiblePatients * vsdpAcceptanceRate) / 4;
  const vsdpWeeks = Math.ceil((params.targetEnrollment || 500) / vsdpWeeklyEnrollment);

  const costPerPatientTraditional = 50000;
  const costPerPatientVsdp = 25000;

  const totalCostTraditional = (params.targetEnrollment || 500) * costPerPatientTraditional;
  const totalCostVsdp = (params.targetEnrollment || 500) * costPerPatientVsdp;

  return {
    eligiblePatients,
    traditional: {
      time: traditionalMonths,
      unit: "months" as const,
      cost: totalCostTraditional,
    },
    vsdp: {
      time: vsdpWeeks,
      unit: "weeks" as const,
      cost: totalCostVsdp,
    },
    costSavings: totalCostTraditional - totalCostVsdp,
    statisticalPowerCurve: generatePowerCurve(params.monitoringFrequency || "weekly"),
  };
}

function generatePowerCurve(monitoringFrequency: string): Array<{ month: number; power: number }> {
  // Mock power curve based on monitoring frequency
  const baseImprovement = monitoringFrequency === "daily" ? 0.05 : monitoringFrequency === "weekly" ? 0.03 : 0.01;

  return Array.from({ length: 24 }, (_, i) => ({
    month: i + 1,
    power: Math.min(0.95, 0.5 + i * baseImprovement),
  }));
}
```

---

## Pattern 6: Frontend Component Using Tools

Create `src/components/SmartStakeholderChat.tsx`:

```typescript
"use client";

import { useState } from "react";
import { api } from "~/utils/api";
import type { STAKEHOLDERS } from "~/server/api/routers/types";

interface SmartChatProps {
  stakeholder: (typeof STAKEHOLDERS)[number];
}

export function SmartStakeholderChat({ stakeholder }: SmartChatProps) {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [input, setInput] = useState("");

  // Use the tools-enabled endpoint for pharma and provider
  const shouldUseTools = stakeholder === "pharma" || stakeholder === "provider";

  const { mutate: sendMessage, isPending } = api.claude[
    shouldUseTools ? "askWithTools" : "ask"
  ].useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);

    sendMessage({
      message: input,
      stakeholder,
      context: {
        sessionId: crypto.randomUUID(),
        previousMessages: messages,
      },
    });

    setInput("");
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border p-6">
      <h2 className="text-xl font-bold">
        {stakeholder.toUpperCase()}
        {shouldUseTools && " (with data tools)"}
      </h2>

      <div className="max-h-96 overflow-y-auto space-y-2 p-4 bg-gray-50 rounded">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`rounded p-2 ${
              msg.role === "user" ? "bg-blue-100 ml-8" : "bg-gray-200 mr-8"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 rounded border px-3 py-2"
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending || !input.trim()}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
```

---

## Summary: What This Gives You

When a user (pharma stakeholder) asks: **"How long would it take to enroll 500 patients for an AMD trial?"**

1. **Request** hits your tRPC router with message + stakeholder + context
2. **Claude** reads the message and system prompt mentioning available tools
3. **Claude decides** to call `get_trial_metrics` tool with `condition="amd"`
4. **Your code** executes the tool, returns real simulation data
5. **Claude** incorporates the data: *"For an AMD trial enrolling 500 patients: Traditional approach would take 18 months. VSDP achieves it in 6 weeks—a 95% reduction. Cost savings: $18.75M..."*
6. **Client** receives the response and displays it

This makes the demo feel like a real product because Claude is working with actual simulation data, not just making things up.

---

## Next Steps

1. Copy the `T3_CLAUDE_SCAFFOLDS.md` files first to get basic integration working
2. Then add the simulator patterns from this file
3. Test by asking Claude about trial metrics (pharma stakeholder)
4. Graduate to connecting real Firestore data instead of mock data
5. For production, integrate actual Vision Source network data

The beauty of this approach is that each step is backwards-compatible—you can start simple and progressively add sophistication!
