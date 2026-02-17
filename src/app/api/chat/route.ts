// src/app/api/chat/route.ts
import Anthropic from "@anthropic-ai/sdk";
import { getKnowledgeBase } from "@/lib/knowledge-base";
import { buildSystemPrompt } from "@/lib/system-prompt";
import { env } from "@/env";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
      {
        message:
          "You've sent a lot of messages! Please wait a moment before asking another question.",
        error: true,
      },
      { status: 429 },
    );
  }

  try {
    const { messages, currentSection } = (await req.json()) as ChatRequest;

    if (!messages?.length) {
      return Response.json({ error: "No messages provided" }, { status: 400 });
    }

    const systemPrompt = buildSystemPrompt(getKnowledgeBase(), currentSection);

    const stream = client.messages.stream({
      model: "claude-sonnet-4-5",
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("[Chat API] Error:", error);
    return Response.json({
      message:
        "I'm having trouble connecting right now. Please try again in a moment, or explore the stakeholder sections to learn more about VSDP.",
      error: true,
    });
  }
}
