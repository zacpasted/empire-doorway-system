import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import pastedWordmark from "@/assets/pasted-logo-wordmark.png";
import pastedEmblem from "@/assets/pasted-logo-emblem.png";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

interface StickyHeaderProps {
  onApplyClick?: () => void;
}

const StickyHeader = memo(({ onApplyClick }: StickyHeaderProps) => {
  const isMobile = useIsMobile();
  const { scrollY, viewportHeight } = useScrollPosition();
  const isVisible = scrollY > viewportHeight * 0.8;

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
            contain: 'layout style',
          }}
        >
          <div className="container max-w-6xl mx-auto px-4 md:px-12 h-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={pastedWordmark} alt="Pasted" className="h-6" />
              <div className="w-px h-4 bg-primary/30" />
              <img src={pastedEmblem} alt="Pasted emblem" className="h-6" />
            </div>

            <button
              onClick={handleClick}
              className="font-sans uppercase active:scale-[0.97] transition-transform"
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
              {isMobile ? 'DISCOVER →' : 'DISCOVER →'}
            </button>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
});

StickyHeader.displayName = 'StickyHeader';
export default StickyHeader;
