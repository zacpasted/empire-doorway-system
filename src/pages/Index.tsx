import { useRef } from "react";
import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/sections/HeroSection";
import TheGapSection from "@/components/sections/TheGapSection";
import WhyPathsFailSection from "@/components/sections/WhyPathsFailSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import WhatWeAskSection from "@/components/sections/WhatWeAskSection";
import WhatYouReceiveSection from "@/components/sections/WhatYouReceiveSection";
import TheLongGameSection from "@/components/sections/TheLongGameSection";
import TransformationSection from "@/components/sections/TransformationSection";
import MemberCardsCarousel from "@/components/sections/MemberCardsCarousel";
import VideoCarouselSection from "@/components/sections/VideoCarouselSection";
import BrandsShowcaseSection from "@/components/sections/BrandsShowcaseSection";
import ClientLogosSection from "@/components/sections/ClientLogosSection";
import ProofSection from "@/components/sections/ProofSection";
import AdCaseStudiesSection from "@/components/sections/AdCaseStudiesSection";
import ProgramDeliverablesSection from "@/components/sections/ProgramDeliverablesSection";
import FilterSection from "@/components/sections/FilterSection";
import ClosingCTASection from "@/components/sections/ClosingCTASection";
import PrivateAdvisorySection from "@/components/sections/PrivateAdvisorySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <title>Associate to Empire™ by PASTED | Personal Brand System for Dentists</title>
      
      <StickyHeader onApplyClick={scrollToForm} />
      
      {/* Hero - Cinematic Entry with VSL */}
      <HeroSection />
      
      {/* The Gap - Pain Section */}
      <TheGapSection />
      
      {/* Social Proof - Video Testimonials */}
      <VideoCarouselSection />
      
      {/* Case Studies with Metrics */}
      <AdCaseStudiesSection />
      
      {/* Proof of Authority - Stats */}
      <ProofSection />
      
      {/* Social Proof - Member Cards */}
      <MemberCardsCarousel />
      
      {/* Social Proof - Brand Examples */}
      <BrandsShowcaseSection onApplyClick={scrollToForm} />
      
      {/* Brands That Trust Us - Logo Carousel */}
      <ClientLogosSection onApplyClick={scrollToForm} />
      
      {/* Why Paths Fail - Diagnostic */}
      <WhyPathsFailSection />
      
      {/* How It Works - Process Overview */}
      <HowItWorksSection />
      
      {/* What We Ask - Trust Builder */}
      <WhatWeAskSection />
      
      {/* What You Receive - Delivery */}
      <WhatYouReceiveSection />
      
      {/* The Long Game - Trajectory */}
      <TheLongGameSection />
      
      {/* Transformation - Before/After */}
      <TransformationSection />
      
      {/* Program & Pricing */}
      <ProgramDeliverablesSection onApplyClick={scrollToForm} />
      
      {/* The Gate - Filter */}
      <FilterSection />
      
      {/* Closing CTA */}
      <ClosingCTASection />
      
      {/* Testimonials */}
      <TestimonialsSection onApplyClick={scrollToForm} />
      
      {/* Private Advisory - Brief Bottom Section */}
      <PrivateAdvisorySection />
      
      <Footer />
    </main>
  );
};

export default Index;
