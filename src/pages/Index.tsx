import { useRef, lazy, Suspense, memo } from "react";
import { motion } from "framer-motion";
import StickyHeader from "@/components/StickyHeader";
import MobileFloatingCTA from "@/components/MobileFloatingCTA";
import HeroSection from "@/components/sections/HeroSection";
import PartnerRosterTicker from "@/components/sections/PartnerRosterTicker";
import Footer from "@/components/Footer";

// Lazy load below-the-fold sections
const AuthoritySection = lazy(() => import("@/components/sections/AuthoritySection"));
const TheOfferSection = lazy(() => import("@/components/sections/TheOfferSection"));
const CostOfAlternativesSection = lazy(() => import("@/components/sections/CostOfAlternativesSection"));
const BrandsShowcaseSection = lazy(() => import("@/components/sections/BrandsShowcaseSection"));
const ResultsSection = lazy(() => import("@/components/sections/ResultsSection"));
const VideoTestimonialsSection = lazy(() => import("@/components/sections/VideoTestimonialsSection"));
const FourTestimonialsSection = lazy(() => import("@/components/sections/FourTestimonialsSection"));
const FourStepsSection = lazy(() => import("@/components/sections/FourStepsSection"));
const WistiaVideoEmbedSection = lazy(() => import("@/components/sections/WistiaVideoEmbedSection"));
const DeliverablesSection = lazy(() => import("@/components/sections/DeliverablesSection"));
const SelectivitySection = lazy(() => import("@/components/sections/SelectivitySection"));
const AdCaseStudiesSection = lazy(() => import("@/components/sections/AdCaseStudiesSection"));
const ClosingCTASection = lazy(() => import("@/components/sections/ClosingCTASection"));
const CalendlySection = lazy(() => import("@/components/sections/hero/CalendlySection"));
const MidPageCalendlySection = lazy(() => import("@/components/sections/MidPageCalendlySection"));

const SectionLoader = memo(() => (
  <div className="min-h-[100px] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
  </div>
));
SectionLoader.displayName = 'SectionLoader';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
};

const AnimatedSection = memo(({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={sectionVariants}
  >
    {children}
  </motion.div>
));
AnimatedSection.displayName = 'AnimatedSection';

const Index = () => {
  const scrollToForm = () => {
    document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <motion.main 
      className="min-h-screen bg-background text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <title>PASTED Partnership | $500K–$1M+ Growth for Aesthetic Dentists</title>
      
      <StickyHeader onApplyClick={scrollToForm} />
      
      {/* 1. Hero */}
      <HeroSection />
      
      {/* 2. Social Proof Ticker */}
      <PartnerRosterTicker />
      
      <Suspense fallback={<SectionLoader />}>
        {/* 3. Authority */}
        <AnimatedSection><AuthoritySection /></AnimatedSection>
        
        {/* 4. The Offer */}
        <AnimatedSection><TheOfferSection /></AnimatedSection>
        
        {/* 5. Cost of Everything Else */}
        <AnimatedSection><CostOfAlternativesSection /></AnimatedSection>
        
        {/* 6. Selectivity (Who It's For / Not For) */}
        <AnimatedSection><SelectivitySection /></AnimatedSection>
        
        {/* 7. Brands Showcase */}
        <AnimatedSection><BrandsShowcaseSection /></AnimatedSection>
        
        {/* 8. Results */}
        <AnimatedSection><ResultsSection /></AnimatedSection>
        
        {/* 9. Video Testimonials */}
        <AnimatedSection>
          <VideoTestimonialsSection
            videoIds={["5ue7wlj8b6", "af7m87juf2", "wqd6gdwzc8"]}
            title="In their own words."
            subtitle="Unscripted. Unedited. From dentists who've been through it."
          />
        </AnimatedSection>
        
        {/* 10. Written Testimonials */}
        <AnimatedSection><FourTestimonialsSection /></AnimatedSection>
        
        {/* 11. How It Works */}
        <AnimatedSection><FourStepsSection /></AnimatedSection>
        
        {/* 12. Content Examples / Work Carousel */}
        <AnimatedSection>
          <WistiaVideoEmbedSection 
            title="Scripted. Shot. Edited. Deployed. Every piece is ours."
            subtitle="Every asset below was scripted, shot on-location, edited, and deployed by our in-house team. The same content that builds authority organically becomes the creative that drives paid acquisition. One team. No handoffs."
            videoIds={["yie608dzl7", "4hs6xrb5ku", "s91a43lnqr", "8vygnsrycv", "6mg4oi3z42", "lrt1tuadco", "2r987luzuk", "nvo7tlonj5", "e8y5ss5hu9", "00u7mh4ze8"]}
          />
        </AnimatedSection>
        
        {/* 13. What You Get */}
        <AnimatedSection><DeliverablesSection /></AnimatedSection>
        
        {/* 14. Ad Case Studies */}
        <AnimatedSection><AdCaseStudiesSection /></AnimatedSection>
        
        {/* 15. Closing CTA */}
        <AnimatedSection><ClosingCTASection /></AnimatedSection>

        {/* Calendly Booking — CTA target */}
        <CalendlySection />
      </Suspense>
      
      {/* 14. Footer */}
      <Footer />
      <MobileFloatingCTA />
    </motion.main>
  );
};

export default Index;
