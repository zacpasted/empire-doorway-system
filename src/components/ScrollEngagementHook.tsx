import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const ScrollEngagementHook = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleScroll = useCallback(() => {
    if (dismissed) return;
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent >= 10 && !visible) {
      setVisible(true);
    }
  }, [dismissed, visible]);

  useEffect(() => {
    // Mobile only (< 768px)
    if (window.innerWidth >= 768) return;
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleCTA = () => {
    trackCTAClick({ ctaId: "scroll-hook-10pct", ctaText: "Take the Quiz", section: "scroll-engagement" });
    setDismissed(true);
    setVisible(false);
    document.getElementById("practice-quiz")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="md:hidden fixed bottom-28 left-3 right-3 z-[55] bg-card/95 backdrop-blur-md border border-border/60 rounded-xl p-4 shadow-2xl"
        >
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-muted-foreground/50 hover:text-muted-foreground"
            aria-label="Dismiss"
          >
            ✕
          </button>
          
          <p className="text-[11px] tracking-[0.15em] uppercase text-primary/80 font-medium mb-1">
            Free in 60 seconds
          </p>
          <p className="text-sm font-serif font-semibold text-foreground leading-snug mb-3">
            How does your practice compare to the top 1%?
          </p>
          
          <button
            onClick={handleCTA}
            className="w-full py-2.5 bg-primary text-primary-foreground text-xs font-medium tracking-[0.15em] uppercase rounded-sm transition-all duration-200 active:scale-[0.98]"
          >
            Take the 60-Second Quiz →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollEngagementHook;
