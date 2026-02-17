"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

const PHASES = [
  {
    id: 1,
    title: "Clinical Validation",
    period: "Months 0-6",
    bullets: [
      "10-practice pilot focusing on diabetic retinopathy",
      "Digital twin MVP with Optos/OCT integration",
      "Initial predictive model training",
    ],
    milestone: "FDA clearance pathway initiated",
  },
  {
    id: 2,
    title: "Healthcare Integration",
    period: "Months 6-12",
    bullets: [
      "Expand to 100 practices",
      "Epic/Cerner FHIR integration",
      "Population health dashboard",
    ],
    milestone: "First health system partnership",
  },
  {
    id: 3,
    title: "Pharma Partnerships",
    period: "Year 2",
    bullets: [
      "Clinical trial recruitment platform launch",
      "Real-world evidence generation",
      "Multi-condition digital twin expansion",
    ],
    milestone: "First pharma contract signed",
  },
  {
    id: 4,
    title: "Consumer Platform",
    period: "Year 3",
    bullets: [
      "Smartphone-based screening app",
      "Patient engagement gamification",
      "Wearable device integration",
    ],
    milestone: "100K active consumer users",
  },
  {
    id: 5,
    title: "Next-Gen Interfaces",
    period: "Year 4+",
    bullets: [
      "Smart contact lens clinical trials",
      "XR eye-control technology",
      "Neural signal interface development",
    ],
    milestone: "Big tech partnership announced",
  },
] as const;

export function ImplementationRoadmap() {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  return (
    <section
      id="implementation"
      className="scroll-mt-[72px] bg-white py-16 md:py-24"
      aria-labelledby="roadmap-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="mb-12 text-center">
          <h2
            id="roadmap-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl"
          >
            The Path Forward: From Pilot to Platform
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="overflow-x-auto pb-4">
            <div className="flex min-w-max gap-0 md:min-w-0 md:flex-wrap md:justify-center md:gap-4">
              {PHASES.map((phase, index) => {
                const isExpanded = expandedId === phase.id;
                return (
                  <div
                    key={phase.id}
                    className="flex flex-col items-center md:flex-1"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId(isExpanded ? null : phase.id)
                      }
                      className={`group flex flex-col items-center rounded-xl border-2 px-6 py-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-vs-yellow focus-visible:ring-offset-2 ${
                        isExpanded
                          ? "border-vs-yellow bg-vs-yellow/10"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                      }`}
                      aria-expanded={isExpanded}
                      aria-controls={`phase-${phase.id}-content`}
                      id={`phase-${phase.id}-button`}
                    >
                      <span
                        className={`mb-1 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                          isExpanded ? "bg-vs-yellow text-gray-900" : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {phase.id}
                      </span>
                      <span className="text-center text-sm font-semibold text-gray-900">
                        {phase.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {phase.period}
                      </span>
                      <ChevronDown
                        className={`mt-2 h-5 w-5 text-gray-500 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        aria-hidden
                      />
                    </button>
                    {index < PHASES.length - 1 && (
                      <div
                        className="hidden h-0.5 flex-1 bg-gray-200 md:block"
                        style={{ minWidth: 24 }}
                        aria-hidden
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {expandedId && (
              <motion.div
                id={`phase-${expandedId}-content`}
                key={expandedId}
                role="region"
                aria-labelledby={`phase-${expandedId}-button`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-8 overflow-hidden"
              >
                {PHASES.find((p) => p.id === expandedId) && (
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
                    <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
                      {PHASES.find((p) => p.id === expandedId)!.bullets.map(
                        (bullet) => (
                          <li key={bullet}>{bullet}</li>
                        )
                      )}
                    </ul>
                    <p className="rounded-lg border-l-4 border-vs-yellow bg-white py-2 pl-4 font-semibold text-gray-900">
                      Milestone:{" "}
                      {PHASES.find((p) => p.id === expandedId)!.milestone}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollReveal>

        <ScrollReveal className="mt-12">
          <div className="rounded-2xl bg-vs-dark-gray px-8 py-8 text-center text-white">
            <p className="text-lg font-semibold">
              Vision Source practices have an 18-month head start.
            </p>
            <p className="mt-2 text-gray-300">
              Be part of the pilot that defines the future of eye care.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
