import { motion } from "framer-motion";

const PastedPhilosophy = () => {
  return (
    <section id="philosophy" className="relative py-32 lg:py-48" style={{ background: "var(--color-bg)" }}>
      <div className="max-w-[1680px] mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-8 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="col-span-12 lg:col-span-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px" style={{ background: "var(--color-gold)" }} />
              <span className="text-[10px] uppercase tracking-[0.32em]" style={{ color: "var(--color-gold)" }}>
                Philosophy
              </span>
            </div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">I / VII</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="col-span-12 lg:col-span-8"
          >
            <h2 className="font-serif text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[1.05] tracking-[-0.015em] font-light">
              Clinical excellence is the baseline.
              <br />
              <span className="italic text-white/50">
                Market dominance is the gap we close.
              </span>
            </h2>

            <div className="mt-16 grid md:grid-cols-2 gap-12 lg:gap-20 text-white/70 text-[15px] leading-[1.9] font-light">
              <p>
                The greatest clinicians in the world rarely run the greatest clinics. Not because
                they lack taste. Because the work of becoming world-class at dentistry is the
                opposite of the work of becoming world-class at building a business around it.
              </p>
              <p>
                We exist in that gap. We take full ownership of brand, demand, creative, strategy
                and execution, so the practice you built with your hands can finally be matched
                by the business around it. Life first. Business second. Everything else follows.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PastedPhilosophy;
