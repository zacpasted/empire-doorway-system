import { useRef } from "react";
import pastedWordmark from "@/assets/pasted-logo-wordmark.png";
import pastedEmblem from "@/assets/pasted-logo-emblem.png";
import { motion, useScroll, useTransform } from "framer-motion";
import VideoPlayer from "@/components/VideoPlayer";
import LogoMarquee from "@/components/sections/hero/LogoMarquee";
import MetricsBar from "@/components/sections/hero/MetricsBar";
import ServiceTicker from "@/components/sections/hero/ServiceTicker";
import { useIsMobile } from "@/hooks/use-mobile";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const wordStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const wordChild = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: APPLE_EASE },
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
    trackCTAClick({ ctaId: "hero-instant-cta", ctaText: "Book Discovery Call", section: "hero-above-fold" });
    document.getElementById("eligibility-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const heroBg = `
    radial-gradient(ellipse 80% 60% at 50% -10%, rgba(185,146,79,0.07) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 90% 90%, rgba(185,146,79,0.04) 0%, transparent 50%),
    radial-gradient(ellipse 30% 50% at 10% 60%, rgba(185,146,79,0.03) 0%, transparent 50%),
    #0A0906
  `;

  if (isMobile) {
    return (
      <section ref={sectionRef} className="relative overflow-hidden pt-6 pb-0">
        <div className="absolute inset-0" style={{ background: heroBg }} />

        <div className="container relative z-10 max-w-5xl mx-auto px-4">
          {/* Brand wordmark */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <img src={pastedWordmark} alt="Pasted" className="h-7" />
            <div className="w-px h-5 bg-primary/30" />
            <img src={pastedEmblem} alt="Pasted emblem" className="h-7" />
          </div>

          {/* H1 */}
          <h1
            className="font-serif font-bold text-center uppercase mb-2"
            style={{
              fontSize: '44px',
              lineHeight: '1.0',
              letterSpacing: '-0.02em',
              color: 'var(--color-text)',
            }}
          >
            <span className="block">THE PRACTICE</span>
            <span className="block text-primary">YOU WANT.</span>
            <span className="block">BUILT BY THE TEAM</span>
            <span className="block">BEHIND THE BEST</span>
            <span className="block">DENTISTS <span className="text-primary">IN THE WORLD.</span></span>
          </h1>

          {/* Subheadline */}
          <p
            className="font-serif italic text-center mx-auto max-w-[340px]"
            style={{
              fontSize: '16px',
              color: 'var(--color-text-muted)',
              marginBottom: '24px',
              lineHeight: '1.3',
            }}
          >
            Brand. Content. Ads. Systems.<br />
            $100M+ generated. 41+ clinics at 8 figures.<br />
            30 spots open annually.
          </p>

          {/* CTA button — square corners */}
          <button
            onClick={handleCTA}
            className="w-full font-sans uppercase tracking-[0.2em] transition-all duration-300 active:scale-[0.98]"
            style={{
              height: '56px',
              fontSize: '12px',
              fontWeight: 500,
              background: '#B8924F',
              color: '#0A0906',
              border: 'none',
              borderRadius: '6px',
            }}
          >
            Book Discovery Call →
          </button>

          {/* Microcopy */}
          <p className="text-[10px] text-center mt-2.5 tracking-wide" style={{ color: 'var(--color-text-subtle)', marginBottom: '32px' }}>
            Reviewed within 48 hours · Strategic fit required · Not all accepted
          </p>

          {/* Below fold */}
          <div className="mb-4 mt-2"><MetricsBar /></div>
          <LogoMarquee />
          <div className="mb-3"><VideoPlayer /></div>
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
      <motion.div className="absolute inset-0" style={{ y: backgroundY, background: heroBg }} />
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          y: textureY,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10 max-w-5xl mx-auto px-4">
        {/* Brand wordmark */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: APPLE_EASE }}
        >
          <div className="flex items-center justify-center gap-4">
            <img src={pastedWordmark} alt="Pasted" className="h-9" />
            <div className="w-px h-6 bg-primary/30" />
            <img src={pastedEmblem} alt="Pasted emblem" className="h-9" />
          </div>
        </motion.div>

        <motion.div className="text-center mb-8" style={{ opacity }}>
          {/* H1 — 72px desktop */}
          <h1
            className="font-serif font-bold mb-5 uppercase"
            style={{
              fontSize: '72px',
              lineHeight: '1.0',
              letterSpacing: '-0.02em',
              color: 'var(--color-text)',
            }}
          >
            <motion.span className="block" variants={wordStagger} initial="hidden" animate="visible">
              <motion.span className="block" variants={wordChild}>THE PRACTICE <span className="text-primary">YOU WANT.</span></motion.span>
              <motion.span className="block" variants={wordChild}>BUILT BY THE TEAM</motion.span>
              <motion.span className="block" variants={wordChild}>BEHIND THE BEST DENTISTS</motion.span>
              <motion.span className="block" variants={wordChild}><span className="text-primary">IN THE WORLD.</span></motion.span>
            </motion.span>
          </h1>

          {/* Community names */}
          <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--color-text-subtle)' }}>
            The dentists you already follow chose PASTED.
          </p>
          <div className="flex items-center justify-center gap-1.5 text-xs mb-3 flex-wrap" style={{ color: 'var(--color-text-muted)' }}>
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

          {/* CTA — square corners */}
          <div>
            <button
              onClick={handleCTA}
              className="md:px-12 py-3 font-sans uppercase transition-all duration-300 active:scale-[0.98]"
              style={{
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                background: '#B8924F',
                color: '#0A0906',
                border: 'none',
                borderRadius: 0,
                padding: '18px 40px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#D4AA6A';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(185,146,79,0.25)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#B8924F';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.transform = 'none';
              }}
            >
              Book Discovery Call →
            </button>
            <p className="text-xs mt-2 tracking-wide" style={{ color: 'var(--color-text-subtle)' }}>
              Reviewed within 48 hours · Strategic fit required · Not all accepted
            </p>

            {/* Subheadline */}
            <p className="font-serif italic mt-4 max-w-md mx-auto leading-relaxed text-center" style={{ fontSize: '20px', color: 'var(--color-text-muted)', lineHeight: '1.3' }}>
              We handle everything outside the chair. Most partners add $500K–$1M+ in aesthetic production annually — while working fewer hours on the business, and more hours on the dentistry they love.
            </p>

            {/* Brian Harris quote */}
            <p className="text-sm italic mt-3 max-w-md mx-auto" style={{ color: 'var(--color-text-muted)', lineHeight: '1.75' }}>
              "If a doctor asks who they should trust with their brand, practice growth, systems, demand… all of the questions every provider has; Pasted is the only answer."
              <span className="block not-italic font-normal mt-0.5" style={{ color: 'var(--color-text-subtle)' }}>
                — Dr. Brian Harris
              </span>
            </p>
          </div>
        </motion.div>

        <div className="mb-10"><MetricsBar /></div>
        <LogoMarquee />
        <div className="mb-8"><VideoPlayer /></div>
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
