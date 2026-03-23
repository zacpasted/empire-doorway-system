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

        {/* Offer sentence — distinct typographic treatment */}
        <p className="mt-14 text-xl md:text-2xl font-serif text-foreground text-center leading-relaxed max-w-2xl mx-auto">
          A private 12-month operating partnership — brand, content, paid media, and conversion systems, built and run in-house by one team, accountable to one outcome: <span className="text-primary">$500K–$1M+</span> in additional aesthetic production.
        </p>
      </div>
    </section>
  );
};

export default TheOfferSection;
