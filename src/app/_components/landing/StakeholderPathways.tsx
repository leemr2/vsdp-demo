"use client";

import { Stethoscope, FlaskConical, Building2, Smartphone } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

const PATHWAYS = [
  {
    id: "providers",
    href: "/providers",
    icon: Stethoscope,
    roleLabel: "Provider",
    headline: "From Context Problem to Complete Clarity",
    preview:
      "See how VSDP integrates all your data—Imaging, OCT, Visual Fields, EHR, patient-reported outcomes—into a single unified view that predicts disease progression and personalizes interventions. Experience the digital twin for a complex diabetic patient and watch reactive care become proactive medicine.",
    tags: ["Clinical Efficiency", "Better Outcomes", "Competitive Advantage"],
    cta: "Experience Provider Transformation",
  },
  {
    id: "pharma",
    href: "/pharma",
    icon: FlaskConical,
    roleLabel: "Pharma Research",
    headline: "From Years to Months: Accelerated Drug Development",
    preview:
      "Access 30,000+ practices and millions of digital twins for unprecedented clinical trial recruitment speed and real-world efficacy tracking. Simulate how VSDP reduces trial costs by 60% while improving patient diversity and outcome measurement precision.",
    tags: ["Faster Recruitment", "Lower Costs", "Better Data Quality"],
    cta: "Explore Pharma Innovation",
  },
  {
    id: "ehr",
    href: "/ehr",
    icon: Building2,
    roleLabel: "System Integration",
    headline: "The Eye as Gateway to Systemic Health",
    preview:
      "Discover how VSDP detects systemic diseases like diabetes, hypertension, and cardiovascular conditions through retinal biomarkers—often 6+ months before traditional testing. See bidirectional data flow between specialty eye care and primary care through standard FHIR integration.",
    tags: ["Population Health", "Early Detection", "Seamless Integration"],
    cta: "See System Integration",
  },
  {
    id: "bigtech",
    href: "/bigtech",
    icon: Smartphone,
    roleLabel: "Tech opportunities",
    headline: "Beyond Healthcare: The Consumer Health Platform",
    preview:
      "Explore how VSDP's clinical validation foundation enables consumer applications impossible to build from scratch—from gamified myopia prevention to XR interfaces controlled by neural signals. Understand the path from FDA-cleared medical device to mass-market consumer platform.",
    tags: ["Massive TAM", "Clinical Validation", "Unique IP"],
    cta: "Discover Tech Opportunities",
  },
] as const;

export function StakeholderPathways() {
  return (
    <section
      id="choose-your-path"
      className="scroll-mt-[72px] bg-white py-16 md:py-24"
      aria-labelledby="pathways-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="mb-12 text-center">
          <h2
            id="pathways-heading"
            className="mb-6 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl"
          >
            Choose Your Journey: How Does VSDP Transform Your World?
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-700">
            VSDP creates value for every stakeholder in the eye care ecosystem.
            Select your role below to experience how Living Intelligence
            transforms your specific challenges into opportunities.
          </p>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2">
          {PATHWAYS.map((pathway) => {
            const Icon = pathway.icon;
            return (
              <ScrollReveal key={pathway.id}>
                <Link
                  href={pathway.href}
                  className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-vs-yellow focus-visible:ring-offset-2"
                >
                  <motion.article
                    className="flex h-full flex-col rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-md transition-shadow hover:border-gray-300 hover:shadow-xl"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-vs-yellow/20 text-vsdp-blue-primary">
                        <Icon className="h-7 w-7" aria-hidden />
                      </div>
                      <span className="text-sm font-semibold uppercase tracking-wide text-vsdp-blue-primary">
                        {pathway.roleLabel}
                      </span>
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-gray-900 group-hover:text-vsdp-blue-primary">
                      {pathway.headline}
                    </h3>
                    <p className="mb-6 flex-1 text-base leading-relaxed text-gray-700">
                      {pathway.preview}
                    </p>
                    <div className="mb-6 flex flex-wrap gap-2">
                      {pathway.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center font-semibold text-vs-yellow group-hover:underline">
                      {pathway.cta}
                      <span className="ml-1" aria-hidden>→</span>
                    </span>
                  </motion.article>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal className="mt-12 text-center">
          <p className="text-sm italic text-gray-600">
            Don&apos;t see your role? Start with &quot;Eye Care
            Providers&quot; to understand the clinical foundation that powers
            all other applications. You can explore multiple pathways—each
            journey is 3-5 minutes.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
