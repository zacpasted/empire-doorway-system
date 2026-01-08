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
    <section 
      ref={sectionRef} 
      className="py-32 md:py-48 bg-background relative overflow-hidden"
    >
      {/* Dramatic background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary/20 via-primary/5 to-transparent"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ originY: 0 }}
        />
        <motion.div
          className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        />
      </div>

      <div className="container max-w-4xl mx-auto px-4 relative">
        <div className="text-center">
          {/* Main statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="font-playfair text-2xl md:text-3xl lg:text-4xl text-foreground/80 leading-relaxed mb-4">
              Dentistry doesn't owe you recognition.
            </p>
            <motion.p 
              className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              You have to{" "}
              <span className="relative inline-block">
                <span className="relative z-10 italic text-primary">take it.</span>
                <motion.span
                  className="absolute bottom-1 left-0 right-0 h-[2px] bg-primary/50"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                  style={{ originX: 0 }}
                />
              </span>
            </motion.p>
          </motion.div>

          {/* Subtext */}
          <motion.p
            className="mt-12 text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            Associate to Empire™ is not enrollment.{" "}
            <span className="text-foreground/80">It is a request for consideration.</span>
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="mt-14"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <Button
              onClick={onApplyClick}
              variant="outline"
              size="xl"
              className="group relative border-primary/50 hover:border-primary hover:bg-primary/5 text-foreground tracking-wide px-10 py-6 text-base transition-all duration-500"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span>APPLY FOR ASSOCIATE TO EMPIRE™</span>
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </Button>
          </motion.div>

          {/* Bottom note */}
          <motion.p
            className="mt-8 text-sm text-muted-foreground/50 tracking-wide"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}
          >
            Applications reviewed manually. Scarcity is structural.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default TakeItSection;