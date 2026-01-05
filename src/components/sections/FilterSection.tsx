const FilterSection = () => {
  return (
    <section className="py-32 md:py-48 bg-card/30">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="border border-border/50 p-12 md:p-20">
          <p className="text-sm tracking-[0.3em] uppercase text-primary text-center mb-16">
            The Gate
          </p>
          
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            {/* Not For */}
            <div>
              <p className="text-lg text-muted-foreground mb-8">This is not for:</p>
              <div className="space-y-4">
                <p className="text-foreground/70">Trend chasers</p>
                <p className="text-foreground/70">Loud marketers</p>
                <p className="text-foreground/70">Volume-first clinicians</p>
                <p className="text-foreground/70">Those who outsource responsibility</p>
              </div>
            </div>
            
            {/* For */}
            <div>
              <p className="text-lg text-foreground mb-8">This is for:</p>
              <div className="space-y-4">
                <p className="text-primary">Dentists who feel overlooked despite merit</p>
                <p className="text-primary">Those ready to author their own position</p>
                <p className="text-primary">Practitioners who value restraint over noise</p>
                <p className="text-primary">The ones who understand patience</p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-12 border-t border-border/30 text-center">
            <p className="text-muted-foreground italic">
              If this distinction feels uncomfortable, this is not the right place.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
