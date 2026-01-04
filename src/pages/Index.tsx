import { useRef } from "react";
import HeroSection from "@/components/sections/HeroSection";
import WhyPastedExistsSection from "@/components/sections/WhyPastedExistsSection";
import WhatWeStandAgainstSection from "@/components/sections/WhatWeStandAgainstSection";
import FoundersLetterSection from "@/components/sections/FoundersLetterSection";
import TalentedDentistSection from "@/components/sections/TalentedDentistSection";
import WhatWeWillNeverDoSection from "@/components/sections/WhatWeWillNeverDoSection";
import ThePromiseSection from "@/components/sections/ThePromiseSection";
import FoundersRoleSection from "@/components/sections/FoundersRoleSection";
import WhoThisIsForSection from "@/components/sections/WhoThisIsForSection";
import MarketContextSection from "@/components/sections/MarketContextSection";
import PrivateAdvisorySection from "@/components/sections/PrivateAdvisorySection";
import ProgramDeliverablesSection from "@/components/sections/ProgramDeliverablesSection";
import ClientLogosSection from "@/components/sections/ClientLogosSection";
import BrandsShowcaseSection from "@/components/sections/BrandsShowcaseSection";
import VideoCarouselSection from "@/components/sections/VideoCarouselSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import SectionDivider from "@/components/sections/SectionDivider";
import FinalCTASection from "@/components/sections/FinalCTASection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/Footer";
import StickyHeader from "@/components/StickyHeader";

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background">
      <title>Associate to Empire™ by PASTED | Personal Brand System for Dentists</title>
      
      <StickyHeader onApplyClick={scrollToForm} />
      
      <HeroSection />
      <ClientLogosSection onApplyClick={scrollToForm} />
      
      {/* Problem & Agitation */}
      <TalentedDentistSection />
      <MarketContextSection />
      
      {/* Solution & Differentiation */}
      <WhyPastedExistsSection />
      <WhatWeStandAgainstSection />
      <ThePromiseSection />
      
      <SectionDivider text="The operating system for aesthetic dentists who refuse to be anonymous." />
      
      {/* Social Proof */}
      <VideoCarouselSection />
      <BrandsShowcaseSection onApplyClick={scrollToForm} />
      <TestimonialsSection onApplyClick={scrollToForm} />
      
      {/* Qualification & Mechanism */}
      <WhoThisIsForSection />
      <PrivateAdvisorySection />
      <ProgramDeliverablesSection onApplyClick={scrollToForm} />
      
      <SectionDivider text="We will never monetise your insecurity. We build confidence by amplifying your existing excellence." />
      
      {/* Trust & Authority */}
      <FoundersRoleSection />
      <FoundersLetterSection />
      <WhatWeWillNeverDoSection />
      
      {/* Close */}
      <FAQSection />
      <FinalCTASection onApplyClick={scrollToForm} />
      <Footer />
    </main>
  );
};

export default Index;