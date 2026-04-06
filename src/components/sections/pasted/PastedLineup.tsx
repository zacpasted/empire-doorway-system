import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const tiers = [
  {
    numeral: "I",
    name: "The Operator",
    tagline: "For the founding dentist scaling beyond themselves.",
    description:
      "Full ownership of brand, demand and creative. Weekly strategy. Monthly executive review. Direct line to the partner team.",
    spec: ["Brand system", "Meta + organic demand", "Content production", "Weekly calls"],
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1400&q=80",
  },
  {
    numeral: "II",
    name: "The Empire",
    tagline: "For multi-location groups ready to consolidate category leadership.",
    description:
      "Everything in The Operator. Multi-brand architecture. Associate recruitment funnel. Group-level reporting. A dedicated operations lead.",
    spec: ["Multi-location brand", "Acquisition pods", "Associate pipeline", "Ops lead"],
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1400&q=80",
  },
  {
    numeral: "III",
    name: "The Bespoke",
    tagline: "For the clinic that will define the next decade of the category.",
    description:
      "A fully bespoke engagement. Price on application. Limited to a small number of partners globally at any one time.",
    spec: ["Custom scope", "Embedded team", "Category strategy", "Private"],
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1400&q=80",
  },
];

const PastedLineup = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  // Mobile: stacked layout
  if (isMobile) {
    return (
      <section id="lineup" className="relative py-20" style={{ background: "var(--color-bg)" }}>
        <div className="px-6 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-8 h-px" style={{ background: "var(--color-gold)" }} />
            <span className="text-[10px] uppercase tracking-[0.32em]" style={{ color: "var(--color-gold)" }}>
              Partnerships
            </span>
          </div>
          <h2 className="font-serif text-4xl font-light tracking-[-0.01em]">
            Three tiers. <span className="italic text-white/50">One standard.</span>
          </h2>
        </div>
        <div className="space-y-16 px-6">
          {tiers.map((tier, i) => (
            <div key={tier.numeral} className="space-y-6">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={tier.image} alt={tier.name} className="w-full h-full object-cover grayscale" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent" />
                <div className="absolute top-4 left-4 font-serif text-4xl italic" style={{ color: "var(--color-gold)" }}>
                  {tier.numeral}
                </div>
              </div>
              <p className="text-[11px] uppercase tracking-[0.28em]" style={{ color: "var(--color-gold)" }}>
                Tier {tier.numeral} — {String(i + 1).padStart(2, "0")} / 03
              </p>
              <h3 className="font-serif text-4xl font-light leading-[0.95]">{tier.name}</h3>
              <p className="text-lg text-white/80 italic font-light font-serif">{tier.tagline}</p>
              <p className="text-white/60 leading-[1.9] font-light">{tier.description}</p>
              <div className="border-t border-white/10 pt-6 grid grid-cols-2 gap-x-8 gap-y-3">
                {tier.spec.map((s) => (
                  <div key={s} className="text-[11px] uppercase tracking-[0.2em] text-white/50 flex items-center gap-3">
                    <span className="block w-1 h-1 rounded-full" style={{ background: "var(--color-gold)" }} />
                    {s}
                  </div>
                ))}
              </div>
              <a href="#enquire" className="inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.28em] text-white group">
                <span className="pb-2 border-b border-white/40 group-hover:border-[var(--color-gold)] transition-colors">
                  Enquire about {tier.name}
                </span>
                <span className="w-8 h-px group-hover:w-14 transition-all" style={{ background: "var(--color-gold)" }} />
              </a>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="lineup" ref={containerRef} className="relative h-[300vh]" style={{ background: "var(--color-bg)" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Section header */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-28 lg:pt-32">
          <div className="max-w-[1680px] mx-auto px-8 lg:px-12 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-px" style={{ background: "var(--color-gold)" }} />
                <span className="text-[10px] uppercase tracking-[0.32em]" style={{ color: "var(--color-gold)" }}>
                  Partnerships
                </span>
              </div>
              <h2 className="font-serif text-4xl lg:text-6xl font-light tracking-[-0.01em]">
                Three tiers. <span className="italic text-white/50">One standard.</span>
              </h2>
            </div>
            <div className="hidden lg:flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/40">
              <span>Scroll</span>
              <span className="w-10 h-px bg-white/30" />
            </div>
          </div>
        </div>

        {/* Horizontal track */}
        <motion.div style={{ x }} className="absolute inset-0 flex items-center pt-32">
          {tiers.map((tier, i) => (
            <div key={tier.numeral} className="w-screen h-full flex-shrink-0 flex items-center px-8 lg:px-12">
              <div className="max-w-[1680px] mx-auto w-full grid grid-cols-12 gap-8 lg:gap-16 items-center">
                <div className="col-span-12 lg:col-span-6 relative">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img src={tier.image} alt={tier.name} className="absolute inset-0 w-full h-full object-cover grayscale contrast-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent" />
                    <div className="absolute top-6 left-6 font-serif text-5xl italic" style={{ color: "var(--color-gold)" }}>
                      {tier.numeral}
                    </div>
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-6 lg:pl-8">
                  <p className="text-[11px] uppercase tracking-[0.28em] mb-6" style={{ color: "var(--color-gold)" }}>
                    Tier {tier.numeral} &mdash; {String(i + 1).padStart(2, "0")} / 03
                  </p>
                  <h3 className="font-serif text-5xl lg:text-7xl font-light leading-[0.95] tracking-[-0.015em]">
                    {tier.name}
                  </h3>
                  <p className="mt-6 text-lg text-white/80 italic font-light font-serif">{tier.tagline}</p>
                  <p className="mt-8 text-white/60 leading-[1.9] max-w-lg font-light">{tier.description}</p>

                  <div className="mt-10 border-t border-white/10 pt-6 grid grid-cols-2 gap-x-8 gap-y-3 max-w-md">
                    {tier.spec.map((s) => (
                      <div key={s} className="text-[11px] uppercase tracking-[0.2em] text-white/50 flex items-center gap-3">
                        <span className="block w-1 h-1 rounded-full" style={{ background: "var(--color-gold)" }} />
                        {s}
                      </div>
                    ))}
                  </div>

                  <a href="#enquire" className="mt-12 inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.28em] text-white group">
                    <span className="pb-2 border-b border-white/40 group-hover:border-[var(--color-gold)] transition-colors">
                      Enquire about {tier.name}
                    </span>
                    <span className="w-8 h-px group-hover:w-14 transition-all" style={{ background: "var(--color-gold)" }} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PastedLineup;
