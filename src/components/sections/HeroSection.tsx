import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import VideoPlayer from "@/components/VideoPlayer";
import LogoMarquee from "@/components/sections/hero/LogoMarquee";
import MetricsBar from "@/components/sections/hero/MetricsBar";
import ServiceTicker from "@/components/sections/hero/ServiceTicker";

import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textureY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const handleMobileCTA = () => {
    trackCTAClick({ ctaId: 'hero-instant-cta', ctaText: 'Apply for Partnership', section: 'hero-above-fold' });
    document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen py-6 md:py-24 overflow-hidden">
      {/* Parallax background layers */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/20"
        style={{ y: backgroundY }}
      />
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          y: textureY,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10 max-w-5xl mx-auto px-4">
        {/* Primary Headline */}
        <motion.div className="text-center mb-3 md:mb-8" style={{ opacity }}>
          <div className="flex flex-col items-center mb-2 md:mb-6">
            <span className="font-display text-base md:text-lg tracking-[0.15em] uppercase text-foreground">
              PASTED
            </span>
            <span className="text-[8px] md:text-[9px] tracking-[0.4em] uppercase text-muted-foreground/50 mt-0.5 font-sans">
              Private Growth Partnership
            </span>
          </div>

          <h1 className="font-serif text-foreground mb-2 md:mb-5 leading-[1.1] tracking-[-0.01em]">
            <span className="block text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold">
              The gap between your clinical standard and your market position is costing you the practice you've already earned.
            </span>
            <motion.span
              className="block text-base sm:text-xl md:text-2xl lg:text-3xl font-light italic text-muted-foreground/80 mt-1 md:mt-2"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="not-italic font-medium text-foreground">PASTED</span> is your operating and accountability partner — the <span className="text-primary not-italic">authors of your arc</span>. Brand, content, ads, and patient conversion, built and run in-house, so you can do the dentistry you became a dentist for at the level you've always been capable of.
            </motion.span>
          </h1>

          {/* Community significance line */}
          <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-muted-foreground/50 mb-2">
            The dentists you already follow built their practices through this partnership.
          </p>

          {/* Social proof names */}
          <div className="flex items-center justify-center gap-1.5 text-[10px] md:text-xs text-muted-foreground/60 mb-3 flex-wrap">
            <span>Trusted by</span>
            <span className="text-primary font-semibold">Dr. Drew Ballard</span>
            <span>·</span>
            <span className="text-primary font-semibold">Dr. Jon Marashi</span>
            <span>·</span>
            <span className="text-primary font-semibold">Dr. Brian Harris</span>
            <span>·</span>
            <span className="text-primary font-semibold">Dr. Alan Clarke</span>
            <span>·</span>
            <span className="text-primary font-semibold">+ more</span>
            <span>·</span>
            <span>97% retention</span>
          </div>

          {/* CTA button */}
          <div className="mb-3">
            <button
              onClick={handleMobileCTA}
              className="w-full md:w-auto md:px-12 py-3 bg-primary text-primary-foreground text-sm font-medium tracking-[0.15em] uppercase rounded-sm transition-all duration-200 active:scale-[0.98]"
            >
              Apply for Partnership →
            </button>
            <p className="text-[9px] md:text-xs text-muted-foreground/40 mt-1.5 tracking-wide">
              30 practices per year · Reviewed within 48 hours · Not all accepted
            </p>
          </div>

        </motion.div>

        {/* Logo Marquee */}
        <LogoMarquee />

        {/* Metrics Bar */}
        <div className="mb-4 md:mb-10">
          <MetricsBar />
        </div>

        {/* VSL Video */}
        <div className="mb-3 md:mb-8">
          <VideoPlayer />
        </div>

        {/* Service Ticker */}
        <ServiceTicker />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-foreground/30 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
