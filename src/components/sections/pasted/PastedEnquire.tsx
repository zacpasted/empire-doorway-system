import { motion } from "framer-motion";

const PastedEnquire = () => {
  return (
    <section id="enquire" className="relative py-32 lg:py-48 border-t border-white/5 overflow-hidden" style={{ background: "var(--color-bg)" }}>
      {/* Ambient gold glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "var(--color-gold-glow)" }}
      />

      <div className="relative max-w-[1680px] mx-auto px-8 lg:px-12">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="block w-8 h-px" style={{ background: "var(--color-gold)" }} />
              <span className="text-[10px] uppercase tracking-[0.32em]" style={{ color: "var(--color-gold)" }}>
                Enquire
              </span>
            </div>

            <h2 className="font-serif text-[clamp(2.5rem,6.5vw,7rem)] leading-[0.95] font-light tracking-[-0.02em]">
              A private
              <br />
              <span className="italic" style={{ color: "var(--color-gold)" }}>introduction.</span>
            </h2>

            <p className="mt-10 max-w-xl text-white/65 text-base lg:text-lg leading-relaxed font-light">
              We take on a small number of new partners each quarter. If the fit is right, we
              will know inside one conversation. If it is not, we will say so.
            </p>

            <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <a
                href="#"
                className="group inline-flex items-center gap-5 px-10 py-5 border transition-all duration-500"
                style={{ borderColor: "var(--color-border-gold)" }}
              >
                <span className="text-[11px] uppercase tracking-[0.28em] text-white">
                  Request introduction
                </span>
                <span
                  className="w-8 h-px group-hover:w-14 transition-all duration-500"
                  style={{ background: "var(--color-gold)" }}
                />
              </a>
              <a
                href="mailto:hello@pasted.studio"
                className="text-[11px] uppercase tracking-[0.28em] text-white/60 hover:text-[var(--color-gold)] transition-colors"
              >
                hello@pasted.studio
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PastedEnquire;
