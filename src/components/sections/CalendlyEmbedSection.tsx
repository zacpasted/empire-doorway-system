import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const CalendlyEmbedSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    // Load Calendly widget script
    const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="book-call" 
      className="py-16 md:py-24 bg-background"
    >
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
            Final Step
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Book Your Strategy Call
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Schedule a brief alignment conversation with <span className="text-foreground">Zac Orender</span> to confirm strategic fit and discuss your trajectory.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card rounded-xl border border-border overflow-hidden shadow-lg"
        >
          <div 
            className="calendly-inline-widget" 
            data-url="https://calendly.com/getpasted/associate-to-empire?primary_color=ff001e&hide_gdpr_banner=1"
            style={{ minWidth: '320px', height: '700px' }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs text-muted-foreground mt-6"
        >
          Availability is intentionally limited. Book only if you can arrive on time and engage thoughtfully.
        </motion.p>
      </div>
    </section>
  );
};

export default CalendlyEmbedSection;
