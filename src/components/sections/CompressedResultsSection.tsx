import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";
import { ArrowRight } from "lucide-react";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const results = [
  {
    name: "Dr. Drew Ballard",
    label: "Startup → Category Leader",
    context: "Founder, Halo Veneers · Gilbert, AZ",
    before: {
      headline: "Zero",
      details: ["No brand equity", "No patient pipeline", "No systems", "Suburb with no luxury association"],
    },
    after: {
      headline: "$2M+",
      details: ["Aesthetic case revenue in 18 months", "Works 3 days/week, 9 months/year", "Practice runs without him"],
    },
    narrative:
      "Drew didn't need more marketing. He needed an entirely new structure — brand, systems, positioning, and demand generation built from nothing in a suburb no one associated with cosmetic dentistry. We built Halo from the ground up.",
    whatWeBuilt: ["Full brand identity & positioning", "Conversion infrastructure", "Content & ad systems", "Operational framework"],
    quote: "Halo did not scale by accident. The growth, the positioning, the clarity — it all came from a rock-solid foundation… Zac has been my partner for 5 years making it happen.",
  },
  {
    name: "Miami-Based Clinic",
    label: "Plateau → Breakout",
    context: "Multi-provider practice · Revenue stalled for 2 years",
    before: {
      headline: "$115K/mo",
      details: ["Fragmented marketing", "No conversion infrastructure", "Unprofitable cost-per-lead", "Two-year revenue plateau"],
    },
    after: {
      headline: "$400K+/mo",
      details: ["Revenue tripled in 12 months", "Cost per lead fell 80%", "Lead volume rose 300%", "No new providers added"],
    },
    narrative:
      "This wasn't a traffic problem. It was a systems problem. The leads existed — but the infrastructure to convert them didn't. We rebuilt the entire funnel: positioning, ad creative, follow-up sequences, and conversion workflows.",
    whatWeBuilt: ["Ad strategy & creative overhaul", "Lead conversion infrastructure", "Follow-up automation", "Revenue attribution system"],
    quote: null,
  },
  {
    name: "Dr. Alan Clarke",
    label: "Burnout → Global Authority",
    context: "Paste Dental · NHS associate → practice owner",
    before: {
      headline: "Invisible",
      details: ["Burning out as NHS associate", "Zero visibility", "Zero differentiation", "No leverage or positioning"],
    },
    after: {
      headline: "Global Authority",
      details: ["Forbes + NY Post features in Year 1", "O-1 Visa granted", "Practice owner", "International recognition"],
    },
    narrative:
      "Alan wasn't failing — he was trapped. Excellent clinical skills with no brand infrastructure meant he was building someone else's equity. We gave him a voice, a narrative, and a platform that matched his ability.",
    whatWeBuilt: ["Personal brand architecture", "PR & media strategy", "Content positioning system", "Authority narrative framework"],
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
        {/* Header */}
        <motion.div
          className="text-center mb-16"
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
            These weren't advertising wins. They were positioning, narrative, and systems wins. The ads followed.
          </p>
        </motion.div>

        {/* Result cards */}
        <div className="space-y-10 md:space-y-14">
          {results.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + index * 0.2, ease: APPLE_EASE }}
            >
              <div
                className="overflow-hidden"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "2px",
                }}
              >
                {/* Top bar — label */}
                <div
                  className="px-6 md:px-10 py-3 flex items-center justify-between"
                  style={{ borderBottom: "1px solid var(--color-border)", background: "rgba(185,146,79,0.04)" }}
                >
                  <span
                    className="font-sans uppercase"
                    style={{ fontSize: "11px", letterSpacing: "0.2em", color: "hsl(var(--primary))" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="font-sans"
                    style={{ fontSize: "12px", color: "var(--color-text-subtle)" }}
                  >
                    {item.context}
                  </span>
                </div>

                <div className="p-6 md:p-10">
                  {/* Name */}
                  <h3
                    className="font-serif font-bold mb-5"
                    style={{ fontSize: "24px", color: "var(--color-text)" }}
                  >
                    {item.name}
                  </h3>

                  {/* Before → After visual */}
                  <div className="grid md:grid-cols-2 gap-0 mb-8" style={{ borderRadius: "2px", overflow: "hidden" }}>
                    {/* Before */}
                    <div
                      className="p-5 md:p-6"
                      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)" }}
                    >
                      <p
                        className="font-sans uppercase mb-3"
                        style={{ fontSize: "10px", letterSpacing: "0.2em", color: "var(--color-text-subtle)" }}
                      >
                        Before PASTED
                      </p>
                      <p
                        className="font-serif font-bold mb-3"
                        style={{ fontSize: "clamp(28px, 5vw, 40px)", color: "var(--color-text-muted)", lineHeight: "1.1" }}
                      >
                        {item.before.headline}
                      </p>
                      <ul className="space-y-1.5">
                        {item.before.details.map((d) => (
                          <li key={d} className="flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: "var(--color-text-subtle)" }} />
                            <span className="font-sans" style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: "1.5" }}>
                              {d}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* After */}
                    <div
                      className="p-5 md:p-6"
                      style={{ background: "rgba(185,146,79,0.04)", border: "1px solid rgba(185,146,79,0.15)" }}
                    >
                      <p
                        className="font-sans uppercase mb-3"
                        style={{ fontSize: "10px", letterSpacing: "0.2em", color: "hsl(var(--primary))" }}
                      >
                        After PASTED
                      </p>
                      <p
                        className="font-serif font-bold mb-3 text-primary"
                        style={{ fontSize: "clamp(28px, 5vw, 40px)", lineHeight: "1.1" }}
                      >
                        {item.after.headline}
                      </p>
                      <ul className="space-y-1.5">
                        {item.after.details.map((d) => (
                          <li key={d} className="flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full mt-2 flex-shrink-0 bg-primary" />
                            <span className="font-sans" style={{ fontSize: "13px", color: "var(--color-text)", lineHeight: "1.5" }}>
                              {d}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Narrative */}
                  <p
                    className="font-sans mb-6"
                    style={{
                      fontSize: "15px",
                      color: "var(--color-text-muted)",
                      lineHeight: "1.75",
                      maxWidth: "680px",
                    }}
                  >
                    {item.narrative}
                  </p>

                  {/* What we built */}
                  <div className="mb-6">
                    <p
                      className="font-sans uppercase mb-3"
                      style={{ fontSize: "10px", letterSpacing: "0.2em", color: "var(--color-text-subtle)" }}
                    >
                      What we built
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.whatWeBuilt.map((s) => (
                        <span
                          key={s}
                          className="font-sans"
                          style={{
                            fontSize: "12px",
                            color: "var(--color-text-muted)",
                            border: "1px solid var(--color-border)",
                            padding: "5px 12px",
                            borderRadius: "1px",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  {item.quote && (
                    <div
                      className="mt-6 pt-6"
                      style={{ borderTop: "1px solid var(--color-border)" }}
                    >
                      <p
                        className="font-serif italic"
                        style={{
                          fontSize: "16px",
                          color: "var(--color-text-muted)",
                          lineHeight: "1.6",
                          borderLeft: "2px solid rgba(185,146,79,0.4)",
                          paddingLeft: "20px",
                          maxWidth: "600px",
                        }}
                      >
                        "{item.quote}"
                      </p>
                      <p
                        className="font-sans mt-2"
                        style={{ fontSize: "12px", color: "var(--color-text-subtle)", paddingLeft: "22px" }}
                      >
                        — {item.name}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-14 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
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
              document.getElementById("eligibility-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 text-base font-medium tracking-wide uppercase bg-primary text-primary-foreground rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Book Discovery Call</span>
            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
