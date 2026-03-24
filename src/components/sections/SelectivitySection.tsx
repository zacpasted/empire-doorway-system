import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X } from "lucide-react";

const builtFor = [
  "Dentists whose clinical work exceeds their market position",
  "Those ready for a partner accountable to their outcomes",
  "Cosmetic dentists committed to $500K–$1M+ in additional production",
  "Practitioners building a reputation that compounds over time",
  "Those who refuse to operate below their ceiling",
];

const notFor = [
  "Practices looking for leads, not transformation",
  "Dentists who want a vendor, not a partner",
  "Anyone optimising for lowest cost over best outcome",
  "Those not willing to show up as the face of their brand",
  "Practices not ready to be held to the highest standard",
];

const SelectivitySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 md:py-36">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label text-xs tracking-[0.4em] uppercase text-primary mb-4">Selectivity</p>
          <h2 className="text-[36px] md:text-4xl lg:text-5xl font-serif text-foreground leading-tight">
            Not everyone gets in.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 mt-14">
          {/* Built For — gold accent, full white */}
          <motion.div
            className="border-l-2 pl-6"
            style={{ borderColor: 'rgba(185,146,79,0.4)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-sm tracking-[0.3em] uppercase text-primary mb-6">Built for</h3>
            <ul className="space-y-4">
              {builtFor.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not For — muted, clearly secondary */}
          <motion.div
            className="border-l pl-6"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <h3 className="text-sm tracking-[0.3em] uppercase text-muted-foreground/50 mb-6">Not for</h3>
            <ul className="space-y-4">
              {notFor.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <X className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.25)' }} />
                  <span style={{ color: 'rgba(255,255,255,0.35)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SelectivitySection;
