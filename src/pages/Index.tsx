import { lazy, Suspense, memo } from "react";
import { motion } from "framer-motion";
import StickyHeader from "@/components/StickyHeader";
import StickyBookingTab from "@/components/StickyBookingTab";
import MobileFloatingCTA from "@/components/MobileFloatingCTA";
import HeroSection from "@/components/sections/HeroSection";
import PartnerRosterTicker from "@/components/sections/PartnerRosterTicker";
import Footer from "@/components/Footer";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load below-the-fold sections
const AuthoritySection = lazy(() => import("@/components/sections/AuthoritySection"));
const CalendlySection = lazy(() => import("@/components/sections/hero/CalendlySection"));
const VideoTestimonialsSection = lazy(() => import("@/components/sections/VideoTestimonialsSection"));
const FourTestimonialsSection = lazy(() => import("@/components/sections/FourTestimonialsSection"));
const TheOfferSection = lazy(() => import("@/components/sections/TheOfferSection"));
const FourStepsSection = lazy(() => import("@/components/sections/FourStepsSection"));
const BrandsShowcaseSection = lazy(() => import("@/components/sections/BrandsShowcaseSection"));
const ResultsSection = lazy(() => import("@/components/sections/ResultsSection"));
const WistiaVideoEmbedSection = lazy(() => import("@/components/sections/WistiaVideoEmbedSection"));
const SelectivitySection = lazy(() => import("@/components/sections/SelectivitySection"));
const AdCaseStudiesSection = lazy(() => import("@/components/sections/AdCaseStudiesSection"));
const ClosingCTASection = lazy(() => import("@/components/sections/ClosingCTASection"));

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
  const isMobile = useIsMobile();

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
      <StickyBookingTab />
      
      {/* 1. Hero */}
      <HeroSection />
      
      {/* 2. Social Proof Ticker */}
      <PartnerRosterTicker />
      
      <Suspense fallback={<SectionLoader />}>
        {/* Authority */}
        <AnimatedSection><AuthoritySection /></AnimatedSection>
        
        {/* Calendly — desktop only (mobile has it in the hero) */}
        {!isMobile && <CalendlySection />}
        
        {/* 5. Video Testimonials */}
        <AnimatedSection>
          <VideoTestimonialsSection
            videoIds={["5ue7wlj8b6", "af7m87juf2", "wqd6gdwzc8"]}
            title="Hear it directly."
            subtitle="Unscripted. From dentists who've been through it."
          />
        </AnimatedSection>
        
        {/* 6. Written Testimonials + CTA */}
        <AnimatedSection><FourTestimonialsSection /></AnimatedSection>
        
        {/* Divider: Written Testimonials → The Offer */}
        <div className="section-divider" />
        
        {/* 7. The Offer */}
        <AnimatedSection><TheOfferSection /></AnimatedSection>
        
        {/* 8. How It Works (condensed) */}
        <AnimatedSection><FourStepsSection /></AnimatedSection>

        {/* Divider: How It Works → Brands Showcase */}
        <div className="section-divider" />
        
        {/* 9. Brands Showcase */}
        <AnimatedSection><BrandsShowcaseSection /></AnimatedSection>
        
        {/* 10. Results */}
        <AnimatedSection><ResultsSection /></AnimatedSection>

        {/* Divider: Results → Content Examples */}
        <div className="section-divider" />
        
        {/* 11. Content Examples */}
        <AnimatedSection>
          <WistiaVideoEmbedSection 
            title="Scripted. Shot. Edited. Deployed."
            subtitle="Every asset below was produced by our in-house team and deployed as both organic content and paid ad creative. One team. No handoffs."
            videoIds={["yie608dzl7", "4hs6xrb5ku", "s91a43lnqr", "8vygnsrycv", "6mg4oi3z42", "lrt1tuadco", "2r987luzuk", "nvo7tlonj5", "e8y5ss5hu9", "00u7mh4ze8"]}
            initialVisibleCount={3}
          />
        </AnimatedSection>
        
        {/* 12. Selectivity */}
        <AnimatedSection><SelectivitySection /></AnimatedSection>
        
        {/* 13. Ad Case Studies */}
        <AnimatedSection><AdCaseStudiesSection /></AnimatedSection>
        
        {/* 14. Closing CTA */}
        <AnimatedSection><ClosingCTASection /></AnimatedSection>
      </Suspense>
      
      {/* 15. Footer */}
      <Footer />
      <MobileFloatingCTA />
      <ScrollDepthTracker />
    </motion.main>
  );
};

export default Index;
