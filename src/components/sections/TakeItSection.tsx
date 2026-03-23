import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";

interface TakeItSectionProps {
  onApplyClick?: () => void;
}

const TakeItSection = ({ onApplyClick }: TakeItSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px]"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-4">
              Others treat symptoms.
            </h2>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground/70 leading-[1.1] mb-10">
              PASTED fixes structure.
            </h2>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground/70 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Every month without the right infrastructure is a month your competitors close cases you should have won.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button
              onClick={onApplyClick}
              size="lg"
              className="relative group bg-foreground text-background hover:bg-foreground/90 px-10 py-6 text-base tracking-wide"
            >
              <span className="relative z-10">Apply for PASTED Partnership</span>
              <div className="absolute inset-0 rounded-md ring-1 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300" />
            </Button>
          </motion.div>

          <motion.p
            className="text-sm text-muted-foreground/50 mt-8 tracking-wide"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            30 practices per year. Carefully selected.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default TakeItSection;
