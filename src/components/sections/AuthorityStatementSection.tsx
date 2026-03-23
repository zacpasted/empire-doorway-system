import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AuthorityStatementSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 border-y border-border/20 bg-background relative">
      <div className="container max-w-3xl mx-auto px-4">
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-2">
            What This Looks Like in Practice
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-6">
            What a PASTED partnership <span className="text-primary">typically delivers in 12 months.</span>
          </h2>

          <div className="space-y-4">
            {[
              "$500K–$1M+ annual increase in aesthetic production",
              "Higher case values without relying on volume",
              "More consistent monthly performance",
              "Patients who are pre-sold before the consult",
            ].map((item, i) => (
              <motion.p
                key={i}
                className="text-lg md:text-xl text-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              >
                {item}
              </motion.p>
            ))}
          </div>

          <div className="h-px bg-border/50 max-w-xs mx-auto" />

          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Results require implementation and collaboration — but the system is built for repeatable, measurable growth.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AuthorityStatementSection;
