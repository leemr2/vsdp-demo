import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/app/_components/landing/Header";
import { Footer } from "@/app/_components/landing/Footer";

type ComingSoonPageProps = {
  title: string;
};

export function ComingSoonPage({ title }: ComingSoonPageProps) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-vs-yellow focus:px-4 focus:py-2 focus:text-gray-900 focus:outline-none"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="min-h-[60vh] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            {title}
          </h1>
          <p className="mb-10 text-xl font-medium text-vsdp-blue-primary">
            Coming soon
          </p>
          <p className="mb-10 text-gray-600">
            This journey is under development. We&apos;re building an immersive
            experience to show how VSDP transforms your world.
          </p>
          <Link
            href="/#choose-your-path"
            className="inline-flex items-center gap-2 rounded-lg bg-vs-yellow px-5 py-3 font-semibold text-gray-900 transition-colors hover:bg-vs-yellow/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-vs-yellow focus-visible:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to journeys
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
