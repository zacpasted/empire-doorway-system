import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const TheOfferSection = () => {
  const handleCTA = () => {
    trackCTAClick({ ctaId: 'offer-cta', ctaText: 'Apply for Partnership', section: 'the-offer' });
    document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="py-24 md:py-32">
      <div className="container max-w-3xl mx-auto px-4">
        <p className="text-xs tracking-[0.4em] uppercase text-primary text-center mb-6">
          The Partnership
        </p>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground text-center leading-tight mb-12">
          Everything outside the chair. Handled.
        </h2>

        <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto">
          <p>
            You have a workflow for veneers. For composites. For implants. Every great clinical outcome runs on a system.
          </p>
          <p>
            <span className="not-italic font-medium text-foreground">PASTED</span> is that system — but for building your practice. Brand, content, ads, patient conversion. One team. Running while you operate.
          </p>
          <p>
            We are your <span className="text-primary">operating partner</span>. Your accountability partner. The authors of your arc. 30 practices per year. Not all accepted.
          </p>
        </div>

        {/* Offer statement — distinct typographic treatment */}
        <p className="mt-14 text-xl md:text-2xl font-serif text-foreground text-center leading-relaxed max-w-2xl mx-auto">
          A private 12-month partnership. Brand, content, paid media, and conversion — built and run in-house. Accountable to one outcome: <span className="text-primary">$500K–$1M+</span> in additional aesthetic production.
        </p>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={handleCTA}
            className="inline-block text-sm tracking-[0.3em] uppercase text-primary-foreground bg-primary px-12 py-5 hover:bg-primary/90 transition-colors duration-300"
          >
            Apply for Partnership →
          </button>
          <p className="text-sm text-muted-foreground mt-4">
            30 practices per year · Reviewed within 48 hours · Not all accepted
          </p>
          <p className="text-xs text-muted-foreground/50 mt-2 italic">
            Trusted by Dr. Jon Marashi, Dr. Brian Harris, and 100+ elite cosmetic dentists worldwide.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TheOfferSection;
