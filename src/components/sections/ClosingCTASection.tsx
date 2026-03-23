import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const ClosingCTASection = () => {
  return (
    <section id="apply" className="py-32 md:py-48 bg-card/50">
      <div className="container max-w-3xl mx-auto px-4 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
          This Is Where Your Arc Begins
        </p>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight mb-8">
          The gap between your clinical standard<br />
          and your market position has a name.<br />
          <span className="text-primary">This is how you close it.</span>
        </h2>
        
        <p className="text-lg text-muted-foreground mb-16 max-w-xl mx-auto">
          Apply now. Every application is reviewed personally within 48 hours by Zac and Alan — not a team member, not an intake form. If we're the right fit, we move fast. If we're not, we'll tell you directly and tell you exactly why.
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
      </div>
    </section>
  );
};

export default ClosingCTASection;
