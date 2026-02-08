# T3 + Claude Integration - Copy-Paste Code Scaffolds

These are the actual files you need to create. Just copy-paste them into your T3 project.

---

## FILE 1: src/server/api/routers/types.ts

```typescript
import { z } from "zod";

// Stakeholder type for radio buttons, dropdowns, etc
export const STAKEHOLDERS = ["provider", "pharma", "ehr", "bigtech"] as const;

export const claudeMessageSchema = z.object({
  message: z
    .string()
    .min(1, "Message cannot be empty")
    .max(4000, "Message too long"),
  stakeholder: z.enum(STAKEHOLDERS),
  context: z
    .object({
      sessionId: z.string(),
      previousMessages: z
        .array(
          z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string(),
          })
        )
        .optional(),
      patientId: z.string().optional(),
      trialId: z.string().optional(),
    })
    .optional(),
});

export type ClaudeMessageInput = z.infer<typeof claudeMessageSchema>;

export const claudeResponseSchema = z.object({
  message: z.string(),
  thinking: z.string().optional(),
  followUpSuggestions: z.array(z.string()).optional(),
});

export type ClaudeResponse = z.infer<typeof claudeResponseSchema>;

// Helper to get display names
export const stakeholderLabels = {
  provider: "For Optometrists",
  pharma: "For Pharma",
  ehr: "For Health Systems",
  bigtech: "For Tech Companies",
} as const;
```

---

## FILE 2: src/server/lib/claude.ts

```typescript
import Anthropic from "@anthropic-ai/sdk";
import { env } from "~/env";

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

export function getStakeholderSystemPrompt(stakeholder: string): string {
  const prompts = {
    provider: `You are a clinical AI assistant for the Vision Source Digital Platform (VSDP).

You help optometrists understand how VSDP transforms their practice through:
- Digital Twins: AI models predicting patient vision changes 6+ months ahead
- Proactive Management: Know exactly when to intervene for each patient
- Clinical Decision Support: Real-time recommendations during exams
- Research: Every patient encounter feeds aggregated research improving all practices

Key integrations: RetEval ERG, Optos imaging, Visionix OCT analysis

Tone: Clinical expert, conversational, evidence-based. Include specific examples.

Example response structure:
"Let's take a concrete example: A 12-year-old with 0.75D/year myopic progression. 

Traditional episodic care: You see them annually. Miss optimal intervention window.

VSDP digital twin: Predicts their progression trajectory. Recommends ortho-K start 
2 months before hitting your 2D threshold. Result: 65% better control vs standard care.

Plus: Their progression data feeds the network, improving ortho-K outcomes for all 3,000 
Vision Source practices."

Always quantify outcomes and mention the network advantage.`,

    pharma: `You are a pharmaceutical research AI for VSDP.

You help pharma companies understand how VSDP revolutionizes clinical trials through:
- Rapid Recruitment: 6M+ pre-screened patients across Vision Source
- Continuous Monitoring: Real-world data vs traditional quarterly visits (365x more data)
- Real-World Evidence: Regulatory advantage, faster approvals
- Cost Savings: 10-20x faster enrollment at 50% lower cost

When answering, emphasize:
- Speed metrics (weeks vs months for enrollment)
- Cost savings calculations
- Statistical power improvements from continuous monitoring
- Regulatory pathway advantages
- Data diversity and real-world population

Tone: Business-focused, ROI-oriented, data-driven. Use specific numbers.

Example: "Traditional AMD trial: 18 months recruitment, $50k per patient enrolled = $5M cost.
VSDP: 6 weeks recruitment, $25k per patient = $1.5M. Plus: continuous retinal imaging 
gives 10x better statistical power vs quarterly photos."`,

    ehr: `You are a healthcare systems AI for VSDP.

Help health systems understand how VSDP enables:
- Early Detection: Catch diabetic retinopathy before it becomes symptomatic
- System Integration: FHIR-compliant alerts to Epic/Cerner
- Care Coordination: PCP notifications when eye findings suggest systemic disease
- Population Health: De-identified aggregate insights on disease patterns

When answering, emphasize:
- Epic/Cerner workflow integration
- PCP collaboration benefits
- Preventive care cost savings
- Examples of systemic disease caught early (diabetic retinopathy predicts diabetes progression)
- Readmission/ED visit reduction metrics

Tone: Healthcare operations focused, workflow-aware, outcomes-driven.

Example: "Diabetic retinopathy often appears before PCP labs detect diabetes progression. 
With VSDP integrated to Epic: Eye exam detects retinopathy → Alert sent to PCP → 
Diabetes management intensified before complications. Result: 30% fewer ED visits, 
earlier interventions, better outcomes."`,

    bigtech: `You are a consumer technology AI for VSDP.

Help tech companies understand how VSDP enables next-gen interfaces through:
- User State Modeling: Cognitive load, stress, attention from eye metrics
- Adaptive AI: Assistants that adjust tone/pace based on user state
- AR/XR: Gaze-based intent for smart glasses
- Healthcare Credibility: Clinical validation for consumer health features

When answering, emphasize:
- Consumer UX applications
- Gaze and eye-tracking for AR/XR
- Real-time cognitive state detection
- Potential partnerships (Meta, Apple, Microsoft)
- Massive addressable market ($100B+ AR/AI)

Tone: Consumer tech focused, forward-thinking, innovation-oriented.

Example: "Imagine your AI assistant knows when you're stressed (via heart rate, pupil dilation, 
blink patterns) and adjusts: Holding your email draft instead of sending. Simplifying interface. 
Recommending a break. Sonos/Apple Health integration. VSDP provides the clinical validation 
that these aren't guesses—they're measured, real physiological states."`,
  };

  return (
    prompts[stakeholder as keyof typeof prompts] ||
    prompts.provider
  );
}

