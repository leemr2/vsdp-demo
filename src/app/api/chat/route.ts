// src/app/api/chat/route.ts
import Anthropic, { APIError } from "@anthropic-ai/sdk";
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

    // Start the Anthropic stream and peek at the first event BEFORE
    // committing the HTTP response. This ensures rate-limit and auth
    // errors (which arrive on the first network round-trip) are caught
    // while we can still return a clean JSON error to the client.
    const anthropicStream = client.messages.stream({
      model: "claude-sonnet-4-5",
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    });

    const iter = anthropicStream[Symbol.asyncIterator]();
    type StreamEvent = Awaited<ReturnType<typeof iter.next>>;
    let firstResult: StreamEvent;

    try {
      firstResult = await iter.next();
    } catch (streamErr) {
      if (streamErr instanceof APIError) {
        const isRateLimit = streamErr.status === 429;
        return Response.json(
          {
            message: isRateLimit
              ? "The assistant is handling a lot of requests right now. Please wait a moment and try again."
              : "I'm having trouble connecting right now. Please try again in a moment.",
            error: true,
          },
          { status: (streamErr.status as number | undefined) ?? 500 },
        );
      }
      throw streamErr;
    }

    // Stream is healthy — pipe remaining events to the client
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          // Emit the first event we already consumed above
          if (!firstResult.done) {
            const ev = firstResult.value;
            if (
              ev.type === "content_block_delta" &&
              ev.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(ev.delta.text));
            }
          }
          // Continue with the rest of the stream
          for await (const event of { [Symbol.asyncIterator]: () => iter }) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
        } catch (err) {
          console.error("[Chat API] Stream error:", err);
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
    if (error instanceof APIError && error.status === 429) {
      return Response.json(
        {
          message:
            "The assistant is handling a lot of requests right now. Please wait a moment and try again.",
          error: true,
        },
        { status: 429 },
      );
    }
    return Response.json({
      message:
        "I'm having trouble connecting right now. Please try again in a moment, or explore the stakeholder sections to learn more about VSDP.",
      error: true,
    });
  }
}
