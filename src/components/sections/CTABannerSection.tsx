import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const CTABannerSection = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background via-primary/[0.03] to-background overflow-hidden">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-muted-foreground/40 mb-4 font-medium">
            The PASTED Partnership
          </p>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground leading-[1.2] tracking-tight max-w-4xl mx-auto mb-3">
            A private, 12-month partnership. One system. One team. One goal:
            <br className="hidden sm:block" />
            <span className="text-primary font-semibold">the practice your clinical skill was always meant to run.</span>
          </h3>
          <p className="text-base md:text-lg text-muted-foreground/50 font-light tracking-wide mb-2">
            <span className="text-foreground font-medium">$500K–$1M+</span> in additional aesthetic production annually.
          </p>
          <p className="text-sm text-muted-foreground/40 mb-4">
            Higher case values · Stronger patient trust · Consistent monthly performance · Less dependence on volume or referrals
          </p>
          <p className="text-sm text-muted-foreground/40 mb-8">
            Executed entirely in-house across positioning, content, paid acquisition, conversion systems, and patient experience.
          </p>
          
          <motion.a
            href="#eligibility-form"
            onClick={(e) => {
              e.preventDefault();
              trackCTAClick({ ctaId: 'cta-banner', ctaText: 'Book Discovery Call', section: 'cta-banner' });
              document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 text-base font-medium tracking-wide uppercase bg-primary text-primary-foreground rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:scale-[1.02]"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
            <span className="absolute inset-0 bg-gradient-to-r from-primary/90 via-red-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <span className="relative z-10">Book Discovery Call</span>
            <ArrowRight className="relative z-10 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>
          
          <p className="mt-6 text-sm text-muted-foreground/60">
            30 practices annually · Applications reviewed within 48 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABannerSection;