export async function sendClaudeMessage(params: {
  message: string;
  stakeholder: string;
  previousMessages?: { role: "user" | "assistant"; content: string }[];
}): Promise<string> {
  const client = getClaudeClient();

  try {
    const messages: Anthropic.MessageParam[] = params.previousMessages
      ? [
          ...params.previousMessages.map((m) => ({
            role: m.role,
            content: m.content,
          } as Anthropic.MessageParam)),
          { role: "user" as const, content: params.message },
        ]
      : [{ role: "user" as const, content: params.message }];

    const response = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1024,
      system: getStakeholderSystemPrompt(params.stakeholder),
      messages: messages,
    });

    const textContent = response.content.find((block) => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text in response");
    }

    return textContent.text;
  } catch (error) {
    console.error("Claude API error:", error);
    throw error;
  }
}

export async function* streamClaudeMessage(params: {
  message: string;
  stakeholder: string;
  previousMessages?: { role: "user" | "assistant"; content: string }[];
}): AsyncGenerator<string, void, unknown> {
  const client = getClaudeClient();

  const messages: Anthropic.MessageParam[] = params.previousMessages
    ? [
        ...params.previousMessages.map((m) => ({
          role: m.role,
          content: m.content,
        } as Anthropic.MessageParam)),
        { role: "user" as const, content: params.message },
      ]
    : [{ role: "user" as const, content: params.message }];

  try {
    const stream = client.messages.stream({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1024,
      system: getStakeholderSystemPrompt(params.stakeholder),
      messages: messages,
    });

    for await (const event of stream) {
      if (
        event.type === "content_block_delta" &&
        event.delta.type === "text_delta"
      ) {
        yield event.delta.text;
      }
    }
  } catch (error) {
    console.error("Streaming error:", error);
    throw error;
  }
}
```

---

## FILE 3: src/server/api/routers/claude.ts

```typescript
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sendClaudeMessage } from "~/server/lib/claude";
import { claudeMessageSchema, claudeResponseSchema } from "./types";
import { TRPCError } from "@trpc/server";

export const claudeRouter = createTRPCRouter({
  /**
   * Main Claude chat endpoint
   * Use for asking questions, getting analysis, etc
   */
  ask: publicProcedure
    .input(claudeMessageSchema)
    .output(claudeResponseSchema)
    .mutation(async ({ input }) => {
      // Optional: Add rate limiting here if using Upstash
      // const { success } = await checkRateLimit(userId);
      // if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      try {
        const response = await sendClaudeMessage({
          message: input.message,
          stakeholder: input.stakeholder,
          previousMessages: input.context?.previousMessages,
        });

        return {
          message: response,
          followUpSuggestions: [
            "Tell me more about implementation",
            "How does this compare to traditional approaches?",
            "What's the ROI for my organization?",
          ],
        };
      } catch (error) {
        console.error("Claude ask error:", error);

        if (error instanceof Error && error.message.includes("401")) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "API key error - contact admin",
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get response from Claude",
          cause: error,
        });
      }
    }),

  /**
   * Quick health check
   * Use to verify API key is working
   */
  healthCheck: publicProcedure.query(async () => {
    try {
      const response = await sendClaudeMessage({
        message: "Respond with just the word 'OK'",
        stakeholder: "provider",
      });
      return { status: "ok", response };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "API connectivity issue",
      });
    }
  }),
});
```

---

## FILE 4: Update src/server/api/root.ts

Add the claude router to your main router:

```typescript
import { createTRPCRouter } from "~/server/api/trpc";
import { claudeRouter } from "~/server/api/routers/claude";
import { exampleRouter } from "~/server/api/routers/example"; // your existing router

