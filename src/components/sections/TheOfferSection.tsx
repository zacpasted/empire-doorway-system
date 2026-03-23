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
          The Partnership <span className="text-muted-foreground/60 text-[10px] tracking-[0.2em]">· 30 Practices / Year</span>
        </p>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground text-center leading-tight mb-12">
          Everything outside the chair. Handled.
        </h2>

        <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto">
          <p>
            You have a system for every clinical procedure. Veneers. Composites. Implants. You refined it over years. It works because it's specific, coordinated, and repeatable.
          </p>
          <p>
            <span className="not-italic font-medium text-foreground">PASTED</span> is that same thing — but for practice growth. Brand, content, ads, and patient conversion. One team. One system. Runs while you operate.
          </p>
          <p>
            We are your operating partner. We run the growth side of your practice. You do the dentistry. We handle everything it takes to fill your chair with the right patients.
          </p>
        </div>

        {/* Offer statement — distinct typographic treatment */}
        <p className="mt-14 text-xl md:text-2xl font-serif text-foreground text-center leading-relaxed max-w-2xl mx-auto">
          12 months. Brand, content, paid media, and conversion — all in-house. One team. One outcome: <span className="text-primary">$500K–$1M+</span> in additional aesthetic production.
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
            Dr. Jon Marashi, Dr. Brian Harris, and 100+ elite cosmetic dentists are already partners.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TheOfferSection;
