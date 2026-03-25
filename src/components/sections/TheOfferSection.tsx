import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const pillars = [
  { icon: "◆", label: "Brand" },
  { icon: "◆", label: "Content" },
  { icon: "◆", label: "Ads" },
  { icon: "◆", label: "Systems" },
  { icon: "◆", label: "Conversion" },
];

const TheOfferSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleCTA = () => {
    trackCTAClick({ ctaId: 'offer-cta', ctaText: 'Book Discovery Call', section: 'the-offer' });
    document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section ref={ref} style={{ padding: 'clamp(64px, 10vw, 120px) 0' }}>
      <div className="container max-w-3xl mx-auto px-4">
        <motion.p
          className="section-label text-center justify-center mb-4"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: APPLE_EASE }}
        >
          The Partnership <span style={{ color: 'var(--color-text-muted)', fontSize: '10px', letterSpacing: '0.2em' }}>· 30 Practices / Year</span>
        </motion.p>

        <motion.h2
          className="font-serif text-center leading-tight mb-10"
          style={{ fontSize: 'clamp(34px, 6vw, 52px)', color: 'var(--color-text)', letterSpacing: '-0.01em', lineHeight: '1.1' }}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: APPLE_EASE }}
        >
          Everything outside the chair. Handled.
        </motion.h2>

        {/* Visual pillar strip */}
        <motion.div
          className="flex items-center justify-center gap-4 md:gap-6 mb-14"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              className="flex flex-col items-center gap-1.5"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.08, ease: APPLE_EASE }}
            >
              <span className="text-[8px]" style={{ color: 'rgba(185,146,79,0.6)' }}>{p.icon}</span>
              <span className="font-sans uppercase" style={{ fontSize: '11px', letterSpacing: '0.25em', color: 'var(--color-text-muted)' }}>{p.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="space-y-7 text-center max-w-2xl mx-auto"
          style={{ fontSize: '16px', color: 'var(--color-text-muted)', lineHeight: '1.8' }}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: APPLE_EASE }}
        >
          <p>
            You have a system for every clinical procedure. Veneers. Composites. Implants. You refined it over years.
          </p>
          <p>
            <span className="font-medium" style={{ color: 'var(--color-text)' }}>PASTED</span> is that same thing — but for practice growth. One team. One system. Runs while you operate.
          </p>
          <p>
            We start with the life you want. Then we build the business to produce it. Not a copied playbook. Everything — the brand, the content, the patient systems, the growth strategy — is built around you specifically.
          </p>
        </motion.div>

        {/* Offer statement — pull quote */}
        <motion.div
          className="mt-16 mb-16 py-8 px-6 md:px-10 text-center relative"
          style={{
            background: 'var(--color-surface)',
            borderTop: '1px solid var(--color-border-gold)',
            borderBottom: '1px solid var(--color-border-gold)',
            borderRadius: '2px',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7, ease: APPLE_EASE }}
        >
          <p className="font-serif italic" style={{ fontSize: '20px', color: 'var(--color-text)', lineHeight: '1.3' }}>
            12 months. Brand, content, paid media, and conversion — all in-house. One outcome: <span className="text-primary not-italic font-bold">$500K–$1M+</span> in additional aesthetic production.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8, ease: APPLE_EASE }}
        >
          <button
            onClick={handleCTA}
            className="inline-block font-sans uppercase transition-all duration-300"
            style={{
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              background: '#B8924F',
              color: '#0A0906',
              padding: '18px 40px',
              border: 'none',
              borderRadius: 0,
              boxShadow: '0 0 24px rgba(185,146,79,0.15)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#D4AA6A';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(185,146,79,0.25)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#B8924F';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(185,146,79,0.15)';
            }}
          >
            Apply for Partnership →
          </button>
          <p className="mt-4" style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
            30 practices per year · Reviewed within 48 hours · Not all accepted
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TheOfferSection;
