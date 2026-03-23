import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const MidPageCalendlySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "200px" });
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isInView]);

  useEffect(() => {
    const handleCalendlyMessage = (e: MessageEvent) => {
      let data = e.data;
      if (typeof data === 'string') {
        try { data = JSON.parse(data); } catch { return; }
      }
      if (!data || typeof data !== 'object') return;
      if (data.event === "calendly.event_type_viewed") setCalendlyLoaded(true);
      if (data.event === "calendly.event_scheduled") {
        setBookingConfirmed(true);
        trackCTAClick({ ctaId: "calendly-booking-mid", ctaText: "Call Booked", section: "mid-page-calendly" });
      }
    };
    window.addEventListener("message", handleCalendlyMessage);
    return () => window.removeEventListener("message", handleCalendlyMessage);
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-10"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-primary mb-3">
            Ready Now?
          </p>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">
            Skip ahead. Book your strategy call.
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            If you've seen enough and you're ready to move, book directly. 45 minutes with Zac and Alan to map your trajectory.
          </p>
        </motion.div>

        {bookingConfirmed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-bold text-foreground mb-2">You're confirmed.</h3>
            <p className="text-muted-foreground text-sm">Check your inbox for the calendar invite.</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden"
            style={{ minHeight: "700px" }}
          >
            {!calendlyLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  <p className="text-sm text-muted-foreground">Loading calendar...</p>
                </div>
              </div>
            )}
            {isInView && (
              <div
                className={`calendly-inline-widget transition-opacity duration-500 ${calendlyLoaded ? "opacity-100" : "opacity-0"}`}
                data-url="https://calendly.com/getpasted/pasted-partner-discovery?primary_color=C9A96E"
                style={{ minWidth: "320px", height: "700px" }}
              />
            )}
          </motion.div>
        )}

        <p className="text-center text-xs text-muted-foreground/50 mt-4">
          30 practices per year · Reviewed within 48 hours · Strategic fit required
        </p>
      </div>
    </section>
  );
};

export default MidPageCalendlySection;
