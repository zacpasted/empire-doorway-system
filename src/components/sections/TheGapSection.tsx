import { useEffect, useRef, useState } from "react";

const TheGapSection = () => {
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

  const statements = [
    { text: "Clinically ready.", delay: 0 },
    { text: "Invisible.", delay: 200 },
    { text: "Watching others live the life you expected.", delay: 400 },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-48 bg-background relative overflow-hidden"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/4 left-1/4 w-px h-64 bg-foreground/20" />
        <div className="absolute top-1/3 right-1/3 w-px h-48 bg-foreground/20" />
      </div>

      <div className="container max-w-4xl mx-auto px-4">
        {/* Section label */}
        <p
          className={`text-xs tracking-[0.4em] uppercase text-muted-foreground/60 text-center mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          The Gap
        </p>

        {/* Core statements */}
        <div className="space-y-8 md:space-y-12 text-center">
          {statements.map((statement, index) => (
            <p
              key={index}
              className={`font-serif transition-all duration-1000 ${
                index === 0
                  ? "text-3xl md:text-5xl lg:text-6xl text-foreground"
                  : index === 1
                  ? "text-4xl md:text-6xl lg:text-7xl text-foreground/90 font-medium"
                  : "text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              } ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${statement.delay}ms` }}
            >
              {statement.text}
            </p>
          ))}
        </div>

        {/* Visual metaphor - isolation indicator */}
        <div
          className={`mt-24 flex justify-center transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-foreground/20" />
            <div className="absolute -left-16 top-1/2 w-12 h-px bg-gradient-to-r from-transparent to-foreground/10" />
            <div className="absolute -right-16 top-1/2 w-12 h-px bg-gradient-to-l from-transparent to-foreground/10" />
          </div>
        </div>

        {/* Emotional anchor */}
        <p
          className={`text-center mt-20 text-sm text-muted-foreground/50 italic transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          You feel seen. No one else has named this.
        </p>
      </div>
    </section>
  );
};

export default TheGapSection;
