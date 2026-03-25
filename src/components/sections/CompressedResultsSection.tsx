import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const results = [
  {
    name: "Dr. Drew Ballard",
    context: "Founder, Halo Veneers · Gilbert, AZ",
    narrative:
      "Drew came to us with a startup practice in a suburb no one associated with luxury dentistry. No brand equity. No patient pipeline. No systems.",
    result: "$0 → $2M in aesthetic case revenue",
    timeline: "18 months",
    outcome: "Now works 3 days/week, 9 months/year. Built a practice that runs without him.",
    quote:
      "Halo did not scale by accident. The growth, the positioning, the clarity — it all came from a rock-solid foundation.",
  },
  {
    name: "Miami-Based Clinic",
    context: "Multi-provider practice overhaul",
    narrative:
      "Fragmented marketing, no conversion infrastructure, and a cost-per-lead that made growth unprofitable. Revenue had plateaued for two years.",
    result: "$115K → $400K+ monthly revenue",
    timeline: "12 months",
    outcome: "Cost per lead fell 80%. Lead volume rose 300%. Tripled revenue without adding providers.",
    quote: null,
  },
  {
    name: "Dr. Alan Clarke",
    context: "Paste Dental · NHS associate → practice owner",
    narrative:
      "Alan was burning out as an NHS associate in the UK. He had clinical skill but zero visibility, zero differentiation, and zero leverage.",
    result: "Forbes + NY Post features · Year 1",
    timeline: "12 months",
    outcome: "O-1 Visa granted. From burnout associate to globally recognised authority.",
    quote: null,
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
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: APPLE_EASE }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">Results</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight mb-4">
            What partnership looks like when it works.
          </h2>
          <p
            className="font-sans max-w-xl mx-auto"
            style={{ fontSize: "15px", color: "var(--color-text-muted)", lineHeight: "1.7" }}
          >
            These weren't advertising wins. They were positioning, narrative, and systems wins.
            The ads followed.
          </p>
        </motion.div>

        {/* Narrative cards — stacked vertical */}
        <div className="space-y-6 md:space-y-8">
          {results.map((item, index) => (
            <motion.div
              key={item.name}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15, ease: APPLE_EASE }}
            >
              <div
                className="p-6 md:p-10"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "2px",
                }}
              >
                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h3
                      className="font-serif font-bold"
                      style={{ fontSize: "22px", color: "var(--color-text)" }}
                    >
                      {item.name}
                    </h3>
                    <p
                      className="font-sans mt-1"
                      style={{ fontSize: "13px", color: "var(--color-text-subtle)" }}
                    >
                      {item.context}
                    </p>
                  </div>
                  <div
                    className="flex-shrink-0 px-4 py-2"
                    style={{
                      background: "rgba(185,146,79,0.08)",
                      border: "1px solid rgba(185,146,79,0.2)",
                      borderRadius: "2px",
                    }}
                  >
                    <p
                      className="font-sans uppercase"
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.15em",
                        color: "var(--color-text-subtle)",
                        marginBottom: "2px",
                      }}
                    >
                      Timeline
                    </p>
                    <p
                      className="font-serif font-bold text-primary"
                      style={{ fontSize: "16px" }}
                    >
                      {item.timeline}
                    </p>
                  </div>
                </div>

                {/* Narrative */}
                <p
                  className="font-sans mb-6"
                  style={{
                    fontSize: "15px",
                    color: "var(--color-text-muted)",
                    lineHeight: "1.7",
                    maxWidth: "640px",
                  }}
                >
                  {item.narrative}
                </p>

                {/* Result headline */}
                <div
                  className="mb-5 pb-5"
                  style={{ borderBottom: "1px solid var(--color-border)" }}
                >
                  <p
                    className="font-serif font-bold"
                    style={{
                      fontSize: "clamp(24px, 4vw, 36px)",
                      color: "var(--color-text)",
                      lineHeight: "1.15",
                    }}
                  >
                    {item.result}
                  </p>
                </div>

                {/* Outcome */}
                <p
                  className="font-sans"
                  style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: "1.6" }}
                >
                  {item.outcome}
                </p>

                {/* Quote if present */}
                {item.quote && (
                  <p
                    className="font-serif italic mt-6"
                    style={{
                      fontSize: "15px",
                      color: "var(--color-text-muted)",
                      lineHeight: "1.55",
                      borderLeft: "2px solid rgba(185,146,79,0.3)",
                      paddingLeft: "16px",
                    }}
                  >
                    "{item.quote}"
                    <span
                      className="block not-italic font-sans mt-1"
                      style={{ fontSize: "12px", color: "var(--color-text-subtle)" }}
                    >
                      — {item.name}
                    </span>
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.a
            href="#eligibility-form"
            onClick={(e) => {
              e.preventDefault();
              trackCTAClick({
                ctaId: "compressed-results",
                ctaText: "Book Discovery Call",
                section: "compressed-results",
              });
              document
                .getElementById("eligibility-form")
                ?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 text-base font-medium tracking-wide uppercase bg-primary text-primary-foreground rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Book Discovery Call →</span>
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
