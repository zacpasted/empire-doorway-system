import { useState, useEffect } from "react";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";
import pastedWordmark from "@/assets/pasted-logo-wordmark.png";
import pastedEmblem from "@/assets/pasted-logo-emblem.png";

interface StickyHeaderProps {
  onApplyClick?: () => void;
}

const StickyHeader = ({ onApplyClick }: StickyHeaderProps) => {
  const [isVisible, setIsVisible] = useState(false);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
      style={{
        height: '64px',
        background: isVisible ? 'rgba(10, 9, 6, 0.92)' : 'transparent',
        backdropFilter: isVisible ? 'blur(24px)' : 'none',
        borderBottom: isVisible ? '1px solid var(--color-border)' : '1px solid transparent',
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
          className="font-sans uppercase transition-all duration-300"
          style={{
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.18em',
            background: '#B8924F',
            color: '#0A0906',
            padding: '10px 24px',
            border: 'none',
            borderRadius: 0,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = '#D4AA6A';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = '#B8924F';
          }}
        >
          BOOK DISCOVERY CALL →
        </button>
      </div>
    </header>
  );
};

export default StickyHeader;
