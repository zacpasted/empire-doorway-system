import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const DreamLifeSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.015] to-transparent" />

      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">
            Alignment
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6 leading-tight">
            Build the Practice — And the Life —<br />
            <span className="text-primary">You Actually Want.</span>
          </h2>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto space-y-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="text-center text-lg text-muted-foreground leading-relaxed">
            A better practice is not just more revenue.
          </p>

          <div className="space-y-3 max-w-md mx-auto py-4">
            {[
              "Better patients.",
              "Better systems.",
              "Better days inside your business.",
            ].map((q, i) => (
              <motion.p
                key={i}
                className="text-center text-foreground text-xl md:text-2xl font-serif"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
              >
                {q}
              </motion.p>
            ))}
          </div>

          <div className="h-px bg-border/50 max-w-xs mx-auto" />

          <p className="text-center text-foreground font-serif text-xl md:text-2xl">
            PASTED exists to build practices that<br />
            <span className="text-primary">perform at a high level — and feel like it too.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DreamLifeSection;
