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

  const handleMobileCTA = () => {
    trackCTAClick({ ctaId: 'hero-instant-cta', ctaText: 'Apply for Partnership', section: 'hero-above-fold' });
    document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const h1Words = "The practice you want. Built by the team behind the best.".split(" ");

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-20 pb-12 md:py-24 md:min-h-screen">
      {/* Background layers — static on mobile, parallax on desktop */}
      {isMobile ? (
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
      ) : (
        <>
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
        </>
      )}

      <div className="container relative z-10 max-w-5xl mx-auto px-4">
        {/* Primary content */}
        <motion.div
          className="text-center mb-3 md:mb-8"
          style={isMobile ? undefined : { opacity }}
        >
          {/* Wordmark */}
          <div className="flex flex-col items-center mb-2 md:mb-6">
            <span className="font-display text-lg md:text-lg tracking-[0.15em] uppercase text-foreground">
              PASTED
            </span>
            <span className="text-[11px] md:text-[9px] tracking-[0.4em] uppercase text-muted-foreground/50 mt-0.5 font-sans">
              Private Growth Partnership
            </span>
          </div>

          {/* H1 — 48px on mobile, staggered on desktop */}
          <h1 className="font-serif text-foreground mb-5 md:mb-5 leading-[1.1] tracking-[-0.01em]">
            {isMobile ? (
              <span className="block text-[48px] font-bold leading-[1.08]">
                The practice you want. Built by the team behind the best.
              </span>
            ) : (
              <motion.span
                className="block text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold"
                variants={wordStagger}
                initial="hidden"
                animate="visible"
              >
                {h1Words.map((word, i) => (
                  <motion.span key={i} className="inline-block mr-[0.3em]" variants={wordChild}>
                    {word}
                  </motion.span>
                ))}
              </motion.span>
            )}
            {/* Subheadline — hidden on mobile above fold, visible on desktop */}
            {!isMobile && (
              <motion.span
                className="block text-base sm:text-xl md:text-2xl lg:text-3xl font-light italic text-muted-foreground/80 mt-1 md:mt-2"
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                We handle brand, content, ads, and patient conversion for elite cosmetic dentists. You focus on clinical work. We build everything else.
              </motion.span>
            )}
          </h1>

          {/* Single stat line — mobile only above-fold proof */}
          <p className="text-[13px] tracking-[0.15em] uppercase text-primary/80 font-medium mb-7 md:hidden">
            $100M+ in aesthetic revenue generated
          </p>

          {/* Desktop: community significance + names */}
          <div className="hidden md:block">
            <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-muted-foreground/50 mb-2">
              The dentists you already follow chose PASTED.
            </p>
            <div className="flex items-center justify-center gap-1.5 text-[10px] md:text-xs text-muted-foreground/60 mb-3 flex-wrap">
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
          </div>

          {/* CTA button */}
          <div className="mb-3">
            <button
              onClick={handleMobileCTA}
              className="w-full md:w-auto md:px-12 py-3 bg-primary text-primary-foreground text-sm md:text-sm font-medium tracking-[0.15em] uppercase rounded-sm transition-all duration-200 active:scale-[0.98]"
            >
              Apply for Partnership →
            </button>
            <p className="text-[11px] md:text-xs text-muted-foreground/40 mt-2.5 tracking-wide">
              30 practices per year · Reviewed within 48 hours · Not all accepted
            </p>

            {/* Brian Harris quote — desktop only */}
            <p className="hidden md:block text-sm italic text-muted-foreground/50 mt-3 max-w-md mx-auto leading-relaxed">
              "If a doctor asks who they should trust with their brand — this is the answer."
              <span className="block not-italic font-normal text-muted-foreground/40 mt-0.5">— Dr. Brian Harris, Celebrity Dentist · Gilbert, AZ</span>
            </p>
          </div>

        </motion.div>

        {/* Below-fold mobile content: Metrics → Logo Marquee → VSL → Ticker */}
        
        {/* Metrics Bar */}
        <div className="mb-4 md:mb-10">
          <MetricsBar />
        </div>

        {/* Logo Marquee */}
        <LogoMarquee />

        {/* VSL Video */}
        <div className="mb-3 md:mb-8">
          <VideoPlayer />
        </div>

        {/* Service Ticker */}
        <ServiceTicker />
      </div>

      {/* Scroll indicator — desktop only */}
      {!isMobile && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div
            className="w-px h-16"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(185,146,79,0.5), transparent)',
              animation: 'scroll-pulse 2s ease-out forwards',
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
      )}
    </section>
  );
};

export default HeroSection;
