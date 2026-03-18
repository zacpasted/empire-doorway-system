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
            A Singular Position
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight">
            PASTED is not a marketing agency.<br />
            It is a private growth infrastructure for<br />
            <span className="text-primary">category-leading cosmetic practices.</span>
          </h2>

          <div className="h-px bg-border/50 max-w-xs mx-auto" />

          <div className="space-y-6 max-w-2xl mx-auto">
            <p className="text-lg text-foreground leading-relaxed">
              Typical outcome: <span className="text-primary font-serif text-2xl">$500K–$1M+</span> increase in aesthetic case revenue within 12 months.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              More predictable months. Higher-value cases. Less reliance on volume.
              Execution and collaboration matter — but the system is built to produce measurable growth.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AuthorityStatementSection;
