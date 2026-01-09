import { motion } from "framer-motion";
import { TrendingUp, Users, Award, DollarSign, Calendar, Globe } from "lucide-react";

const caseStudies = [
  {
    name: "Dr. Drew Ballard",
    brand: "Halo Veneers",
    tagline: "From Burnout General Dentist to Seven-Figure, Lifestyle-Led Founder",
    story: "When we began working with Drew, he was deeply unhappy. He believed in Halo Veneers, but the brand lacked a clear USP, a repeatable content engine, and internal systems. His general practice was draining him—clinically, emotionally, and personally.",
    approach: "We defined the Halo USP, installed a disciplined content strategy, and rebuilt how the brand communicated value. We restructured the internal team and built operating systems that allowed Drew to do only the cases he wanted.",
    results: [
      { icon: DollarSign, label: "Revenue", value: "$0 → $2M/year", detail: "Aesthetic-only case revenue" },
      { icon: Calendar, label: "Schedule", value: "3 days/week", detail: "9 months per year" },
      { icon: Award, label: "Education", value: "8 courses sold out", detail: "Second 7-figure business" },
    ],
    transformation: {
      before: ["Burnt-out general dentist", "No clear USP", "Working constantly"],
      after: ["7-figure lifestyle founder", "Category authority", "3-day work week"]
    },
    closingLine: "This wasn't growth for growth's sake. It was alignment—and everything followed."
  },
  {
    name: "Miami Office",
    brand: "Market Expansion & Brand Authority",
    tagline: "From Local Practice to Multi-Location Powerhouse",
    story: "The vision was clear: expand from a single successful location into Miami's competitive luxury dental market. But entering a saturated market without differentiation is a recipe for failure. The practice needed more than just a second location—it needed a brand presence that commanded attention from day one.",
    approach: "We built the Miami expansion as a brand event, not just an office opening. Pre-launch content positioned the new location as inevitable. Strategic partnerships with local influencers and luxury brands created cultural relevance before the doors opened.",
    results: [
      { icon: DollarSign, label: "Launch Revenue", value: "$800K", detail: "First 6 months" },
      { icon: Users, label: "New Patients", value: "400+", detail: "Pre-launch waitlist" },
      { icon: Globe, label: "Market Position", value: "Top 3", detail: "Miami luxury dental" },
    ],
    transformation: {
      before: ["Single location ceiling", "Unknown in new market", "Competing on price"],
      after: ["Multi-location brand", "Market authority", "Premium positioning"]
    },
    closingLine: "This wasn't about opening another office. It was about proving that brand equity travels—when built correctly."
  },
  {
    name: "Dr. Alan Clarke",
    brand: "Paste Dental",
    tagline: "From Burnt-Out Associate to Global Authority & Autonomous Practice",
    story: "Before Paste Dental existed, Alan was burnt out inside the NHS system. He felt constrained and creatively stifled. Within a year of leaving associate life, he opened his own clinic with a radically different vision—one he was told wouldn't work.",
    approach: "We leaned fully into Alan's USP: brilliance, taste, and authenticity. We built Paste Dental around identity first—before ads, before scale, before tactics. Content was treated as cultural signal, not marketing noise.",
    results: [
      { icon: Globe, label: "Press", value: "Forbes, NY Post", detail: "International features in Year 1" },
      { icon: Users, label: "Team", value: "5 Associates", detail: "Fully autonomous practice" },
      { icon: Award, label: "Recognition", value: "O-1 Visa", detail: "Extraordinary ability" },
    ],
    transformation: {
      before: ["Burnt-out NHS associate", "Startup clinic doubted", "Founder-dependent"],
      after: ["Global industry authority", "Internationally featured brand", "O-1 Visa recipient"]
    },
    closingLine: "This was never about opening a clinic. It was about proving that when identity leads, scale follows."
  }
];

const TransformationNarrativesSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
            Compounding Results
          </span>
          <h2 className="font-playfair text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            Three Narrative-Driven
            <br />
            <span className="italic text-muted-foreground">Transformations</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Using a PASTED strategy, we achieved what most believed was impossible.
          </p>
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-24 md:space-y-32">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              {/* Case Study Card */}
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12 lg:p-16">
                {/* Header */}
                <div className="mb-10 md:mb-12">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
                      Case Study {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {study.brand}
                    </span>
                  </div>
                  <h3 className="font-playfair text-2xl md:text-4xl lg:text-5xl font-bold mb-3">
                    {study.name}
                  </h3>
                  <p className="text-lg md:text-xl text-foreground/80 font-medium">
                    {study.tagline}
                  </p>
                </div>

                {/* Story & Approach */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                      The Challenge
                    </h4>
                    <p className="text-foreground/70 leading-relaxed">
                      {study.story}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                      Our Approach
                    </h4>
                    <p className="text-foreground/70 leading-relaxed">
                      {study.approach}
                    </p>
                  </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {study.results.map((result, idx) => (
                    <motion.div
                      key={result.label}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                      className="bg-background/50 border border-border/30 rounded-xl p-6 text-center"
                    >
                      <result.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                      <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                        {result.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {result.detail}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Before/After Transformation */}
                <div className="border-t border-border/30 pt-10">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Before */}
                    <div className="space-y-3">
                      <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-muted-foreground/50" />
                        Before
                      </h4>
                      {study.transformation.before.map((item, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-center gap-3 text-muted-foreground"
                        >
                          <span className="text-muted-foreground/40">✕</span>
                          <span className="line-through opacity-60">{item}</span>
                        </div>
                      ))}
                    </div>
                    {/* After */}
                    <div className="space-y-3">
                      <h4 className="text-xs uppercase tracking-[0.2em] text-primary/80 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        After
                      </h4>
                      {study.transformation.after.map((item, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-center gap-3 text-foreground font-medium"
                        >
                          <span className="text-primary">✓</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Closing Line */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-10 text-center text-lg md:text-xl italic text-foreground/80 font-playfair"
                >
                  "{study.closingLine}"
                </motion.p>
              </div>

              {/* Decorative line between cards */}
              {index < caseStudies.length - 1 && (
                <div className="hidden md:block absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-px h-8 bg-gradient-to-b from-border to-transparent" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20 md:mt-28"
        >
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            These weren't marketing wins. They were{" "}
            <span className="text-foreground font-medium">identity, systems, and narrative wins</span>.
          </p>
          <p className="font-playfair text-2xl md:text-3xl font-bold text-foreground">
            When positioning is right, everything else follows.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TransformationNarrativesSection;
