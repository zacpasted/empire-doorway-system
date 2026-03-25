import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Footer from "@/components/Footer";
import pastedWordmark from "@/assets/pasted-logo-wordmark.png";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: "$100M+", label: "Revenue Generated" },
  { value: "41+", label: "8-Figure Clinics" },
  { value: "97%", label: "Retention Rate" },
  { value: "30", label: "Clinics / Year" },
];

const Discover = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "100px" });
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [widgetReady, setWidgetReady] = useState(false);

  useEffect(() => {
    const existing = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
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
        <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center justify-center">
          <a href="/">
            <img src={pastedWordmark} alt="PASTED" className="h-4 md:h-5 opacity-80 hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </header>

      <main ref={ref} className="pt-20 pb-12 md:pt-28 md:pb-20">
        <div className="container max-w-3xl mx-auto px-4">

          {/* Hero authority block */}
          <motion.div
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: APPLE_EASE }}
          >
            <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-3">
              The Global Standard in Dental Brand Growth
            </p>

            <h1
              className="text-[28px] md:text-[48px] font-serif font-bold text-foreground mb-4"
              style={{ lineHeight: "1.08", letterSpacing: "-0.015em" }}
            >
              Your Practice Deserves<br />
              a Partner, Not a Vendor.
            </h1>

            <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base leading-relaxed mb-6">
              PASTED is the in-house growth system behind 41+ eight-figure aesthetic practices. We don't outsource. We don't template. We build from the inside out — one practice at a time.
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/60 bg-card/50"
                >
                  <span className="text-sm md:text-base font-serif font-bold text-primary">{stat.value}</span>
                  <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Social proof quote */}
          <motion.blockquote
            className="text-center mb-8 md:mb-12 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease: APPLE_EASE }}
          >
            <p className="text-sm md:text-base italic text-foreground/80 max-w-xl mx-auto leading-relaxed">
              "If a doctor asks who they should trust with their brand, practice growth, systems, demand… all of the questions every provider has — <span className="text-primary font-medium not-italic">Pasted is the only answer.</span>"
            </p>
            <cite className="block mt-2 text-xs text-muted-foreground not-italic tracking-wide">
              — Dr. Brian Harris · Smile Virtual & Smile Sculpt
            </cite>
          </motion.blockquote>

          {/* Divider */}
          <div className="flex justify-center mb-8 md:mb-12">
            <div className="w-8 h-px bg-primary/40" />
          </div>

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
          <motion.div
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
              { value: "8-Figure", label: "Average Partner Revenue" },
              { value: "Since 2019", label: "Industry Track Record" },
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
              97% partner retention since 2019 — in an industry where most agencies churn 62%+ of clients monthly.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Discover;
