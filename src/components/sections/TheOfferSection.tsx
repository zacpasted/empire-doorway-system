import { trackCTAClick } from "@/hooks/useCTAAnalytics";

const TheOfferSection = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container max-w-3xl mx-auto px-4">
        <p className="text-xs tracking-[0.4em] uppercase text-primary text-center mb-6">
          The Partnership
        </p>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground text-center leading-tight mb-12">
          Think of us as your in-house team for everything outside the chair.
        </h2>

        <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto">
          <p>
            You have a workflow for veneers. A workflow for composites. A workflow for implants. Every great clinical outcome you deliver runs on a system you've refined over years.
          </p>
          <p>
            PASTED is that same thing — but for building your practice. Brand, content, paid ads, patient conversion, and consultation systems. One coordinated team. One system. Running in the background while you do the work you trained for.
          </p>
          <p>
            We are your authors, your architects, and the best team on earth for this. 30 practices per year. Not all accepted.
          </p>
        </div>

        <div className="mt-14 flex flex-col items-center">
          <a
            href="#eligibility-form"
            onClick={(e) => {
              e.preventDefault();
              trackCTAClick({ ctaId: 'the-offer', ctaText: 'Apply for Partnership', section: 'the-offer' });
              document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            className="inline-flex items-center justify-center px-10 py-4 text-sm font-medium tracking-[0.2em] uppercase bg-primary text-primary-foreground rounded-sm transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
          >
            Apply for Partnership →
          </a>
          <p className="mt-4 text-xs text-muted-foreground/50">
            30 practices per year · Reviewed within 48 hours · Not all accepted
          </p>
        </div>
      </div>
    </section>
  );
};

export default TheOfferSection;
