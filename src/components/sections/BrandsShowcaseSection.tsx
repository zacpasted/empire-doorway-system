import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { brands } from "@/data/brands";
import OptimizedImage from "@/components/ui/optimized-image";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";
import { motion, useInView } from "framer-motion";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

// Featured case studies with narrative arcs
const featuredNarratives = [
  {
    slug: "onlyfangs",
    before: "Viral attention with no structure.",
    after: "A monetizable brand that scales beyond geography.",
    pullQuote: "Momentum without architecture is just noise with an expiry date.",
  },
  {
    slug: "dr-michaela-tozzi",
    before: "Exceptional clinical work, invisible brand.",
    after: "The definitive authority in luxury cosmetic dentistry.",
    pullQuote: "Her work was already elite. The brand just hadn't caught up.",
  },
  {
    slug: "dr-meg-rascius",
    before: "Philosophy of gentle refinement, no visual identity to match.",
    after: "A timeless brand system spanning digital, print, and clinic design.",
    pullQuote: "An identity that feels enduring, graceful, and distinctly rooted in care.",
  },
  {
    slug: "dr-jake-bateman",
    before: "Exceptional skill, no brand presence to match.",
    after: "Elevated identity projecting established authority and sophistication.",
    pullQuote: "The system embodies confidence, clarity, and refinement.",
  },
  {
    slug: "dr-serena-wong",
    before: "Quality without visibility. Demand without alignment.",
    after: "A unified identity that attracts the right patients effortlessly.",
    pullQuote: "The brand began to work for her instead of demanding more from her.",
  },
  {
    slug: "dr-nakul-ratra",
    before: "Distinctive philosophy, zero brand infrastructure.",
    after: "An identity rooted in warmth, restraint, and natural sophistication.",
    pullQuote: "Beauty already exists within structure. His role is to bring it forward.",
  },
];

const BrandsShowcaseSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="brands-showcase"
      style={{ padding: "clamp(64px, 10vw, 120px) 0", background: "var(--color-surface)" }}
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: APPLE_EASE }}
        >
          <p className="section-label text-center justify-center mb-4">The Brand</p>
          <h2
            className="font-serif font-bold mb-5"
            style={{
              fontSize: "clamp(34px, 6vw, 52px)",
              color: "var(--color-text)",
              lineHeight: "1.1",
              letterSpacing: "-0.01em",
            }}
          >
            Brand is not decoration. It's direction.
          </h2>
          <p
            className="font-serif italic max-w-2xl mx-auto"
            style={{ fontSize: "20px", color: "var(--color-text-muted)", lineHeight: "1.3" }}
          >
            Every practice below came to us at a different stage. Every one left with something
            they didn't have before: clarity.
          </p>
        </motion.div>

        {/* Body intro */}
        <motion.div
          className="text-center max-w-[640px] mx-auto mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p
            className="font-sans"
            style={{ fontSize: "15px", color: "var(--color-text-muted)", lineHeight: "1.8" }}
          >
            We don't run templates. We recruit from fashion, film, and hospitality — then build
            identities so distinct they redefine the category. These are real transformations.
          </p>
        </motion.div>

        {/* Featured narrative cards — 2-col grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {featuredNarratives.map((narrative, index) => {
            const brand = brands.find((b) => b.slug === narrative.slug);
            if (!brand) return null;

            return (
              <motion.div
                key={brand.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + index * 0.1, ease: APPLE_EASE }}
              >
                <Link
                  to={`/case-study/${brand.slug}`}
                  className="group block h-full transition-all duration-400"
                  style={{
                    background: "var(--color-bg)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "2px",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(185,146,79,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                  }}
                >
                  {/* Thumbnail */}
                  <div className="aspect-[16/9] overflow-hidden">
                    <OptimizedImage
                      src={brand.thumbnail}
                      alt={brand.name}
                      wrapperClassName="w-full h-full"
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>

                  {/* Narrative content */}
                  <div className="p-6 md:p-8">
                    {/* Name + tagline */}
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <h3
                          className="font-serif font-bold group-hover:text-primary transition-colors"
                          style={{ fontSize: "22px", color: "var(--color-text)" }}
                        >
                          {brand.name}
                        </h3>
                        <p
                          className="font-sans mt-1"
                          style={{ fontSize: "13px", color: "var(--color-text-subtle)" }}
                        >
                          {brand.tagline}
                        </p>
                      </div>
                      <ArrowRight
                        className="w-5 h-5 flex-shrink-0 mt-1 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                      />
                    </div>

                    {/* Before → After arc */}
                    <div
                      className="mb-5 p-4"
                      style={{
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "2px",
                      }}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <span
                          className="font-sans uppercase flex-shrink-0 mt-0.5"
                          style={{
                            fontSize: "10px",
                            letterSpacing: "0.15em",
                            color: "var(--color-text-subtle)",
                          }}
                        >
                          Before
                        </span>
                        <p
                          className="font-sans"
                          style={{ fontSize: "14px", color: "var(--color-text-muted)" }}
                        >
                          {narrative.before}
                        </p>
                      </div>
                      <div
                        className="w-full h-px mb-3"
                        style={{ background: "var(--color-border)" }}
                      />
                      <div className="flex items-start gap-3">
                        <span
                          className="font-sans uppercase flex-shrink-0 mt-0.5"
                          style={{
                            fontSize: "10px",
                            letterSpacing: "0.15em",
                            color: "hsl(var(--primary))",
                          }}
                        >
                          After
                        </span>
                        <p
                          className="font-sans font-medium"
                          style={{ fontSize: "14px", color: "var(--color-text)" }}
                        >
                          {narrative.after}
                        </p>
                      </div>
                    </div>

                    {/* Pull quote */}
                    <p
                      className="font-serif italic"
                      style={{
                        fontSize: "15px",
                        color: "var(--color-text-muted)",
                        lineHeight: "1.5",
                        borderLeft: "2px solid rgba(185,146,79,0.3)",
                        paddingLeft: "16px",
                      }}
                    >
                      "{narrative.pullQuote}"
                    </p>

                    {/* Services */}
                    <div className="flex flex-wrap gap-2 mt-5">
                      {brand.services.slice(0, 3).map((service) => (
                        <span
                          key={service}
                          className="font-sans"
                          style={{
                            fontSize: "11px",
                            color: "var(--color-text-subtle)",
                            border: "1px solid var(--color-border)",
                            padding: "4px 10px",
                            borderRadius: "1px",
                          }}
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Remaining brands — compact row */}
        {brands.filter((b) => !featuredNarratives.some((n) => n.slug === b.slug)).length > 0 && (
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p
              className="font-sans uppercase text-center mb-6"
              style={{
                fontSize: "11px",
                letterSpacing: "0.25em",
                color: "var(--color-text-subtle)",
              }}
            >
              More case studies
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {brands
                .filter((b) => !featuredNarratives.some((n) => n.slug === b.slug))
                .map((brand) => (
                  <Link
                    key={brand.slug}
                    to={`/case-study/${brand.slug}`}
                    className="group block p-4 transition-all duration-300"
                    style={{
                      background: "var(--color-bg)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "2px",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(185,146,79,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                    }}
                  >
                    <div
                      className="aspect-[4/3] mb-3 overflow-hidden"
                      style={{ borderRadius: "2px" }}
                    >
                      <OptimizedImage
                        src={brand.thumbnail}
                        alt={brand.name}
                        wrapperClassName="w-full h-full"
                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      />
                    </div>
                    <h3
                      className="font-serif group-hover:text-primary transition-colors"
                      style={{ fontSize: "16px", color: "var(--color-text)" }}
                    >
                      {brand.name}
                    </h3>
                    <p
                      className="font-sans mt-1"
                      style={{ fontSize: "12px", color: "var(--color-text-muted)" }}
                    >
                      {brand.tagline}
                    </p>
                  </Link>
                ))}
            </div>
          </motion.div>
        )}

        {/* Closing philosophy */}
        <motion.div
          className="text-center pt-10"
          style={{ borderTop: "1px solid var(--color-border-gold)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <p
            className="font-serif italic max-w-lg mx-auto mb-6"
            style={{ fontSize: "18px", color: "var(--color-text-muted)", lineHeight: "1.6" }}
          >
            How you do one thing is how patients assume you do everything.
          </p>
          <button
            onClick={() => {
              trackCTAClick({
                ctaId: "branding_consultation_cta",
                ctaText: "Book Discovery Call",
                section: "brands-showcase",
              });
              document
                .getElementById("eligibility-form")
                ?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            className="inline-block font-sans uppercase transition-all duration-300"
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              color: "#B8924F",
              border: "1px solid rgba(185,146,79,0.5)",
              background: "transparent",
              padding: "14px 28px",
              borderRadius: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(185,146,79,0.06)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(185,146,79,0.8)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(185,146,79,0.5)";
            }}
          >
            Book Discovery Call →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandsShowcaseSection;
