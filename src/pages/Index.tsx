import { useRef } from "react";
import HeroSection from "@/components/sections/HeroSection";
import WhatItIsSection from "@/components/sections/WhatItIsSection";
import WhoThisIsForSection from "@/components/sections/WhoThisIsForSection";
import WhatYouGetSection from "@/components/sections/WhatYouGetSection";
import WhyPastedSection from "@/components/sections/WhyPastedSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BrandsShowcaseSection from "@/components/sections/BrandsShowcaseSection";
import OutcomeSection from "@/components/sections/OutcomeSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import Footer from "@/components/Footer";

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* SEO Meta - would be in head via react-helmet in production */}
      <title>Associate to Empire™ by PASTED | Personal Brand System for Dentists</title>
      
      <HeroSection />
      <WhatItIsSection />
      <WhoThisIsForSection />
      <WhatYouGetSection />
      <WhyPastedSection />
      <BrandsShowcaseSection />
      <TestimonialsSection />
      <OutcomeSection />
      <FinalCTASection onApplyClick={scrollToForm} />
      <Footer />
    </main>
  );
};

export default Index;
