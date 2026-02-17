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

export function CopilotButton({
  currentSection = "landing",
}: CopilotButtonProps) {
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
      const data = (await res.json()) as { message: string; error?: boolean };
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: data.message,
          isError: data.error,
        },
      ]);
    } catch {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Connection error. Please try again.",
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions =
    SUGGESTED_QUESTIONS[currentSection] ?? SUGGESTED_QUESTIONS.landing!;

  return (
    <>
      {/* Chat panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 flex h-[520px] w-[380px] flex-col overflow-hidden rounded-2xl shadow-2xl"
          style={{ background: "#1a1a2e", border: "1px solid #0084FF33" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{
              background: "linear-gradient(135deg, #0084FF, #00BFA5)",
            }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-sm font-semibold text-white">
                Living Intelligence Copilot
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-white/80 transition-colors hover:bg-white/20"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.length === 0 && (
              <div className="space-y-4">
                <div
                  className="rounded-xl p-3 text-sm"
                  style={{ background: "#0084FF1A" }}
                >
                  <p className="mb-1 font-medium text-white">
                    Ask me anything about VSDP
                  </p>
                  <p className="text-xs text-slate-400">
                    I have access to all research documents and can explain the
                    vision, technology, and opportunity in depth.
                  </p>
                </div>
                <p className="text-xs text-slate-600">Try asking:</p>
                {suggestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => void sendMessage(q)}
                    className="block w-full rounded-lg px-3 py-2 text-left text-xs text-slate-400 transition-colors hover:bg-blue-900/30 hover:text-white"
                    style={{
                      background: "#0f172a",
                      border: "1px solid #1e293b",
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed"
                  style={
                    msg.role === "user"
                      ? { background: "#0084FF", color: "white" }
                      : {
                          background: "#0f172a",
                          color: "#e2e8f0",
                          border: "1px solid #1e293b",
                        }
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div
                  className="flex items-center gap-2 rounded-xl px-3 py-2"
                  style={{
                    background: "#0f172a",
                    border: "1px solid #1e293b",
                  }}
                >
                  <Loader2 className="h-3 w-3 animate-spin text-blue-400" />
                  <span className="text-xs text-slate-500">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="flex items-center gap-2 px-3 py-3"
            style={{ borderTop: "1px solid #1e293b" }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void sendMessage(inputValue);
                }
              }}
              placeholder="Ask about VSDP..."
              disabled={isLoading}
              aria-label="Chat message input"
              className="flex-1 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none placeholder:text-slate-600 disabled:opacity-50"
              style={{ background: "#0f172a", border: "1px solid #1e293b" }}
            />
            <button
              onClick={() => void sendMessage(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send message"
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-opacity disabled:opacity-40"
              style={{ background: "#0084FF" }}
            >
              <Send className="h-3.5 w-3.5 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={
          isOpen ? "Close Copilot" : "Open Living Intelligence Copilot"
        }
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #0084FF, #00BFA5)",
          boxShadow: "0 0 20px #0084FF55",
        }}
      >
        {isOpen ? (
          <X className="h-5 w-5 text-white" />
        ) : (
          <MessageCircle className="h-5 w-5 text-white" />
        )}
      </button>
    </>
  );
}
