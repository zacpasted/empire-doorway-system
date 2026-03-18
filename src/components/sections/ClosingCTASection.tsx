import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const ClosingCTASection = () => {
  return (
    <section id="apply" className="py-32 md:py-48">
      <div className="container max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight mb-8">
          This Is Where Practices<br />
          <span className="text-primary">Become Category Leaders.</span>
        </h2>
        
        <p className="text-lg text-muted-foreground mb-16 max-w-xl mx-auto">
          If you're serious about building a dominant aesthetic practice — and operating at the level of the best — this is the partnership.
        </p>
        
        <a
          href="#eligibility-form"
          onClick={(e) => {
            e.preventDefault();
            trackCTAClick({ ctaId: 'closing-cta', ctaText: 'Apply for PASTED Partnership', section: 'closing' });
            document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-block text-sm tracking-[0.3em] uppercase text-background bg-primary px-12 py-5 hover:bg-primary/90 transition-colors duration-300"
        >
          Apply for PASTED Partnership
        </a>
        
        <p className="text-sm text-muted-foreground mt-8">
          Limited to 30 practices annually.
        </p>
      </div>
    </section>
  );
};

export default ClosingCTASection;
