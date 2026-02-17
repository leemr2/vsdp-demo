"use client";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function CTASection() {
  return (
    <section
      id="cta"
      className="scroll-mt-[72px] bg-vs-dark-gray py-16 md:py-20"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2
          id="cta-heading"
          className="text-3xl font-bold tracking-tight text-white md:text-4xl"
        >
          Ready to Transform Eye Care?
        </h2>
        <p className="mt-6 text-lg text-gray-300">
          Choose your stakeholder journey above to experience how VSDP solves
          your specific challenges, or explore the Living Intelligence Copilot
          (floating chat button) to ask questions about any aspect of the
          platform.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
          <button
            type="button"
            onClick={() => scrollToSection("choose-your-path")}
            className="rounded-lg bg-vs-yellow px-8 py-4 text-base font-semibold text-gray-900 shadow-lg transition-all hover:bg-[#E6B325] focus:outline-none focus-visible:ring-2 focus-visible:ring-vs-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-vs-dark-gray active:scale-[0.98]"
          >
            Start Your Journey
          </button>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
            <button
              type="button"
              className="text-gray-300 underline decoration-2 underline-offset-2 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-vs-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-vs-dark-gray"
              onClick={() => {
                /* TODO: Lead capture form modal */
              }}
            >
              Request Pilot Program Information
            </button>
            <button
              type="button"
              className="text-gray-300 underline decoration-2 underline-offset-2 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-vs-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-vs-dark-gray"
              onClick={() => {
                /* TODO: PDF download */
              }}
            >
              Download Technical Whitepaper
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
