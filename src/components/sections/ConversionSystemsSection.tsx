import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ConversionSystemsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const systems = [
    "Consultation process optimization & treatment presentation",
    "Patient communication scripts & follow-up sequences",
    "Internal CRM workflows & lead management",
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
            Conversion Engine
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6 leading-tight">
            Inquiries Mean Nothing<br />
            <span className="text-primary">Without Accepted Cases.</span>
          </h2>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto space-y-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="text-center text-lg text-muted-foreground leading-relaxed">
            Attracting cosmetic patients means nothing if the consultation process, 
            treatment presentation, and follow-up systems can't convert interest into high-value accepted cases.
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
              Most agencies deliver leads and disappear. They never optimize what happens after the inquiry arrives.
            </p>
            <p className="text-foreground font-serif text-xl md:text-2xl">
              PASTED optimizes the entire patient journey —
              <br />from first impression to <span className="text-primary">accepted treatment plan.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConversionSystemsSection;