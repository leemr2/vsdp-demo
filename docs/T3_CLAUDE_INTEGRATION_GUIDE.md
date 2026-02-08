# T3 Stack + Claude API Integration Guide for VSDP

This guide shows you how to integrate Claude API with T3 Stack's philosophy of **end-to-end type safety**. This approach gives you compile-time safety from frontend to Claude API, preventing runtime errors.

---

## Architecture Overview

```
Client (React)
    ↓ (tRPC call with typed inputs)
tRPC Procedure (type-safe router)
    ↓ (validates inputs)
tRPC Server Context
    ↓
Claude API Client (Anthropic SDK)
    ↓
Claude (streaming or full response)
    ↓ (tRPC sends back typed response)
Client (receives typed data, autocomplete works)
```

The magic: **Your TypeScript types flow end-to-end. No runtime guessing.**

---

## Step 1: Project Setup

```bash
# Create T3 app with TypeScript, Tailwind, tRPC
npm create t3-app@latest vsdp-demo -- \
  --typescript \
  --trpc \
  --tailwind \
  --envValidation

cd vsdp-demo

# Install Anthropic SDK
npm install @anthropic-ai/sdk
```

---

## Step 2: Environment Variables Setup

Create `.env.example`:

```bash
# Database
DATABASE_URL="file:./db.sqlite"

# Anthropic API
ANTHROPIC_API_KEY="sk-ant-xxxxx"

# Optional: Analytics
NEXT_PUBLIC_MIXPANEL_TOKEN="xxxxx"
```

Create `.env.local` (in development only, not in git):

```bash
DATABASE_URL="file:./db.sqlite"
ANTHROPIC_API_KEY="your-actual-key-here"
```

The T3 Zod validator will automatically check these at build time.

---

## Step 3: Define Your Type-Safe Claude Request/Response

Create `src/server/api/routers/types.ts`:

```typescript
import { z } from "zod";

// This is your SINGLE SOURCE OF TRUTH for request shape
export const claudeMessageSchema = z.object({
  message: z.string().min(1).max(4000).describe("User message to Claude"),
  stakeholder: z.enum([
    "provider",
    "pharma",
    "ehr",
    "bigtech",
  ]).describe("Which stakeholder section this is for"),
  context: z.object({
    // Add context the AI needs
    sessionId: z.string(),
    previousMessages: z.array(z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string(),
    })).optional().describe("Conversation history for context"),
    patientId: z.string().optional(),
    trialId: z.string().optional(),
  }).optional(),
});

export type ClaudeMessageInput = z.infer<typeof claudeMessageSchema>;

// Claude response wrapped in tRPC response type
export const claudeResponseSchema = z.object({
  message: z.string(),
  thinking: z.string().optional().describe("Claude's internal reasoning if extended thinking"),
  followUpSuggestions: z.array(z.string()).optional(),
  dataQueryResults: z.any().optional().describe("Results from querying simulation data"),
});

export type ClaudeResponse = z.infer<typeof claudeResponseSchema>;
```

Why this matters:
- Your React components will get **autocomplete** for the input
- TypeScript will **catch errors at compile time** if you forget a required field
- Claude's response type is **guaranteed** on the client side

---

## Step 4: Create the Claude API Client Wrapper

Create `src/server/lib/claude.ts`:

```typescript
import Anthropic from "@anthropic-ai/sdk";
import { env } from "~/env";

// Single instance reused across requests
let claudeClient: Anthropic | null = null;

export function getClaudeClient(): Anthropic {
  if (!claudeClient) {
    claudeClient = new Anthropic({
      apiKey: env.ANTHROPIC_API_KEY,
      // Optional: Add timeout settings
      timeout: 30000,
    });
  }
  return claudeClient;
}

/**
 * Get the system prompt for a specific stakeholder
 * This is where you define the "persona" of Claude for each section
 */
export function getStakeholderSystemPrompt(stakeholder: string): string {
  const prompts = {
    provider: `You are a clinical AI assistant for the Vision Source Digital Platform (VSDP).
You help optometrists understand how VSDP transforms their practice through:

1. Digital Twins: AI models of each patient's visual system that predict disease progression
2. Proactive Management: Know 6 months ahead when a patient needs intervention
3. Clinical Decision Support: Real-time recommendations during exams
4. Research: Every patient encounter becomes a data point improving the system

