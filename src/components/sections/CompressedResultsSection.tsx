import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";
import { ArrowRight } from "lucide-react";

const results = [
  {
    name: "Dr. Drew Ballard",
    context: "Founder, Halo Veneers · Gilbert, AZ",
    result: "$0 → $2M in aesthetic case revenue · 18 months",
    subResult: "Now works 3 days/week, 9 months/year",
  },
  {
    name: "Miami-Based Clinic",
    context: "Practice overhaul from fragmented growth",
    result: "$115K → $400K+ monthly revenue · tripled in 12 months",
    subResult: "Cost per lead fell 80% while lead volume rose 300%",
  },
  {
    name: "Dr. Alan Clarke",
    context: "Paste Dental · NHS associate to practice owner",
    result: "Forbes + NY Post features · Year 1 · O-1 Visa granted",
    subResult: "From burnout associate to globally recognised authority",
  },
];

const CompressedResultsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">Results</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight">
            What partnership looks like when it works.
          </h2>
        </motion.div>

        {/* Cards - horizontal scroll on mobile */}
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {results.map((item, index) => (
            <motion.div
              key={item.name}
              className="flex-shrink-0 w-[85vw] md:w-auto snap-center bg-card/50 backdrop-blur-sm border border-border/40 rounded-xl p-6 md:p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
            >
              <p className="text-sm text-primary font-medium mb-1">{item.name}</p>
              <p className="text-xs text-muted-foreground mb-4">{item.context}</p>
              <p className="text-lg md:text-xl font-serif text-foreground font-bold mb-2 leading-snug">
                {item.result}
              </p>
              <p className="text-sm text-muted-foreground/70">{item.subResult}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-muted-foreground mt-10 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          These weren't advertising wins. They were positioning, narrative, and systems wins. The ads followed.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-10 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.a
            href="#eligibility-form"
            onClick={(e) => {
              e.preventDefault();
              trackCTAClick({ ctaId: 'compressed-results', ctaText: 'Book Discovery Call', section: 'compressed-results' });
              document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 text-base font-medium tracking-wide uppercase bg-primary text-primary-foreground rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Apply for Partnership →</span>
          </motion.a>
          <p className="mt-4 text-xs text-muted-foreground/50">
            30 practices per year · Reviewed within 48 hours · Not all accepted
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CompressedResultsSection;
