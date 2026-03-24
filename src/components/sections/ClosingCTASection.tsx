import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const ClosingCTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="apply"
      className="py-40 md:py-56 relative overflow-hidden"
      style={{
        background: `
          url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.02'/%3E%3C/svg%3E"),
          radial-gradient(ellipse 60% 50% at 50% 50%, rgba(185,146,79,0.08) 0%, transparent 70%),
          #0A0A0A
        `,
      }}
    >
      {/* Geometric corner accents */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-primary/15" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-primary/15" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-primary/15" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-primary/15" />

      <motion.div
        className="container max-w-3xl mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      >
        {/* Decorative diamond */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary/30" />
          <div className="w-2 h-2 rotate-45 border border-primary/40" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary/30" />
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-10" style={{ color: '#F5F0E8' }}>
          The practice you want.<br />
          <span className="text-primary">The partner who builds it.</span>
        </h2>
        
        <p className="text-lg text-muted-foreground mb-16 max-w-lg mx-auto leading-relaxed">
          Apply now. Every application is reviewed personally within 48 hours.
        </p>
        
        <a
          href="#eligibility-form"
          onClick={(e) => {
            e.preventDefault();
            trackCTAClick({ ctaId: 'closing-cta', ctaText: 'Apply for Partnership', section: 'closing' });
            document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
          className="inline-block text-sm tracking-[0.3em] uppercase text-primary-foreground bg-primary px-14 py-6 hover:bg-primary/90 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          style={{
            boxShadow: '0 0 40px rgba(185,146,79,0.2)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 56px rgba(185,146,79,0.35)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(185,146,79,0.2)';
          }}
        >
          Apply for Partnership →
        </a>
        
        <p className="text-xs text-muted-foreground mt-8 tracking-wide">
          30 spots · 48hr review · Strategic fit required
        </p>

        <motion.div
          className="mt-12 flex items-center justify-center gap-6 text-xs text-muted-foreground/50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span>$100M+ generated</span>
          <span className="w-1 h-1 rounded-full bg-primary/30" />
          <span>97% retention</span>
          <span className="w-1 h-1 rounded-full bg-primary/30" />
          <span>41+ at 8 figures</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ClosingCTASection;
