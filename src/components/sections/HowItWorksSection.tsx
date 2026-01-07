import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const scrollToShowcase = () => {
    const showcaseSection = document.getElementById('brands-showcase');
    if (showcaseSection) {
      showcaseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const steps = [
    {
      number: "01",
      title: "Positioning & Strategy",
      description: "Define what makes you singular. Ground your brand in truth, not trends.",
      feeling: "Clarity",
      linkText: "See strategy examples",
    },
    {
      number: "02",
      title: "Brand & Narrative",
      description: "Craft a story that resonates. Human-centered, cinematic, unmistakably you.",
      feeling: "Recognition",
      linkText: "View brand work",
    },
    {
      number: "03",
      title: "Content System Setup",
      description: "Build your editorial engine. Editing, scheduling, and posting—handled for you.",
      feeling: "Relief",
      linkText: "See content examples",
    },
    {
      number: "04",
      title: "Launch & Management",
      description: "Go live with confidence. Ongoing support keeps momentum compounding.",
      feeling: "Momentum",
      linkText: "View launch results",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-48 bg-background relative overflow-hidden"
    >
      {/* Decorative vertical line */}
      <div className="absolute left-1/2 top-48 bottom-48 w-px bg-gradient-to-b from-transparent via-border/20 to-transparent hidden lg:block" />

      <div className="container max-w-6xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-20 md:mb-28"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground/50 mb-6">
            The Infrastructure
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground">
            How Associate to Empire Works
          </h2>
        </motion.div>

        {/* Steps grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-20 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-24 md:gap-y-20"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              className="group relative"
            >
              {/* Step card */}
              <div className="relative p-8 md:p-10 rounded-2xl border border-border/20 bg-card/30 backdrop-blur-sm hover:border-border/40 hover:bg-card/50 transition-all duration-500">
                {/* Step number - positioned absolutely */}
                <div className="absolute -top-6 left-8 md:left-10">
                  <span className="text-7xl md:text-8xl font-serif font-light text-foreground/[0.06] select-none">
                    {step.number}
                  </span>
                </div>

                {/* Feeling badge */}
                <div className="absolute -top-3 right-8 md:right-10">
                  <div className="px-4 py-1.5 rounded-full border border-primary/20 bg-background/80 backdrop-blur-sm">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-primary/70">
                      {step.feeling}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="pt-8 md:pt-10">
                  <h3 className="text-xl md:text-2xl font-serif text-foreground mb-4 group-hover:text-foreground/90 transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground/80 leading-relaxed mb-6 text-sm md:text-base">
                    {step.description}
                  </p>

                  {/* Link */}
                  <button
                    onClick={scrollToShowcase}
                    className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors group/link"
                  >
                    <span className="relative">
                      {step.linkText}
                      <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-foreground/40 group-hover/link:w-full transition-all duration-300" />
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>

                {/* Subtle corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl pointer-events-none">
                  <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-primary/30 to-transparent" />
                  <div className="absolute top-0 right-0 w-8 h-px bg-gradient-to-l from-primary/30 to-transparent" />
                </div>
              </div>

              {/* Connecting line between cards (visible on desktop) */}
              {index < steps.length - 1 && index % 2 === 0 && (
                <div className="hidden md:block absolute top-1/2 -right-8 lg:-right-12 w-8 lg:w-12 h-px bg-gradient-to-r from-border/30 to-transparent" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-20 md:mt-28 text-sm text-muted-foreground/40 tracking-wide"
        >
          Infrastructure, not conversion tricks.
        </motion.p>
      </div>
    </section>
  );
};

export default HowItWorksSection;
