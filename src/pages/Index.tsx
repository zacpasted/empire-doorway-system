import { useRef } from "react";
import HeroSection from "@/components/sections/HeroSection";
import ProblemsWeSolveSection from "@/components/sections/ProblemsWeSolveSection";
import AuthoritySection from "@/components/sections/AuthoritySection";
import WhyDifferentSection from "@/components/sections/WhyDifferentSection";
import MarketTeardownSection from "@/components/sections/MarketTeardownSection";
import WhatItIsSection from "@/components/sections/WhatItIsSection";
import WhoThisIsForSection from "@/components/sections/WhoThisIsForSection";
import WhatYouGetSection from "@/components/sections/WhatYouGetSection";
import WhyPastedSection from "@/components/sections/WhyPastedSection";
import FoundersLetterSection from "@/components/sections/FoundersLetterSection";
import DisqualificationSection from "@/components/sections/DisqualificationSection";
import CompetitiveComparisonSection from "@/components/sections/CompetitiveComparisonSection";
import ClientLogosSection from "@/components/sections/ClientLogosSection";
import BrandsShowcaseSection from "@/components/sections/BrandsShowcaseSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import OutcomeSection from "@/components/sections/OutcomeSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import SectionDivider from "@/components/sections/SectionDivider";
import Footer from "@/components/Footer";

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background">
      <title>Associate to Empire™ by PASTED | Personal Brand System for Dentists</title>
      
      <HeroSection />
      <ProblemsWeSolveSection />
      <AuthoritySection />
      <SectionDivider text="Authority compounds earlier than income." />
      <WhyDifferentSection />
      <MarketTeardownSection />
      <SectionDivider text="Brand is leverage, not decoration." />
      <WhatItIsSection />
      <WhoThisIsForSection />
      <WhatYouGetSection />
      <SectionDivider text="Waiting is the most expensive strategy in dentistry." />
      <CompetitiveComparisonSection />
      <DisqualificationSection />
      <WhyPastedSection />
      <FoundersLetterSection />
      <ClientLogosSection />
      <BrandsShowcaseSection />
      <TestimonialsSection />
      <SectionDivider text="The market rewards clarity, not effort." />
      <OutcomeSection />
      <FinalCTASection onApplyClick={scrollToForm} />
      <Footer />
    </main>
  );
};

export default Index;
