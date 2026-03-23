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
      const scrollY = window.scrollY;
      
      setIsVisible(scrollY > heroHeight * 0.5);
      
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
    trackCTAClick({ ctaId: 'mobile-floating', ctaText: 'Apply for Partnership', section: 'floating' });
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
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none" 
               style={{ height: '120%', top: '-20%' }} />
          
          <div className="relative px-4 pb-6 pt-4">
            <button
              onClick={handleClick}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground font-medium text-base tracking-wide uppercase rounded-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform"
            >
              <ArrowUp className="w-4 h-4" />
              Apply for Partnership
            </button>
            <p className="text-center text-xs text-muted-foreground mt-2">
              30 spots this year · 48hr review · Not all accepted
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileFloatingCTA;
