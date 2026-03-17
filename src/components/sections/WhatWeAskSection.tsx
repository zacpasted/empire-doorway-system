import { useEffect, useRef, useState } from "react";

const WhatWeAskSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const asks = [
    "Record raw footage on your phone — we handle the rest.",
    "Show up as you are — no performance required.",
    "Trust the process, even when it feels slow.",
    "Stay consistent, not perfect.",
  ];

  const notRequired = [
    "No editing skills needed",
    "No posting or scheduling",
    "No caption writing",
    "No social media expertise",
  ];

  const weekTimeline = [
    { day: "Mon", activity: "Record 15-30 min of raw footage", isYou: true },
    { day: "Tue", activity: "We edit & prepare content", isYou: false },
    { day: "Wed", activity: "Content goes live", isYou: false },
    { day: "Thu", activity: "Content goes live", isYou: false },
    { day: "Fri", activity: "Content goes live", isYou: false },
    { day: "Sat", activity: "Content goes live", isYou: false },
    { day: "Sun", activity: "Rest — we've got it", isYou: false },
  ];

  const weHandle = [
    "Video editing & production",
    "Caption & hook writing",
    "Scheduling & posting",
    "Platform optimization",
    "Analytics & reporting",
    "Creative direction",
    "Quality assurance",
    "Strategy adjustments",
    "Videographer sourcing & management",
  ];

  const youDo = [
    "Record raw footage (15-30 min/week)",
    "Be yourself on camera",
    "Approve final content (optional)",
  ];

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-40 bg-card/20 relative"
    >
      <div className="container max-w-3xl mx-auto px-4">
        {/* Section label */}
        <p
          className={`text-xs tracking-[0.4em] uppercase text-muted-foreground/60 text-center mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          The Ask
        </p>

        {/* Title */}
        <h2
          className={`text-2xl md:text-4xl font-serif text-center text-foreground mb-16 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          What We Ask From You
        </h2>

        {/* Asks list */}
        <div className="space-y-6">
          {asks.map((ask, index) => (
            <div
              key={index}
              className={`flex items-start gap-6 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <span className="text-muted-foreground/30 text-sm mt-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-lg md:text-xl text-foreground/80 font-light leading-relaxed">
                {ask}
              </p>
            </div>
          ))}
        </div>

        {/* Weekly Timeline */}
        <div
          className={`mt-20 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-center text-xs tracking-[0.3em] uppercase text-muted-foreground/40 mb-8">
            A Typical Week as a PASTED Partner
          </p>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-6 left-0 right-0 h-px bg-border/30 hidden md:block" />
            
            <div className="grid grid-cols-7 gap-2 md:gap-4">
              {weekTimeline.map((item, index) => (
                <div
                  key={index}
                  className={`text-center transition-all duration-500`}
                  style={{ transitionDelay: `${600 + index * 80}ms` }}
                >
                  {/* Day dot */}
                  <div className="relative flex justify-center mb-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        item.isYou
                          ? "bg-primary shadow-lg shadow-primary/30"
                          : "bg-border/50"
                      }`}
                    />
                  </div>
                  
                  {/* Day label */}
                  <p
                    className={`text-xs font-medium mb-2 ${
                      item.isYou ? "text-primary" : "text-muted-foreground/60"
                    }`}
                  >
                    {item.day}
                  </p>
                  
                  {/* Activity */}
                  <p
                    className={`text-xs leading-tight ${
                      item.isYou
                        ? "text-foreground/90"
                        : "text-muted-foreground/50"
                    }`}
                  >
                    {item.activity}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex justify-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground/60">You</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-border/50" />
              <span className="text-xs text-muted-foreground/60">We handle</span>
            </div>
          </div>
        </div>

        {/* Side-by-side Comparison */}
        <div
          className={`mt-16 transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* We Handle */}
            <div className="p-6 md:p-8 border border-border/30 bg-background/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <span className="text-primary text-xs">✓</span>
                </div>
                <h4 className="font-serif text-foreground">What We Handle</h4>
              </div>
              <ul className="space-y-3">
                {weHandle.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="text-primary/60 mt-0.5">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* You Do */}
            <div className="p-6 md:p-8 border border-primary/30 bg-primary/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-primary/30 border border-primary/40 flex items-center justify-center">
                  <span className="text-primary text-xs font-medium">You</span>
                </div>
                <h4 className="font-serif text-foreground">What You Do</h4>
              </div>
              <ul className="space-y-3">
                {youDo.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="text-primary mt-0.5">·</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-primary/20">
                <p className="text-xs text-muted-foreground/60">
                  Total time commitment: ~2 hours/month
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`mt-16 pt-12 border-t border-border/10 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-center text-xs tracking-[0.3em] uppercase text-muted-foreground/40 mb-6">
            What You Don't Need
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {notRequired.map((item, index) => (
              <span
                key={index}
                className="px-4 py-2 text-sm text-muted-foreground/70 border border-border/20 bg-background/30"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="text-center text-muted-foreground/60 text-sm leading-relaxed max-w-lg mx-auto mt-8">
            You don't need to be an influencer. You just need to record raw footage. 
            We handle editing, posting, and everything in between—including sourcing and managing videographers when needed.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatWeAskSection;
