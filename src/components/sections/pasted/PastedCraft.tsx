import { motion } from "framer-motion";

const pillars = [
  { n: "01", title: "Brand", body: "A visual and verbal identity worthy of the clinical work behind it." },
  { n: "02", title: "Demand", body: "Meta, organic and referral systems engineered for the 3% in-market buyer." },
  { n: "03", title: "Creative", body: "In-house production. Cinematic video, editorial stills, written authority." },
  { n: "04", title: "Strategy", body: "Weekly operating rhythm. Monthly executive review. Quarterly category planning." },
  { n: "05", title: "Execution", body: "We run it. Not advise on it. Every asset, every launch, every number." },
];

const PastedCraft = () => {
  return (
    <section id="craft" className="relative" style={{ background: "var(--color-bg)" }}>
      {/* Full-bleed editorial image */}
      <div className="relative h-[70vh] min-h-[540px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=2000&q=90"
          alt="Craft"
          className="absolute inset-0 w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)]/60 via-transparent to-[var(--color-bg)]" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1680px] mx-auto px-8 lg:px-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-8 h-px" style={{ background: "var(--color-gold)" }} />
                <span className="text-[10px] uppercase tracking-[0.32em]" style={{ color: "var(--color-gold)" }}>
                  The Craft
                </span>
              </div>
              <h2 className="font-serif text-[clamp(2.5rem,6vw,6rem)] leading-[0.95] font-light tracking-[-0.015em]">
                Five disciplines.
                <br />
                <span className="italic text-white/60">One operating standard.</span>
              </h2>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Pillars grid */}
      <div className="max-w-[1680px] mx-auto px-8 lg:px-12 py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-white/10">
          {pillars.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className="p-8 lg:p-10 min-h-[280px] flex flex-col justify-between group hover:bg-[var(--color-surface)] transition-colors duration-700"
              style={{ background: "var(--color-bg)" }}
            >
              <div className="flex items-start justify-between">
                <span className="font-serif text-xl italic" style={{ color: "var(--color-gold)", opacity: 0.6 }}>{p.n}</span>
                <span className="block w-6 h-px mt-3 group-hover:w-12 transition-all duration-500" style={{ background: "var(--color-gold)" }} />
              </div>
              <div>
                <h3 className="font-serif text-3xl font-light mb-4">{p.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed font-light">{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastedCraft;
