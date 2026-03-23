import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const deliverables = [
  {
    label: "Brand System",
    desc: "Your positioning, narrative, visual identity, and content architecture — built once, used everywhere.",
  },
  {
    label: "30+ Creative Assets / Month",
    desc: "Video, storytelling, and ad content — scripted, shot on-location, edited, and published by our team.",
  },
  {
    label: "Full Ad Management",
    desc: "Strategy, creative, campaign build, and ongoing optimisation. One team owns the whole system.",
  },
  {
    label: "On-Location Production",
    desc: "We fly to your practice. Cinematic shoot days that produce months of content and ad creative.",
  },
  {
    label: "Conversion Infrastructure",
    desc: "Consultation design, patient communication frameworks, CRM workflows, and team training.",
  },
  {
    label: "Strategic Partnership",
    desc: "Direct access to our team. Monthly reviews. Real-time market intelligence from inside the ecosystem.",
  },
];

const DeliverablesSection = () => {
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
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">Deliverables</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight">
            Everything included. Nothing outsourced.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {deliverables.map((d, i) => (
            <motion.div
              key={d.label}
              className="space-y-2"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
            >
              <h3 className="text-lg font-semibold text-foreground">{d.label}</h3>
              <p className="text-muted-foreground leading-relaxed">{d.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-muted-foreground mt-12 italic"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          One team. Full ownership. No agencies. No handoffs. No surprises.
        </motion.p>
      </div>
    </section>
  );
};

export default DeliverablesSection;
