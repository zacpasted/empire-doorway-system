import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const ClosingCTASection = () => {
  return (
    <section id="apply" className="py-32 md:py-48">
      <div className="container max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight mb-8">
          Dentistry doesn't owe you recognition.<br />
          <span className="text-primary">You have to take it.</span>
        </h2>
        
        <p className="text-lg text-muted-foreground mb-16 max-w-xl mx-auto">
          Associate to Empire™ is not enrollment. It is a request for consideration.
        </p>
        
        <a
          href="#eligibility-form"
          onClick={(e) => {
            e.preventDefault();
            trackCTAClick({ ctaId: 'closing-cta', ctaText: 'Apply to Work With PASTED', section: 'closing' });
            document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-block text-sm tracking-[0.3em] uppercase text-background bg-primary px-12 py-5 hover:bg-primary/90 transition-colors duration-300"
        >
          Apply to Work With PASTED
        </a>
        
        <p className="text-sm text-muted-foreground mt-8">
          Applications reviewed manually. Scarcity is structural.
        </p>
      </div>
    </section>
  );
};

export default ClosingCTASection;
