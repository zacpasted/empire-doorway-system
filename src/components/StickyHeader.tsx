import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";
import { useIsMobile } from "@/hooks/use-mobile";
import pastedWordmark from "@/assets/pasted-logo-wordmark.png";
import pastedEmblem from "@/assets/pasted-logo-emblem.png";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

interface StickyHeaderProps {
  onApplyClick?: () => void;
}

const StickyHeader = ({ onApplyClick }: StickyHeaderProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsVisible(window.scrollY > heroHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    trackCTAClick({ ctaId: 'sticky-header', ctaText: 'Book Discovery Call', section: 'header' });
    if (onApplyClick) {
      onApplyClick();
    } else {
      document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          className="fixed top-0 left-0 right-0 z-50"
          initial={{ y: -64, opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ y: 0, opacity: 1, backdropFilter: 'blur(24px)' }}
          exit={{ y: -64, opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: APPLE_EASE }}
          style={{
            height: '64px',
            background: 'rgba(10, 9, 6, 0.92)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div className="container max-w-6xl mx-auto px-4 md:px-12 h-full flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: APPLE_EASE }}
            >
              <img src={pastedWordmark} alt="Pasted" className="h-6" />
              <div className="w-px h-4 bg-primary/30" />
              <img src={pastedEmblem} alt="Pasted emblem" className="h-6" />
            </motion.div>

            <motion.button
              onClick={handleClick}
              className="font-sans uppercase"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: APPLE_EASE }}
              whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(185,146,79,0.3)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontSize: isMobile ? '10px' : '12px',
                fontWeight: 500,
                letterSpacing: '0.15em',
                background: '#B8924F',
                color: '#0A0906',
                padding: isMobile ? '8px 14px' : '10px 24px',
                border: 'none',
                borderRadius: '10px',
              }}
            >
              {isMobile ? 'BOOK CALL →' : 'BOOK DISCOVERY CALL →'}
            </motion.button>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default StickyHeader;
