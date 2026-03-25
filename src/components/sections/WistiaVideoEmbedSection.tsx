import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWistiaLoader, getWistiaPlaceholderStyles } from "@/hooks/use-wistia";
import { Play } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";

interface WistiaVideoEmbedSectionProps {
  title?: string;
  subtitle?: string;
  videoIds?: string[];
  initialVisibleCount?: number;
}

const credentialBrands = [
  "DISNEY", "PARAMOUNT", "FOUR SEASONS", "YVES SAINT LAURENT",
  "ACME HOTELS", "LUXURY HOSPITALITY", "EDITORIAL BRANDS", "GLOBAL CAMPAIGNS"
];

const CinematicCredentialStrip = () => {
  const isMobile = useIsMobile();
  return (
    <div className="mb-8">
      <div
        className="w-full flex items-center justify-center md:justify-start gap-3 overflow-hidden"
        style={{
          height: isMobile ? 32 : 36,
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <span className="shrink-0 font-sans uppercase" style={{ fontSize: '11px', letterSpacing: '0.18em', color: 'var(--color-text-muted)' }}>
          Produced For
        </span>
        {isMobile ? (
          <span className="font-sans uppercase truncate" style={{ fontSize: '11px', letterSpacing: '0.18em', color: 'var(--color-text-muted)' }}>
            {credentialBrands.slice(0, 4).map((b, i) => (
              <span key={b}>
                {i > 0 && <span style={{ color: 'rgba(185,146,79,0.6)' }}> · </span>}
                {b}
              </span>
            ))}
          </span>
        ) : (
          <div className="overflow-hidden flex-1 relative">
            <div className="animate-marquee-credentials whitespace-nowrap">
              {[...credentialBrands, ...credentialBrands].map((b, i) => (
                <span key={i} className="font-sans uppercase" style={{ fontSize: '11px', letterSpacing: '0.18em', color: 'var(--color-text-muted)' }}>
                  {i > 0 && <span style={{ color: 'rgba(185,146,79,0.6)' }}> · </span>}
                  {b}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <p className="font-serif italic text-center mt-4 max-w-xl mx-auto" style={{ fontSize: '16px', color: 'rgba(185,146,79,0.7)', lineHeight: '1.3' }}>
        This is storytelling as infrastructure. It compounds. It attracts. It closes.
      </p>
    </div>
  );
};

const PastedStudioCTA = () => (
  <div className="mt-14 pt-10 text-center" style={{ borderTop: '1px solid var(--color-border-gold)' }}>
    <p className="font-sans uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '0.25em', color: 'var(--color-text-subtle)' }}>
      PASTED Studio
    </p>
    <p className="font-sans mx-auto mb-6 max-w-[400px]" style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
      Looking for cinematic production without the full partnership? Our studio team is available for select projects.
    </p>
    <button
      onClick={() => {
        trackCTAClick({ ctaId: "pasted-studio-cta", ctaText: "Learn More About Filming with Pasted", section: "content-examples" });
        document.getElementById("eligibility-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }}
      className="inline-block font-sans uppercase transition-all duration-300"
      style={{
        fontSize: '12px',
        fontWeight: 500,
        letterSpacing: '0.18em',
        color: '#B8924F',
        border: '1px solid rgba(185,146,79,0.5)',
        background: 'transparent',
        padding: '14px 28px',
        borderRadius: 0,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(185,146,79,0.06)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(185,146,79,0.8)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = 'transparent';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(185,146,79,0.5)';
      }}
    >
      Book a Studio Consultation →
    </button>
  </div>
);

const WistiaVideoEmbedSection = ({ 
  title = "See It In Action",
  subtitle = "Real examples from our work",
  videoIds = [],
  initialVisibleCount = 3
}: WistiaVideoEmbedSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const visibleVideoIds = showAll ? videoIds : videoIds.slice(0, initialVisibleCount);
  const hiddenCount = videoIds.length - initialVisibleCount;
  const hasMore = hiddenCount > 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1, rootMargin: '200px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useWistiaLoader(visibleVideoIds, { loadOnMount: isVisible });

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ padding: 'clamp(64px, 10vw, 120px) 0' }}>
      <div className="container max-w-6xl mx-auto px-4">
        <CinematicCredentialStrip />

        <div className="text-center mb-16">
          <p className={`section-label text-center justify-center mb-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            The Creative
          </p>
          <h2
            className={`font-serif font-bold mb-4 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ fontSize: 'clamp(34px, 6vw, 52px)', color: 'var(--color-text)', lineHeight: '1.1', letterSpacing: '-0.01em' }}
          >
            Story first. Always.
          </h2>
          <p className={`font-serif italic max-w-2xl mx-auto mb-8 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ fontSize: '20px', color: 'var(--color-text-muted)', lineHeight: '1.3' }}
          >
            Clinical excellence earns respect. Storytelling earns demand.
          </p>

          <div className="max-w-[680px] mx-auto space-y-6 mb-10 text-center" style={{ fontSize: '16px', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
            <p>Aesthetic dentistry is an emotional purchase. Patients aren't comparing prep designs. They're choosing confidence. Identity. Transformation. That decision is shaped long before consultation — through the signals your brand sends.</p>
            <p>The quality of your content becomes the perceived quality of your work. The way you present becomes the way patients expect to be treated.</p>
          </div>

          <div className="space-y-3 mb-10">
            {["Scripted.", "Shot.", "Edited.", "Deployed."].map((line) => (
              <p key={line} className="font-serif italic" style={{ fontSize: '22px', color: 'var(--color-text)', lineHeight: '1.3', opacity: 0.8 }}>{line}</p>
            ))}
          </div>

          <div className="max-w-[680px] mx-auto space-y-6 mb-10 text-center" style={{ fontSize: '16px', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
            <p>Not as content — but as positioning. Because even a small increase in emotional connection compounds. A one percent increase in trust changes conversion. Conversion changes case value. Case value changes the trajectory of the practice.</p>
            <p>This is not content production. It's narrative architecture. We don't just show what you do. We show why it matters — and why it's different.</p>
          </div>

          <p className="font-serif italic text-center max-w-xl mx-auto" style={{ fontSize: '16px', color: 'rgba(185,146,79,0.7)', lineHeight: '1.75' }}>
            When your story elevates, your perceived value follows.
          </p>
        </div>

        {/* Video Grid */}
        <div className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {videoIds.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {visibleVideoIds.map((videoId, index) => (
                    <motion.div
                      key={videoId}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="relative overflow-hidden aspect-[9/16] group transition-all duration-300"
                      style={{ border: '1px solid var(--color-border)', borderRadius: '2px', background: 'var(--color-surface)' }}
                    >
                      <style>{getWistiaPlaceholderStyles(videoId, '177.78%')}</style>
                      {/* @ts-ignore */}
                      <wistia-player media-id={videoId} aspect="0.5625" autoplay="false" end-video-behavior="default"></wistia-player>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {hasMore && !showAll && (
                <motion.div className="mt-10 flex justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <button
                    onClick={() => setShowAll(true)}
                    className="group flex items-center gap-3 font-sans uppercase transition-all duration-300"
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      letterSpacing: '0.18em',
                      color: '#B8924F',
                      border: '1px solid rgba(185,146,79,0.5)',
                      background: 'transparent',
                      padding: '14px 32px',
                      borderRadius: 0,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(185,146,79,0.06)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(185,146,79,0.8)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(185,146,79,0.5)';
                    }}
                  >
                    <span>Show More Work</span>
                    <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="relative overflow-hidden aspect-[9/16] flex items-center justify-center" style={{ border: '2px dashed var(--color-border)', borderRadius: '2px', background: 'var(--color-surface)' }}>
                  <div className="text-center p-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'var(--color-surface-2)' }}>
                      <Play className="w-8 h-8" style={{ color: 'var(--color-text-muted)' }} />
                    </div>
                    <p className="font-sans" style={{ fontSize: '14px', color: 'var(--color-text-subtle)' }}>Wistia Video {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <PastedStudioCTA />
      </div>
    </section>
  );
};

export default WistiaVideoEmbedSection;
