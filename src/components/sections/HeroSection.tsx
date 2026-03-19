import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import VideoPlayer from "@/components/VideoPlayer";
import LogoMarquee from "@/components/sections/hero/LogoMarquee";
import MetricsBar from "@/components/sections/hero/MetricsBar";
import ServiceTicker from "@/components/sections/hero/ServiceTicker";
import CalendlySection from "@/components/sections/hero/CalendlySection";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textureY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-10 md:py-24 overflow-hidden">
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
        <motion.div className="text-center mb-4 md:mb-8" style={{ opacity }}>
          <div className="flex flex-col items-center mb-3 md:mb-6">
            <span className="font-display text-base md:text-lg tracking-[0.15em] uppercase text-foreground">
              PASTED
            </span>
            <span className="text-[8px] md:text-[9px] tracking-[0.4em] uppercase text-muted-foreground/50 mt-0.5 font-sans">
              Private Growth Partnership
            </span>
          </div>

          <h1 className="font-serif text-foreground mb-3 md:mb-5 leading-[1.1] tracking-[-0.01em]">
            <span className="block text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold">
              Where Aesthetic Dentistry's
            </span>
            <span className="block text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold">
              Leading Practices Are Built
            </span>
            <motion.span
              className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-light italic text-muted-foreground/80 mt-2"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              $500K–$1M+ in Annual Growth. The Practice You Actually Want.
            </motion.span>
          </h1>

          <p className="hidden md:block text-sm sm:text-base md:text-lg text-muted-foreground/70 max-w-2xl mx-auto leading-relaxed font-sans font-light tracking-wide">
            PASTED is the private, in-house growth infrastructure trusted by elite cosmetic dentists — combining execution, positioning, and direct access to the highest level of the industry.
          </p>
          <p className="hidden md:block text-xs text-muted-foreground/50 mt-2 tracking-wide italic">
            Built from real data across the world's top-performing aesthetic practices.
          </p>
          <p className="hidden md:block text-xs text-muted-foreground/40 mt-1 tracking-wide">
            30 practices per year. Carefully selected.
          </p>
        </motion.div>

        {/* Logo Marquee - Above VSL */}
        <LogoMarquee />

        {/* VSL Video */}
        <div className="mb-4 md:mb-8">
          <VideoPlayer />
        </div>

        {/* Metrics Bar */}
        <div className="mb-5 md:mb-10">
          <MetricsBar />
        </div>

        {/* Service Ticker - Above Calendly */}
        <ServiceTicker />

        {/* Application Section - Calendly Embed */}
        <CalendlySection />

        {/* Secondary Statement - Below Form */}
        <div className="text-center mt-14 space-y-1 md:space-y-2" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-foreground/30 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
