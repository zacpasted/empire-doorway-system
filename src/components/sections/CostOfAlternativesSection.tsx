import { motion } from "framer-motion";

const cards = [
  {
    title: "Courses",
    diagnosis: "Theory without implementation.",
    body: "You buy the course. You watch the modules. You take notes on frameworks you never find time to use because you're running a practice. The knowledge sits there. The practice stays the same. Courses are designed to be sold — not to ensure the result actually happens in your specific market, with your specific patients, inside your actual life.",
  },
  {
    title: "Agencies",
    diagnosis: "Short-term activity. No long-term investment in you.",
    body: "An agency's business model depends on you staying dependent — not on you getting so strong that you outgrow them. They run campaigns. They report metrics. They do not sit inside your practice, understand your story, or build the brand architecture that compounds over years. When you stop paying, everything stops. Nothing was ever really built.",
  },
  {
    title: "Freelancers",
    diagnosis: "Fragmented execution. No one accountable for the whole.",
    body: "One person edits your videos. Another runs your ads. A third writes your captions. None of them talk to each other. None of them own the outcome. The content doesn't reflect the brand. The ads don't reflect the content. The patient who clicks doesn't match the patient you want. Fragmentation doesn't just slow growth — it actively works against it.",
  },
  {
    title: "Consultants",
    diagnosis: "Advice without execution.",
    body: "A consultant tells you what to do. Then they leave. The implementation — the hard part, the part that actually determines whether any of it works — is still entirely on you. You pay for a roadmap and then have to drive the car, build the road, and navigate the terrain yourself. Advice without execution is just expensive information.",
  },
  {
    title: "Doing It Yourself",
    diagnosis: "The most expensive option of all.",
    body: "Your time has a value. Every hour spent scripting content, editing videos, managing ad accounts, or trying to figure out brand strategy is an hour not spent on high-value clinical work — and an hour spent doing something you didn't train for, don't want to do, and won't do as well as a team that does nothing else. The DIY route doesn't save money. It costs the most.",
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
          You've already paid for the wrong solutions. Here's what they actually cost you.
        </motion.h2>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-16"
        >
          Every route you've taken — or considered taking — has a hidden cost beyond the invoice. Time. Momentum. Potential that compounds in the wrong direction the longer you stay on the wrong path. Here's what each one is actually doing to your practice.
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
          Every one of these routes has one thing in common: none of them are accountable to your outcome. None of them sit alongside you every day and make sure none of your potential gets wasted. That's not a service. That's a partner. That's PASTED.
        </motion.blockquote>
      </div>
    </section>
  );
};

export default CostOfAlternativesSection;
