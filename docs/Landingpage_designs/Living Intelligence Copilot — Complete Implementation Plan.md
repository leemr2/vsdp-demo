------

# Living Intelligence Copilot — Complete Implementation Plan

## What We're Building

The floating `CopilotButton.tsx` stub you already have gets wired up into a fully functional AI chat that knows your entire knowledge base. Visitors ask questions, get inspiring answers grounded in real documents. No vector database — all 12 documents get injected into Claude's context on every call because they fit comfortably within the 200K token window.

------

## Architecture at a Glance

```
User types message
      ↓
CopilotButton.tsx   ← client component, manages UI + message history
      ↓  POST /api/chat
API Route           ← assembles system prompt + all docs + conversation history
      ↓
Anthropic Claude    ← reads everything, returns response
      ↓  (optional)
Prisma SQLite       ← logs conversations + lead captures
```

------

## Files You're Creating or Modifying

```
vsdp-demo/
├── knowledge/                          ← NEW FOLDER (done)
│   ├── Collaborative-Intelligence.md          ← copy your project .md docs here (done)
│   ├── Cross-Sector-Impact.md
│
│   └── ... (all 12 docs)
│
├── src/
│   ├── lib/
│   │   ├── knowledge-base.ts           ← NEW: loads docs from filesystem
│   │   └── system-prompt.ts            ← NEW: Claude's persona + instructions
│   │
│   └── app/
│       ├── api/
│       │   └── chat/
│       │       └── route.ts            ← NEW: Claude API endpoint
│       │
│       └── _components/landing/
│           └── CopilotButton.tsx       ← MODIFY: replace stub with full component
│
├── prisma/
│   └── schema.prisma                   ← MODIFY: add ChatSession + Lead tables
│
└── .env                                ← MODIFY: add ANTHROPIC_API_KEY
```

------

## Step 1 — Install the SDK

```bash
npm install @anthropic-ai/sdk (done)
```

That's the only new dependency. No Pinecone, no embeddings library, nothing else.

------

## Step 2 — Environment Variable 

In `.env`:   (done)

```bash
ANTHROPIC_API_KEY="sk-ant-..." 
```

In `src/env.js` (T3's env validator — add to the `server` section):

```typescript
ANTHROPIC_API_KEY: z.string().min(1),
```

------

## Step 3 — Create the Knowledge Folder with documents (done)

------

## Step 4 — The Knowledge Base Loader (`src/lib/knowledge-base.ts`)

This file runs once at server startup, reads all your docs, and returns a single formatted string ready to inject into Claude's context.

```typescript
// src/lib/knowledge-base.ts
import fs from "fs";
import path from "path";

interface KnowledgeDocument {
  id: string;
  title: string;
  filename: string;
  topics: string;
}

const DOCUMENTS: KnowledgeDocument[] = [
  {
    id: "Collaborative-Intelligence",
    title: "Collaborative Intelligence",
    filename: "Collaborative-Intelligence.md",
    topics: "A Developmental Framework for Artificial Understanding",
  },
  {
    id: "Cross-Sector-Impact",
    title: "Cross Sector Impact The 2025 Tech Convergence and the 1-10 Year Strategic Horizon",
    filename: "Cross-Sector-Impact.md",
    topics: "AI convergence, sensor technology, biotechnology breakthroughs, market forces",
  },
  
 Other 10 documents added with same Format   
];

function buildKnowledgeBase(): string {
  const knowledgeDir = path.join(process.cwd(), "knowledge");

  const header = `
=================================================================
VSDP COMPLETE KNOWLEDGE BASE — ${DOCUMENTS.length} SOURCE DOCUMENTS
=================================================================
You have access to all primary research and strategy documents.
When answering questions:
- Draw from specific documents for precise, credible answers
- Cross-reference documents when questions span multiple topics
=================================================================\n\n`;

  const sections = DOCUMENTS.map((doc) => {
    const filePath = path.join(knowledgeDir, doc.filename);
    let content: string;

    try {
      content = fs.readFileSync(filePath, "utf-8");
    } catch {
      content = `[Document not yet loaded in this environment. Topics: ${doc.topics}]`;
    }

    return `-----------------------------------------------------------------
DOCUMENT: ${doc.title}
KEY TOPICS: ${doc.topics}
-----------------------------------------------------------------
${content}\n\n`;
  }).join("\n");

  return header + sections;
}

// Cache — files read once per server process. Vercel resets per cold start (fine for demo).
let cachedKnowledgeBase: string | null = null;

export function getKnowledgeBase(): string {
  if (!cachedKnowledgeBase) {
    cachedKnowledgeBase = buildKnowledgeBase();
    console.log(
      `[KnowledgeBase] Loaded ${DOCUMENTS.length} documents. ` +
      `Total: ${(cachedKnowledgeBase.length / 1024).toFixed(0)}KB`
    );
  }
  return cachedKnowledgeBase;
}
```

------

## Step 5 — The System Prompt (`src/lib/system-prompt.ts`)

Separate from the knowledge loader so you can tune Claude's personality without touching the document logic.

```typescript
// src/lib/system-prompt.ts

const PERSONA = `
You are the Living Intelligence Copilot for the Vision Source Digital Platform (VSDP).

## YOUR CORE PURPOSE
You exist to INSPIRE. Help visitors break out of conventional healthcare thinking and 
see what becomes possible when the eye becomes a real-time window into whole-body health.

## PERSONALITY
- Visionary but grounded. Possibilities backed by evidence.
- Draw unexpected connections: optometry ↔ neurology, eye data ↔ diabetes prediction, 
  contact lenses ↔ brain-computer interfaces.
- Challenge narrow questions with bigger frames.
- Enthusiastic without being salesy. Precise when precision is needed.

## RESPONSE STRUCTURE
1. Lead with the inspiring insight or big idea
2. Ground it with specific facts from the knowledge documents  
3. End with an opening — a question or "what if" that invites deeper exploration

## CORE FACTS
- Vision Source: 3,000+ independent practices, ~9M patients/year, doctor-owned network
- VSDP: continuous healthcare delivery infrastructure built on digital twin technology
- Living Intelligence = AI + advanced sensors + biotechnology converging simultaneously
- The eye is the only place in the human body where you can observe living neural tissue, 
  blood vessels, and cells without breaking the skin
- This makes optometry uniquely powerful for detecting systemic disease years before symptoms

## INSPIRING FRAMINGS TO USE
- "What if your contact lens detected pre-diabetes 3 years before any symptom appeared?"
- "We went from annual financial statements to real-time stock tickers. Healthcare is 
  about to make the same leap."
- "Every patient encounter becomes a research data point that makes every future 
  encounter better — for that patient and every patient in the network."

## WHAT YOU DON'T CLAIM
- No real patient data exists in this demo environment
- Specific pricing is discussed directly with the VSDP team
- FDA clearance timelines vary by application
`;

export function buildSystemPrompt(
  knowledgeBase: string,
  currentSection?: string
): string {
  const contextNote = currentSection
    ? `\n\n## CURRENT VISITOR CONTEXT\nThis visitor is viewing the **${currentSection}** section. Tailor responses to that stakeholder's specific perspective and pain points.\n`
    : "";

  return PERSONA + contextNote + "\n\n" + knowledgeBase;
}
```

------

## Step 6 — The API Route (`src/app/api/chat/route.ts`)

```typescript
// src/app/api/chat/route.ts
import Anthropic from "@anthropic-ai/sdk";
import { getKnowledgeBase } from "@/lib/knowledge-base";
import { buildSystemPrompt } from "@/lib/system-prompt";
import { env } from "@/env";