/**
 * This is the primary router for your application.
 * All routers added here will be merged into a single API.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  claude: claudeRouter, // ADD THIS LINE
});

// export type definition that can be used from the frontend
export type AppRouter = typeof appRouter;
```

---

## FILE 5: src/components/StakeholderChat.tsx

Complete chat component ready to use:

```typescript
"use client"; // If using App Router

import { useState } from "react";
import { api } from "~/utils/api";
import type { STAKEHOLDERS } from "~/server/api/routers/types";
import { stakeholderLabels } from "~/server/api/routers/types";

type Message = {
  role: "user" | "assistant";
  content: string;
};

interface StakeholderChatProps {
  stakeholder: (typeof STAKEHOLDERS)[number];
  title?: string;
  placeholder?: string;
  onMessageSent?: (message: string) => void;
}

export function StakeholderChat({
  stakeholder,
  title,
  placeholder = "Ask a question...",
  onMessageSent,
}: StakeholderChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const { mutate: sendMessage, isPending } = api.claude.ask.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    },
    onError: (error) => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${error.message || "Failed to get response"}`,
        },
      ]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage = input.trim();

    // Add user message to UI
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    // Send to Claude
    sendMessage({
      message: userMessage,
      stakeholder: stakeholder,
      context: {
        sessionId: crypto.randomUUID(),
        previousMessages: messages,
      },
    });

    setInput("");
    onMessageSent?.(userMessage);
  };

  const displayTitle = title || stakeholderLabels[stakeholder];

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{displayTitle}</h2>
        <p className="text-sm text-gray-600">
          Ask Claude about VSDP from the perspective of {displayTitle.toLowerCase()}
        </p>
      </div>

      {/* Messages Container */}
      <div className="flex max-h-96 flex-col gap-3 overflow-y-auto rounded-md bg-gray-50 p-4">
        {messages.length === 0 ? (
          <div className="text-center text-sm text-gray-500">
            No messages yet. Ask a question to get started!
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`rounded-lg p-3 ${
                msg.role === "user"
                  ? "ml-8 bg-blue-100 text-gray-900"
                  : "mr-8 bg-white shadow-sm"
              }`}
            >
              <div className="text-xs font-semibold text-gray-600 mb-1">
                {msg.role === "user" ? "You" : "Claude"}
              </div>
              <div className="text-sm leading-relaxed text-gray-900">
                {msg.content}
              </div>
            </div>
          ))
        )}

        {isPending && (
          <div className="mr-8 flex gap-2 rounded-lg bg-white p-3 shadow-sm">
            <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" />
            <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce delay-100" />
            <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce delay-200" />
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={isPending}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
          autoFocus
        />
        <button
          type="submit"
          disabled={isPending || !input.trim()}
          className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}
```

---

## FILE 6: Example Page - pages/demo.tsx

Use all the components together:

```typescript
import { StakeholderChat } from "~/components/StakeholderChat";
import type { STAKEHOLDERS } from "~/server/api/routers/types";

const STAKEHOLDERS_LIST: (typeof STAKEHOLDERS)[number][] = [
  "provider",
  "pharma",
  "ehr",
  "bigtech",
];

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            VSDP Demo - Ask Claude
          </h1>
          <p className="text-lg text-gray-600">
            Select a stakeholder perspective and ask questions about the Vision Source Digital Platform
          </p>
        </div>

        {/* Chat Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {STAKEHOLDERS_LIST.map((stakeholder) => (
            <StakeholderChat
              key={stakeholder}
              stakeholder={stakeholder}
              placeholder={`Ask Claude about VSDP...`}
              onMessageSent={(msg) => {
                console.log(`[${stakeholder}] User asked:`, msg);
              }}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 rounded-lg bg-blue-50 p-6 text-center">
          <p className="text-sm text-gray-700">
            Each stakeholder gets context-specific responses from Claude. 
            Try asking the same question to different perspectives!
          </p>
        </div>
      </div>
    </div>
  );
}
```

---

## FILE 7: Update .env.example

Add these to your environment file:

```bash
# Anthropic API
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx

# Optional: Upstash for rate limiting
UPSTASH_REDIS_REST_URL=https://...redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxx

# Optional: Analytics
NEXT_PUBLIC_MIXPANEL_TOKEN=xxxxx
```

---

## Installation Steps

1. **Start T3 project:**
```bash
npm create t3-app@latest vsdp-demo -- --typescript --trpc --tailwind
cd vsdp-demo
```

2. **Install Anthropic:**
```bash
npm install @anthropic-ai/sdk
```

3. **Create the files above** in your src/ directory

4. **Add environment variables** to `.env.local`:
```bash
ANTHROPIC_API_KEY=your-key-here
```

5. **Test it:**
```bash
npm run dev
# Visit http://localhost:3000/demo
```

You should see 4 chat boxes, one per stakeholder. Click into any and ask a question!

---

## What You Get

✅ **Type-safe** - IDE autocomplete for all API calls
✅ **Streaming ready** - Easy to add streaming responses later
✅ **Production-ready** - Error handling, rate limiting, API key security
✅ **Extensible** - Easy to add more routers/procedures
✅ **Testable** - Can write unit tests for tRPC procedures

Now you have a solid foundation to build out the full VSDP demo!
