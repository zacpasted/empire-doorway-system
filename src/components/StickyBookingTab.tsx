import { memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const StickyBookingTab = memo(() => {
  const { scrollPercent, viewportHeight } = useScrollPosition();

  const shouldShow = useMemo(() => {
    if (scrollPercent <= 0.2) return false;
    const formElement = document.getElementById('eligibility-form');
    if (formElement) {
      const rect = formElement.getBoundingClientRect();
      if (rect.top < viewportHeight && rect.bottom > 0) return false;
    }
    return true;
  }, [scrollPercent, viewportHeight]);

  const handleClick = () => {
    trackCTAClick({ ctaId: 'sticky-booking-tab', ctaText: 'Book a Call', section: 'floating-tab' });
    document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.button
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={handleClick}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-2 group"
          style={{
            background: '#B8924F',
            color: '#0A0906',
            padding: '20px 12px',
            borderRadius: '10px 0 0 10px',
            boxShadow: '0 4px 20px rgba(185,146,79,0.2)',
            contain: 'layout style',
          }}
          title="45-min strategy call · Zac or Alan · 48hr review"
          whileHover={{ x: -4, boxShadow: '0 8px 32px rgba(185,146,79,0.35)' }}
          whileTap={{ scale: 0.96 }}
        >
          <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          <span
            className="font-sans font-medium uppercase whitespace-nowrap"
            style={{ fontSize: '11px', letterSpacing: '0.15em', writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            Book a Call
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
});

StickyBookingTab.displayName = 'StickyBookingTab';
export default StickyBookingTab;
