"use client";

import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

const STATS = [
  {
    label: "Time spent searching for information",
    before: "5 minutes per patient",
    after: "30 seconds",
  },
  {
    label: "Preventable vision loss",
    before: "Missed interventions",
    after: "Early detection, proactive care",
  },
  {
    label: "Patient engagement",
    before: "Poor follow-through",
    after: "Active monitoring and engagement",
  },
] as const;

export function TransformationSlider() {
  const [width, setWidth] = useState(50);

  return (
    <section
      id="transformation"
      className="scroll-mt-[72px] bg-gray-50 py-16 md:py-24"
      aria-labelledby="transformation-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="mb-12 text-center">
          <h2
            id="transformation-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl"
          >
            From Information Archaeologist to Strategic Decision-Maker
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="relative flex h-[420px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg md:h-[380px]">
            {/* Left side - VSDP State (more visible when slider is left) */}
            <div
              className="absolute inset-y-0 left-0 flex flex-col bg-white p-6"
              style={{ width: `${100 - width}%` }}
            >
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-vsdp-electric">
                Practitioner view
              </h3>
              <p className="mb-4 text-sm text-gray-700">
                Unified digital twin dashboard with real-time insights.
              </p>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-vsdp-electric">
                Patient view
              </h3>
              <p className="mb-4 italic text-gray-700">
                &ldquo;I get notifications when my eyes need attention. My
                doctor knows everything about my health.&rdquo;
              </p>
              <div className="mt-auto rounded-lg border border-vsdp-teal/30 bg-vsdp-teal/5 p-3">
                <p className="text-sm font-medium text-gray-800">
                  Proactive Care: Preventing problems before they cause damage
                </p>
              </div>
            </div>

            {/* Right side - Current State (more visible when slider is right) */}
            <div
              className="absolute inset-y-0 right-0 flex flex-col bg-gray-100 p-6"
              style={{ width: `${width}%` }}
            >
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Practitioner view
              </h3>
              <p className="mb-4 text-sm text-gray-700">
                Fragmented interface: multiple systems, charts, and notes.
              </p>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Patient view
              </h3>
              <p className="mb-4 italic text-gray-700">
                &ldquo;I see my eye doctor once a year. I hope nothing&apos;s
                wrong.&rdquo;
              </p>
              <div className="mt-auto rounded-lg border border-gray-300 bg-amber-50/50 p-3">
                <p className="text-sm font-medium text-gray-800">
                  Reactive Care: Responding to problems after they develop
                </p>
              </div>
            </div>

            {/* Divider line (between VSDP left and Current right) */}
            <div
              className="absolute top-0 bottom-0 z-10 w-1 bg-vs-dark-gray"
              style={{ left: `${100 - width}%`, transform: "translateX(-50%)" }}
              aria-hidden
            >
              <div className="absolute left-1/2 top-1/2 h-12 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="text-sm text-gray-600">VSDP state</span>
            <input
              type="range"
              min={10}
              max={90}
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="h-2 w-64 max-w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-vs-dark-gray"
              aria-label="Compare VSDP state vs current state"
            />
            <span className="text-sm text-gray-600">Current state</span>
          </div>
        </ScrollReveal>

        {/* Key statistics */}
        <ScrollReveal className="mt-16">
          <div className="grid gap-6 md:grid-cols-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <p className="mb-3 text-sm font-medium text-gray-500">
                  {stat.label}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-gray-500 line-through">
                    {stat.before}
                  </span>
                  <span className="text-gray-400">→</span>
                  <span className="font-semibold text-clinical-success">
                    {stat.after}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
