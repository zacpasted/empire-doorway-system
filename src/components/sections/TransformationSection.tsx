const TransformationSection = () => {
  return (
    <section className="py-32 md:py-48">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-0 border border-border/30 rounded-sm overflow-hidden">
          {/* Before */}
          <div className="p-12 md:p-16 bg-card/50">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-12">
              Before
            </p>
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-muted-foreground font-serif">Guessing what to post</p>
              <p className="text-xl md:text-2xl text-muted-foreground font-serif">Editing at midnight</p>
              <p className="text-xl md:text-2xl text-muted-foreground font-serif">Vendor chaos</p>
              <p className="text-xl md:text-2xl text-muted-foreground font-serif">Racing to the bottom</p>
              <p className="text-xl md:text-2xl text-muted-foreground font-serif">Invisible despite excellence</p>
            </div>
          </div>
          
          {/* After */}
          <div className="p-12 md:p-16 bg-background border-t md:border-t-0 md:border-l border-border/30">
            <p className="text-sm tracking-[0.3em] uppercase text-primary mb-12">
              After
            </p>
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-foreground font-serif">Strategic clarity</p>
              <p className="text-xl md:text-2xl text-foreground font-serif">Authored infrastructure</p>
              <p className="text-xl md:text-2xl text-foreground font-serif">One aligned system</p>
              <p className="text-xl md:text-2xl text-foreground font-serif">Commanding premiums</p>
              <p className="text-xl md:text-2xl text-foreground font-serif">Recognized before met</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;