Key partnerships: RetEval ERG, Optos imaging, Visionix OCT

When answering:
- Use specific clinical examples (e.g., "A myopic patient shows 0.5D progression/year. 
  VSDP predicts intervention window 6 months out, allowing ortho-K start at optimal time.")
- Include ROI metrics (practice efficiency gains, patient outcomes)
- Reference the Vision Source network advantage (3,000+ practices = 6M patients for research)
- Always mention continuous vs episodic care advantage
- Be conversational but evidence-based

Example good response:
"Let's say you have a 12-year-old with myopic progression of 0.75D/year. Traditional episodic care 
means you see them annually—no intervention points. VSDP's digital twin predicts their progression 
trajectory from baseline + retinal imaging. You start ortho-K 2 months before they'd hit 
your intervention threshold, achieving 65% better control. Plus, their data feeds the network 
improving outcomes for all 3,000 Vision Source practices."`,

    pharma: `You are a pharmaceutical research AI for VSDP's clinical trials platform.
You help pharma companies understand how VSDP revolutionizes drug development through:

1. Rapid Recruitment: Direct access to 6M+ patients across Vision Source network
2. Real-World Monitoring: Continuous data vs traditional quarterly visits
3. Real-World Evidence: Regulatory advantage through continuous monitoring
4. Diverse Population: Geographically distributed patient population

When answering:
- Emphasize speed to enrollment (10-20x faster than traditional recruitment)
- Highlight continuous monitoring advantage (captures 365x more data points vs annual visits)
- Calculate cost savings (e.g., "$X per patient enrolled vs $Y traditional, $Z total savings")
- Reference statistical power improvements
- Mention HIPAA-compliant data sharing agreements
- Emphasize recruitment from real-world settings (not selected academic centers)

Tone: Business-focused, data-driven, ROI-oriented.`,

    ehr: `You are a healthcare systems AI for VSDP's population health platform.
You help health systems understand how VSDP enables proactive disease management through:

1. Early Detection: Catch diabetic retinopathy, glaucoma progression before symptoms
2. System Integration: Seamless data flow to Epic, Cerner via FHIR
3. Care Coordination: Alerts to PCPs when eye findings suggest systemic disease
4. Population Insights: De-identified aggregated data on disease prevalence and outcomes

When answering:
- Frame around PCP workflows and Epic/Cerner integration
- Emphasize preventive care and cost savings from early intervention
- Reference FHIR standards and interoperability
- Include examples of systemic disease caught through eye findings
  (e.g., "Early diabetic retinopathy often appears before PCP labs flag diabetes progression")
- Mention outcomes improvements (readmission reduction, ED visits prevented)

Tone: Healthcare operations focused, system integration emphasis.`,

    bigtech: `You are a consumer technology AI for VSDP's AR/wearable platform.
You help tech companies understand how VSDP enables next-generation human-computer interfaces through:

1. User State Modeling: Real-time cognitive load, stress, attention from eye metrics
2. Adaptive Interfaces: AI assistants that adjust interaction style based on user state
3. AR/XR Integration: Smart glasses that understand user intent from gaze patterns
4. Regulatory Advantage: Healthcare pedigree supports consumer health claims

When answering:
- Frame around consumer UX and AI assistant capabilities
- Emphasize gaze-based intent detection for AR/XR
- Reference partnerships: Meta Reality Labs, Apple Health, Microsoft Cortana
- Highlight regulatory advantage of healthcare-validated measurements
- Include examples: "stress-aware email delays", "cognitive load adaptive UI"
- Mention massive addressable market ($100B+ AR/AI assistant market)

Tone: Consumer tech focused, AI/UX emphasis, future-forward.`,
  };

  return (
    prompts[stakeholder as keyof typeof prompts] ||
    prompts.provider // default fallback
  );
}

/**
 * Core function to send message to Claude
 * This is where the actual Claude API call happens
 */
