import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const ClosingCTASection = () => {
  return (
    <section id="apply" className="py-32 md:py-48">
      <div className="container max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight mb-8">
          The gap between your clinical standard<br />
          and your market position has a name.<br />
          <span className="text-primary">This is how you close it.</span>
        </h2>
        
        <p className="text-lg text-muted-foreground mb-16 max-w-xl mx-auto">
          If you've read this far and it's accurate — the clinical work is strong, the market position doesn't reflect it, and you're done settling for that gap — this is the next step. Apply. We review every application personally, within 48 hours.
        </p>
        
        <a
          href="#eligibility-form"
          onClick={(e) => {
            e.preventDefault();
            trackCTAClick({ ctaId: 'closing-cta', ctaText: 'Apply for Partnership', section: 'closing' });
            document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
          className="inline-block text-sm tracking-[0.3em] uppercase text-background bg-primary px-12 py-5 hover:bg-primary/90 transition-colors duration-300"
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
