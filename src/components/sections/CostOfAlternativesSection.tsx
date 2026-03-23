import { motion } from "framer-motion";

const cards = [
  {
    title: "Courses",
    diagnosis: "Theory without implementation.",
    body: "You buy it. You watch it. You never implement it because you're running a practice. Courses are built to be sold — not to produce results in your specific market.",
  },
  {
    title: "Agencies",
    diagnosis: "Short-term activity. No long-term investment in you.",
    body: "Their business model depends on your dependency. They run campaigns. They report metrics. When you stop paying, everything stops. Nothing was ever built.",
  },
  {
    title: "Freelancers",
    diagnosis: "Fragmented execution. No one accountable for the whole.",
    body: "One edits video. One runs ads. One writes captions. None talk to each other. None own the outcome. Fragmentation doesn't slow growth — it reverses it.",
  },
  {
    title: "Consultants",
    diagnosis: "Advice without execution.",
    body: "They tell you what to do. Then they leave. You're still the one who has to do it. Advice without execution is expensive information.",
  },
  {
    title: "Doing It Yourself",
    diagnosis: "The most expensive option of all.",
    body: "Every hour on content is an hour not in the chair. Your time has a dollar value. DIY doesn't save money. It costs the most.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const CostOfAlternativesSection = () => {
  return (
    <section className="py-28 md:py-36 bg-background relative overflow-hidden">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-5 text-center"
        >
          Why Everything Else Fails
        </motion.p>

        {/* H2 */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-serif text-foreground text-center mb-6"
        >
          You've already paid for the wrong solutions.
        </motion.h2>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-16"
        >
          Every route has a hidden cost beyond the invoice. Here's what each one is actually doing to your practice.
        </motion.p>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16"
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              className={`bg-card/60 border border-border/40 rounded-xl p-8 ${
                i === 4 ? "md:col-span-2 md:max-w-[calc(50%-0.625rem)] md:mx-auto" : ""
              }`}
            >
              <h3 className="text-xl font-sans font-medium text-foreground mb-2">
                {card.title}
              </h3>
              <p className="text-sm italic text-primary mb-4">{card.diagnosis}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {card.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing statement */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl md:text-2xl font-serif text-foreground text-center max-w-3xl mx-auto leading-relaxed"
        >
          None of them are accountable to your outcome. None of them sit alongside you every day. That's not a service. That's a partner. That's PASTED.
        </motion.blockquote>
      </div>
    </section>
  );
};

export default CostOfAlternativesSection;
