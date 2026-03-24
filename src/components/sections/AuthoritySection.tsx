import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const statCards = [
  { value: "$100M+", label: "Aesthetic Revenue Generated" },
  { value: "41+", label: "Clinics at 8 Figures" },
  { value: "97%", label: "Partner Retention" },
  { value: "30", label: "Spots Per Year" },
];

const AuthoritySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleCTA = () => {
    trackCTAClick({ ctaId: 'authority-cta', ctaText: 'Apply for Partnership', section: 'authority' });
    document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section ref={ref} className="py-32 md:py-40 border-y border-border/30">
      <div className="container max-w-3xl mx-auto px-4">
        {/* Gold rule above label */}
        <div className="flex justify-center mb-6">
          <motion.div
            className="w-[60px] h-px bg-primary/40"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>

        <motion.p
          className="text-[10px] md:text-xs text-primary uppercase tracking-[0.3em] text-center mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          The Global Standard
        </motion.p>

        <motion.h2
          className="text-[34px] md:text-4xl lg:text-5xl font-serif text-center mb-16 leading-[1.15] md:leading-tight"
          style={{ color: '#F5F0E8' }}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          The difference between busy practices
          <br />
          and exceptional ones is structural.
        </motion.h2>

        {/* Stat cards — visual data strip */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center py-6 px-3 rounded-sm"
              style={{
                background: 'rgba(185,146,79,0.04)',
                border: '1px solid rgba(185,146,79,0.1)',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
            >
              <p className="text-2xl md:text-3xl font-serif font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Body copy — reduced, punchy */}
        <div className="space-y-8 text-[15px] md:text-lg text-muted-foreground leading-relaxed text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            There's a pattern behind the practices everyone watches. It isn't just clinical excellence. That's assumed.
          </motion.p>

          <motion.p
            className="font-serif italic text-lg md:text-xl"
            style={{ color: '#F5F0E8' }}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            The result isn't just more cases.
            <br />It's better cases. Higher fees. Stronger demand.
            <br />The freedom to practice on your terms.
          </motion.p>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <div className="w-8 h-px bg-primary/30" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.0 }}
          >
            Control over your schedule. Your case mix. Your growth. Your life.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.1 }}
          >
            When brand attracts the right patients and systems convert without friction — production rises while dependency falls. That's when practices stop chasing volume and start building something worth owning.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.2 }}
          >
            Because real success isn't measured in how busy you become. It's measured in how little the practice needs you to run.
          </motion.p>

          {/* Gold doctor names */}
          <motion.div
            className="pt-6"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.3 }}
          >
            <p className="text-primary font-medium" style={{ textShadow: '0 0 20px rgba(185,146,79,0.3)' }}>
              Dr. Jon Marashi. Dr. Brian Harris. Dr. Marshall Hanson. Dr. Drew Ballard. Dr. Sam Saleh. Dr. Rhona Eksander. Dr. Patrick McCann. Dr. Susan Prater. Dr. Michaela Tozzi. Dr. Todd Snyder. Dr. James Heaton & Dr. Michael Allen (SmileTrend). + more
            </p>
          </motion.div>
        </div>

        {/* Closing italic gold line */}
        <motion.p
          className="font-serif italic text-center mt-14 text-[15px] md:text-lg"
          style={{ color: 'rgba(185,146,79,0.7)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 1.4 }}
        >
          More authority. Better cases. Greater freedom.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <button
            onClick={handleCTA}
            className="inline-block text-sm tracking-[0.3em] uppercase text-primary-foreground bg-primary px-12 py-5 hover:bg-primary/90 transition-all duration-300"
            style={{ boxShadow: '0 0 24px rgba(185,146,79,0.15)' }}
          >
            Apply for Partnership →
          </button>
          <p className="text-xs text-muted-foreground mt-4">
            30 spots annually · Reviewed within 48 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AuthoritySection;
