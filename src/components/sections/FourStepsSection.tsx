import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const steps = [
  {
    number: "01",
    title: "Strategy",
    timeline: "Week 1–2",
    body: "We map your market position, ideal patient, and exactly what's been holding you back.",
  },
  {
    number: "02",
    title: "Brand & Identity",
    timeline: "Week 2–4",
    body: "We build your positioning, narrative, and visual identity — the foundation everything else runs on.",
  },
  {
    number: "03",
    title: "Content & Ads",
    timeline: "Week 4–6",
    body: "We script, shoot on-location, edit, and deploy 30+ pieces monthly across organic and paid.",
  },
  {
    number: "04",
    title: "Conversion & Growth",
    timeline: "Week 6+",
    body: "We rebuild your patient journey so every inquiry converts at the level your brand deserves.",
  },
];

const FourStepsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();

  return (
    <section ref={ref} className="py-28 md:py-36">
      <div className="container max-w-5xl mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label text-xs tracking-[0.4em] uppercase text-primary mb-4">The Process</p>
          <h2 className="text-[36px] md:text-4xl lg:text-5xl font-serif text-foreground leading-tight">
            Four phases. Fully managed.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative text-center md:text-left space-y-2 md:border-l md:first:border-l-0 md:border-border/30 md:pl-4 md:first:pl-0 overflow-hidden"
              initial={{ opacity: 0, x: isMobile ? 0 : 12, y: isMobile ? 12 : 0 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
            >
              {/* Ghost step number */}
              <span
                className="absolute -top-2 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 font-serif italic text-[64px] leading-none text-primary/[0.12] pointer-events-none select-none"
                aria-hidden="true"
              >
                {step.number}
              </span>

              {/* Timeline label above title */}
              <p className="text-[10px] tracking-[0.3em] uppercase text-primary/60 font-sans relative z-10">
                {step.timeline}
              </p>
              <div className="flex items-baseline gap-2 justify-center md:justify-start relative z-10">
                <span className="text-sm text-primary font-mono">{step.number}</span>
                <h3 className="text-lg font-serif text-foreground">{step.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{step.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-muted-foreground mt-12 max-w-xl mx-auto italic text-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Your commitment: 15–30 minutes of raw footage per week. Everything else is ours.
        </motion.p>
      </div>
    </section>
  );
};

export default FourStepsSection;
