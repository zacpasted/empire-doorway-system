import { useRef, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import StickyHeader from "@/components/StickyHeader";
import MobileFloatingCTA from "@/components/MobileFloatingCTA";
import LeadMagnetPopup from "@/components/LeadMagnetPopup";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSolutionSection from "@/components/sections/ProblemSolutionSection";
import Footer from "@/components/Footer";

// Lazy load below-the-fold sections for faster initial page load
const WhatWeDoSection = lazy(() => import("@/components/sections/WhatWeDoSection"));
const FoundersPhilosophySection = lazy(() => import("@/components/sections/FoundersPhilosophySection"));
const TheTruthSection = lazy(() => import("@/components/sections/TheTruthSection"));
const AdCaseStudiesSection = lazy(() => import("@/components/sections/AdCaseStudiesSection"));
const TakeItSection = lazy(() => import("@/components/sections/TakeItSection"));
const TransformationNarrativesSection = lazy(() => import("@/components/sections/TransformationNarrativesSection"));
const TheGapSection = lazy(() => import("@/components/sections/TheGapSection"));
const BrandsShowcaseSection = lazy(() => import("@/components/sections/BrandsShowcaseSection"));
const VideoCarouselSection = lazy(() => import("@/components/sections/VideoCarouselSection"));
const CTABannerSection = lazy(() => import("@/components/sections/CTABannerSection"));
const TestimonialsSection = lazy(() => import("@/components/sections/TestimonialsSection"));
const ProofSection = lazy(() => import("@/components/sections/ProofSection"));
const MemberCardsCarousel = lazy(() => import("@/components/sections/MemberCardsCarousel"));
const WhyPathsFailSection = lazy(() => import("@/components/sections/WhyPathsFailSection"));
const CommunitySection = lazy(() => import("@/components/sections/CommunitySection"));
const FilterSection = lazy(() => import("@/components/sections/FilterSection"));
const HowItWorksSection = lazy(() => import("@/components/sections/HowItWorksSection"));
const MonthlyDeliverablesSection = lazy(() => import("@/components/sections/MonthlyDeliverablesSection"));
const WhatYouReceiveSection = lazy(() => import("@/components/sections/WhatYouReceiveSection"));
const WhatWeAskSection = lazy(() => import("@/components/sections/WhatWeAskSection"));
const OutcomeSection = lazy(() => import("@/components/sections/OutcomeSection"));
const FoundersVibeSection = lazy(() => import("@/components/sections/FoundersVibeSection"));
const PrivateAdvisorySection = lazy(() => import("@/components/sections/PrivateAdvisorySection"));
const ClosingCTASection = lazy(() => import("@/components/sections/ClosingCTASection"));
const FinalCTASection = lazy(() => import("@/components/sections/FinalCTASection"));
const FAQSection = lazy(() => import("@/components/sections/FAQSection"));
const WistiaVideoEmbedSection = lazy(() => import("@/components/sections/WistiaVideoEmbedSection"));
const TransformationSection = lazy(() => import("@/components/sections/TransformationSection"));
const ProgramDeliverablesSection = lazy(() => import("@/components/sections/ProgramDeliverablesSection"));

// Minimal loading placeholder for lazy sections
const SectionLoader = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
  </div>
);

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
    document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth' });
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
      <LeadMagnetPopup />
      
      {/* Hero - Cinematic Entry with VSL + Logos + Form - NOT lazy loaded */}
      <HeroSection />
      
      {/* Problem / Solution - Immediately below hero, not lazy loaded */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <ProblemSolutionSection />
      </motion.div>
      
      {/* All sections below are lazy loaded */}
      <Suspense fallback={<SectionLoader />}>
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
          <PrivateAdvisorySection videoId="qb6sa5q4g8" onApplyClick={scrollToForm} />
        </motion.div>
      </Suspense>
      
      <Footer />
      <MobileFloatingCTA />
    </motion.main>
  );
};

export default Index;
