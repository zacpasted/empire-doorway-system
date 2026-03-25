import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import StickyHeader from "@/components/StickyHeader";
import Footer from "@/components/Footer";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: "$100M+", label: "Revenue Generated" },
  { value: "41+", label: "8-Figure Clinics" },
  { value: "97%", label: "Partner Retention" },
];

const Discover = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [widgetReady, setWidgetReady] = useState(false);

  // Load Calendly script
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

  // Listen for Calendly ready
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
      <StickyHeader />

      <main ref={ref} className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container max-w-3xl mx-auto px-4">
          {/* Authority intro */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: APPLE_EASE }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-primary font-semibold mb-4">
              By Invitation & Application
            </p>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-5" style={{ lineHeight: "1.1", letterSpacing: "-0.01em" }}>
              Book 1:1 PASTED<br className="hidden md:block" /> Discovery Call
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              A 45-minute strategy conversation with our founders to explore alignment, discuss your trajectory, and determine if PASTED is the right partner for your practice.
            </p>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            className="flex items-center justify-center gap-6 md:gap-10 mb-12 md:mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: APPLE_EASE }}
          >
            {STATS.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl md:text-2xl font-serif font-bold text-primary">{stat.value}</p>
                <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Calendly embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: APPLE_EASE }}
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

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center text-xs text-muted-foreground mt-6"
          >
            Availability is intentionally limited. Book only if you can arrive on time and engage thoughtfully.
          </motion.p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Discover;
