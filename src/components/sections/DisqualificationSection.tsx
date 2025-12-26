const DisqualificationSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card/30">
      <div className="container max-w-2xl mx-auto px-4 text-center">
        <p className="text-lg md:text-xl text-foreground mb-10">
          Associate to Empire™ is not designed for everyone.
        </p>

        <div className="space-y-4 text-muted-foreground text-lg leading-relaxed mb-10">
          <p>
            It is not for dentists who want trends, hacks, or fast attention.
          </p>
          <p>
            It is not for those who outsource responsibility for their future.
          </p>
          <p>
            It is not for people who confuse activity with progress.
          </p>
        </div>

        <div className="h-px bg-border/50 my-10 max-w-xs mx-auto" />

        <p className="text-foreground text-lg">
          This is for dentists who understand that authority is built deliberately—and that the cost of waiting is <span className="italic">invisible until it isn't</span>.
        </p>

        <p className="text-muted-foreground mt-8 text-base">
          If that distinction feels uncomfortable, this is not the right place.
        </p>
      </div>
    </section>
  );
};

export default DisqualificationSection;
