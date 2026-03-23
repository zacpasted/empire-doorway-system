import { motion } from "framer-motion";

const cards = [
  {
    title: "Courses",
    diagnosis: "Theory without implementation.",
    body: "You watch it. You take notes. You never use it because you're running a practice. Courses are designed to sell — not to produce results in your specific market with your specific patients.",
  },
  {
    title: "Agencies",
    diagnosis: "Active today. Gone tomorrow.",
    body: "They run campaigns. They report metrics. Their business model depends on you staying dependent. When you stop paying, everything stops. Nothing was ever actually built.",
  },
  {
    title: "Freelancers",
    diagnosis: "No one owns the outcome.",
    body: "One person edits video. Another runs ads. A third writes captions. They don't talk to each other. No one is accountable for the whole result. That's why it doesn't compound.",
  },
  {
    title: "Consultants",
    diagnosis: "Advice without execution.",
    body: "They tell you what to do. Then they leave. You still have to do it. A roadmap you have to drive yourself is just expensive information.",
  },
  {
    title: "Doing It Yourself",
    diagnosis: "The highest hourly cost on this list.",
    body: "Every hour on content is an hour not in the chair. Your time has a dollar value — a high one. DIY does not save money. It costs the most.",
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
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-5 text-center"
        >
          Why Everything Else Fails <span className="text-primary/60 text-[10px] tracking-[0.2em]">· Here's the Data</span>
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-serif text-foreground text-center mb-6"
        >
          You've already paid for the wrong solutions.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-16"
        >
          Every alternative has a real cost — beyond the invoice. Here is exactly what each one is doing to your practice and your time.
        </motion.p>

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

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl md:text-2xl font-serif text-foreground text-center max-w-3xl mx-auto leading-relaxed"
        >
          Not one of these is accountable to your revenue. Not one sits alongside you and makes sure your potential is reached. That is what a real partner does. That is PASTED.
        </motion.blockquote>
      </div>
    </section>
  );
};

export default CostOfAlternativesSection;
