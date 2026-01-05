import { useRef } from "react";
import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/sections/HeroSection";
import EnemySection from "@/components/sections/EnemySection";
import WhatThisIsSection from "@/components/sections/WhatThisIsSection";
import MemberCardsCarousel from "@/components/sections/MemberCardsCarousel";
import VideoCarouselSection from "@/components/sections/VideoCarouselSection";
import BrandsShowcaseSection from "@/components/sections/BrandsShowcaseSection";
import ClientLogosSection from "@/components/sections/ClientLogosSection";
import ProofSection from "@/components/sections/ProofSection";
import AdCaseStudiesSection from "@/components/sections/AdCaseStudiesSection";
import TransformationSection from "@/components/sections/TransformationSection";
import ProgramDeliverablesSection from "@/components/sections/ProgramDeliverablesSection";
import FilterSection from "@/components/sections/FilterSection";
import ClosingCTASection from "@/components/sections/ClosingCTASection";
import PrivateAdvisorySection from "@/components/sections/PrivateAdvisorySection";
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
      
      {/* The Enemy - Manifesto Block */}
      <EnemySection />
      
      {/* What This Is - Clarity */}
      <WhatThisIsSection />
      
      {/* Social Proof - Member Cards */}
      <MemberCardsCarousel />
      
      {/* Social Proof - Video Examples */}
      <VideoCarouselSection />
      
      {/* Social Proof - Brand Examples */}
      <BrandsShowcaseSection onApplyClick={scrollToForm} />
      
      {/* Brands That Trust Us - Logo Carousel */}
      <ClientLogosSection onApplyClick={scrollToForm} />
      
      {/* Proof of Authority - Stats */}
      <ProofSection />
      
      {/* Case Studies with Metrics */}
      <AdCaseStudiesSection />
      
      {/* Transformation - Before/After */}
      <TransformationSection />
      
      {/* Program & Pricing */}
      <ProgramDeliverablesSection onApplyClick={scrollToForm} />
      
      {/* The Gate - Filter */}
      <FilterSection />
      
      {/* Closing CTA */}
      <ClosingCTASection />
      
      {/* Private Advisory - Brief Bottom Section */}
      <PrivateAdvisorySection />
      
      <Footer />
    </main>
  );
};

export default Index;
