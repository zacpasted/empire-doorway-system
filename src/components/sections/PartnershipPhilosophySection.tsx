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
            Why You Win
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6 leading-tight">
            Everything Is In-House.<br />
            <span className="text-primary">Nothing Is Diluted.</span>
          </h2>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto space-y-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "No agencies, no handoffs", detail: "Everything is built and managed by one team that understands your practice deeply." },
              { title: "Built from real-world data", detail: "Not theory. Not recycled strategies. Frameworks from the top cosmetic practices in the world." },
              { title: "Elite creative + performance", detail: "Combines brand storytelling, cinematic production, behavioral psychology, and performance acquisition." },
              { title: "Focus isn't leads", detail: "It's who walks in, what they say yes to, and how much they spend." },
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

          <p className="text-center text-foreground font-serif text-xl md:text-2xl">
            This is why our partners see<br />
            <span className="text-primary">fundamentally different results.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipPhilosophySection;
