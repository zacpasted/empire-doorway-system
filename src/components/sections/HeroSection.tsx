import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import VideoPlayer from "@/components/VideoPlayer";
import LogoMarquee from "@/components/sections/hero/LogoMarquee";
import MetricsBar from "@/components/sections/hero/MetricsBar";
import ServiceTicker from "@/components/sections/hero/ServiceTicker";
import { useIsMobile } from "@/hooks/use-mobile";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const wordStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const wordChild = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textureY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const handleCTA = () => {
    trackCTAClick({ ctaId: "hero-instant-cta", ctaText: "Apply for Partnership", section: "hero-above-fold" });
    document.getElementById("eligibility-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  if (isMobile) {
    return (
      <section ref={sectionRef} className="relative overflow-hidden pt-6 pb-0">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 40% 40% at 80% 80%, rgba(185,146,79,0.04) 0%, transparent 60%),
              radial-gradient(ellipse 80% 60% at 50% 0%, rgba(185,146,79,0.06) 0%, transparent 70%),
              #0A0A0A
            `,
          }}
        />

        <div className="container relative z-10 max-w-5xl mx-auto px-4">
          {/* Element 1 — Wordmark */}
          <div className="flex flex-col items-center mb-3">
            <span className="font-display text-[16px] tracking-[0.15em] uppercase" style={{ color: '#F5F0E8' }}>
              PASTED
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase mt-0.5 font-sans" style={{ color: 'rgba(245,240,232,0.4)' }}>
              Where Ordinary Ends
            </span>
          </div>

          {/* Element 2 — Credential strip */}
          <p className="text-[9px] tracking-[0.2em] uppercase font-sans text-center mb-5" style={{ color: 'rgba(185,146,79,0.65)' }}>
            $1M+ Avg. Growth · 97% Retention
          </p>

          {/* Element 3 — H1 (THE DOMINANT ELEMENT) */}
          <h1
            className="font-serif font-bold text-center uppercase mb-2"
            style={{
              fontSize: '52px',
              lineHeight: '1.0',
              letterSpacing: '-0.02em',
            }}
          >
            <span className="block" style={{ color: '#F5F0E8' }}>THE PRACTICE</span>
            <span className="block text-primary">YOU WANT.</span>
            <span className="block" style={{ color: '#F5F0E8' }}>BUILT BY THE TEAM</span>
            <span className="block text-primary">BEHIND THE BEST.</span>
          </h1>

          {/* Element 4 — Subheadline */}
          <p
            className="font-serif italic text-center mx-auto max-w-[300px]"
            style={{
              fontSize: '15px',
              color: 'rgba(245,240,232,0.55)',
              marginBottom: '24px',
            }}
          >
            Built by the team behind the best clinics in the world.
          </p>

          {/* Element 5 — CTA button */}
          <button
            onClick={handleCTA}
            className="w-full bg-primary text-primary-foreground font-sans uppercase tracking-[0.2em] rounded-sm transition-all duration-200 active:scale-[0.98]"
            style={{ height: '54px', fontSize: '12px' }}
          >
            Apply for Partnership →
          </button>

          {/* Element 6 — Microcopy */}
          <p className="text-[10px] text-center mt-2.5 tracking-wide" style={{ color: 'rgba(245,240,232,0.35)', marginBottom: '32px' }}>
            Reviewed within 48 hours · Strategic fit required · Not all accepted
          </p>

          {/* Below fold: Metrics → Logos → Video → Ticker */}
          <div className="mb-4 mt-2">
            <MetricsBar />
          </div>
          <LogoMarquee />
          <div className="mb-3">
            <VideoPlayer />
          </div>
          <ServiceTicker />
        </div>
      </section>
    );
  }

  // === DESKTOP ===
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-4 pb-8 md:pt-[calc(var(--hero-desktop-pt,6rem)-20px)] md:pb-24 md:min-h-screen"
    >
      {/* Background layers */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: backgroundY,
          background: `
            radial-gradient(ellipse 40% 40% at 80% 80%, rgba(185,146,79,0.04) 0%, transparent 60%),
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(185,146,79,0.06) 0%, transparent 70%),
            #0A0A0A
          `,
        }}
      />
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          y: textureY,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10 max-w-5xl mx-auto px-4">
        <motion.div className="text-center mb-8" style={{ opacity }}>
          {/* Wordmark */}
          <div className="flex flex-col items-center mb-3">
            <span className="font-display text-lg tracking-[0.15em] uppercase" style={{ color: '#F5F0E8' }}>
              PASTED
            </span>
            <span className="text-[9px] tracking-[0.4em] uppercase mt-0.5 font-sans" style={{ color: 'rgba(245,240,232,0.4)' }}>
              Where Ordinary Ends
            </span>
          </div>

          {/* Credential bar */}
          <p className="text-[11px] tracking-[0.2em] uppercase font-sans mb-4" style={{ color: 'rgba(185,146,79,0.7)' }}>
            $1M+ Avg. Annual Growth · 97% Retention · Custom Operating Partner
          </p>

          {/* H1 — 72px desktop */}
          <h1
            className="font-serif font-bold mb-5 uppercase"
            style={{
              fontSize: '72px',
              lineHeight: '1.05',
              letterSpacing: '-0.02em',
              color: '#F5F0E8',
            }}
          >
            <motion.span className="block" variants={wordStagger} initial="hidden" animate="visible">
              <motion.span className="block" variants={wordChild}>THE PRACTICE <span className="text-primary">YOU WANT.</span></motion.span>
              <motion.span className="block" variants={wordChild}>BUILT BY THE TEAM</motion.span>
              <motion.span className="block" variants={wordChild}>BEHIND <span className="text-primary">THE BEST.</span></motion.span>
            </motion.span>
          </h1>

          {/* Community significance + names */}
          <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(245,240,232,0.4)' }}>
            The dentists you already follow chose PASTED.
          </p>
          <div className="flex items-center justify-center gap-1.5 text-xs mb-3 flex-wrap" style={{ color: 'rgba(245,240,232,0.5)' }}>
            <span className="text-primary font-semibold">Dr. Jon Marashi</span>
            <span>·</span>
            <span className="text-primary font-semibold">Dr. Brian Harris</span>
            <span>·</span>
            <span className="text-primary font-semibold">Dr. Marshall Hanson</span>
            <span>·</span>
            <span className="text-primary font-semibold">Dr. Drew Ballard</span>
            <span>·</span>
            <span>97% retention</span>
          </div>

          {/* CTA */}
          <div>
            <button
              onClick={handleCTA}
              className="md:px-12 py-3 bg-primary text-primary-foreground font-sans uppercase rounded-sm transition-all duration-200 active:scale-[0.98]"
              style={{ fontSize: '13px', letterSpacing: '0.2em' }}
            >
              Apply for Partnership →
            </button>
            <p className="text-xs mt-2 tracking-wide" style={{ color: 'rgba(245,240,232,0.35)' }}>
              Reviewed within 48 hours · Strategic fit required · Not all accepted
            </p>

            {/* Subheadline */}
            <p className="font-serif italic mt-4 max-w-md mx-auto leading-relaxed text-center" style={{ fontSize: '20px', color: 'rgba(245,240,232,0.55)' }}>
              We handle everything outside the chair. Most partners add $500K–$1M+ in aesthetic production annually — while working fewer hours on the business, and more hours on the dentistry they love.
            </p>

            {/* Brian Harris quote */}
            <p className="text-sm italic mt-3 max-w-md mx-auto leading-relaxed" style={{ color: 'rgba(245,240,232,0.4)' }}>
              "If a doctor asks who they should trust with their brand, practice growth, systems, demand… all of the questions every provider has; Pasted is the only answer."
              <span className="block not-italic font-normal mt-0.5" style={{ color: 'rgba(245,240,232,0.3)' }}>
                — Dr. Brian Harris
              </span>
            </p>
          </div>
        </motion.div>

        {/* Metrics Bar */}
        <div className="mb-10">
          <MetricsBar />
        </div>

        {/* Logo Marquee */}
        <LogoMarquee />

        {/* VSL Video */}
        <div className="mb-8">
          <VideoPlayer />
        </div>

        {/* Service Ticker */}
        <ServiceTicker />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div
          className="w-px h-16"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(185,146,79,0.5), transparent)",
            animation: "scroll-pulse 2s ease-out forwards",
          }}
        />
        <style>{`
          @keyframes scroll-pulse {
            0% { opacity: 0; transform: scaleY(0.5); }
            30% { opacity: 1; transform: scaleY(1); }
            70% { opacity: 1; transform: scaleY(1); }
            100% { opacity: 0; transform: scaleY(1); }
          }
        `}</style>
      </div>
    </section>
  );
};

export default HeroSection;
