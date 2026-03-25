import { motion } from "framer-motion";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const MidPageCTASection = () => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackCTAClick({ ctaId: 'mid-page-interrupt', ctaText: 'Book Discovery Call', section: 'mid-page-cta' });
    document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Full-width accent line */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.04] to-transparent" />
      
      <div className="container max-w-3xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Thin accent rule */}
          <div className="w-12 h-px bg-primary/60 mx-auto mb-8" />

          <p className="text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-primary/70 mb-6 font-medium">
            Still here?
          </p>

          <h3 className="text-2xl md:text-4xl lg:text-5xl font-serif text-foreground leading-[1.15] tracking-tight mb-6">
            The practices that dominate this time next year<br />
            <span className="text-muted-foreground/60">are deciding right now.</span>
          </h3>

          <p className="text-base md:text-lg text-muted-foreground/70 max-w-lg mx-auto mb-10 font-light leading-relaxed">
            You've read this far because something here is accurate. The clinical excellence is already there. The only question is whether the structure around it finally matches.
          </p>

          <motion.a
            href="#eligibility-form"
            onClick={handleClick}
            className="group relative inline-flex items-center gap-3 px-10 md:px-14 py-4 md:py-5 text-sm md:text-base font-medium tracking-[0.2em] uppercase overflow-hidden transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Background layers */}
            <span className="absolute inset-0 border border-primary/80 transition-all duration-300 group-hover:border-primary" />
            <span className="absolute inset-0 bg-primary/0 group-hover:bg-primary transition-all duration-300" />
            
            <span className="relative z-10 text-primary group-hover:text-primary-foreground transition-colors duration-300">
              Book Discovery Call
            </span>
            
            {/* Animated arrow */}
            <svg 
              className="relative z-10 w-4 h-4 text-primary group-hover:text-primary-foreground transition-all duration-300 transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>

          <p className="mt-8 text-xs text-muted-foreground/40 tracking-wide">
            45-minute strategic evaluation · 30 practices per year · Not all accepted
          </p>

          {/* Bottom accent rule */}
          <div className="w-12 h-px bg-primary/30 mx-auto mt-8" />
        </motion.div>
      </div>
    </section>
  );
};

export default MidPageCTASection;
