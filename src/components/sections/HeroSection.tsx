import { useRef, useState, useEffect } from "react";
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

/** Inline Calendly for mobile hero — loads script once, listens for booking */
const MobileHeroCalendly = () => {
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );
    if (!existing) {
      const s = document.createElement("script");
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  useEffect(() => {
    const handle = (e: MessageEvent) => {
      let d = e.data;
      if (typeof d === "string") {
        try { d = JSON.parse(d); } catch { return; }
      }
      if (!d || typeof d !== "object") return;
      if (d.event === "calendly.event_type_viewed") setCalendlyLoaded(true);
      if (d.event === "calendly.event_scheduled") {
        setBookingConfirmed(true);
        trackCTAClick({ ctaId: "calendly-booking-hero-mobile", ctaText: "Call Booked", section: "hero-calendly-mobile" });
      }
    };
    window.addEventListener("message", handle);
    return () => window.removeEventListener("message", handle);
  }, []);

  if (bookingConfirmed) {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
          <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-serif font-bold text-foreground mb-1">You're confirmed.</h3>
        <p className="text-muted-foreground text-sm">Check your inbox for the calendar invite.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <p className="text-[13px] text-muted-foreground/60 text-center mb-3 font-sans">
        Ready to book? Select a time below.
      </p>
      <div className="relative rounded-lg overflow-hidden border border-border/30" style={{ minHeight: "600px" }}>
        {!calendlyLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-card/80">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        )}
        <div
          className={`calendly-inline-widget transition-opacity duration-500 ${calendlyLoaded ? "opacity-100" : "opacity-0"}`}
          data-url="https://calendly.com/getpasted/pasted-partner-discovery?background_color=1a1a1a&text_color=ffffff&primary_color=e0c679"
          style={{ minWidth: "320px", height: "700px" }}
        />
      </div>
    </div>
  );
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
    trackCTAClick({ ctaId: "hero-instant-cta", ctaText: "Apply for Partnership", section: "hero-above-fold" });
    document.getElementById("eligibility-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const h1Words = "The practice you want. Built by the team behind the best.".split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-4 pb-8 md:pt-[calc(var(--hero-desktop-pt,6rem)-20px)] md:pb-24 md:min-h-screen"
    >
      {/* Background layers */}
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
          <div className="flex flex-col items-center mb-2 md:mb-3">
            <span className="font-display text-lg md:text-lg tracking-[0.15em] uppercase text-foreground">
              PASTED
            </span>
            <span className="text-[11px] md:text-[9px] tracking-[0.4em] uppercase text-muted-foreground/50 mt-0.5 font-sans">
              Where Ordinary Ends
            </span>
          </div>

          {/* Credential bar */}
          <p className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-sans mb-3 md:mb-4" style={{ color: 'rgba(185,146,79,0.7)' }}>
            $100M+ Generated · 97% Retention · 30 Practices / Year
          </p>

          {/* H1 — 40px on mobile, staggered on desktop */}
          <h1 className="font-serif text-foreground mb-4 md:mb-5 leading-[1.1] tracking-[-0.01em]">
            {isMobile ? (
              <span className="block text-[40px] font-bold leading-[1.08]">
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

          {/* Single stat line — 16px gap below H1, 20px before CTA */}
          <p className="text-[13px] tracking-[0.15em] uppercase text-primary/80 font-medium mb-5 md:hidden">
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
          <div>
            <button
              onClick={handleMobileCTA}
              className="w-full md:w-auto md:px-12 py-3 bg-primary text-primary-foreground text-sm md:text-sm font-medium tracking-[0.15em] uppercase rounded-sm transition-all duration-200 active:scale-[0.98]"
            >
              Apply for Partnership →
            </button>
            <p className="text-[11px] md:text-xs text-muted-foreground/40 mt-2 tracking-wide">
              30 practices per year · Reviewed within 48 hours · Not all accepted
            </p>

            {/* Brian Harris quote — desktop only */}
            <p className="hidden md:block text-sm italic text-muted-foreground/50 mt-3 max-w-md mx-auto leading-relaxed">
              "If a doctor asks who they should trust with their brand — this is the answer."
              <span className="block not-italic font-normal text-muted-foreground/40 mt-0.5">
                — Dr. Brian Harris, Celebrity Dentist · Gilbert, AZ
              </span>
            </p>
          </div>
        </motion.div>

        {/* FIX 4 — Calendly embed inside hero on mobile only */}
        {isMobile && <MobileHeroCalendly />}

        {/* Metrics Bar */}
        <div className="mb-4 md:mb-10 mt-6 md:mt-0">
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
      )}
    </section>
  );
};

export default HeroSection;
