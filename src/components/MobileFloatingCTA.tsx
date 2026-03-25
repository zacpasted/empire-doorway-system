import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const MobileFloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearForm, setIsNearForm] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsVisible(window.scrollY > heroHeight * 0.5);
      
      const formElement = document.getElementById('eligibility-form');
      if (formElement) {
        const formRect = formElement.getBoundingClientRect();
        setIsNearForm(formRect.top < window.innerHeight && formRect.bottom > 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    trackCTAClick({ ctaId: 'mobile-floating', ctaText: 'Book Discovery Call', section: 'floating' });
    document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const shouldShow = isVisible && !isNearForm;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[200] md:hidden"
          style={{
            background: 'rgba(10,9,6,0.96)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid var(--color-border-gold)',
          }}
        >
          <div className="relative px-5 pb-6 pt-3" style={{ paddingBottom: 'calc(20px + env(safe-area-inset-bottom))' }}>
            <button
              onClick={handleClick}
              className="w-full flex items-center justify-center gap-2 font-sans uppercase active:scale-[0.98] transition-transform"
              style={{
                height: '56px',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                background: '#B8924F',
                color: '#0A0906',
                border: 'none',
                borderRadius: '10px',
              }}
            >
              <ArrowUp className="w-4 h-4" />
              BOOK DISCOVERY CALL
            </button>
            <p className="text-center mt-2 font-sans" style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-text-subtle)' }}>
              30 clinics · 48hr review · Not all accepted
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileFloatingCTA;
