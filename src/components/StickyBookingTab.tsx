import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const StickyBookingTab = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearCalendly, setIsNearCalendly] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setIsVisible(scrollPercent > 0.2);

      const formElement = document.getElementById('eligibility-form');
      if (formElement) {
        const rect = formElement.getBoundingClientRect();
        setIsNearCalendly(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    trackCTAClick({ ctaId: 'sticky-booking-tab', ctaText: 'Book a Call', section: 'floating-tab' });
    document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const shouldShow = isVisible && !isNearCalendly;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.button
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={handleClick}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-2 transition-all duration-200 group"
          style={{
            background: '#B8924F',
            color: '#0A0906',
            padding: '20px 12px',
            borderRadius: 0,
            boxShadow: '0 4px 20px rgba(185,146,79,0.2)',
          }}
          title="45-min strategy call · Zac or Alan · 48hr review"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = '#D4AA6A';
            (e.currentTarget as HTMLElement).style.paddingLeft = '16px';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = '#B8924F';
            (e.currentTarget as HTMLElement).style.paddingLeft = '12px';
          }}
        >
          <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
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
};

export default StickyBookingTab;
