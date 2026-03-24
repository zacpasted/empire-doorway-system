import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const listItems = [
  "Dentists whose clinical ability exceeds their current positioning",
  "Practices aiming to add $500K–$1M+ in aesthetic production",
  "Doctors who want to grow without working more hours",
  "Founders seeking operational leverage and team independence",
  "Practices ready to become category leaders in their market",
  "Dentists building long-term brand equity, not short-term spikes",
  "Owners who value time freedom as much as revenue growth",
  "Teams committed to building systems that scale beyond the doctor",
];

const SelectivitySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ padding: '120px 0' }}>
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: APPLE_EASE }}
        >
          <p className="section-label text-center justify-center mb-4">Who This Is For</p>
          <h2 className="font-serif font-bold leading-tight" style={{ fontSize: '52px', color: 'var(--color-text)', letterSpacing: '-0.01em', lineHeight: '1.1' }}>
            We start with the life you want.
            <br />
            <span className="text-primary">Then we build the practice to produce it.</span>
          </h2>
          <p className="font-serif italic max-w-2xl mx-auto mt-5" style={{ fontSize: '20px', color: 'var(--color-text-muted)', lineHeight: '1.3' }}>
            Not a copied system. Not a playbook built for someone else. Everything is built around you — specifically.
          </p>
        </motion.div>

        <motion.div
          className="text-center max-w-[680px] mx-auto space-y-6 mt-12 mb-14"
          style={{ fontSize: '16px', color: 'var(--color-text-muted)', lineHeight: '1.8' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: APPLE_EASE }}
        >
          <p>41+ PASTED partners have crossed 8 figures. Not because we handed them a template. Because we started where most agencies never do — with the life they actually wanted to live.</p>
          <p>The hours. The cases. The income. The freedom. We define that first. Then the brand, content, systems, and patient acquisition are built to produce exactly that. The business bends to the life. Not the other way around.</p>
          <p>If you want a business-in-a-box or a system copied from someone else — this isn't it. That exists. It just doesn't produce this.</p>
          <p>If you want everything built around your specific vision — this is exactly what this is for.</p>
        </motion.div>

        <motion.div
          className="max-w-[560px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: APPLE_EASE }}
        >
          <p className="text-center font-sans mb-6" style={{ fontSize: '16px', color: 'var(--color-text-muted)' }}>
            This partnership is designed for:
          </p>
          <ul className="space-y-4">
            {listItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-center sm:text-left justify-center sm:justify-start">
                <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="font-sans" style={{ fontSize: '16px', color: 'var(--color-text)' }}>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.p
          className="font-serif italic text-center mt-12 max-w-xl mx-auto"
          style={{ fontSize: '16px', color: 'rgba(185,146,79,0.7)', lineHeight: '1.75' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease: APPLE_EASE }}
        >
          Growth is common.
          <br />
          Growth with freedom is rare.
          <br />
          We build both.
        </motion.p>
      </div>
    </section>
  );
};

export default SelectivitySection;
