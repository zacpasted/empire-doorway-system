import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const ClosingCTASection = () => {
  return (
    <section id="apply" className="py-32 md:py-48">
      <div className="container max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight mb-8">
          Authority isn't given.<br />
          <span className="text-primary">It's built.</span>
        </h2>
        
        <p className="text-lg text-muted-foreground mb-16 max-w-xl mx-auto">
          PASTED Partnership is for cosmetic dentists ready to become the aesthetic authority in their market.
          This is not enrollment. It is a request for strategic consideration.
        </p>
        
        <a
          href="#eligibility-form"
          onClick={(e) => {
            e.preventDefault();
            trackCTAClick({ ctaId: 'closing-cta', ctaText: 'Schedule a Discovery Call', section: 'closing' });
            document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-block text-sm tracking-[0.3em] uppercase text-background bg-primary px-12 py-5 hover:bg-primary/90 transition-colors duration-300"
        >
          Schedule a Discovery Call
        </a>
        
        <p className="text-sm text-muted-foreground mt-8">
          Only 30 practices accepted per year. Applications reviewed individually.
        </p>
      </div>
    </section>
  );
};

export default ClosingCTASection;