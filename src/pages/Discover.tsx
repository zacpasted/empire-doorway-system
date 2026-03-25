import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Footer from "@/components/Footer";
import pastedWordmark from "@/assets/pasted-logo-wordmark.png";
import logoFigs from "@/assets/logos/figs-white.png";
import logoCocofloss from "@/assets/logos/cocofloss-white.png";
import logoSolventum from "@/assets/logos/solventum-white.png";
import logoMHM from "@/assets/logos/marshall-hanson-method-white.png";
import logoSmileVirtual from "@/assets/logos/smile-virtual-white.png";
import { useWistiaLoader, getWistiaPlaceholderStyles } from "@/hooks/use-wistia";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: "$100M+", label: "Revenue Generated" },
  { value: "41+", label: "8-Figure Clinics" },
  { value: "97%", label: "Retention Rate" },
  { value: "30", label: "Clinics / Year" },
];

const TESTIMONIAL_VIDEO_IDS = ["5ue7wlj8b6", "af7m87juf2", "wqd6gdwzc8"];

const VideoProofBlock = () => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [isVidVisible, setIsVidVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVidVisible(true); },
      { threshold: 0.1, rootMargin: "200px" }
    );
    if (blockRef.current) observer.observe(blockRef.current);
    return () => observer.disconnect();
  }, []);

  useWistiaLoader(TESTIMONIAL_VIDEO_IDS, { loadOnMount: isVidVisible });

  return (
    <div ref={blockRef} className="space-y-6">
      <div className="text-center">
        <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-primary mb-3">Hear It Directly</p>
        <p className="text-sm text-muted-foreground">Unscripted. From dentists who've been through it.</p>
      </div>
      {isVidVisible && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIAL_VIDEO_IDS.map((videoId) => (
            <div key={videoId} className="rounded-lg overflow-hidden border border-border/30 bg-card/20">
              <style>{getWistiaPlaceholderStyles(videoId, "177.78%")}</style>
              {/* @ts-ignore */}
              <wistia-player media-id={videoId} aspect="0.5625" autoplay="false" end-video-behavior="default"></wistia-player>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Discover = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "100px" });
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [widgetReady, setWidgetReady] = useState(false);

  useEffect(() => {
    const existing = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]') as HTMLScriptElement | null;
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    } else {
      // Script tag exists — check if already loaded or wait for it
      if ((window as any).Calendly) {
        setScriptLoaded(true);
      } else {
        existing.addEventListener("load", () => setScriptLoaded(true));
        // Fallback: poll briefly in case load event already fired
        const timer = setInterval(() => {
          if ((window as any).Calendly) {
            setScriptLoaded(true);
            clearInterval(timer);
          }
        }, 200);
        setTimeout(() => clearInterval(timer), 5000);
      }
    }
  }, []);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      let data = e.data;
      if (typeof data === "string") {
        try { data = JSON.parse(data); } catch { return; }
      }
      if (data?.event === "calendly.event_type_viewed") setWidgetReady(true);
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Minimal top bar with logo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="container max-w-4xl mx-auto px-4 py-2 flex items-center justify-center">
          <a href="/">
            <img src={pastedWordmark} alt="PASTED" className="h-4 md:h-5 opacity-80 hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </header>

      <main ref={ref} className="pt-10 pb-10 md:pt-28 md:pb-20">
        <div className="container max-w-3xl mx-auto px-4">

          {/* Hero authority block */}
          <motion.div
            className="text-center mb-4 md:mb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: APPLE_EASE }}
          >
            <p className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-2 md:mb-2">
              The Global Standard in Dental Brand Growth
            </p>

            <h1
              className="text-[42px] md:text-[48px] font-serif font-bold text-foreground text-center mb-3"
              style={{ lineHeight: "1.02", letterSpacing: "-0.025em" }}
            >
              Your Practice Deserves<br />
              a Partner,<br className="md:hidden" /> Not a Vendor.
            </h1>

            <p className="text-muted-foreground max-w-lg mx-auto text-[15px] md:text-base leading-relaxed mb-4 md:mb-5">
              PASTED is the in-house growth system behind 41+ eight-figure aesthetic practices. We don't outsource. We don't template. We build from the inside out.
            </p>

            {/* CTA button — mobile: right after body copy, before quote */}
            <button
              onClick={() => {
                document.getElementById('calendly-embed')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="w-full md:w-auto font-sans uppercase tracking-[0.18em] transition-all duration-300 active:scale-[0.98] mb-4 md:mb-5"
              style={{
                height: '54px',
                fontSize: '12px',
                fontWeight: 500,
                background: '#B8924F',
                color: '#0A0906',
                border: 'none',
                borderRadius: '10px',
                padding: '0 40px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#D4AA6A';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(185,146,79,0.25)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#B8924F';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              Book Discovery Call →
            </button>

            <p className="text-[10px] text-muted-foreground/60 tracking-wide mb-4 md:mb-5">
              30 clinics per year · Reviewed within 48 hours · Not all accepted
            </p>
          </motion.div>

          {/* Social proof quote — bottom of above-fold */}
          <motion.blockquote
            className="text-center mb-5 md:mb-12 px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease: APPLE_EASE }}
          >
            <p className="text-[13px] md:text-base italic text-foreground/80 max-w-xl mx-auto leading-relaxed">
              "If a doctor asks who they should trust with their brand, practice growth, systems, demand… all of the questions every provider has — <span className="text-primary font-medium not-italic">Pasted is the only answer.</span>"
            </p>
            <cite className="block mt-1.5 text-[10px] md:text-xs text-muted-foreground not-italic tracking-wide">
              — Dr. Brian Harris · Smile Virtual & Smile Sculpt
            </cite>
          </motion.blockquote>

          {/* Stat pills — just above Calendly */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-1.5 md:gap-3 mb-5 md:mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: APPLE_EASE }}
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border border-border/60 bg-card/50"
              >
                <span className="text-[13px] md:text-base font-serif font-bold text-primary">{stat.value}</span>
                <span className="text-[8px] md:text-[10px] uppercase tracking-wider text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA label above Calendly */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: APPLE_EASE }}
          >
            <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-1.5">
              Book 1:1 PASTED Discovery Call
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              45 minutes with <span className="text-foreground">Zac</span> or <span className="text-foreground">Dr. Alan Clarke</span> · Reviewed within 48 hours
            </p>
          </motion.div>

          {/* Calendly embed */}
          <motion.div id="calendly-embed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: APPLE_EASE }}
            className="bg-[#1a1a1a] rounded-xl border border-border overflow-hidden shadow-lg relative"
            style={{ minHeight: "700px" }}
          >
            {!widgetReady && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  <p className="text-sm text-muted-foreground">Loading calendar...</p>
                </div>
              </div>
            )}
            {scriptLoaded && (
              <div
                className={`calendly-inline-widget transition-opacity duration-500 ${widgetReady ? "opacity-100" : "opacity-0"}`}
                data-url="https://calendly.com/getpasted/pasted-partner-discovery?hide_event_type_details=1&hide_gdpr_banner=1&background_color=000000&text_color=ffffff&primary_color=e4ce6f"
                style={{ minWidth: "320px", height: "700px" }}
              />
            )}
          </motion.div>

          {/* Bottom note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center text-[10px] md:text-xs text-muted-foreground mt-5"
          >
            Only 30 partnerships accepted per year. Availability is intentionally limited.
          </motion.p>
        </div>

        {/* Authority proof strip */}
        <div className="container max-w-4xl mx-auto px-4 mt-16 md:mt-24 space-y-16 md:space-y-24">

          {/* Partner names */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: APPLE_EASE }}
          >
            <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-primary mb-6">
              Trusted By
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 max-w-2xl mx-auto">
              {[
                "Dr. Jon Marashi", "Dr. Brian Harris", "Dr. Sam Saleh",
                "Dr. Drew Ballard", "Dr. James Heaton", "Dr. Marshall Hanson",
                "Dr. Rhona Eksander", "Dr. Michaela Tozzi", "Dr. Serena Wong",
              ].map((name) => (
                <span key={name} className="text-xs md:text-sm text-foreground/70 font-medium whitespace-nowrap">
                  {name}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-4 tracking-wide">
              & 30+ elite aesthetic practices worldwide
            </p>
          </motion.div>

          {/* Corporate logo ticker */}
          <motion.div
            className="overflow-hidden relative py-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: APPLE_EASE }}
          >
            <style>{`
              @keyframes discover-logo-marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-discover-logo-marquee {
                animation: discover-logo-marquee 18s linear infinite;
              }
              .animate-discover-logo-marquee:hover {
                animation-play-state: paused;
              }
            `}</style>
            <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            <div className="flex items-center animate-discover-logo-marquee">
              {[...Array(2)].map((_, setIdx) => (
                <div key={setIdx} className="flex items-center">
                  {[
                    { src: logoFigs, alt: "FIGS" },
                    { src: logoCocofloss, alt: "Cocofloss" },
                    { src: logoSolventum, alt: "Solventum" },
                    { src: logoMHM, alt: "Marshall Hanson Method" },
                    { src: logoSmileVirtual, alt: "Smile Virtual" },
                  ].map((logo, i) => (
                    <div key={i} className="flex-shrink-0 mx-6 md:mx-10 flex items-center justify-center">
                      <img src={logo.src} alt={logo.alt} className="h-4 md:h-5 w-auto max-w-[80px] md:max-w-[100px] object-contain opacity-50 hover:opacity-80 transition-opacity" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <div className="flex justify-center">
            <div className="w-8 h-px bg-primary/30" />
          </div>

          {/* Testimonial stack */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: APPLE_EASE }}
          >
            {[
              {
                quote: "At this level, brand is not optional. It is fundamental. Zac and Alan understand this better than anyone I've worked with. Their taste, restraint, and execution are elite.",
                name: "Dr. Jon Marashi",
                role: "Celebrity Dentist, Los Angeles",
              },
              {
                quote: "Halo did not scale by accident. From a struggling general practice to my dream clinic — surpassing all revenue goals, working less than 9 months per year, 3 days per week. Zac has been my partner for 5 years making it happen.",
                name: "Dr. Drew Ballard",
                role: "Founder, Halo Veneers · Gilbert, AZ",
              },
              {
                quote: "This is world-class work in every sense. The strategy is genius-level, the execution is flawless, and there is zero fluff.",
                name: "Dr. Sam Saleh",
                role: "Celebrity Dentist, Los Angeles & London",
              },
            ].map((t) => (
              <blockquote
                key={t.name}
                className="border-l-2 border-primary/30 pl-5 py-2"
              >
                <p className="text-sm text-foreground/80 leading-relaxed italic mb-2">
                  "{t.quote}"
                </p>
                <cite className="text-xs text-muted-foreground not-italic">
                  — {t.name} · {t.role}
                </cite>
              </blockquote>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="flex justify-center">
            <div className="w-8 h-px bg-primary/30" />
          </div>

          {/* Credibility metrics */}
          <motion.div
            className="grid grid-cols-2 gap-4 md:gap-6 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: APPLE_EASE }}
          >
            {[
              { value: "5+ Years", label: "Average Partnership" },
              { value: "0%", label: "Templated Work" },
              { value: "3.2×", label: "Avg. ROI on Ad Spend" },
              { value: "Since 2022", label: "Industry Track Record" },
            ].map((s) => (
              <div
                key={s.label}
                className="text-center p-4 border border-border/30 bg-card/20 rounded-lg"
              >
                <p className="text-lg md:text-xl font-serif text-primary mb-1">{s.value}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Final reassurance */}
          <motion.div
            className="text-center pb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: APPLE_EASE }}
          >
            <p className="text-foreground font-serif text-lg md:text-xl mb-2">
              Retention this high doesn't happen without real results.
            </p>
            <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
              97% partner retention since 2022 — in an industry where most agencies churn 62%+ of clients monthly.
            </p>
          </motion.div>

          {/* Video Testimonials */}
          <VideoProofBlock />

          {/* More Proof CTA */}
          <motion.div
            className="text-center pt-4 pb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5, ease: APPLE_EASE }}
          >
            <a
              href="https://pasted.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-sans uppercase transition-all duration-300"
              style={{
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                background: 'transparent',
                color: 'hsl(var(--primary))',
                padding: '16px 36px',
                border: '1px solid hsl(var(--primary) / 0.4)',
                borderRadius: '10px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'hsl(var(--primary))';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(185,146,79,0.15)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'hsl(var(--primary) / 0.4)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.transform = 'none';
              }}
            >
              More Proof →
            </a>
            <p className="mt-3 text-[10px] text-muted-foreground tracking-wide">
              Full case studies, creative work & partner results at pasted.studio
            </p>
          </motion.div>

          {/* Final Book Call CTA */}
          <motion.div
            className="text-center pt-12 pb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6, ease: APPLE_EASE }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-px bg-primary/20" />
              <div className="w-1.5 h-1.5 rotate-45 border border-primary/30" />
              <div className="w-10 h-px bg-primary/20" />
            </div>
            <p className="font-serif text-lg md:text-xl text-foreground mb-2">
              Ready to build something exceptional?
            </p>
            <p className="text-xs text-muted-foreground mb-8 max-w-sm mx-auto">
              One call. No pressure. Just clarity on what's possible.
            </p>
            <button
              onClick={() => {
                document.getElementById('calendly-embed')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className="inline-block font-sans uppercase transition-all duration-300"
              style={{
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.18em',
                background: 'hsl(var(--primary))',
                color: '#0A0906',
                padding: '18px 40px',
                border: 'none',
                borderRadius: '10px',
                boxShadow: '0 0 40px rgba(185,146,79,0.2)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 56px rgba(185,146,79,0.35)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(185,146,79,0.2)';
                (e.currentTarget as HTMLElement).style.transform = 'none';
              }}
            >
              Book Discovery Call →
            </button>
            <p className="mt-4 text-[10px] text-muted-foreground/60 tracking-wide">
              30 clinics per year · Reviewed within 48 hours
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Discover;
