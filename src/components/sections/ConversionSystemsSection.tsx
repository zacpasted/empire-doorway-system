import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ConversionSystemsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const systems = [
    "Conversion systems & consultation frameworks",
    "Patient communication scripts & follow-up sequences",
    "Internal CRM workflows & lead management",
    "Team training on brand-aligned messaging",
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
            Beyond Lead Generation
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6 leading-tight">
            Most Agencies Stop at Leads.<br />
            <span className="text-primary">We Don't.</span>
          </h2>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto space-y-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="text-center text-lg text-muted-foreground leading-relaxed">
            Driving interest to your practice means nothing if the systems behind the scenes
            can't convert that interest into booked, high-value cases.
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

          <div className="text-center space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Brand is far more than a logo or Instagram feed.
            </p>
            <p className="text-foreground font-serif text-xl md:text-2xl">
              Brand is how the team communicates, how consultations are structured,
              <br />how messaging is delivered, <span className="text-primary">how patients experience the practice.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConversionSystemsSection;
