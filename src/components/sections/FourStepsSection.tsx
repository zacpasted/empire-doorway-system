import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Strategy",
    body: "We map your market position, your ideal patient, and your growth ceiling. You leave with a clear picture of exactly what's been holding you back.",
  },
  {
    number: "02",
    title: "Brand & Identity",
    body: "We build your brand — positioning, narrative, visual identity, content tone. This becomes the foundation everything else is built on.",
  },
  {
    number: "03",
    title: "Content & Ads",
    body: "Our team scripts, shoots on-location, edits, and deploys 30+ pieces of creative per month. The same content runs organically and as paid ad creative.",
  },
  {
    number: "04",
    title: "Conversion & Growth",
    body: "We optimise the patient journey — consultation systems, communication frameworks, CRM workflows — so every inquiry converts at the level your brand deserves.",
  },
];

const FourStepsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">The Process</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight">
            Four phases. Fully managed.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              <div className="flex items-baseline gap-3">
                <span className="text-sm text-primary font-mono">{step.number}</span>
                <h3 className="text-xl md:text-2xl font-serif text-foreground">{step.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-muted-foreground mt-12 max-w-xl mx-auto italic"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Your time commitment: 15–30 minutes of raw footage per week. Everything else is ours.
        </motion.p>
      </div>
    </section>
  );
};

export default FourStepsSection;
