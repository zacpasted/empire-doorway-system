import { useRef, lazy, Suspense, memo } from "react";
import { motion } from "framer-motion";
import StickyHeader from "@/components/StickyHeader";
import MobileFloatingCTA from "@/components/MobileFloatingCTA";
import LeadMagnetPopup from "@/components/LeadMagnetPopup";
import HeroSection from "@/components/sections/HeroSection";
import Footer from "@/components/Footer";
import InlineTestimonial from "@/components/sections/InlineTestimonial";

// Player card images for inline testimonials
import jonMarashiCard from "@/assets/cards/jon-marashi.jpeg";
import drewBallardCard from "@/assets/cards/drew-ballard.jpeg";
import serenaWongCard from "@/assets/cards/serena-wong.jpeg";
import beauMurpheyCard from "@/assets/cards/beau-murphey.jpeg";
import kooperRuminerCard from "@/assets/cards/kooper-ruminer.jpeg";
import gageLidderCard from "@/assets/cards/gage-lidder.jpeg";

// Lazy load below-the-fold sections
const ProblemSolutionSection = lazy(() => import("@/components/sections/ProblemSolutionSection"));
const WhatWeDoSection = lazy(() => import("@/components/sections/WhatWeDoSection"));
const CredibilitySection = lazy(() => import("@/components/sections/CredibilitySection"));
const PartnershipPhilosophySection = lazy(() => import("@/components/sections/PartnershipPhilosophySection"));
const OrganicPaidSection = lazy(() => import("@/components/sections/OrganicPaidSection"));
const ConversionSystemsSection = lazy(() => import("@/components/sections/ConversionSystemsSection"));
const DreamLifeSection = lazy(() => import("@/components/sections/DreamLifeSection"));
const AccessStatusSection = lazy(() => import("@/components/sections/AccessStatusSection"));
const AuthorityStatementSection = lazy(() => import("@/components/sections/AuthorityStatementSection"));
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
const WhyPathsFailSection = lazy(() => import("@/components/sections/WhyPathsFailSection"));
const CommunitySection = lazy(() => import("@/components/sections/CommunitySection"));
const FilterSection = lazy(() => import("@/components/sections/FilterSection"));
const HowItWorksSection = lazy(() => import("@/components/sections/HowItWorksSection"));
const MonthlyDeliverablesSection = lazy(() => import("@/components/sections/MonthlyDeliverablesSection"));
const WhatYouReceiveSection = lazy(() => import("@/components/sections/WhatYouReceiveSection"));
const WhatWeAskSection = lazy(() => import("@/components/sections/WhatWeAskSection"));
const FoundersVibeSection = lazy(() => import("@/components/sections/FoundersVibeSection"));
const PrivateAdvisorySection = lazy(() => import("@/components/sections/PrivateAdvisorySection"));
const ClosingCTASection = lazy(() => import("@/components/sections/ClosingCTASection"));
const TransformationSection = lazy(() => import("@/components/sections/TransformationSection"));
const ProgramDeliverablesSection = lazy(() => import("@/components/sections/ProgramDeliverablesSection"));
const WistiaVideoEmbedSection = lazy(() => import("@/components/sections/WistiaVideoEmbedSection"));
const JournalSection = lazy(() => import("@/components/sections/JournalSection"));
const MembershipSection = lazy(() => import("@/components/sections/MembershipSection"));

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
      <title>PASTED Partnership | $500K–$1M+ Growth for Aesthetic Dentists</title>
      
      <StickyHeader onApplyClick={scrollToForm} />
      <LeadMagnetPopup />
      
      {/* 1. Hero - Cinematic Entry with VSL + Calendly */}
      <HeroSection />
      
      <Suspense fallback={<SectionLoader />}>
        {/* 2. Philosophy — Problem / Solution */}
        <AnimatedSection><ProblemSolutionSection /></AnimatedSection>
        
        {/* 3. Credibility — Track Record */}
        <AnimatedSection><CredibilitySection /></AnimatedSection>

        {/* ── Inline Testimonial #1 — After credibility, reinforce with celebrity voice */}
        <InlineTestimonial
          name="Dr. Jon Marashi"
          role="Celebrity Dentist, Los Angeles, CA"
          quote="At this level, brand is not optional. It is fundamental. Zac and Alan understand this better than anyone I've worked with. Their taste, restraint, and execution are elite. If you are serious about building a real brand—one that lasts—I would not work with anyone else."
          cardImage={jonMarashiCard}
          variant="accent"
        />
        
        {/* 4. What We Do — The Complete System */}
        <AnimatedSection><WhatWeDoSection /></AnimatedSection>
        
        {/* 5. Video Carousel — Content Examples */}
        <AnimatedSection><VideoCarouselSection /></AnimatedSection>
        
        {/* 6. CTA Banner */}
        <AnimatedSection><CTABannerSection /></AnimatedSection>
        
        {/* 7. Testimonials — Full Section */}
        <AnimatedSection><TestimonialsSection onApplyClick={scrollToForm} /></AnimatedSection>
        
        {/* 8. Partnership Philosophy — Why True Partnership */}
        <AnimatedSection><PartnershipPhilosophySection /></AnimatedSection>

        {/* ── Inline Testimonial #2 — After partnership philosophy, prove the model */}
        <InlineTestimonial
          name="Dr. Drew Ballard"
          role="Celebrity Dentist, Phoenix, AZ · Founder, Halo Veneers & Halo Education"
          quote="Halo did not scale by accident. The growth, the positioning, the clarity—it all came from a rock-solid foundation. Zac and Alan saw the vision early, protected it, and helped turn it into something far greater than I could have built alone."
          cardImage={drewBallardCard}
        />
        
        {/* 9. Organic + Paid — One System */}
        <AnimatedSection><OrganicPaidSection /></AnimatedSection>
        
        {/* 10. Conversion Systems — Differentiation */}
        <AnimatedSection><ConversionSystemsSection /></AnimatedSection>

        {/* ── Inline Testimonial #3 — After conversion systems, show real results */}
        <InlineTestimonial
          name="Dr. Beau Murphey"
          role="Cosmetic Dentist, Ridgeland, MS"
          quote="I was genuinely scared of content. I avoided it for years. Nothing ever worked, and it always felt uncomfortable. This is the first time content felt natural—and the first time it actually worked. That completely changed my outlook and my results."
          cardImage={beauMurpheyCard}
          variant="minimal"
        />
        
        {/* 10.5. Access + Status — Proximity to the Top */}
        <AnimatedSection><AccessStatusSection /></AnimatedSection>
        
        {/* 11. The Gap — Pattern Interrupt */}
        <AnimatedSection><TheGapSection /></AnimatedSection>
        
        {/* 12. Brands Showcase — Social Proof */}
        <AnimatedSection><BrandsShowcaseSection onApplyClick={scrollToForm} /></AnimatedSection>
        
        {/* 13. Founders Philosophy */}
        <AnimatedSection><FoundersPhilosophySection /></AnimatedSection>

        {/* ── Inline Testimonial #4 — After founders philosophy, reinforce trust */}
        <InlineTestimonial
          name="Dr. Serena Wong"
          role="Cosmetic Dentist & Owner, Ottawa, ON"
          quote="They gave me the confidence to tell my story in a way that feels authentic and aligned with who I am. I am very selective about what I put my name behind, and their work stands out for its intention, professionalism, creativity and attention to detail."
          cardImage={serenaWongCard}
          variant="accent"
        />
        
        {/* 14. The Truth — Hard Stats */}
        <AnimatedSection><TheTruthSection /></AnimatedSection>
        
        {/* 15. Content Examples — Wistia Videos */}
        <AnimatedSection>
          <WistiaVideoEmbedSection 
            title="How We Build Category-Leading Practices — And Why Most Never Break Through"
            subtitle="Every piece is scripted, shot, and edited by our in-house team on location — then deployed as both organic storytelling and high-performing ad creative."
            videoIds={["yie608dzl7", "4hs6xrb5ku", "s91a43lnqr", "8vygnsrycv", "6mg4oi3z42", "lrt1tuadco", "2r987luzuk", "nvo7tlonj5", "e8y5ss5hu9", "00u7mh4ze8"]}
          />
        </AnimatedSection>
        
        {/* 16. Take It — Editorial CTA */}
        <AnimatedSection><TakeItSection onApplyClick={scrollToForm} /></AnimatedSection>
        
        {/* 17. Transformation Narratives — Case Studies */}
        <AnimatedSection><TransformationNarrativesSection /></AnimatedSection>

        {/* ── Inline Testimonial #5 — After case studies, ground-level proof */}
        <InlineTestimonial
          name="Dr. Kooper Ruminer"
          role="Associate & Practice Owner, Oklahoma City, OK"
          quote="I've built practices from the ground up, and I can say with absolute certainty—doing this without Zac and Alan would have taken years longer and cost far more mistakes. They remove confusion while preserving ambition. That alone is invaluable."
          cardImage={kooperRuminerCard}
        />
        
        {/* 18. Ad Case Studies with Metrics */}
        <AnimatedSection><AdCaseStudiesSection /></AnimatedSection>
        
        {/* 19. Authority Statement */}
        <AnimatedSection><AuthorityStatementSection /></AnimatedSection>
        
        {/* 20. Dream Life Philosophy */}
        <AnimatedSection><DreamLifeSection /></AnimatedSection>
        
        {/* 21. Why Paths Fail — Diagnostic */}
        <AnimatedSection><WhyPathsFailSection /></AnimatedSection>
        
        {/* 22. Community */}
        <AnimatedSection>
          <CommunitySection videoIds={["m70jgeiyir", "bhqnyc3yny", "r5lr03rr8t", "ibpxi0nzpq", "n3qopd7sum", "ggjvdzq6aq", "j5dqiq664l"]} />
        </AnimatedSection>
        
        {/* 23. The Gate — Filter */}
        <AnimatedSection><FilterSection /></AnimatedSection>
        
        {/* 24. How It Works — The PASTED Process */}
        <AnimatedSection><HowItWorksSection /></AnimatedSection>
        
        {/* 25. Monthly Deliverables */}
        <AnimatedSection><MonthlyDeliverablesSection /></AnimatedSection>
        
        {/* 26. What We Ask — Trust Builder */}
        <AnimatedSection><WhatWeAskSection /></AnimatedSection>
        
        {/* 27. What You Receive */}
        <AnimatedSection><WhatYouReceiveSection /></AnimatedSection>

        {/* ── Inline Testimonial #6 — Before final CTA, one last trust anchor */}
        <InlineTestimonial
          name="Dr. Gage Lidder"
          role="Associate, London"
          quote="Pasted took that pressure off my shoulders. They helped me translate who I am in the clinic into a clear, authentic personal brand the world can actually see. It finally feels like my online presence matches the standard of my work."
          cardImage={gageLidderCard}
          variant="accent"
        />
        
        {/* 28. Take It — Second CTA */}
        <AnimatedSection><TakeItSection onApplyClick={scrollToForm} /></AnimatedSection>
        
        {/* 29. Transformation — Before/After */}
        <AnimatedSection><TransformationSection /></AnimatedSection>
        
        {/* 30. Program & Pricing */}
        <AnimatedSection><ProgramDeliverablesSection onApplyClick={scrollToForm} /></AnimatedSection>
        
        {/* 31. Closing CTA */}
        <AnimatedSection><ClosingCTASection /></AnimatedSection>
        
        {/* 32. Founders Vibe */}
        <AnimatedSection><FoundersVibeSection /></AnimatedSection>
        
        {/* 33. PASTED Studio — Bespoke Service */}
        <AnimatedSection><PrivateAdvisorySection videoId="qb6sa5q4g8" onApplyClick={scrollToForm} /></AnimatedSection>
        
        {/* 34. Journal — Newsletter Signup */}
        <AnimatedSection><JournalSection /></AnimatedSection>
        
        {/* 35. Membership — Waitlist */}
        <AnimatedSection><MembershipSection /></AnimatedSection>
      </Suspense>
      
      <Footer />
      <MobileFloatingCTA />
    </motion.main>
  );
};

export default Index;
