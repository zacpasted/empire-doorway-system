import { useEffect, useRef, useState } from 'react';

const FoundersLetterSection = () => {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 md:py-48 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container max-w-5xl mx-auto px-4 relative">
        <p className={`text-sm tracking-[0.3em] text-primary uppercase mb-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          What We Do
        </p>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left side - Main statement */}
          <div className={`space-y-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-[1.1]">
              From trained but <span className="text-primary italic">invisible</span>
            </h2>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-[1.1]">
              to chosen, trusted, and <span className="text-primary italic">known</span>.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mt-8">
              With a caseload, reputation, and career trajectory that actually reflects your skill.
            </p>
          </div>

          {/* Right side - Contrast */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="space-y-12">
              {/* What we don't do */}
              <div className="space-y-4">
                <p className="text-sm tracking-[0.2em] text-muted-foreground/60 uppercase">Not this</p>
                <div className="space-y-3">
                  {['Louder', 'Busier', 'Cheaper'].map((item, index) => (
                    <div 
                      key={item}
                      className="flex items-center gap-4 group"
                      style={{ transitionDelay: `${600 + index * 100}ms` }}
                    >
                      <div className="w-8 h-px bg-muted-foreground/30 group-hover:bg-muted-foreground/60 transition-colors" />
                      <span className="text-2xl text-muted-foreground/50 line-through decoration-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What we do */}
              <div className="space-y-4">
                <p className="text-sm tracking-[0.2em] text-primary uppercase">This</p>
                <div className="space-y-3">
                  {['Clearer', 'Recognised', 'Selected'].map((item, index) => (
                    <div 
                      key={item}
                      className="flex items-center gap-4 group"
                      style={{ transitionDelay: `${900 + index * 100}ms` }}
                    >
                      <div className="w-8 h-px bg-primary/50 group-hover:bg-primary transition-colors" />
                      <span className="text-2xl text-foreground font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersLetterSection;
