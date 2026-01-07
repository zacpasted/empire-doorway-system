import { useRef } from "react";
import { motion } from "framer-motion";
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
import ProofSection from "@/components/sections/ProofSection";
import AdCaseStudiesSection from "@/components/sections/AdCaseStudiesSection";
import ProgramDeliverablesSection from "@/components/sections/ProgramDeliverablesSection";
import MonthlyDeliverablesSection from "@/components/sections/MonthlyDeliverablesSection";
import FilterSection from "@/components/sections/FilterSection";
import ClosingCTASection from "@/components/sections/ClosingCTASection";
import PrivateAdvisorySection from "@/components/sections/PrivateAdvisorySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import Footer from "@/components/Footer";

const sectionVariants = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.main 
      className="min-h-screen bg-background text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <title>Associate to Empire™ by PASTED | Personal Brand System for Dentists</title>
      
      <StickyHeader onApplyClick={scrollToForm} />
      
      {/* Hero - Cinematic Entry with VSL + Logos + Form */}
      <HeroSection />
      
      {/* Testimonials */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <TestimonialsSection onApplyClick={scrollToForm} />
      </motion.div>
      
      {/* Social Proof - Video Testimonials */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <VideoCarouselSection />
      </motion.div>
      
      {/* The Gap - Pain Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <TheGapSection />
      </motion.div>
      
      {/* Case Studies with Metrics */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <AdCaseStudiesSection />
      </motion.div>
      
      {/* Proof of Authority - Stats */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <ProofSection />
      </motion.div>
      
      {/* Social Proof - Member Cards */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <MemberCardsCarousel />
      </motion.div>
      
      {/* Social Proof - Brand Examples */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <BrandsShowcaseSection onApplyClick={scrollToForm} />
      </motion.div>
      
      {/* Why Paths Fail - Diagnostic */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <WhyPathsFailSection />
      </motion.div>
      
      {/* How It Works - Process Overview */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <HowItWorksSection />
      </motion.div>
      
      {/* What We Ask - Trust Builder */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <WhatWeAskSection />
      </motion.div>
      
      {/* What You Receive - Delivery */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <WhatYouReceiveSection />
      </motion.div>
      
      {/* The Long Game - Trajectory */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <TheLongGameSection />
      </motion.div>
      
      {/* Transformation - Before/After */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <TransformationSection />
      </motion.div>
      
      {/* Program & Pricing */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <ProgramDeliverablesSection onApplyClick={scrollToForm} />
      </motion.div>
      
      {/* Monthly Retainer Breakdown */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <MonthlyDeliverablesSection />
      </motion.div>
      
      {/* The Gate - Filter */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <FilterSection />
      </motion.div>
      
      {/* Closing CTA */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <ClosingCTASection />
      </motion.div>
      
      {/* Private Advisory - Brief Bottom Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <PrivateAdvisorySection />
      </motion.div>
      
      <Footer />
    </motion.main>
  );
};

export default Index;
