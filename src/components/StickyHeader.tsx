import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
    trackCTAClick({ ctaId: 'sticky-header', ctaText: 'Request Access', section: 'header' });
    if (onApplyClick) {
      onApplyClick();
    } else {
      document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth' });
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
      <div className="bg-background/80 backdrop-blur-lg border-b border-border/40">
        <div className="container max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm tracking-[0.2em] uppercase text-foreground font-medium">
              PASTED
            </span>
            <span className="hidden sm:inline text-muted-foreground text-sm">
              Associate to Empire™
            </span>
          </div>

          <Button
            variant="premium"
            size="sm"
            className="rounded-md"
            onClick={handleClick}
          >
            Request Access
          </Button>
        </div>
      </div>
    </header>
  );
};

export default StickyHeader;
