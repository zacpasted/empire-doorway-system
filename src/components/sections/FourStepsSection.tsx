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
    <section ref={ref} className="py-32 md:py-40">
      <div className="container max-w-5xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex justify-center mb-6">
            <motion.div
              className="w-[40px] h-px bg-primary/40"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6 }}
            />
          </div>
          <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-primary mb-4">The Process</p>
          <h2 className="text-[36px] md:text-4xl lg:text-5xl font-serif leading-tight" style={{ color: '#F5F0E8' }}>
            Four phases. Fully managed.
          </h2>
        </motion.div>

        {/* Timeline visual */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          {!isMobile && (
            <motion.div
              className="absolute top-[52px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4 }}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative text-center space-y-3"
                initial={{ opacity: 0, y: isMobile ? 16 : 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
              >
                {/* Step number circle */}
                <div className="mx-auto w-[52px] h-[52px] rounded-full flex items-center justify-center border border-primary/30 mb-4"
                  style={{ background: 'rgba(185,146,79,0.06)' }}
                >
                  <span className="text-sm font-mono text-primary font-medium">{step.number}</span>
                </div>

                <p className="text-[9px] tracking-[0.3em] uppercase text-primary/50 font-sans">
                  {step.timeline}
                </p>
                <h3 className="text-lg font-serif" style={{ color: '#F5F0E8' }}>{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[240px] mx-auto">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          className="text-center text-muted-foreground mt-14 max-w-xl mx-auto italic text-sm font-serif"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          Your commitment: 15–30 minutes of raw footage per week. Everything else is ours.
        </motion.p>
      </div>
    </section>
  );
};

export default FourStepsSection;
