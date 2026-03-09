import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const OrganicPaidSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">
            Organic + Paid
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6 leading-tight">
            One System.<br />
            <span className="text-primary">Not Two Channels.</span>
          </h2>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto space-y-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 border border-border/30 bg-card/20 rounded-lg">
              <h3 className="font-serif text-xl text-foreground mb-3">Organic Content</h3>
              <p className="text-muted-foreground leading-relaxed">
                Builds authority and trust. Positions you as the obvious choice.
                Creates the foundation that makes every dollar of ad spend more efficient.
              </p>
            </div>
            <div className="p-6 border border-border/30 bg-card/20 rounded-lg">
              <h3 className="font-serif text-xl text-foreground mb-3">Paid Media</h3>
              <p className="text-muted-foreground leading-relaxed">
                Amplifies reach and demand. Takes the content that already resonates
                and strategically deploys it to drive qualified patient interest.
              </p>
            </div>
          </div>

          <div className="h-px bg-border/50 max-w-xs mx-auto" />

          <div className="text-center space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Many agencies treat these as separate channels.
              One team does content. Another runs ads. They never talk.
            </p>
            <p className="text-foreground text-lg leading-relaxed">
              PASTED integrates them into one system.
              The same creative assets that build authority organically
              are strategically deployed in advertising to drive demand.
            </p>
          </div>

          <p className="text-center text-foreground font-serif text-xl md:text-2xl pt-4">
            This alignment is a major reason<br />
            <span className="text-primary">our campaigns perform differently.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OrganicPaidSection;
