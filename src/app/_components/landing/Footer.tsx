"use client";

import Image from "next/image";
import Link from "next/link";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const QUICK_LINKS = [
  { label: "Provider Journey", id: "choose-your-path" },
  { label: "Pharma Journey", id: "choose-your-path" },
  { label: "Health System Journey", id: "choose-your-path" },
  { label: "Tech Partner Journey", id: "choose-your-path" },
] as const;

export function Footer() {
  return (
    <footer
      className="bg-vs-dark-gray px-6 py-12 text-gray-300 md:py-16"
      role="contentinfo"
    >
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
        {/* Left: Logo + tagline */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-vs-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-vs-dark-gray">
            <Image
              src="/images/logos/VSDP Logo.png"
              alt="Vision Source Digital Platform"
              width={160}
              height={36}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <p className="text-sm">
            Transforming Optometry Through Living Intelligence
          </p>
        </div>

        {/* Center: Quick links */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <button
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className="text-sm hover:text-vs-yellow focus:outline-none focus-visible:underline focus-visible:decoration-vs-yellow"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Contact & legal */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
            Contact & Legal
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                type="button"
                onClick={() => scrollToSection("cta")}
                className="hover:text-vs-yellow focus:outline-none focus-visible:underline focus-visible:decoration-vs-yellow"
              >
                Request Information
              </button>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-vs-yellow focus:outline-none focus-visible:underline focus-visible:decoration-vs-yellow"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-vs-yellow focus:outline-none focus-visible:underline focus-visible:decoration-vs-yellow"
              >
                Terms of Use
              </Link>
            </li>
            <li className="pt-4 text-gray-400">
              © 2026 Vision Source
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
