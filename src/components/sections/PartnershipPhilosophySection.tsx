import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PartnershipPhilosophySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const fragmentedApproach = [
    "One agency for ads.",
    "A freelancer for content.",
    "A consultant for strategy.",
    "None of them talk to each other.",
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
            Strategic Partnership, Not Vendor
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6 leading-tight">
            Why One Unified System<br />
            <span className="text-primary">Outperforms Fragmentation.</span>
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
              Most practices try to grow through disconnected efforts:
            </p>
            <div className="space-y-2 mb-8">
              {fragmentedApproach.map((trait, i) => (
                <p key={i} className="text-foreground/70 text-lg">{trait}</p>
              ))}
            </div>
          </div>

          <div className="h-px bg-border/50 max-w-xs mx-auto" />

          <div className="text-center space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Real growth requires every part of the system working in coordination —
              authority positioning, content quality, patient acquisition strategy,
              conversion systems, and ongoing strategic advisory.
            </p>
            <p className="text-foreground text-lg leading-relaxed">
              That level of alignment only happens through a true strategic partnership,
              not a collection of random vendors.
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