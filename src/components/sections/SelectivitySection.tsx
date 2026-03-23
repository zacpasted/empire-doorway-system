import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X } from "lucide-react";

const builtFor = [
  "Cosmetic dentists whose clinical work exceeds their market position",
  "Practices ready to invest in infrastructure, not just tactics",
  "Dentists who want to be the undeniable authority in their city",
  "Those building a legacy, not just running a schedule",
  "Practices committed to $500K–$1M+ in additional production",
];

const notFor = [
  "Practices looking for leads, not transformation",
  "Dentists who want a vendor, not a partner",
  "Anyone optimising for lowest cost over best outcome",
  "Those not willing to show up as the face of their brand",
  "Practices not ready to operate at the highest level",
];

const SelectivitySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">Selectivity</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight mb-6">
            Not everyone gets in.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thirty practices per year. Each selected because the clinical ambition, the market position, and the readiness are all genuinely there. We are not in the business of collecting clients.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 mt-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-sm tracking-[0.3em] uppercase text-primary mb-6">Built for</h3>
            <ul className="space-y-4">
              {builtFor.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <h3 className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">Not for</h3>
            <ul className="space-y-4">
              {notFor.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <X className="w-4 h-4 text-muted-foreground/50 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
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
