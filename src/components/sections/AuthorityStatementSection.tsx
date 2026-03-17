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
            PASTED is the only partner in cosmetic dentistry
            that integrates authority, visibility, patient acquisition, and conversion
            into one <span className="text-primary">coordinated growth system.</span>
          </h2>

          <div className="h-px bg-border/50 max-w-xs mx-auto" />

          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            While most agencies see one practice at a time, PASTED operates across the entire aesthetic dentistry ecosystem.
            That perspective — working closely with many of the top clinicians and brands in the industry — creates a strategic advantage
            that cannot be replicated by traditional marketing agencies, freelancers, or consultants working in isolation.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AuthorityStatementSection;