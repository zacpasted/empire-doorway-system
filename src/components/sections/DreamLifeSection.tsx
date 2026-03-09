import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const DreamLifeSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const questions = [
    "What kind of practice do you want?",
    "What kind of life do you want?",
    "Where do you want to live?",
    "How much freedom do you want?",
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.015] to-transparent" />

      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">
            Design Your Life
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6 leading-tight">
            We Don't Optimize for Revenue.<br />
            <span className="text-primary">We Optimize for Life.</span>
          </h2>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto space-y-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="text-center text-lg text-muted-foreground leading-relaxed">
            Most business advisors optimize for revenue.
            Every engagement at PASTED begins with understanding your vision.
          </p>

          <div className="space-y-3 max-w-md mx-auto py-4">
            {questions.map((q, i) => (
              <motion.p
                key={i}
                className="text-center text-foreground/80 text-lg italic"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              >
                {q}
              </motion.p>
            ))}
          </div>

          <div className="h-px bg-border/50 max-w-xs mx-auto" />

          <div className="text-center space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              The business is then designed around that vision.
            </p>
            <p className="text-foreground font-serif text-xl md:text-2xl">
              Dentistry becomes the tool to build the life you want —<br />
              <span className="text-primary">not the constraint that limits it.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DreamLifeSection;