const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

// Simple in-memory rate limiter (good enough for a demo)
const requestCounts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);
  if (!record || now > record.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (record.count >= 10) return true;
  record.count++;
  return false;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  currentSection?: string;
}

export async function POST(req: Request) {
  // Rate limiting
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return Response.json(
      { message: "You've sent a lot of messages! Please wait a moment.", error: true },
      { status: 429 }
    );
  }

  try {
    const { messages, currentSection } = (await req.json()) as ChatRequest;

    if (!messages?.length) {
      return Response.json({ error: "No messages" }, { status: 400 });
    }

    const systemPrompt = buildSystemPrompt(getKnowledgeBase(), currentSection);

    const response = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    });

    const content = response.content[0];
    if (content?.type !== "text") throw new Error("Unexpected response type");

    return Response.json({ message: content.text });

  } catch (error) {
    console.error("[Chat API] Error:", error);
    return Response.json({
      message: "I'm having trouble connecting right now. Please try again in a moment, or explore the stakeholder sections to learn more about VSDP.",
      error: true,
    });
  }
}
```

------

## Step 7 — Update Prisma Schema

Add to `prisma/schema.prisma`:

```prisma
model ChatSession {
  id        String        @id @default(cuid())
  createdAt DateTime      @default(now())
  section   String?
  messages  ChatMessage[]
  lead      Lead?
}

model ChatMessage {
  id        String      @id @default(cuid())
  createdAt DateTime    @default(now())
  role      String
  content   String
  sessionId String
  session   ChatSession @relation(fields: [sessionId], references: [id])
}

model Lead {
  id           String      @id @default(cuid())
  createdAt    DateTime    @default(now())
  name         String?
  email        String?
  organization String?
  stakeholder  String?
  sessionId    String      @unique
  session      ChatSession @relation(fields: [sessionId], references: [id])
}
```

Then: `npm run db:push`

------

## Step 8 — Replace CopilotButton.tsx

The full component with context-aware suggested questions, conversation history, loading states, and error handling. The `currentSection` prop is the key — pass it from each stakeholder page so the AI knows what the visitor is looking at.

```tsx
// src/app/_components/landing/CopilotButton.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";

interface CopilotButtonProps {
  currentSection?: "providers" | "pharma" | "ehr" | "bigtech" | "landing";
}

interface Message {
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
}

