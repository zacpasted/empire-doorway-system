const WhatYouGetSection = () => {
  const deliverables = [
    {
      title: "Content Strategy & Scripting",
      description: "Monthly content built specifically for dentists—no guesswork, no generic templates"
    },
    {
      title: "Full Editing & Scheduling",
      description: "We handle all editing and publishing. You never touch an app at midnight again."
    },
    {
      title: "Personal Brand Positioning",
      description: "Clarity on who you are, what you stand for, and why patients should choose you at a premium"
    },
    {
      title: "Expert Guidance",
      description: "Direction from the team behind the most recognized names in aesthetic dentistry"
    },
    {
      title: "Filming Frameworks",
      description: "Simple systems requiring under two hours per month of your time"
    },
    {
      title: "Group Calls & Community",
      description: "Execution-focused sessions with dentists building real authority"
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            Inside Associate to Empire™
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
            Everything You Need.<br />
            <span className="text-primary">Nothing You Don't.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {deliverables.map((item, index) => (
            <div
              key={index}
              className="p-6 border border-border/50 rounded-lg bg-background hover:border-primary/30 transition-all duration-300"
            >
              <h3 className="text-lg font-serif text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Member Benefits */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl" />
          <div className="relative p-8 md:p-10 border border-primary/20 rounded-2xl">
            <div className="text-center mb-8">
              <p className="text-primary uppercase tracking-[0.3em] text-xs mb-4">
                Member Advantage
              </p>
              <h3 className="text-xl md:text-2xl font-serif text-foreground">
                No Agency Roulette. We're Invested in You.
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="text-center p-4">
                <p className="text-3xl font-serif text-primary mb-2">50% Off</p>
                <p className="text-muted-foreground text-sm">Ad management services for A2E members</p>
              </div>
              <div className="text-center p-4">
                <p className="text-3xl font-serif text-primary mb-2">Priority Access</p>
                <p className="text-muted-foreground text-sm">To PASTED Studio and advanced services</p>
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-6 max-w-xl mx-auto">
              Associate to Empire™ is just the start. We curate careers—and we're invested in our doctors winning long-term.
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          We don't just manage socials. We build trajectories.
        </p>
      </div>
    </section>
  );
};

export default WhatYouGetSection;
