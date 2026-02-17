"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

const NAV_LINKS = [
  { label: "Living Intelligence", id: "living-intelligence" },
  { label: "Choose Your Path", id: "choose-your-path" },
  { label: "Implementation", id: "implementation" },
  { label: "About", id: "trust" },
] as const;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth" });
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = useCallback((id: string) => {
    setMobileOpen(false);
    scrollToSection(id);
  }, []);

  return (
    <header className="sticky top-0 z-50 h-[72px] bg-vs-dark-gray px-6">
      <nav
        className="mx-auto flex h-full max-w-7xl items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-vs-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-vs-dark-gray"
          aria-label="VSDP Home"
        >
          <Image
            src="/images/logos/VSDP Logo.png"
            alt="Vision Source Digital Platform"
            width={180}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              type="button"
              onClick={() => handleNavClick(id)}
              className="text-base font-medium text-white transition-colors hover:text-vs-yellow focus:outline-none focus-visible:underline focus-visible:underline-offset-2 focus-visible:decoration-2 focus-visible:decoration-vs-yellow"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Request Demo - Desktop */}
        <div className="hidden md:block">
          <button
            type="button"
            onClick={() => handleNavClick("choose-your-path")}
            className="rounded-lg bg-vs-yellow px-6 py-3 text-base font-semibold text-gray-900 transition-transform hover:bg-[#E6B325] focus:outline-none focus-visible:ring-2 focus-visible:ring-vs-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-vs-dark-gray active:scale-[0.98]"
          >
            Request Demo
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-vs-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-vs-dark-gray md:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="absolute left-0 right-0 top-[72px] bg-vs-dark-gray shadow-lg md:hidden"
          role="dialog"
          aria-label="Mobile menu"
        >
          <div className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleNavClick(id)}
                className="rounded-lg px-4 py-3 text-left text-base font-medium text-white hover:bg-white/10 hover:text-vs-yellow focus:outline-none focus-visible:bg-white/10 focus-visible:text-vs-yellow"
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleNavClick("choose-your-path")}
              className="mt-2 rounded-lg bg-vs-yellow px-4 py-3 text-center text-base font-semibold text-gray-900"
            >
              Request Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
