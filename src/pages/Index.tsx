import { useRef, lazy, Suspense, memo } from "react";
import { motion } from "framer-motion";
import StickyHeader from "@/components/StickyHeader";
import MobileFloatingCTA from "@/components/MobileFloatingCTA";
import HeroSection from "@/components/sections/HeroSection";
import PartnerRosterTicker from "@/components/sections/PartnerRosterTicker";
import Footer from "@/components/Footer";

// Lazy load below-the-fold sections
const TheOfferSection = lazy(() => import("@/components/sections/TheOfferSection"));
const ResultsSection = lazy(() => import("@/components/sections/ResultsSection"));
const FourTestimonialsSection = lazy(() => import("@/components/sections/FourTestimonialsSection"));
const FourStepsSection = lazy(() => import("@/components/sections/FourStepsSection"));
const DeliverablesSection = lazy(() => import("@/components/sections/DeliverablesSection"));
const SelectivitySection = lazy(() => import("@/components/sections/SelectivitySection"));
const ClosingCTASection = lazy(() => import("@/components/sections/ClosingCTASection"));
const CalendlySection = lazy(() => import("@/components/sections/hero/CalendlySection"));

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
        {/* 3. The Offer */}
        <AnimatedSection><TheOfferSection /></AnimatedSection>
        
        {/* 4. Results */}
        <AnimatedSection><ResultsSection /></AnimatedSection>
        
        {/* 5. Testimonials */}
        <AnimatedSection><FourTestimonialsSection /></AnimatedSection>
        
        {/* 6. How It Works */}
        <AnimatedSection><FourStepsSection /></AnimatedSection>
        
        {/* 7. What You Get */}
        <AnimatedSection><DeliverablesSection /></AnimatedSection>
        
        {/* 8. Who It's For / Not For */}
        <AnimatedSection><SelectivitySection /></AnimatedSection>
        
        {/* 9. Closing CTA */}
        <AnimatedSection><ClosingCTASection /></AnimatedSection>

        {/* Eligibility Form — CTA target */}
        <CalendlySection />
      </Suspense>
      
      {/* 10. Footer */}
      <Footer />
      <MobileFloatingCTA />
    </motion.main>
  );
};

export default Index;
