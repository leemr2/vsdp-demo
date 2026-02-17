"use client";

import { Shield, CheckCircle, Globe } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const TRUST_ITEMS = [
  {
    id: "privacy",
    icon: Shield,
    badge: "HIPAA Compliant",
    question: "How is patient data protected?",
    answer:
      "VSDP is HIPAA-compliant with end-to-end encryption. Patients control data sharing permissions. Research data is de-identified using privacy-preserving federated learning—algorithms learn without centralizing sensitive information.",
  },
  {
    id: "validation",
    icon: CheckCircle,
    badge: "Evidence-Based",
    question: "Is this just theoretical, or does it work?",
    answer:
      "VSDP builds on decades of clinical research in retinal imaging, OCT analysis, and ERG biomarkers. Every algorithm undergoes validation against peer-reviewed clinical standards. The digital twin framework has been proven in cardiology and diabetes management—we're applying those lessons to optometry.",
  },
  {
    id: "ecosystem",
    icon: Globe,
    badge: "Open Standards",
    question: "Will I be locked into proprietary systems?",
    answer:
      "VSDP uses open standards (FHIR, DICOM) and integrates with your existing equipment (Optos, Visionix, RetEval, etc.). You own your data. The platform enhances rather than replaces your current workflow.",
  },
] as const;

export function TrustSection() {
  return (
    <section
      id="trust"
      className="scroll-mt-[72px] bg-gray-50 py-16 md:py-24"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="mb-12 text-center">
          <h2
            id="trust-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl"
          >
            Built on a Foundation of Trust
          </h2>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.id}>
                <article className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-vsdp-electric/10 text-vsdp-electric">
                      <Icon className="h-6 w-6" aria-hidden />
                    </div>
                    <span className="text-sm font-semibold text-gray-600">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    {item.question}
                  </h3>
                  <p className="flex-1 text-base leading-relaxed text-gray-700">
                    {item.answer}
                  </p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
