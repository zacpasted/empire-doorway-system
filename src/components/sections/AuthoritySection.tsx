import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const AuthoritySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleCTA = () => {
    trackCTAClick({ ctaId: 'authority-cta', ctaText: 'Apply for Partnership', section: 'authority' });
    document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

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
          The Global Standard
        </motion.p>
        
        <motion.h2
          className="text-[34px] md:text-4xl lg:text-5xl font-serif text-center mb-[20px] md:mb-16 leading-[1.15] md:leading-tight"
          style={{ color: '#F5F0E8' }}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          The difference between busy practices
          <br />
          and exceptional ones is structural.
        </motion.h2>

        <div className="space-y-6 md:space-y-8 text-[15px] md:text-xl text-muted-foreground leading-relaxed text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            There's a pattern behind the practices everyone watches. It isn't just clinical excellence. That's assumed.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            It's positioning. Narrative. Patient selection. The ability to grow without becoming more consumed by the business.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            The result isn't just more cases.
            <br />It's better cases.
            <br />Higher fees. Stronger demand.
            <br />The freedom to practice on your terms.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.0 }}
          >
            Because the goal was never simply revenue.
            <br />It was control.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.1 }}
          >
            Control over your schedule.
            <br />Control over your case mix.
            <br />Control over your growth.
            <br />Control over your life.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.2 }}
          >
            When brand attracts the right patients and systems convert without friction — production rises while dependency falls. That's when practices stop chasing volume and start building something worth owning.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.3 }}
          >
            $100M+ in aesthetic production built on this model. Partners add $500K–$1M+ annually — while reducing how much the practice depends on them to grow.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.4 }}
          >
            Because real success isn't measured in how busy you become. It's measured in how little the practice needs you to survive.
          </motion.p>

          {/* Gold doctor names */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.5 }}
          >
            <p className="text-primary font-medium mb-4 md:mb-4" style={{ textShadow: '0 0 20px rgba(185,146,79,0.3)' }}>
              Dr. Jon Marashi. Dr. Brian Harris. Dr. Marshall Hanson. Dr. Drew Ballard. Dr. Sam Saleh. Dr. Rhona Eksander. Dr. Patrick McCann. Dr. Susan Prater. Dr. Michaela Tozzi. Dr. Todd Snyder. SmileTrend.
            </p>
          </motion.div>
        </div>

        {/* Closing italic gold line */}
        <motion.p
          className="font-serif italic text-center mt-12 text-[15px] md:text-lg"
          style={{ color: 'rgba(185,146,79,0.7)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 1.6 }}
        >
          More authority. Better cases. Greater freedom.
        </motion.p>

        {/* CTA */}
        <div className="text-center mt-10">
          <button
            onClick={handleCTA}
            className="inline-block text-sm tracking-[0.3em] uppercase text-primary-foreground bg-primary px-12 py-5 hover:bg-primary/90 transition-colors duration-300"
          >
            Apply for Partnership →
          </button>
          <p className="text-xs text-muted-foreground mt-3">
            30 spots annually · Reviewed within 48 hours
          </p>
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;
