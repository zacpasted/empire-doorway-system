import { useEffect, useRef, useState } from 'react';

const MarketContextSection = () => {
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

  const missingElements = [
    { name: "Michelin Guide", category: "Dining" },
    { name: "Condé Nast", category: "Travel" },
    { name: "A24", category: "Film" }
  ];

  return (
    <section ref={sectionRef} className="py-32 md:py-48 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-secondary/30" />
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="container max-w-6xl mx-auto px-4 relative">
        <p className={`text-primary uppercase tracking-[0.3em] text-sm text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Market Context
        </p>

        {/* Hero statement */}
        <div className={`max-w-4xl mx-auto text-center mb-24 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-lg text-muted-foreground mb-8">
            Aesthetic dentistry is no longer niche. It is a global, structurally growing, private-pay market measured in the <span className="text-foreground font-medium">tens of billions</span> — and accelerating.
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight">
            What the industry lacks is not education, clinics, or marketing.
          </h2>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary mt-4">
            It lacks recognition infrastructure.
          </h2>
        </div>

        {/* Missing elements - visual cards */}
        <div className={`flex flex-wrap justify-center gap-6 mb-24 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {missingElements.map((item, index) => (
            <div
              key={item.name}
              className="group relative px-10 py-8 border border-border/40 bg-background/50 backdrop-blur-sm hover:border-muted-foreground/30 transition-all duration-300"
              style={{ transitionDelay: `${600 + index * 100}ms` }}
            >
              <p className="text-xs tracking-[0.2em] text-muted-foreground/60 uppercase mb-2">{item.category}</p>
              <p className="text-2xl font-serif text-foreground/40 group-hover:text-foreground/60 transition-colors">No {item.name}</p>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 transition-colors" />
            </div>
          ))}
        </div>

        {/* Central declaration */}
        <div className={`max-w-3xl mx-auto text-center mb-24 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-lg text-muted-foreground mb-8">
            No central authority that decides what excellence actually looks like — and who embodies it.
          </p>
          <div className="inline-block relative">
            <p className="text-4xl md:text-5xl font-serif text-primary">
              Pasted exists to fill that gap.
            </p>
            <div className="absolute -inset-4 bg-primary/5 blur-2xl -z-10" />
          </div>
        </div>

        {/* Three pillars */}
        <div className={`grid md:grid-cols-3 gap-8 mb-24 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { title: "Editorial Authority", desc: "not ownership" },
            { title: "Curation", desc: "not noise" },
            { title: "Recognition that compounds", desc: "not decays" }
          ].map((pillar, index) => (
            <div 
              key={pillar.title}
              className="text-center p-8 border-t border-primary/30"
              style={{ transitionDelay: `${1000 + index * 100}ms` }}
            >
              <p className="text-xl font-medium text-foreground mb-2">{pillar.title}</p>
              <p className="text-muted-foreground italic">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Closing */}
        <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mb-16" />
          
          <p className="text-lg text-muted-foreground mb-4">
            We do not need to own clinics to influence the industry.
          </p>
          <p className="text-xl text-foreground font-medium mb-16">
            We shape where trust flows — and trust determines everything that follows.
          </p>

          <p className="text-xs tracking-[0.3em] text-muted-foreground/60 uppercase mb-6">In short</p>
          
          <div className="space-y-2">
            <p className="text-3xl md:text-4xl font-serif text-foreground">
              Pasted does not participate in the dentistry market.
            </p>
            <p className="text-3xl md:text-4xl font-serif text-primary italic">
              It defines it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketContextSection;
