import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const results = [
  {
    name: "Dr. Drew Ballard",
    context: "Founder, Halo Veneers · Phoenix, AZ",
    result: "$0 → $2M in aesthetic case revenue · 18 months",
    subResult: "Now works 3 days/week, 9 months/year",
  },
  {
    name: "Miami-Based Clinic",
    context: "Practice overhaul from fragmented growth",
    result: "$115K → $400K+ monthly revenue · tripled in 12 months",
    subResult: "Cost per lead fell 80% while lead volume rose 300%",
  },
  {
    name: "Dr. Alan Clarke",
    context: "Paste Dental · NHS associate to practice owner",
    result: "Forbes + NY Post features · Year 1 · O-1 Visa granted",
    subResult: "From burnout associate to globally recognised authority",
  },
];

const ResultsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-34 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label text-xs tracking-[0.4em] uppercase text-primary mb-4">Results</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight">
            Three practices. One system. Proof.
          </h2>
        </motion.div>

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {results.map((item, index) => (
            <motion.div
              key={item.name}
              className="flex-shrink-0 w-[85vw] md:w-auto snap-center rounded-xl p-6 md:p-8 transition-all duration-300 hover:border-primary/35"
              style={{
                background: 'linear-gradient(135deg, rgba(185,146,79,0.05) 0%, transparent 60%)',
                border: '1px solid rgba(185,146,79,0.12)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
            >
              <p className="text-sm text-primary font-medium mb-1">{item.name}</p>
              <p className="text-xs text-muted-foreground mb-4">{item.context}</p>
              <p className="text-xl md:text-2xl font-serif text-foreground font-bold mb-2 leading-snug">
                {item.result}
              </p>
              <p className="text-sm text-muted-foreground/70">{item.subResult}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-muted-foreground mt-10 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Different starting points. Same system. Same direction.
        </motion.p>
      </div>
    </section>
  );
};

export default ResultsSection;
