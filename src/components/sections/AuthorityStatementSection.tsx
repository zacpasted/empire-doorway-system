import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AuthorityStatementSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 border-y border-border/20 bg-background relative">
      <div className="container max-w-3xl mx-auto px-4">
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-2">
            A Singular Position
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight">
            PASTED is the only company in the world
            that has repeatedly built elite aesthetic practices
            through this <span className="text-primary">integrated approach.</span>
          </h2>

          <div className="h-px bg-border/50 max-w-xs mx-auto" />

          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Over nearly a decade, the team has worked with some of the most ambitious dentists globally.
            This experience created a blueprint that cannot be replicated by traditional agencies —
            because it requires the intersection of brand, content, advertising, conversion systems,
            and strategic advisory operating as one.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AuthorityStatementSection;
