import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

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
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isMobile = useIsMobile();

  return (
    <section ref={ref} style={{ padding: '120px 0' }}>
      <div className="container max-w-5xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: APPLE_EASE }}
        >
          <div className="flex justify-center mb-6">
            <motion.div
              className="w-[40px] h-px"
              style={{ background: 'rgba(185,146,79,0.6)' }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, ease: APPLE_EASE }}
            />
          </div>
          <p className="section-label text-center justify-center mb-4">The Process</p>
          <h2 className="font-serif" style={{ fontSize: '52px', color: 'var(--color-text)', lineHeight: '1.1', letterSpacing: '-0.01em' }}>
            Four phases. Fully managed.
          </h2>
        </motion.div>

        {/* Timeline visual */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          {!isMobile && (
            <motion.div
              className="absolute left-0 right-0 h-px"
              style={{ top: '52px', background: 'linear-gradient(to right, transparent, rgba(185,146,79,0.2), transparent)' }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: APPLE_EASE }}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative text-center space-y-3"
                initial={{ opacity: 0, y: isMobile ? 16 : 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: APPLE_EASE }}
              >
                {/* Ghost step number */}
                <div className="relative mx-auto w-[52px] h-[52px] flex items-center justify-center mb-4" style={{ borderRadius: '2px' }}>
                  <span
                    className="absolute font-serif italic pointer-events-none select-none"
                    style={{
                      fontSize: '72px',
                      color: 'rgba(185,146,79,0.1)',
                      lineHeight: 1,
                      top: '-16px',
                      left: '-8px',
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                <p className="font-sans uppercase" style={{ fontSize: '10px', letterSpacing: '0.25em', color: 'rgba(185,146,79,0.5)' }}>
                  {step.timeline}
                </p>
                <h3 className="font-serif" style={{ fontSize: '22px', color: 'var(--color-text)', fontStyle: 'italic' }}>{step.title}</h3>
                <p className="font-sans max-w-[240px] mx-auto" style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          className="text-center mt-14 max-w-xl mx-auto font-serif italic"
          style={{ fontSize: '16px', color: 'var(--color-text-muted)', lineHeight: '1.3' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9, ease: APPLE_EASE }}
        >
          Your commitment: 15–30 minutes of raw footage per week. Everything else is ours.
        </motion.p>
      </div>
    </section>
  );
};

export default FourStepsSection;