export async function sendClaudeMessage(params: {
  message: string;
  stakeholder: string;
  previousMessages?: { role: "user" | "assistant"; content: string }[];
}): Promise<string> {
  const client = getClaudeClient();

  try {
    // Build conversation history in Claude's expected format
    const messages: Anthropic.MessageParam[] = params.previousMessages
      ? [
          ...params.previousMessages.map((m) => ({
            role: m.role,
            content: m.content,
          } as Anthropic.MessageParam)),
          {
            role: "user" as const,
            content: params.message,
          },
        ]
      : [
          {
            role: "user" as const,
            content: params.message,
          },
        ];

    // Make the actual API call
    const response = await client.messages.create({
      model: "claude-sonnet-4-5-20250929", // Latest stable model
      max_tokens: 1024,
      system: getStakeholderSystemPrompt(params.stakeholder),
      messages: messages,
    });

    // Extract text from response
    const textContent = response.content.find((block) => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text content in Claude response");
    }

    return textContent.text;
  } catch (error) {
    console.error("Claude API error:", error);
    throw error;
  }
}

/**
 * Streaming version for real-time chat feel
 * Returns an async generator you can iterate over
 */
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
        {
          role: "user" as const,
          content: params.message,
        },
      ]
    : [
        {
          role: "user" as const,
          content: params.message,
        },
      ];

  try {
    const stream = client.messages.stream({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1024,
      system: getStakeholderSystemPrompt(params.stakeholder),
      messages: messages,
    });

    // Yield text chunks as they arrive
    for await (const event of stream) {
      if (
        event.type === "content_block_delta" &&
        event.delta.type === "text_delta"
      ) {
        yield event.delta.text;
      }
    }
  } catch (error) {
    console.error("Claude streaming error:", error);
    throw error;
  }
}
```

---

## Step 5: Create tRPC Router (The Type-Safe API)

Create `src/server/api/routers/claude.ts`:

```typescript
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sendClaudeMessage, streamClaudeMessage } from "~/server/lib/claude";
import { claudeMessageSchema, claudeResponseSchema } from "./types";

export const claudeRouter = createTRPCRouter({
  /**
   * Simple request-response chat
   * Good for: Single questions, analysis requests
   */
  ask: publicProcedure
    .input(claudeMessageSchema)
    .output(claudeResponseSchema)
    .mutation(async ({ input }) => {
      const response = await sendClaudeMessage({
        message: input.message,
        stakeholder: input.stakeholder,
        previousMessages: input.context?.previousMessages,
      });

      // Return typed response
      return {
        message: response,
        followUpSuggestions: [
          "Can you elaborate on that?",
          "What about for small practices?",
          "How does this integrate with Epic?",
        ],
      };
    }),

  /**
   * Streaming response for chat-like experience
   * Good for: Conversational demos, real-time updates
   * 
   * Note: tRPC streaming works but is complex.
   * For simpler approach, consider Next.js API route (shown below)
   */
  askStream: publicProcedure
    .input(claudeMessageSchema)
    .subscription(async function* ({ input }) {
      // This is a subscription, streamed back to client
      for await (const chunk of streamClaudeMessage({
        message: input.message,
        stakeholder: input.stakeholder,
        previousMessages: input.context?.previousMessages,
      })) {
        yield { chunk };
      }
    }),
});
```

Then add to your main router in `src/server/api/root.ts`:

```typescript
import { createTRPCRouter } from "~/server/api/trpc";
import { claudeRouter } from "./routers/claude";
import { exampleRouter } from "./routers/example"; // existing

export const appRouter = createTRPCRouter({
  claude: claudeRouter,
  example: exampleRouter,
});

export type AppRouter = typeof appRouter;
```

---

## Step 6: Use in React Components (Type-Safe Client)

Create `src/components/StakeholderChat.tsx`:

```typescript
import { useState } from "react";
import { api } from "~/utils/api";

interface Props {
  stakeholder: "provider" | "pharma" | "ehr" | "bigtech";
  title: string;
}

