"use client";

import { useInView } from "framer-motion";
import Lottie from "lottie-react";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

const PILLARS = [
  {
    id: "ai",
    lottiePath: "/images/Animations/AI-that-learns.json",
    headline: "Collective Intelligence",
    body: "Every patient interaction trains VSDP's algorithms. With 3,000+ Vision Source practices contributing data, digital twins learn which interventions work best for patients like yours—not generic populations, but your specific patients.",
    example:
      "Myopia progression rates vary 3x based on lifestyle patterns. VSDP identifies your patient's specific risk profile and personalizes treatment recommendations accordingly.",
  },
  {
    id: "sensors",
    lottiePath: "/images/Animations/Sensor-monitors.json",
    headline: "Continuous Awareness",
    body: "From clinic-based retinal imaging to at-home smartphone assessments, continuous glucose monitors to emerging wearable erg technology, VSDP integrates data from wherever your patients are—turning episodic snapshots into continuous awareness of changing conditions.",
    example:
      "Traditional care: Visits catch diabetic retinopathy after damage occurs, scheduling is one size fits all. VSDP: Weekly monitoring detects risk factor changes, leading to more frequent visits catching changes months earlier, when interventions are most effective.",
  },
  {
    id: "biology",
    lottiePath: "/images/Animations/Biology-Interface.json",
    headline: "Neural Connection",
    body: "Emerging technologies like ERG/VEP-enabled glasses and e-tattoo electrodes allow VSDP to measure not just structural changes but neural function—detecting disease at the level of cellular signaling before visible damage occurs.",
    example:
      "VEP (Visual Evoked Potential) patterns can predict glaucoma progression years before traditional field testing shows defects. VSDP uses these biomarkers to optimize treatment timing.",
  },
] as const;

function PillarCard({
  lottiePath,
  headline,
  body,
  example,
}: (typeof PILLARS)[number]) {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    fetch(lottiePath)
      .then((r) => r.json())
      .then(setAnimationData)
      .catch(() => setAnimationData(null));
  }, [lottiePath]);

  return (
    <motion.article
      className="flex flex-col rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-md transition-shadow hover:border-gray-300 hover:shadow-lg"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="mb-6 h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-50">
        {animationData ? (
          <Lottie
            animationData={animationData}
            loop
            className="h-full w-full"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            —
          </div>
        )}
      </div>
      <h3 className="mb-3 text-xl font-semibold text-gray-900">{headline}</h3>
      <p className="mb-4 text-base leading-relaxed text-gray-700">{body}</p>
      <p className="rounded-lg bg-gray-50 p-4 text-sm italic text-gray-600">
        &ldquo;{example}&rdquo;
      </p>
    </motion.article>
  );
}

export function LivingIntelligence() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });
  const [linesVisible, setLinesVisible] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => setLinesVisible(true), 400);
    return () => clearTimeout(t);
  }, [isInView]);

  return (
    <section
      id="living-intelligence"
      className="scroll-mt-[72px] bg-white py-16 md:py-24"
      aria-labelledby="living-intelligence-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="mb-12 text-center">
          <h2
            id="living-intelligence-heading"
            className="mb-6 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl"
          >
            Living Intelligence: The Convergence That Changes Everything
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-700">
            Living Intelligence represents the convergence of three technological
            revolutions happening simultaneously: artificial intelligence that
            learns and predicts, advanced sensors that monitor continuously, and
            biotechnology that interfaces directly with human physiology. VSDP
            harnesses this convergence to transform eye care from reactive
            appointments to proactive, personalized health management.
          </p>
        </ScrollReveal>

        <div ref={ref} className="relative">
          <div className="grid gap-8 md:grid-cols-3">
            {PILLARS.map((pillar) => (
              <PillarCard key={pillar.id} {...pillar} />
            ))}
          </div>

          {/* Connecting animation: triangle and "Digital Twin Core" */}
          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg
              className="absolute h-full w-full max-w-2xl"
              viewBox="0 0 400 300"
              fill="none"
              aria-hidden
            >
              {/* Triangle connecting the three pillars (approximate positions) */}
              {linesVisible && (
                <>
                  <motion.line
                    x1="200"
                    y1="80"
                    x2="100"
                    y2="220"
                    stroke="var(--color-vsdp-electric)"
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.line
                    x1="100"
                    y1="220"
                    x2="300"
                    y2="220"
                    stroke="var(--color-vsdp-electric)"
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  />
                  <motion.line
                    x1="300"
                    y1="220"
                    x2="200"
                    y2="80"
                    stroke="var(--color-vsdp-electric)"
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  />
                </>
              )}
            </svg>
            <motion.div
              className="relative z-10 rounded-full bg-vsdp-electric/10 px-6 py-3"
              initial={{ scale: 0, opacity: 0 }}
              animate={
                linesVisible
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0, opacity: 0 }
              }
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <span className="text-sm font-semibold text-vsdp-electric">
                Digital Twin Core
              </span>
            </motion.div>
          </motion.div>
        </div>

        <ScrollReveal className="mt-16 text-center">
          <p className="text-base italic text-gray-600">
            Alone, each technology is incremental. Together, they&apos;re
            transformational.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
