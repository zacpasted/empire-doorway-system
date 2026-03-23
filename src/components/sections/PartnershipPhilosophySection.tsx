import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PartnershipPhilosophySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            The Philosophy
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6 leading-tight">
            This Is the Only Model<br />
            <span className="text-primary">Built Like This.</span>
          </h2>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto space-y-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="text-center text-lg text-muted-foreground leading-relaxed">
            PASTED integrates principles most practices never touch:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Unreasonable Hospitality", detail: "Designing every patient interaction to feel extraordinary — from the first touchpoint to post-treatment follow-up." },
              { title: "Patient Experience Design", detail: "How patients feel, how they perceive value, and how trust is built before they ever walk in." },
              { title: "Wellness-Driven Environments", detail: "Aligning the physical and digital presence of your practice with what high-value cosmetic patients expect." },
              { title: "Psychological Alignment", detail: "Emotional and psychological alignment before the consult — so patients arrive ready to say yes." },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="p-6 border border-border/30 bg-card/20 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              >
                <h3 className="font-serif text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </div>

          <div className="h-px bg-border/50 max-w-xs mx-auto" />

          <div className="text-center space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Because growth doesn't just happen in ads. It happens in how patients feel,
              how they perceive value, and how trust is built before they ever walk in.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This is what increases case value, acceptance rates, and long-term patient relationships.
            </p>
          </div>

          <p className="text-center text-foreground font-serif text-xl md:text-2xl">
            Most groups help you get busier.<br />
            <span className="text-primary">PASTED rebuilds what determines how much each patient spends — and whether they refer.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipPhilosophySection;
