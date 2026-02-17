"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const HERO_IMAGES_LEFT = [
  { src: "/images/heroes/Multiple images to review.png", alt: "Multiple images to review", x: "5%", y: "10%", rotate: -4 },
  { src: "/images/heroes/OCT scans.png", alt: "OCT scans", x: "35%", y: "5%", rotate: 2 },
  { src: "/images/heroes/Poor Charting.png", alt: "Poor charting notes", x: "15%", y: "45%", rotate: 3 },
  { src: "/images/heroes/Confusing EHR Screens.png", alt: "Confusing EHR screens", x: "45%", y: "40%", rotate: -2 },
  { src: "/images/heroes/Visual Fields.png", alt: "Visual field images", x: "25%", y: "70%", rotate: 1 },
] as const;

const LEFT_DURATION_MS = 5000;
const TRANSITION_DURATION_MS = 2000;

type Phase = "left" | "transition" | "right";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function HeroSection() {
  const [phase, setPhase] = useState<Phase>("left");
  const [showHeadline, setShowHeadline] = useState(false);
  const [redFlash, setRedFlash] = useState(false);

  const advancePhase = useCallback(() => {
    setPhase((p) => {
      if (p === "left") return "transition";
      if (p === "transition") return "right";
      return p; // stay on right
    });
  }, []);

  useEffect(() => {
    if (phase === "left") {
      const t = setTimeout(advancePhase, LEFT_DURATION_MS);
      return () => clearTimeout(t);
    }
    if (phase === "transition") {
      const t = setTimeout(advancePhase, TRANSITION_DURATION_MS);
      return () => clearTimeout(t);
    }
    // right: no timeout, stay forever
  }, [phase, advancePhase]);

  useEffect(() => {
    if (phase === "right" && !showHeadline) setShowHeadline(true);
  }, [phase, showHeadline]);

  useEffect(() => {
    const interval = setInterval(() => setRedFlash((f) => !f), 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] overflow-hidden bg-gray-100 lg:min-h-[90vh]"
      aria-label="Hero - The problem we solve"
    >
      {/* Full-width hero area: left images first, then right fades in on top */}
      <div className="relative h-full min-h-[85vh] w-full lg:min-h-[90vh]">
        {/* Layer 1: Left (current state) - full width, phases out after 5s */}
        <AnimatePresence mode="wait">
          {phase === "left" && (
            <motion.div
              key="left"
              className="absolute inset-0 flex items-center justify-center bg-gray-200/80 p-4 lg:p-8"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: TRANSITION_DURATION_MS / 1000 }}
            >
              <div className="relative h-full w-full">
                {/* Scattered browser windows - full width spread */}
                {HERO_IMAGES_LEFT.map((img, i) => (
                  <motion.div
                    key={img.alt}
                    className="absolute overflow-hidden rounded-lg border-2 bg-white shadow-xl"
                    style={{
                      left: img.x,
                      top: img.y,
                      width: "clamp(140px, 18vw, 280px)",
                      transform: `rotate(${img.rotate}deg)`,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      borderColor: redFlash ? "#D32F2F" : "rgba(0,0,0,0.2)",
                    }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    <div className="relative aspect-video w-full">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="280px"
                      />
                    </div>
                  </motion.div>
                ))}
                {/* Frustrated doctor silhouette - right of center to avoid covering content */}
                <div className="absolute left-[68%] top-1/2 z-10 w-40 -translate-x-1/2 -translate-y-1/2 lg:w-52">
                  <Image
                    src="/images/heroes/frustrated doctor.svg"
                    alt="Practitioner silhouette - frustrated"
                    width={208}
                    height={208}
                    className="h-auto w-full object-contain"
                  />
                </div>
                {/* Overlay text */}
                <motion.p
                  className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center text-lg font-medium text-gray-800 drop-shadow-sm lg:text-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  &ldquo;Where is the information I need?&rdquo;
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Layer 2: Right (VSDP state) - full width, fades in on top after transition */}
        <AnimatePresence>
          {(phase === "right" || phase === "transition") && (
            <motion.div
              key="right"
              className="absolute inset-0 flex items-center justify-center bg-gray-50 p-4 lg:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: TRANSITION_DURATION_MS / 1000,
              }}
            >
              <div className="relative h-full w-full">
                {/* Unified Digital Twin - full width */}
                <div className="relative mx-auto max-h-[70vh] w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                  <div className="relative aspect-video w-full">
                    <Image
                      src="/images/heroes/DigitalTwin_Visualization.png"
                      alt="Unified digital twin interface with patient at center and data streams"
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                  {/* Alert overlays */}
                  <div className="absolute left-4 right-4 top-4 flex flex-col gap-2">
                    <span className="rounded bg-clinical-alert/90 px-3 py-1.5 text-xs font-medium text-white">
                      Risk of Diabetic retinopathy progression detected
                    </span>
                    <span className="rounded bg-vsdp-electric/90 px-3 py-1.5 text-xs font-medium text-white">
                      Intervention recommended: 3-month window
                    </span>
                  </div>
                </div>
                {/* Happy doctor silhouette - far right to avoid covering CTA and text */}
                <div className="absolute bottom-4 right-4 z-0 w-24 lg:right-8 lg:w-32">
                  <Image
                    src="/images/heroes/Happy doctor.svg"
                    alt="Practitioner silhouette - confident"
                    width={144}
                    height={144}
                    className="h-auto w-full object-contain"
                  />
                </div>
                {!showHeadline && (
                  <motion.p
                    className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center text-lg font-medium text-gray-800 lg:text-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase === "right" ? 1 : 0 }}
                    transition={{ delay: phase === "right" ? 0.2 : 0 }}
                  >
                    &ldquo;Everything I need to know, when I need to know it&rdquo;
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Headline and CTAs - appear after first cycle */}
      <AnimatePresence>
        {showHeadline && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-4 bg-linear-to-t from-white via-white/95 to-transparent px-6 pb-12 pt-24 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl lg:leading-14">
              What if you never had to hunt for patient information again?
            </h1>
            <p className="max-w-2xl text-base text-gray-600 md:text-lg">
              Vision Source Digital Platform transforms optometry from episodic
              guesswork to continuous, personalized care through Living
              Intelligence.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToSection("choose-your-path")}
                className="rounded-lg bg-vs-yellow px-8 py-4 text-base font-semibold text-gray-900 shadow-md transition-all hover:bg-[#E6B325] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-vs-yellow focus-visible:ring-offset-2 active:scale-[0.98]"
              >
                Experience the Future of Eye Care
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("living-intelligence")}
                className="text-base font-medium text-gray-600 underline decoration-2 underline-offset-2 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-vs-yellow"
              >
                What is Living Intelligence?
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