export function StakeholderChat({ stakeholder, title }: Props) {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Typed API call - TypeScript knows what properties are allowed
  const { mutate: sendMessage } = api.claude.ask.useMutation({
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      // data is typed as ClaudeResponse - you get autocomplete
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
      setIsLoading(false);
    },
    onError: (error) => {
      console.error("Failed to get response:", error);
      setIsLoading(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to UI immediately
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    // Type-safe call - inputs are validated here
    sendMessage({
      message: input,
      stakeholder: stakeholder,
      context: {
        sessionId: crypto.randomUUID(),
        previousMessages: messages,
      },
    });

    setInput("");
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4">
      <h2 className="text-2xl font-bold">{title}</h2>

      {/* Messages */}
      <div className="flex max-h-96 flex-col gap-2 overflow-y-auto rounded bg-gray-50 p-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`rounded p-2 ${
              msg.role === "user"
                ? "bg-blue-100 text-right"
                : "bg-gray-200 text-left"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="animate-pulse text-gray-500">Claude is thinking...</div>
        )}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 rounded border px-3 py-2"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
```

Notice: **No type definitions needed**—TypeScript infers them from your router!

---

## Step 7: Alternative - Next.js API Route for Streaming (Simpler)

If tRPC subscriptions feel complex, use a Next.js API route for streaming:

Create `src/pages/api/claude/stream.ts`:

```typescript
import type { NextRequest } from "next/server";
import { streamClaudeMessage } from "~/server/lib/claude";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req: NextRequest) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { message, stakeholder, previousMessages } = await req.json();

    // Create readable stream for response body
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamClaudeMessage({
            message,
            stakeholder,
            previousMessages,
          })) {
            controller.enqueue(new TextEncoder().encode(chunk));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Streaming error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
```

Then use in component:

```typescript
const handleStreamMessage = async () => {
  const response = await fetch("/api/claude/stream", {
    method: "POST",
    body: JSON.stringify({
      message: input,
      stakeholder,
      previousMessages: messages,
    }),
  });

  const reader = response.body?.getReader();
  if (!reader) return;

  const decoder = new TextDecoder();
  let fullMessage = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    fullMessage += chunk;

    // Update UI with streaming chunks
    setMessages((prev) => {
      const newMsgs = [...prev];
      if (
        newMsgs[newMsgs.length - 1]?.role === "assistant"
      ) {
        newMsgs[newMsgs.length - 1]!.content = fullMessage;
      } else {
        newMsgs.push({ role: "assistant", content: fullMessage });
      }
      return newMsgs;
    });
  }
};
```

---

## Step 8: Key Files Structure

Your project should look like:

```
src/
├── server/
│   ├── api/
│   │   ├── routers/
│   │   │   ├── claude.ts          ← tRPC procedures
│   │   │   ├── types.ts           ← Zod schemas (shared types)
│   │   │   └── example.ts         ← existing
│   │   ├── root.ts                ← router combination
│   │   └── trpc.ts                ← tRPC context/middleware
│   └── lib/
│       └── claude.ts              ← Claude API wrapper
├── pages/
│   ├── api/
│   │   ├── claude/
│   │   │   └── stream.ts          ← (Optional) Streaming endpoint
│   │   └── trpc/
│   │       └── [trpc].ts          ← auto-generated
│   └── index.tsx                  ← Home page
├── components/
│   ├── StakeholderChat.tsx        ← Chat UI component
│   └── ...
├── utils/
│   └── api.ts                     ← tRPC client hook
└── env.ts                         ← Environment validation
```

---

## Step 9: Best Practices & Patterns

### ✅ DO: Type Everything

```typescript
// Good - Types flow through
const { mutate } = api.claude.ask.useMutation();
mutate({
  message: "...",
  stakeholder: "provider", // IDE autocompletes stakeholder options
});

