import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";
import { useWistiaLoader, getWistiaPlaceholderStyles } from "@/hooks/use-wistia";

const HERO_MEDIA_ID = "nh7ancshfq";

const PastedHero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useWistiaLoader(HERO_MEDIA_ID, { loadOnMount: isVisible });

  const handleCTA = () => {
    trackCTAClick({ ctaId: "hero-request-intro", ctaText: "Request a private introduction", section: "hero" });
    document.getElementById("eligibility-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[780px] w-full overflow-hidden">
      {/* Wistia background video - muted autoplay loop */}
      <div className="absolute inset-0 w-full h-full">
        <style>{`
          wistia-player[media-id='${HERO_MEDIA_ID}']:not(:defined) {
            background: center / cover no-repeat url('https://fast.wistia.com/embed/medias/${HERO_MEDIA_ID}/swatch');
            display: block;
            filter: blur(5px);
            height: 100%;
          }
          wistia-player[media-id='${HERO_MEDIA_ID}'] {
            width: 100%;
            height: 100%;
          }
          /* Force video to cover the container */
          wistia-player[media-id='${HERO_MEDIA_ID}'] video {
            object-fit: cover;
          }
        `}</style>
        {/* @ts-ignore - Wistia custom element */}
        <wistia-player
          media-id={HERO_MEDIA_ID}
          autoplay="true"
          muted="true"
          loop="true"
          playsinline="true"
          end-video-behavior="loop"
          player-color="000000"
          still-url="/hero-poster.jpg"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Poster fallback for initial load */}
      <img
        src="/hero-poster.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Cinematic gradient scrim */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[var(--color-bg)]" style={{ zIndex: 2 }} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" style={{ zIndex: 2 }} />

      {/* Film grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{
          zIndex: 3,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Content */}
      <div className="relative h-full max-w-[1680px] mx-auto px-8 lg:px-12 flex flex-col justify-end pb-24 lg:pb-32" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="block w-12 h-px" style={{ background: "var(--color-gold)" }} />
            <span
              className="text-[10px] uppercase tracking-[0.32em]"
              style={{ color: "var(--color-gold)" }}
            >
              By Invitation Only
            </span>
          </div>

          <h1 className="font-serif text-[clamp(3rem,7vw,7.5rem)] leading-[0.95] tracking-[-0.02em] font-light">
            The operating partner
            <br />
            <span className="italic" style={{ color: "var(--color-gold)" }}>
              behind the world's
            </span>
            <br />
            finest clinics.
          </h1>

          <p className="mt-10 max-w-xl text-base lg:text-lg leading-relaxed font-light" style={{ color: "rgba(255,255,255,0.7)" }}>
            PASTED runs brand, demand, creative, strategy and execution for a small circle of
            elite aesthetic dentists. Not an agency. An accountability partner.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-14 flex flex-wrap items-center gap-8"
        >
          <button
            onClick={handleCTA}
            className="group inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.28em] text-white bg-transparent border-none cursor-pointer"
          >
            <span className="relative pb-2 border-b border-white/40 group-hover:border-[var(--color-gold)] transition-colors duration-500">
              Request a private introduction
            </span>
            <span
              className="w-10 h-px group-hover:w-16 transition-all duration-500"
              style={{ background: "var(--color-gold)" }}
            />
          </button>
          <a
            href="#lineup"
            className="text-[11px] uppercase tracking-[0.28em] text-white/60 hover:text-white transition-colors"
          >
            View partnerships
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 right-8 lg:right-12 flex items-center gap-4"
        style={{ zIndex: 10 }}
      >
        <span className="text-[10px] uppercase tracking-[0.28em] text-white/50">Scroll</span>
        <div className="w-px h-14 bg-gradient-to-b from-[var(--color-gold)] to-transparent" />
      </motion.div>
    </section>
  );
};

export default PastedHero;
