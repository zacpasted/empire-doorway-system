import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const pillars = [
  { icon: "◆", label: "Brand" },
  { icon: "◆", label: "Content" },
  { icon: "◆", label: "Ads" },
  { icon: "◆", label: "Systems" },
  { icon: "◆", label: "Conversion" },
];

const TheOfferSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleCTA = () => {
    trackCTAClick({ ctaId: 'offer-cta', ctaText: 'Apply for Partnership', section: 'the-offer' });
    document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section ref={ref} className="py-32 md:py-40">
      <div className="container max-w-3xl mx-auto px-4">
        <motion.p
          className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-primary text-center mb-4"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          The Partnership <span className="text-muted-foreground/60 text-[10px] tracking-[0.2em]">· 30 Practices / Year</span>
        </motion.p>

        <motion.h2
          className="text-[36px] md:text-4xl lg:text-5xl font-serif text-center leading-tight mb-10"
          style={{ color: '#F5F0E8' }}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
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
              transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
            >
              <span className="text-[8px] text-primary/60">{p.icon}</span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground font-sans">{p.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="space-y-7 text-[16px] md:text-lg text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <p>
            You have a system for every clinical procedure. Veneers. Composites. Implants. You refined it over years.
          </p>
          <p>
            <span className="font-medium" style={{ color: '#F5F0E8' }}>PASTED</span> is that same thing — but for practice growth. One team. One system. Runs while you operate.
          </p>
          <p>
            We start with the life you want. Then we build the business to produce it. Not a copied playbook. Everything — the brand, the content, the patient systems, the growth strategy — is built around you specifically.
          </p>
        </motion.div>

        {/* Offer statement — pull quote */}
        <motion.div
          className="mt-16 mb-16 py-8 px-6 md:px-10 text-center relative"
          style={{
            background: 'rgba(185,146,79,0.03)',
            borderTop: '1px solid rgba(185,146,79,0.15)',
            borderBottom: '1px solid rgba(185,146,79,0.15)',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <p className="text-xl md:text-2xl font-serif italic leading-relaxed" style={{ color: '#F5F0E8' }}>
            12 months. Brand, content, paid media, and conversion — all in-house. One outcome: <span className="text-primary not-italic font-bold">$500K–$1M+</span> in additional aesthetic production.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button
            onClick={handleCTA}
            className="inline-block text-sm tracking-[0.3em] uppercase text-primary-foreground bg-primary px-12 py-5 hover:bg-primary/90 transition-all duration-300"
            style={{ boxShadow: '0 0 24px rgba(185,146,79,0.15)' }}
          >
            Apply for Partnership →
          </button>
          <p className="text-sm text-muted-foreground mt-4">
            30 practices per year · Reviewed within 48 hours · Not all accepted
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TheOfferSection;
