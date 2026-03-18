import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AccessStatusSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const accessPoints = [
    "Insight into what actually works at the highest level",
    "Proximity to elite standards and decision-making",
    "Access to thinking and strategy most practices never see",
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="container max-w-3xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">
            Access + Proximity
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6 leading-tight">
            Direct Access to the Top<br />
            <span className="text-primary">of the Industry.</span>
          </h2>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto space-y-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="text-center text-lg text-muted-foreground leading-relaxed">
            PASTED is not built in isolation. It is shaped by the highest-performing aesthetic practices, real production data, and real-world execution at the top level.
          </p>

          <div className="h-px bg-border/50 max-w-xs mx-auto" />

          <p className="text-center text-sm tracking-[0.2em] uppercase text-muted-foreground/60">
            Inside the Partnership, You Gain
          </p>

          <div className="space-y-4 max-w-lg mx-auto">
            {accessPoints.map((point, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3 p-4 border border-border/20 bg-card/20 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              >
                <span className="text-primary mt-0.5">▸</span>
                <span className="text-foreground/80">{point}</span>
              </motion.div>
            ))}
          </div>

          <div className="h-px bg-border/50 max-w-xs mx-auto" />

          <p className="text-center text-foreground font-serif text-xl md:text-2xl">
            This is not information.<br />
            <span className="text-primary">This is proximity.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AccessStatusSection;
