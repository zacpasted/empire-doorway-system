import { useRef } from "react";
import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/sections/HeroSection";
import EnemySection from "@/components/sections/EnemySection";
import WhatThisIsSection from "@/components/sections/WhatThisIsSection";
import MemberCardsCarousel from "@/components/sections/MemberCardsCarousel";
import ProofSection from "@/components/sections/ProofSection";
import TransformationSection from "@/components/sections/TransformationSection";
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
      
      {/* Hero - Cinematic Entry */}
      <HeroSection />
      
      {/* The Enemy - Manifesto Block */}
      <EnemySection />
      
      {/* Social Proof - Member Cards */}
      <MemberCardsCarousel />
      
      {/* What This Is - Clarity */}
      <WhatThisIsSection />
      
      {/* Proof of Authority */}
      <ProofSection />
      
      {/* Transformation - Before/After */}
      <TransformationSection />
      
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
