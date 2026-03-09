import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PartnershipPhilosophySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const vendorTraits = [
    "They run ads.",
    "They deliver leads.",
    "They leave.",
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
            Partnership, Not Vendor
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6 leading-tight">
            Why True Partnership<br />
            <span className="text-primary">Is Non-Negotiable.</span>
          </h2>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto space-y-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Most marketing companies operate as vendors.
            </p>
            <div className="space-y-2 mb-8">
              {vendorTraits.map((trait, i) => (
                <p key={i} className="text-foreground/70 text-lg">{trait}</p>
              ))}
            </div>
          </div>

          <div className="h-px bg-border/50 max-w-xs mx-auto" />

          <div className="text-center space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              But real transformation requires much more.
              Practices don't grow because of one tactic.
            </p>
            <p className="text-foreground text-lg leading-relaxed">
              They grow when every part of the system works together:
              brand authority, content quality, advertising strategy,
              conversion systems, and patient experience.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              That level of alignment can only happen through true partnership.
            </p>
          </div>

          <div className="h-px bg-border/50 max-w-xs mx-auto" />

          <p className="text-center text-foreground font-serif text-xl md:text-2xl">
            PASTED operates inside the business alongside the doctor.<br />
            <span className="text-primary">Not outside it.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipPhilosophySection;
