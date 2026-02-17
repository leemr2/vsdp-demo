import { CTASection } from "@/app/_components/landing/CTASection";
import { CopilotButton } from "@/app/_components/landing/CopilotButton";
import { Footer } from "@/app/_components/landing/Footer";
import { Header } from "@/app/_components/landing/Header";
import { HeroSection } from "@/app/_components/landing/HeroSection";
import { ImplementationRoadmap } from "@/app/_components/landing/ImplementationRoadmap";
import { LivingIntelligence } from "@/app/_components/landing/LivingIntelligence";
import { PlatformVision } from "@/app/_components/landing/PlatformVision";
import { StakeholderPathways } from "@/app/_components/landing/StakeholderPathways";
import { TransformationSlider } from "@/app/_components/landing/TransformationSlider";
import { TrustSection } from "@/app/_components/landing/TrustSection";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-vs-yellow focus:px-4 focus:py-2 focus:text-gray-900 focus:outline-none"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <HeroSection />
        <LivingIntelligence />
        <TransformationSlider />
        <StakeholderPathways />
        <PlatformVision />
        <ImplementationRoadmap />
        <TrustSection />
        <CTASection />
      </main>
      <Footer />
      <CopilotButton />
    </>
  );
}
