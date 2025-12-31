import { Scissors, Target, Sparkles, Shield, Clock, TrendingUp } from "lucide-react";

const WhatYouGetSection = () => {
  const weHandle = [
    {
      icon: Scissors,
      title: "Editing & Production",
      description: "Professional short-form content edited to premium standards",
    },
    {
      icon: Clock,
      title: "Structure & Cadence",
      description: "Strategic posting schedule designed for momentum",
    },
    {
      icon: Shield,
      title: "Quality Control",
      description: "Every piece reviewed against our proven frameworks",
    },
  ];

  const weProvide = [
    {
      icon: Target,
      title: "Brand Positioning",
      description: "So the market understands who you are and why you're different",
    },
    {
      icon: Sparkles,
      title: "Content Narrative",
      description: "A defined direction that removes posting guesswork",
    },
    {
      icon: TrendingUp,
      title: "Strategic Guidance",
      description: "Direction from the team behind dentistry's top 1%",
    },
  ];

  const weEnsure = [
    "Content builds authority, not just activity",
    "Strategy compounds into patients and referrals",
    "Your time stays in dentistry, not content management",
    "No vendor roulette—long-term alignment",
  ];

  const replaces = [
    "Random posting",
    "Vendor roulette",
    "Wasted agency spend",
    "Time lost managing creatives",
    "Content that goes nowhere",
  ];

  return (
    <section className="py-20 md:py-28 bg-secondary/30 overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            What Associate to Empire™ Gives You
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-8 leading-tight max-w-4xl mx-auto">
            The Guesswork, Time Drain, and Wasted Effort<br />
            <span className="text-primary">That Keeps Talented Dentists Invisible—Removed.</span>
          </h2>
        </div>

        {/* We Handle Section */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <h3 className="text-xs uppercase tracking-[0.3em] text-primary font-medium">
              We Handle
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {weHandle.map((item, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-xl bg-gradient-to-br from-card via-card to-card/50 border border-border/50 hover:border-primary/40 transition-all duration-500"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h4 className="text-lg font-serif text-foreground mb-3">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* We Provide Section */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <h3 className="text-xs uppercase tracking-[0.3em] text-primary font-medium">
              We Provide
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {weProvide.map((item, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-xl bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20 hover:border-primary/50 transition-all duration-500"
              >
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h4 className="text-lg font-serif text-foreground mb-3">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* We Ensure Section */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <h3 className="text-xs uppercase tracking-[0.3em] text-primary font-medium">
              We Ensure
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
          
          <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-card via-secondary/50 to-card border border-border/50">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 via-transparent to-transparent rounded-2xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary/5 via-transparent to-transparent rounded-2xl" />
            
            <div className="relative grid sm:grid-cols-2 gap-6">
              {weEnsure.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-border/30 hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/30 flex items-center justify-center">
                    <span className="text-primary text-sm font-medium">{index + 1}</span>
                  </div>
                  <p className="text-foreground/90 text-sm leading-relaxed pt-1">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What This Replaces */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-destructive/30 to-transparent" />
            <h3 className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">
              What This Replaces
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-destructive/30 to-transparent" />
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {replaces.map((item, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 text-muted-foreground text-sm line-through decoration-destructive/40"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Statement */}
        <div className="text-center pt-8 border-t border-border/30">
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            We handle the thinking, the editing, and the standards—so your content builds authority 
            and momentum instead of just keeping up with posting.
          </p>
          <p className="text-2xl md:text-3xl font-serif text-foreground mb-2">
            This is not social media management.
          </p>
          <p className="text-2xl md:text-3xl font-serif text-primary mb-4">
            It's career curation.
          </p>
          <p className="text-sm text-muted-foreground tracking-widest uppercase">
            Built by PASTED.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatYouGetSection;
