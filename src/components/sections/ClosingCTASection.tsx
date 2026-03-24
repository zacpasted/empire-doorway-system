import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const ClosingCTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="apply"
      className="relative overflow-hidden"
      style={{
        padding: 'clamp(80px, 12vw, 160px) 0',
        background: `
          radial-gradient(ellipse 60% 70% at 50% 50%, rgba(185,146,79,0.07) 0%, transparent 65%),
          #0A0906
        `,
      }}
    >
      {/* Geometric corner accents */}
      <div className="absolute top-8 left-8 w-12 h-12" style={{ borderTop: '1px solid rgba(185,146,79,0.15)', borderLeft: '1px solid rgba(185,146,79,0.15)' }} />
      <div className="absolute top-8 right-8 w-12 h-12" style={{ borderTop: '1px solid rgba(185,146,79,0.15)', borderRight: '1px solid rgba(185,146,79,0.15)' }} />
      <div className="absolute bottom-8 left-8 w-12 h-12" style={{ borderBottom: '1px solid rgba(185,146,79,0.15)', borderLeft: '1px solid rgba(185,146,79,0.15)' }} />
      <div className="absolute bottom-8 right-8 w-12 h-12" style={{ borderBottom: '1px solid rgba(185,146,79,0.15)', borderRight: '1px solid rgba(185,146,79,0.15)' }} />

      <motion.div
        className="container max-w-3xl mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: APPLE_EASE }}
      >
        {/* Decorative diamond */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(185,146,79,0.3))' }} />
          <div className="w-2 h-2 rotate-45" style={{ border: '1px solid rgba(185,146,79,0.4)' }} />
          <div className="w-12 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(185,146,79,0.3))' }} />
        </div>

        <h2 className="font-serif leading-tight mb-10" style={{ fontSize: 'clamp(34px, 6vw, 52px)', color: 'var(--color-text)', letterSpacing: '-0.01em', lineHeight: '1.1' }}>
          The practice you want.<br />
          <span className="text-primary">The partner who builds it.</span>
        </h2>
        
        <p className="font-serif italic mb-16 max-w-lg mx-auto" style={{ fontSize: '20px', color: 'var(--color-text-muted)', lineHeight: '1.3' }}>
          Apply now. Every application is reviewed personally within 48 hours.
        </p>
        
        <a
          href="#eligibility-form"
          onClick={(e) => {
            e.preventDefault();
            trackCTAClick({ ctaId: 'closing-cta', ctaText: 'Apply for Partnership', section: 'closing' });
            document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
          className="inline-block font-sans uppercase transition-all duration-300"
          style={{
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.2em',
            background: '#B8924F',
            color: '#0A0906',
            padding: '18px 56px',
            border: 'none',
            borderRadius: 0,
            boxShadow: '0 0 40px rgba(185,146,79,0.2)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = '#D4AA6A';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 56px rgba(185,146,79,0.35)';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = '#B8924F';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(185,146,79,0.2)';
            (e.currentTarget as HTMLElement).style.transform = 'none';
          }}
        >
          Apply for Partnership →
        </a>
        
        <p className="mt-8" style={{ fontSize: '11px', color: 'var(--color-text-muted)', letterSpacing: '0.1em' }}>
          30 spots · 48hr review · Strategic fit required
        </p>

        <motion.div
          className="mt-12 flex items-center justify-center gap-6"
          style={{ fontSize: '12px', color: 'var(--color-text-subtle)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8, ease: APPLE_EASE }}
        >
          <span>$100M+ generated</span>
          <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(185,146,79,0.3)' }} />
          <span>97% retention</span>
          <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(185,146,79,0.3)' }} />
          <span>41+ at 8 figures</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ClosingCTASection;
