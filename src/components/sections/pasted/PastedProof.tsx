import { motion } from "framer-motion";

const stats = [
  { figure: "41+", label: "Clinics scaled to eight figures" },
  { figure: "9.7x", label: "Avg ROI on ad spend" },
  { figure: "$100M+", label: "Tracked revenue under management" },
  { figure: "12", label: "Global partners at any one time" },
];

const PastedProof = () => {
  return (
    <section id="proof" className="relative py-32 lg:py-48 border-t border-white/5" style={{ background: "var(--color-bg)" }}>
      <div className="max-w-[1680px] mx-auto px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20 lg:mb-28"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-8 h-px" style={{ background: "var(--color-gold)" }} />
            <span className="text-[10px] uppercase tracking-[0.32em]" style={{ color: "var(--color-gold)" }}>
              The Record
            </span>
          </div>
          <h2 className="font-serif text-[clamp(2.25rem,5vw,5rem)] leading-[0.98] font-light tracking-[-0.015em] max-w-4xl">
            Measured in clinics built,
            <br />
            <span className="italic text-white/50">not awards won.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.12 }}
              className="border-t border-white/10 pt-8"
            >
              <div className="font-serif text-6xl lg:text-7xl xl:text-8xl font-light tracking-[-0.02em]" style={{ color: "var(--color-gold)" }}>
                {s.figure}
              </div>
              <p className="mt-6 text-[11px] uppercase tracking-[0.24em] text-white/60 max-w-[200px] leading-relaxed">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastedProof;
