import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CredibilitySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "97%", label: "Client Retention Rate", detail: "Since 2019" },
    { value: "4-5+", label: "Years Average Tenure", detail: "Not campaigns — partnerships" },
    { value: "$100M+", label: "Aesthetic Case Revenue", detail: "Driven across our ecosystem" },
    { value: "30", label: "Practices Per Year", detail: "Selectivity is structural" },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="container max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">
            The Track Record
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6 leading-tight">
            We See the Entire Ecosystem.<br />
            <span className="text-primary">Most Agencies See One Practice.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            PASTED has a level of access and perspective that traditional agencies simply don't have —
            because we work closely with many of the top clinicians and brands in aesthetic dentistry.
            That ecosystem view informs every strategy we build.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 border border-border/30 bg-card/20 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <p className="text-3xl md:text-4xl font-serif text-primary mb-2">{stat.value}</p>
              <p className="text-sm text-foreground font-medium mb-1">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            While most agencies see one practice at a time, PASTED operates across the entire aesthetic dentistry landscape.
            That perspective — across the best clinicians, the most competitive markets, and the highest-performing brands — gives our partners an unfair advantage.
          </p>
          <p className="text-foreground font-serif text-xl md:text-2xl">
            Retention this high doesn't happen without real results.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CredibilitySection;