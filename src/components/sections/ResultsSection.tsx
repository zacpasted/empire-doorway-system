import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const results = [
  {
    name: "Dr. Drew Ballard",
    context: "Founder, Halo Veneers · Gilbert, AZ",
    stat: "$2M",
    statLabel: "aesthetic revenue · 18 months",
    detail: "3 days/week · 9 months/year",
  },
  {
    name: "Miami-Based Clinic",
    context: "Practice overhaul",
    stat: "$400K+",
    statLabel: "monthly revenue · tripled in 12 months",
    detail: "Cost per lead fell 80%",
  },
  {
    name: "Dr. Alan Clarke",
    context: "Paste Dental · NHS to practice owner",
    stat: "Forbes",
    statLabel: "+ NY Post features · Year 1",
    detail: "O-1 Visa granted",
  },
];

const ResultsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ padding: 'clamp(64px, 10vw, 120px) 0' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, rgba(185,146,79,0.02), transparent)' }} />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: APPLE_EASE }}
        >
          <div className="flex justify-center mb-6">
            <motion.div
              className="w-[40px] h-px"
              style={{ background: 'rgba(185,146,79,0.6)' }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, ease: APPLE_EASE }}
            />
          </div>
          <p className="section-label text-center justify-center mb-4">Results</p>
          <h2 className="font-serif" style={{ fontSize: '52px', color: 'var(--color-text)', lineHeight: '1.1', letterSpacing: '-0.01em' }}>
            Three practices. One system. Proof.
          </h2>
        </motion.div>

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {results.map((item, index) => (
            <motion.div
              key={item.name}
              className="flex-shrink-0 w-[85vw] md:w-auto snap-center p-8 md:p-10 transition-all duration-300 flex flex-col"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '2px',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: APPLE_EASE }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(185,146,79,0.3)';
                (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-2)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
                (e.currentTarget as HTMLElement).style.background = 'var(--color-surface)';
              }}
            >
              {/* Big stat number */}
              <p className="font-serif text-primary mb-2 leading-none" style={{ fontSize: '48px' }}>
                {item.stat}
              </p>
              <p className="font-sans mb-6" style={{ fontSize: '11px', color: 'var(--color-text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{item.statLabel}</p>

              <div className="w-full h-px mb-6" style={{ background: 'var(--color-border)' }} />

              <p className="font-sans text-primary font-medium mb-1" style={{ fontSize: '14px' }}>{item.name}</p>
              <p className="font-sans mb-3" style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{item.context}</p>
              <p className="font-serif italic mt-auto" style={{ fontSize: '14px', color: 'var(--color-text-subtle)' }}>{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
