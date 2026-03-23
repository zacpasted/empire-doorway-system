import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const ClosingCTASection = () => {
  return (
    <section id="apply" className="py-32 md:py-48 bg-card/50">
      <div className="container max-w-3xl mx-auto px-4 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
          This Is Where Your Arc Begins
        </p>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight mb-8">
          The practice you want.<br />
          <span className="text-primary">The partner who builds it.</span>
        </h2>
        
        <p className="text-lg text-muted-foreground mb-6 max-w-xl mx-auto">
          The clinical excellence is already there. The ambition is already there. What's been missing is a partner as invested in your potential as you are.
        </p>
        
        <p className="text-lg text-muted-foreground mb-16 max-w-xl mx-auto">
          Apply now. Every application is reviewed personally by Zac and Alan within 48 hours. If we're not the right fit, we'll tell you directly — and tell you exactly why.
        </p>
        
        <a
          href="#eligibility-form"
          onClick={(e) => {
            e.preventDefault();
            trackCTAClick({ ctaId: 'closing-cta', ctaText: 'Apply for Partnership', section: 'closing' });
            document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
          className="inline-block text-sm tracking-[0.3em] uppercase text-primary-foreground bg-primary px-12 py-5 hover:bg-primary/90 transition-colors duration-300"
        >
          Apply for Partnership →
        </a>
        
        <p className="text-sm text-muted-foreground mt-8">
          30 practices per year · Reviewed within 48 hours · Strategic fit required · Not all accepted
        </p>

        <p className="text-xs text-muted-foreground/50 mt-3">
          $100M+ in aesthetic revenue driven · 97% client retention · 30 practices per year
        </p>
      </div>
    </section>
  );
};

export default ClosingCTASection;
