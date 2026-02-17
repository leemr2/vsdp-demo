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

    const response = await client.messages.create({
      model: "claude-sonnet-4-5",
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
      message:
        "I'm having trouble connecting right now. Please try again in a moment, or explore the stakeholder sections to learn more about VSDP.",
      error: true,
    });
  }
}
