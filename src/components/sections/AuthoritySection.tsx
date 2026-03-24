import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AuthoritySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 md:py-36 border-y border-border/30">
      <div className="container max-w-3xl mx-auto px-4">
        {/* Gold rule above label */}
        <div className="flex justify-center mb-4">
          <div className="w-[60px] h-px bg-primary/40" />
        </div>

        <motion.p
          className="section-label text-primary uppercase tracking-[0.3em] text-sm text-center mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          The Only Partner Like This <span className="text-muted-foreground/60 text-xs tracking-[0.2em]">· $100M+ Driven</span>
        </motion.p>
        
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground text-center mb-16 leading-tight"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Look at your Instagram right now. The cosmetic dentists you follow, respect, and compare yourself to — many of them are in this partnership. This is where that level gets built.
        </motion.h2>

        <div className="space-y-10 text-lg md:text-xl text-muted-foreground leading-relaxed">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <p className="text-primary font-medium mb-4" style={{ textShadow: '0 0 20px rgba(185,146,79,0.3)' }}>
              Dr. Jon Marashi. Dr. Brian Harris. Dr. Marshall Hanson. Dr. Drew Ballard. Dr. Sam Saleh. Dr. Rhona Eksander. Dr. Patrick McCann. SmileTrend.
            </p>
            <p>We built these practices from the inside. Not as an agency. As a partner.</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            The $100M+ in aesthetic revenue we've driven comes from our partner accounts. We track every case, every campaign, every result. We own these numbers.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.1 }}
          >
            We take 30 practices per year. Not because we can't take more — because real partnership requires full attention. Thirty is what makes the results possible.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;
