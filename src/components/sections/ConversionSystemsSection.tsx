import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ConversionSystemsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const systems = [
    "Hospitality-driven consultation optimization",
    "Treatment presentation systems built on behavioral psychology",
    "Patient communication scripts & storytelling frameworks",
    "CRM workflows, follow-up sequences & lead management",
    "Team training on brand-aligned patient experience",
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background relative">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">
            Differentiation
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6 leading-tight">
            Fully In-House. One System.<br />
            <span className="text-primary">High-Value, Predictable Growth.</span>
          </h2>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto space-y-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="text-center text-lg text-muted-foreground leading-relaxed">
            Most agencies deliver leads and disappear. We optimize the entire patient journey —
            from first impression to accepted treatment plan — so more inquiries become high-value cases.
          </p>

          <div className="space-y-4 max-w-xl mx-auto">
            {systems.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3 p-4 border border-border/20 bg-card/20 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              >
                <span className="text-primary mt-0.5">▸</span>
                <span className="text-foreground/80">{item}</span>
              </motion.div>
            ))}
          </div>

          <div className="h-px bg-border/50 max-w-xs mx-auto" />

          <p className="text-center text-foreground font-serif text-xl md:text-2xl">
            Who walks in. What they say yes to.
            <br /><span className="text-primary">How much they spend.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ConversionSystemsSection;