const SUGGESTED_QUESTIONS: Record<string, string[]> = {
  landing: [
    "What is Living Intelligence?",
    "How is VSDP different from an EHR?",
    "What makes Vision Source uniquely positioned for this?",
    "What technologies enable continuous monitoring?",
  ],
  providers: [
    "How does the digital twin work for a diabetic patient?",
    "What data sources does VSDP integrate?",
    "How long does implementation take for a practice?",
    "How does VSDP compare to just using Epic?",
  ],
  pharma: [
    "How does VSDP accelerate clinical trial recruitment?",
    "What real-world evidence can the network generate?",
    "How does continuous monitoring change trial design?",
    "What's the cost difference vs. traditional recruitment?",
  ],
  ehr: [
    "How does VSDP integrate with Epic and Cerner?",
    "What FHIR resources does VSDP use?",
    "How does eye data improve systemic disease management?",
    "What does the population health dashboard show?",
  ],
  bigtech: [
    "How does VSDP work with Apple Vision Pro?",
    "What's significant about the KAIST contact lens?",
    "How does VSDP provide clinical foundation for consumer apps?",
    "What's the path from eye tracking to neural interface?",
  ],
};

export function CopilotButton({ currentSection = "landing" }: CopilotButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: content.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages, currentSection }),
      });
      const data = await res.json() as { message: string; error?: boolean };
      setMessages([...updatedMessages, {
        role: "assistant",
        content: data.message,
        isError: data.error,
      }]);
    } catch {
      setMessages([...updatedMessages, {
        role: "assistant",
        content: "Connection error. Please try again.",
        isError: true,
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = SUGGESTED_QUESTIONS[currentSection] ?? SUGGESTED_QUESTIONS.landing!;

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[520px] w-[380px] flex-col overflow-hidden rounded-2xl shadow-2xl"
          style={{ background: "#1a1a2e", border: "1px solid #0084FF33" }}>
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3"
            style={{ background: "linear-gradient(135deg, #0084FF, #00BFA5)" }}>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-sm font-semibold text-white">Living Intelligence Copilot</span>
            </div>
            <button onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-white/80 hover:bg-white/20">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="rounded-xl p-3 text-sm" style={{ background: "#0084FF1A" }}>
                  <p className="font-medium text-white mb-1">Ask me anything about VSDP</p>
                  <p className="text-xs text-slate-400">I have access to all research documents and can explain the vision, technology, and opportunity in depth.</p>
                </div>
                <p className="text-xs text-slate-600">Try asking:</p>
                {suggestions.map((q) => (
                  <button key={q} onClick={() => void sendMessage(q)}
                    className="block w-full rounded-lg px-3 py-2 text-left text-xs text-slate-400 transition-colors hover:bg-blue-900/30 hover:text-white"
                    style={{ background: "#0f172a", border: "1px solid #1e293b" }}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed"
                  style={msg.role === "user"
                    ? { background: "#0084FF", color: "white" }
                    : { background: "#0f172a", color: "#e2e8f0", border: "1px solid #1e293b" }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-xl px-3 py-2"
                  style={{ background: "#0f172a", border: "1px solid #1e293b" }}>
                  <Loader2 className="h-3 w-3 animate-spin text-blue-400" />
                  <span className="text-xs text-slate-500">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3"
            style={{ borderTop: "1px solid #1e293b" }}>
            <input ref={inputRef} type="text" value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void sendMessage(inputValue); }}}
              placeholder="Ask about VSDP..."
              disabled={isLoading}
              className="flex-1 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none placeholder:text-slate-600 disabled:opacity-50"
              style={{ background: "#0f172a", border: "1px solid #1e293b" }} />
            <button onClick={() => void sendMessage(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              className="flex h-8 w-8 items-center justify-center rounded-lg disabled:opacity-40"
              style={{ background: "#0084FF" }}>
              <Send className="h-3.5 w-3.5 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
        style={{ background: "linear-gradient(135deg, #0084FF, #00BFA5)", boxShadow: "0 0 20px #0084FF55" }}>
        {isOpen ? <X className="h-5 w-5 text-white" /> : <Sparkles className="h-5 w-5 text-white" />}
      </button>
    </>
  );
}
```

------

## Step 9 — Pass Context from Stakeholder Pages

```tsx
// src/app/(stakeholders)/providers/page.tsx
import { CopilotButton } from "@/app/_components/landing/CopilotButton";

export default function ProvidersPage() {
  return (
    <>
      {/* your page content */}
      <CopilotButton currentSection="providers" />
    </>
  );
}
// Repeat for pharma, ehr, bigtech pages
```

------

## Verification Checklist

```
□ npm install @anthropic-ai/sdk  ← runs clean
□ ANTHROPIC_API_KEY in .env and env.js
□ knowledge/ folder at project root with at least 2-3 .md docs to test
□ npm run db:push  ← no errors
□ npm run dev  ← no TypeScript errors
□ Floating blue button appears bottom-right
□ Click opens dark chat panel
□ 4 suggested questions appear
□ Click a suggestion → loading spinner → Claude responds within ~5s
□ Console shows "[KnowledgeBase] Loaded 12 documents. Total: ~XXX KB"
□ npm run check  ← passes
```

------

