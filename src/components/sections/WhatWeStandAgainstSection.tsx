import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

const WhatWeStandAgainstSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const standAgainst = [
    { text: "Soulless, faceless dentistry", subtext: "that rewards throughput over meaning" },
    { text: "Education that sells hope", subtext: "but stops at skill" },
    { text: "Systems that reward output", subtext: "while erasing authorship" },
    { text: "Practices that strip identity", subtext: "in the name of efficiency" },
    { text: "Marketing that chases attention", subtext: "instead of earning trust" },
    { text: "An industry that asks clinicians to disappear", subtext: "quietly after 'doing everything right'" }
  ];

  return (
    <section ref={sectionRef} className="py-32 md:py-48 bg-background relative overflow-hidden">
      {/* Dramatic background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-destructive/5 via-transparent to-transparent" />
      
      <div className="container max-w-6xl mx-auto px-4 relative">
        <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            What We Stand Against
          </p>
          <p className="text-sm text-muted-foreground italic">
            (This is not positioning. This is alignment.)
          </p>
        </div>

        {/* Grid of items */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {standAgainst.map((item, index) => (
            <div
              key={index}
              className={`group relative p-8 border border-border/30 bg-secondary/20 hover:bg-secondary/40 hover:border-primary/30 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <X className="absolute top-4 right-4 w-4 h-4 text-destructive/40 group-hover:text-destructive/70 transition-colors" />
              <p className="text-lg text-foreground font-medium mb-2">{item.text}</p>
              <p className="text-muted-foreground text-sm">{item.subtext}</p>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div className={`max-w-3xl mx-auto text-center space-y-8 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="h-px w-24 bg-border/50 mx-auto" />
          
          <p className="text-muted-foreground text-lg">
            We are not here to compete with other dentists.
          </p>
          <p className="text-foreground text-xl font-medium">
            We are here to name what went wrong — <span className="text-primary">clearly</span> — so the right people can finally find each other.
          </p>

          <div className="h-px w-24 bg-border/50 mx-auto my-12" />

          <div className="pt-8">
            <p className="text-muted-foreground text-lg mb-4">When people feel weak, they scatter.</p>
            <p className="text-3xl md:text-4xl font-serif text-foreground">
              When they understand they were wronged, <br />
              <span className="text-primary italic">they unite.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeStandAgainstSection;
