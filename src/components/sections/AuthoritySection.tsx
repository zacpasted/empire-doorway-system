import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const statCards = [
  { value: "$100M+", label: "Aesthetic Revenue Generated" },
  { value: "41+", label: "Clinics at 8 Figures" },
  { value: "97%", label: "Partner Retention" },
  { value: "30", label: "Spots Per Year" },
];

const AuthoritySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleCTA = () => {
    trackCTAClick({ ctaId: 'authority-cta', ctaText: 'Apply for Partnership', section: 'authority' });
    document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ padding: '120px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container max-w-3xl mx-auto px-4">
        {/* Gold rule above label */}
        <div className="flex justify-center mb-6">
          <motion.div
            className="w-[60px] h-px"
            style={{ background: 'rgba(185,146,79,0.6)' }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: APPLE_EASE }}
          />
        </div>

        <motion.p
          className="section-label text-center mb-10 justify-center"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: APPLE_EASE }}
        >
          The Global Standard
        </motion.p>

        <motion.h2
          className="text-[34px] md:text-[52px] font-serif text-center mb-16"
          style={{ color: 'var(--color-text)', lineHeight: '1.1', letterSpacing: '-0.01em' }}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: APPLE_EASE }}
        >
          The difference between busy practices
          <br />
          and exceptional ones is structural.
        </motion.h2>

        {/* Stat cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease: APPLE_EASE }}
        >
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center py-6 px-3"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border-gold)',
                borderRadius: '2px',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 + i * 0.1, ease: APPLE_EASE }}
            >
              <p className="font-serif text-primary mb-1" style={{ fontSize: '48px', lineHeight: '1' }}>{stat.value}</p>
              <p className="font-sans uppercase tracking-[0.15em]" style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Body copy */}
        <div className="space-y-8 text-center" style={{ fontSize: '16px', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.8, ease: APPLE_EASE }}
          >
            There's a pattern behind the practices everyone watches. It isn't just clinical excellence. That's assumed.
          </motion.p>

          <motion.p
            className="font-serif italic"
            style={{ color: 'var(--color-text)', fontSize: '20px', lineHeight: '1.3' }}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.9, ease: APPLE_EASE }}
          >
            The result isn't just more cases.
            <br />It's better cases. Higher fees. Stronger demand.
            <br />The freedom to practice on your terms.
          </motion.p>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <div className="w-8 h-px" style={{ background: 'rgba(185,146,79,0.3)' }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.0, ease: APPLE_EASE }}
          >
            Control over your schedule. Your case mix. Your growth. Your life.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.1, ease: APPLE_EASE }}
          >
            When brand attracts the right patients and systems convert without friction — production rises while dependency falls. That's when practices stop chasing volume and start building something worth owning.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.2, ease: APPLE_EASE }}
          >
            Because real success isn't measured in how busy you become. It's measured in how little the practice needs you to run.
          </motion.p>

          {/* Gold doctor names */}
          <motion.div
            className="pt-6"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.3, ease: APPLE_EASE }}
          >
            <p className="text-primary font-medium" style={{ textShadow: '0 0 24px rgba(185,146,79,0.25)' }}>
              Dr. Jon Marashi. Dr. Brian Harris. Dr. Marshall Hanson. Dr. Drew Ballard. Dr. Sam Saleh. Dr. Rhona Eksander. Dr. Patrick McCann. Dr. Susan Prater. Dr. Michaela Tozzi. Dr. Todd Snyder. Dr. James Heaton & Dr. Michael Allen (SmileTrend). + more
            </p>
          </motion.div>
        </div>

        {/* Closing italic gold line */}
        <motion.p
          className="font-serif italic text-center mt-14"
          style={{ color: 'rgba(185,146,79,0.7)', fontSize: '18px', lineHeight: '1.75' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 1.4, ease: APPLE_EASE }}
        >
          More authority. Better cases. Greater freedom.
        </motion.p>

        {/* CTA — square corners, hover glow */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.5, ease: APPLE_EASE }}
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
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#B8924F';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(185,146,79,0.15)';
              (e.currentTarget as HTMLElement).style.transform = 'none';
            }}
          >
            Apply for Partnership →
          </button>
          <p className="mt-4" style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
            30 spots annually · Reviewed within 48 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AuthoritySection;
