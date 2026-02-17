"use client";

import { Sparkles } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export function CopilotButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        type="button"
        onClick={() => {
          /* TODO: Open chat overlay with Claude AI */
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex items-center gap-2 rounded-full bg-vsdp-electric px-4 py-3 text-white shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-vsdp-electric focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        aria-label="Ask me anything about VSDP - Living Intelligence Copilot"
        animate={{
          boxShadow: [
            "0 10px 15px -3px rgba(0, 132, 255, 0.3)",
            "0 10px 25px -5px rgba(0, 132, 255, 0.4)",
            "0 10px 15px -3px rgba(0, 132, 255, 0.3)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Sparkles className="h-5 w-5 shrink-0" aria-hidden />
        <motion.span
          className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium"
          animate={{ maxWidth: hovered ? 200 : 0 }}
          transition={{ duration: 0.2 }}
        >
          Ask me anything about VSDP
        </motion.span>
      </motion.button>
    </div>
  );
}
