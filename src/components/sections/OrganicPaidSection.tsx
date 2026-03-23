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
            Storytelling + Ads
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6 leading-tight">
            Brand Storytelling + Paid Media.<br />
            <span className="text-primary">One Coordinated System.</span>
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
              <h3 className="font-serif text-xl text-foreground mb-3">Storytelling & Content</h3>
              <p className="text-muted-foreground leading-relaxed">
                On-location shoots, scripted storytelling, and cinematic editing that positions you as the cosmetic authority in your market.
                This is the trust foundation that makes every advertising dollar work harder.
              </p>
            </div>
            <div className="p-6 border border-border/30 bg-card/20 rounded-lg">
              <h3 className="font-serif text-xl text-foreground mb-3">Paid Media & Ads</h3>
              <p className="text-muted-foreground leading-relaxed">
                We build, manage, and optimize your entire ad strategy — deploying the same storytelling content
                as high-performing ad creative to drive qualified cosmetic patient demand at scale.
              </p>
            </div>
          </div>

          <div className="h-px bg-border/50 max-w-xs mx-auto" />

          <div className="text-center space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Most practices separate storytelling, content, and ads into different agencies that never communicate.
              The content team doesn't know what the ad team is running.
              The ad team doesn't understand the brand story.
            </p>
            <p className="text-foreground text-lg leading-relaxed">
              PASTED integrates them into one system — the same storytelling assets from on-location shoots
              are used both organically and as high-performing ad creative, all managed by one team.
            </p>
          </div>

          <p className="text-center text-foreground font-serif text-xl md:text-2xl pt-4">
            This coordination — one team, one narrative, one system — is the structural reason<br />
            <span className="text-primary">our partners outperform practices spending twice as much on isolated vendors.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OrganicPaidSection;