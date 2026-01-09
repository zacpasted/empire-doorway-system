import { useRef } from "react";
import { motion } from "framer-motion";
import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSolutionSection from "@/components/sections/ProblemSolutionSection";
import WhatWeDoSection from "@/components/sections/WhatWeDoSection";
import TheGapSection from "@/components/sections/TheGapSection";
import WhyPathsFailSection from "@/components/sections/WhyPathsFailSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import WhatWeAskSection from "@/components/sections/WhatWeAskSection";
import WhatYouReceiveSection from "@/components/sections/WhatYouReceiveSection";

import TransformationSection from "@/components/sections/TransformationSection";
import MemberCardsCarousel from "@/components/sections/MemberCardsCarousel";
import VideoCarouselSection from "@/components/sections/VideoCarouselSection";
import BrandsShowcaseSection from "@/components/sections/BrandsShowcaseSection";
import ProofSection from "@/components/sections/ProofSection";
import AdCaseStudiesSection from "@/components/sections/AdCaseStudiesSection";
import ProgramDeliverablesSection from "@/components/sections/ProgramDeliverablesSection";
import MonthlyDeliverablesSection from "@/components/sections/MonthlyDeliverablesSection";
import FilterSection from "@/components/sections/FilterSection";
import FoundersPhilosophySection from "@/components/sections/FoundersPhilosophySection";
import ClosingCTASection from "@/components/sections/ClosingCTASection";
import PrivateAdvisorySection from "@/components/sections/PrivateAdvisorySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import WistiaVideoEmbedSection from "@/components/sections/WistiaVideoEmbedSection";
import TheTruthSection from "@/components/sections/TheTruthSection";
import TransformationNarrativesSection from "@/components/sections/TransformationNarrativesSection";
import TakeItSection from "@/components/sections/TakeItSection";
import CTABannerSection from "@/components/sections/CTABannerSection";
import CommunitySection from "@/components/sections/CommunitySection";
import FoundersVibeSection from "@/components/sections/FoundersVibeSection";
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
      
      {/* Problem / Solution - Below VSL */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <ProblemSolutionSection />
      </motion.div>
      
      {/* What We Do - Services Overview */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <WhatWeDoSection />
      </motion.div>
      
      {/* Social Proof - Video Carousel (A2E Content) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <VideoCarouselSection />
      </motion.div>
      
      {/* CTA Banner - Above Testimonials */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <CTABannerSection />
      </motion.div>
      
      
      {/* Testimonials */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <TestimonialsSection onApplyClick={scrollToForm} />
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
      
      {/* Social Proof - Brand Examples */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <BrandsShowcaseSection onApplyClick={scrollToForm} />
      </motion.div>
      
      {/* Founders Philosophy - Passion & Confidence */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <FoundersPhilosophySection />
      </motion.div>
      
      {/* The Truth - Hard Stats */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <TheTruthSection />
      </motion.div>
      
      {/* Content Examples - Before Case Studies */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <WistiaVideoEmbedSection 
          title="If Your Content Looks Like Everyone Else's, You Lose."
          subtitle="Chosen brands don't guess. We script, edit, and distribute everything for you."
          videoIds={["yie608dzl7", "4hs6xrb5ku", "s91a43lnqr", "8vygnsrycv", "6mg4oi3z42", "lrt1tuadco", "2r987luzuk", "nvo7tlonj5", "e8y5ss5hu9", "00u7mh4ze8"]}
        />
      </motion.div>
      
      {/* Take It - Editorial CTA */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <TakeItSection onApplyClick={scrollToForm} />
      </motion.div>
      
      {/* Transformation Narratives - Case Studies */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <TransformationNarrativesSection />
      </motion.div>
      
      {/* Case Studies with Metrics - Under "When positioning is right, everything else follows" */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <AdCaseStudiesSection />
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
      
      {/* Community - The Network */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <CommunitySection videoIds={["m70jgeiyir", "bhqnyc3yny", "r5lr03rr8t", "ibpxi0nzpq", "n3qopd7sum", "ggjvdzq6aq", "j5dqiq664l"]} />
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
      
      {/* How It Works - Process Overview */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <HowItWorksSection />
      </motion.div>
      
      {/* Monthly Retainer Breakdown - What's Included Every Month */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <MonthlyDeliverablesSection />
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
      
      
      {/* Take It - Editorial CTA */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <TakeItSection onApplyClick={scrollToForm} />
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
      
      
      
      {/* Closing CTA */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <ClosingCTASection />
      </motion.div>
      
      {/* Founders Vibe - Zac & Alan */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <FoundersVibeSection />
      </motion.div>
      
      {/* Pasted Studio - Bespoke Service Level */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <PrivateAdvisorySection videoId="nh7ancshfq" onApplyClick={scrollToForm} />
      </motion.div>
      
      <Footer />
    </motion.main>
  );
};

export default Index;
