"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

const INNER_CAPABILITIES = [
  "Clinical Data Integration",
  "Predictive Analytics Engine",
  "Personalization Algorithms",
  "Continuous Monitoring Infrastructure",
] as const;

const OUTER_APPLICATIONS = [
  "Provider Clinical Decision Support",
  "Pharma Clinical Trials",
  "Health System Population Health",
  "Consumer Digital Health",
  "XR Neural Interfaces",
  "Research & Discovery",
] as const;

const CX = 200;
const CY = 200;
const INNER_R = 70;
const OUTER_R = 150;

export function PlatformVision() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });

  return (
    <section
      id="platform-vision"
      className="scroll-mt-[72px] bg-gray-50 py-16 md:py-24"
      aria-labelledby="platform-vision-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="mb-12 text-center">
          <h2
            id="platform-vision-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl"
          >
            One Platform, Limitless Applications
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div ref={ref} className="mx-auto flex justify-center">
            <svg
              viewBox="0 0 400 400"
              className="h-auto w-full max-w-lg"
              aria-label="VSDP platform architecture diagram"
            >
              {/* Outer ring - application nodes */}
              {OUTER_APPLICATIONS.map((label, i) => {
                const angle = (i / OUTER_APPLICATIONS.length) * 2 * Math.PI - Math.PI / 2;
                const x = CX + OUTER_R * Math.cos(angle);
                const y = CY + OUTER_R * Math.sin(angle);
                return (
                  <g key={label}>
                    <motion.line
                      x1={CX}
                      y1={CY}
                      x2={x}
                      y2={y}
                      stroke="var(--color-vsdp-electric)"
                      strokeWidth="1"
                      strokeOpacity="0.3"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.05,
                      }}
                    />
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={20}
                      fill="white"
                      stroke="var(--color-vsdp-electric)"
                      strokeWidth="2"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                    />
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-gray-700 text-[10px] font-medium"
                      style={{ fontSize: "9px" }}
                    >
                      {label.split(" ").slice(0, 2).join(" ")}
                    </text>
                  </g>
                );
              })}

              {/* Inner ring - capabilities */}
              {INNER_CAPABILITIES.map((label, i) => {
                const angle = (i / INNER_CAPABILITIES.length) * 2 * Math.PI - Math.PI / 2;
                const x = CX + INNER_R * Math.cos(angle);
                const y = CY + INNER_R * Math.sin(angle);
                return (
                  <motion.g key={label}>
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={28}
                      fill="white"
                      stroke="var(--color-vsdp-teal)"
                      strokeWidth="1.5"
                      strokeOpacity="0.6"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 0.2 + i * 0.05, duration: 0.3 }}
                    />
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-gray-800 text-[8px] font-semibold"
                      style={{ fontSize: "8px" }}
                    >
                      {label.split(" ")[0]}
                    </text>
                  </motion.g>
                );
              })}

              {/* Center - Digital Twin Core */}
              <motion.circle
                cx={CX}
                cy={CY}
                r={40}
                fill="var(--color-vsdp-electric)"
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  isInView
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0, opacity: 0 }
                }
                transition={{ duration: 0.4 }}
              />
              <motion.circle
                cx={CX}
                cy={CY}
                r={40}
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeOpacity="0.5"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.4 }}
              />
              <motion.text
                x={CX}
                y={CY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-white text-[10px] font-bold"
                style={{ fontSize: "10px" }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5 }}
              >
                Digital Twin Core
              </motion.text>

              {/* Pulse animation */}
              <motion.circle
                cx={CX}
                cy={CY}
                r={40}
                fill="none"
                stroke="var(--color-vsdp-electric)"
                strokeWidth="2"
                initial={{ opacity: 0.5, scale: 1 }}
                animate={
                  isInView
                    ? { opacity: [0.5, 0], scale: [1, 1.8] }
                    : { opacity: 0.5, scale: 1 }
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              />
            </svg>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-8 text-center">
          <p className="mx-auto max-w-2xl text-base italic text-gray-600">
            Each application strengthens the platform. Each stakeholder&apos;s
            data improves everyone&apos;s outcomes.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-12">
          <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <p className="text-center text-base leading-relaxed text-gray-700">
              This isn&apos;t just a product—it&apos;s a network that becomes
              more valuable as more participants join. Your practice data
              improves treatment recommendations for all practices. Pharma trial
              results inform provider decision-making. Consumer engagement data
              enhances clinical research quality. The network effect creates a
              sustainable competitive moat impossible to replicate.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
