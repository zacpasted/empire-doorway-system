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
      className="py-36 md:py-52 relative overflow-hidden"
      style={{
        background: `
          url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.02'/%3E%3C/svg%3E"),
          radial-gradient(ellipse 60% 50% at 50% 50%, rgba(185,146,79,0.08) 0%, transparent 70%),
          #0A0A0A
        `,
      }}
    >
      <motion.div
        className="container max-w-3xl mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      >
        <p className="section-label text-xs tracking-[0.4em] uppercase text-primary mb-6">
          This Is Where Your Arc Begins
        </p>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight mb-8">
          The practice you want.<br />
          <span className="text-primary">The partner who builds it.</span>
        </h2>
        
        <p className="text-lg text-muted-foreground mb-6 max-w-xl mx-auto">
          The clinical excellence is already there. The ambition is already there. What's been missing is a partner as invested in your potential as you are.
        </p>
        
        <p className="text-lg text-muted-foreground mb-16 max-w-xl mx-auto">
          Apply now. Every application is reviewed personally by Zac and Alan within 48 hours. If we're not the right fit, we'll tell you directly — and tell you exactly why.
        </p>
        
        <a
          href="#eligibility-form"
          onClick={(e) => {
            e.preventDefault();
            trackCTAClick({ ctaId: 'closing-cta', ctaText: 'Apply for Partnership', section: 'closing' });
            document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
          className="inline-block text-sm tracking-[0.3em] uppercase text-primary-foreground bg-primary px-12 py-5 hover:bg-primary/90 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          style={{
            boxShadow: '0 0 32px rgba(185,146,79,0.2)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 48px rgba(185,146,79,0.35)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 32px rgba(185,146,79,0.2)';
          }}
        >
          Apply for Partnership →
        </a>
        
        <p className="text-sm text-muted-foreground mt-8">
          30 practices per year · Reviewed within 48 hours · Strategic fit required · Not all accepted
        </p>

        <motion.p
          className="text-xs mt-3"
          style={{ color: 'rgba(255,255,255,0.45)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          $100M+ in aesthetic revenue driven · 97% client retention · 30 practices per year
        </motion.p>
      </motion.div>
    </section>
  );
};

export default ClosingCTASection;
