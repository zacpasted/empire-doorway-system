import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 md:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex justify-center mb-6">
            <motion.div
              className="w-[40px] h-px bg-primary/40"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6 }}
            />
          </div>
          <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-primary mb-4">Results</p>
          <h2 className="text-[36px] md:text-4xl lg:text-5xl font-serif leading-tight" style={{ color: '#F5F0E8' }}>
            Three practices. One system. Proof.
          </h2>
        </motion.div>

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {results.map((item, index) => (
            <motion.div
              key={item.name}
              className="flex-shrink-0 w-[85vw] md:w-auto snap-center rounded-sm p-8 md:p-10 transition-all duration-300 hover:border-primary/30 flex flex-col"
              style={{
                background: 'rgba(185,146,79,0.04)',
                border: '1px solid rgba(185,146,79,0.12)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
            >
              {/* Big stat number */}
              <p className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2 leading-none">
                {item.stat}
              </p>
              <p className="text-sm text-muted-foreground mb-6">{item.statLabel}</p>

              <div className="w-full h-px bg-border/30 mb-6" />

              <p className="text-sm text-primary font-medium mb-1">{item.name}</p>
              <p className="text-xs text-muted-foreground mb-3">{item.context}</p>
              <p className="text-sm font-serif italic text-muted-foreground/70 mt-auto">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