// Bad - No type safety
fetch("/api/claude", {
  body: JSON.stringify({ message: "...", stakeholder: "random" }), // typo not caught
});
```

### ✅ DO: Validate at Router Level

```typescript
// Your Zod schema catches bad input BEFORE Claude API is called
.input(claudeMessageSchema) // Zod validates here
.mutation(async ({ input }) => {
  // input is guaranteed valid
  const response = await sendClaudeMessage(input);
});
```

### ✅ DO: Handle Errors Properly

```typescript
const { mutate } = api.claude.ask.useMutation({
  onError: (error) => {
    if (error.code === "RATE_LIMITED") {
      // Handle rate limits
    } else if (error.code === "UNAUTHORIZED") {
      // Handle invalid API key
    } else {
      // Generic error
    }
  },
});
```

### ❌ DON'T: Call Claude Directly from Client

```typescript
// BAD - API key would be exposed
const response = await fetch("https://api.anthropic.com/v1/messages", {
  headers: { "x-api-key": process.env.NEXT_PUBLIC_ANTHROPIC_KEY }, // NEVER expose!
});
```

The T3 Stack keeps your API key safe on the server.

---

## Step 10: Adding Context-Awareness

For the demo, you want Claude to reference simulation data. Extend the router:

Create `src/server/api/routers/simulators.ts`:

```typescript
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const simulatorsRouter = createTRPCRouter({
  /**
   * Get trial recruitment metrics
   * Claude can reference this in its response
   */
  getTrialMetrics: publicProcedure
    .input(
      z.object({
        condition: z.string(),
        targetEnrollment: z.number(),
      })
    )
    .query(async ({ input }) => {
      // Calculate metrics based on your simulator logic
      const eligiblePatients = 15000; // from Vision Source network
      const traditionalMonths = 18;
      const vsdpWeeks = 6;

      return {
        eligiblePatients,
        traditional: { time: traditionalMonths, unit: "months" },
        vsdp: { time: vsdpWeeks, unit: "weeks" },
        costSavings: ((traditionalMonths - vsdpWeeks / 4) * 50000).toFixed(0),
      };
    }),
});
```

Then in Claude router, enhance the ask function:

```typescript
ask: publicProcedure
  .input(claudeMessageSchema)
  .output(claudeResponseSchema)
  .mutation(async ({ input, ctx }) => {
    // If user asks about trials, fetch real simulation data
    let context = "";
    if (
      input.stakeholder === "pharma" &&
      input.message.toLowerCase().includes("trial")
    ) {
      // Call your simulator
      const metrics = await ctx.db.simulationMetrics.findFirst({
        // or however you're storing simulation data
      });
      context = `Current trial metrics: ${JSON.stringify(metrics)}`;
    }

    // Include context in the message
    const enhancedMessage = context
      ? `${input.message}\n\nContext data: ${context}`
      : input.message;

    const response = await sendClaudeMessage({
      message: enhancedMessage,
      stakeholder: input.stakeholder,
      previousMessages: input.context?.previousMessages,
    });

    return { message: response };
  }),
```

---

## Step 11: Rate Limiting & Cost Control

Add rate limiting to avoid surprise bills:

Create `src/server/lib/rate-limit.ts`:

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize once
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, "1 h"), // 20 requests per hour
});

export async function checkRateLimit(identifier: string) {
  const { success, remaining } = await ratelimit.limit(identifier);
  return { success, remaining };
}
```

Use in router:

```typescript
ask: publicProcedure
  .input(claudeMessageSchema)
  .mutation(async ({ input }) => {
    const { success, remaining } = await checkRateLimit("demo-user");
    if (!success) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: `Rate limited. Try again after 1 hour.`,
      });
    }

    // ... proceed with Claude call
  }),
```

---

## Step 12: Deployment

When you're ready to deploy to production:

```bash
# Deploy to Vercel (handles Next.js perfectly)
npm install -g vercel
vercel

# Vercel will prompt for environment variables
# Add ANTHROPIC_API_KEY and UPSTASH_REDIS_REST_* keys
```

Your `.env.example` file guides team members on what's needed.

---

## Summary: Why This Approach is Better

| Feature | Direct API Calls | This T3 + tRPC Approach |
|---------|-----------------|------------------------|
| **Type Safety** | Runtime errors | Compile-time errors caught |
| **API Key Security** | Exposed client-side | Secure on server |
| **Error Handling** | Manual try-catch | Built-in error codes |
| **Rate Limiting** | Must implement | Upstash integration ready |
| **Scaling** | Difficult | Easy (tRPC caching, etc) |
| **Streaming** | Complex | Built-in support |
| **Code Reusability** | Lots of duplication | Single router powers everything |

---

## Next: Test It

After setup, test your integration:

```typescript
// In a test file or your homepage
import { api } from "~/utils/api";

export default function Home() {
  const { mutate } = api.claude.ask.useMutation();

  return (
    <button
      onClick={() =>
        mutate({
          message: "What is VSDP?",
          stakeholder: "provider",
        })
      }
    >
      Ask Claude
    </button>
  );
}
```

You should get a response typed as `ClaudeResponse` with full IDE autocomplete.

That's it! You now have production-grade, type-safe Claude integration in your T3 app.
