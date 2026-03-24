import { useState, useEffect } from "react";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";

interface StickyHeaderProps {
  onApplyClick?: () => void;
}

const StickyHeader = ({ onApplyClick }: StickyHeaderProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (approximately 100vh)
      const heroHeight = window.innerHeight;
      setIsVisible(window.scrollY > heroHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    trackCTAClick({ ctaId: 'sticky-header', ctaText: 'Apply for Partnership', section: 'header' });
    if (onApplyClick) {
      onApplyClick();
    } else {
      document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-background/90 backdrop-blur-xl border-b border-primary/10">
        <div className="container max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[13px] tracking-[0.25em] uppercase text-foreground font-semibold font-display">
              PASTED
            </span>
            <span className="hidden sm:inline text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50">
              Private Growth Partnership
            </span>
          </div>

           <button
            onClick={handleClick}
            className="px-5 py-2 bg-primary text-primary-foreground text-[11px] tracking-[0.2em] uppercase font-semibold rounded-sm transition-all duration-200 hover:bg-primary/90 active:scale-[0.98]"
          >
            APPLY FOR PARTNERSHIP →
          </button>
        </div>
      </div>
    </header>
  );
};

export default StickyHeader;
