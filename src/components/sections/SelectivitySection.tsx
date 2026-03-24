import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";

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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 md:py-36">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-sans text-[12px] md:text-[11px] tracking-[0.3em] uppercase text-primary mb-4">
            Who This Is For
          </p>
          <h2 className="text-[36px] md:text-[48px] font-serif font-bold text-foreground leading-tight">
            Growth is easy.
            <br />
            Growth with freedom is rare.
          </h2>
          <p className="font-serif italic text-[18px] md:text-[22px] text-muted-foreground max-w-2xl mx-auto mt-5 leading-relaxed">
            We partner with dentists who want more than revenue.
            <br />
            They want leverage, clarity, and time back.
          </p>
        </motion.div>

        {/* Body copy */}
        <motion.div
          className="text-center max-w-[680px] mx-auto space-y-6 mt-12 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="font-sans text-[16px] text-muted-foreground leading-relaxed">
            Yes — our partners often add $500K–$1M+ in additional aesthetic production. But that's not the full story.
          </p>
          <p className="font-sans text-[16px] text-muted-foreground leading-relaxed">
            Growth without structure creates more stress. More patients. More complexity. Less freedom. We build systems designed to do the opposite.
          </p>
          <p className="font-sans text-[16px] text-muted-foreground leading-relaxed">
            We build brands that attract. Systems that convert. Infrastructure that runs. So production increases — while your day-to-day involvement decreases.
          </p>
          <p className="font-sans text-[16px] text-muted-foreground leading-relaxed">
            That's where real leverage begins.
          </p>
        </motion.div>

        {/* Centered list */}
        <motion.div
          className="max-w-[560px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <p className="text-center font-sans text-[16px] text-muted-foreground mb-6">
            This partnership is designed for:
          </p>
          <ul className="space-y-4">
            {listItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-center sm:text-left justify-center sm:justify-start">
                <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-foreground font-sans text-[16px]">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Closing gold italic line */}
        <motion.p
          className="text-[13px] italic text-center mt-12 max-w-xl mx-auto font-sans"
          style={{ color: 'rgba(185,146,79,0.7)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          More growth. Less dependency. Greater freedom. We build both.
        </motion.p>
      </div>
    </section>
  );
};

export default SelectivitySection;
