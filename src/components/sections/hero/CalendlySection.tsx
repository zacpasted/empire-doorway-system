import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const BookingConfirmation = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="text-center py-16 md:py-24"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center"
    >
      <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </motion.div>

    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4"
    >
      You're Confirmed
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="text-muted-foreground max-w-md mx-auto mb-6"
    >
      Thank you for scheduling your strategy call. You'll receive a calendar invite and confirmation email shortly.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="space-y-4"
    >
      <p className="text-sm text-muted-foreground/70">In the meantime, prepare to discuss:</p>
      <ul className="text-sm text-foreground/80 space-y-2 max-w-xs mx-auto text-left">
        <li className="flex items-start gap-2">
          <span className="text-primary mt-0.5">•</span>
          Your current growth ceiling and where the structure is limiting you
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary mt-0.5">•</span>
          What's separating you from the top-performing practices
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary mt-0.5">•</span>
          Your path to $500K–$1M+ in annual growth
        </li>
      </ul>
    </motion.div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="text-xs text-muted-foreground/50 mt-8"
    >
      We look forward to speaking with you.
    </motion.p>
  </motion.div>
);

const CalendlySection = () => {
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const handleCalendlyMessage = (e: MessageEvent) => {
      // Calendly can send data as string or object
      let data = e.data;
      if (typeof data === 'string') {
        try { data = JSON.parse(data); } catch { return; }
      }
      if (!data || typeof data !== 'object') return;
      
      const eventName = data.event;
      if (eventName === "calendly.event_type_viewed") {
        setCalendlyLoaded(true);
      }
      if (eventName === "calendly.event_scheduled") {
        setBookingConfirmed(true);
        trackCTAClick({ ctaId: "calendly-booking", ctaText: "Call Booked", section: "hero-calendly" });
      }
    };
    window.addEventListener("message", handleCalendlyMessage);
    return () => window.removeEventListener("message", handleCalendlyMessage);
  }, []);

  return (
    <div id="eligibility-form" className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 md:p-10">
      {bookingConfirmed ? (
        <BookingConfirmation />
      ) : (
        <>
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">
              If You're Ready to Operate at a Different Level — This Is the Next Step
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-4">
              We'll assess where your current structure is limiting growth, show you what's separating you from the top tier,
              and map how the PASTED Partnership would rebuild your practice for long-term dominance.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground/60 mb-2">
              <span>Average call: 45 min – 1 hour</span>
              <span className="hidden sm:inline">·</span>
              <span>Applications reviewed within 48 hours</span>
              <span className="hidden sm:inline">·</span>
              <span>30 practices admitted per year</span>
            </div>
            <p className="text-xs text-muted-foreground/50 italic">
              This is a selective, fit-based conversation.
            </p>
          </div>

          <div className="relative" style={{ minHeight: "700px" }}>
            {!calendlyLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1a1a1a] rounded-xl border border-border/30">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  <p className="text-sm text-muted-foreground">Loading calendar...</p>
                </div>
                <div className="mt-8 space-y-3 w-full max-w-sm px-4">
                  <div className="h-4 bg-white/10 rounded animate-pulse" />
                  <div className="h-4 bg-white/8 rounded animate-pulse w-3/4" />
                  <div className="h-10 bg-white/5 rounded animate-pulse mt-4" />
                  <div className="h-10 bg-white/5 rounded animate-pulse" />
                  <div className="h-10 bg-white/5 rounded animate-pulse" />
                </div>
              </div>
            )}
            <div
              className={`calendly-inline-widget rounded-xl overflow-hidden transition-opacity duration-500 ${calendlyLoaded ? "opacity-100" : "opacity-0"}`}
              data-url="https://calendly.com/getpasted/pasted-partner-discovery?primary_color=ff0000"
              style={{ minWidth: "320px", height: "700px" }}
            />
          </div>
        </>
      )}

      {!bookingConfirmed && (
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground/50 mt-4 pt-4 border-t border-border/20">
          <span>This is a strategic evaluation — not a sales call</span>
          <span className="hidden sm:inline">·</span>
          <span>Serious inquiries only</span>
          <span className="hidden sm:inline">·</span>
          <span>If we're not a fit, we'll tell you directly</span>
        </div>
      )}
    </div>
  );
};

export default CalendlySection;
