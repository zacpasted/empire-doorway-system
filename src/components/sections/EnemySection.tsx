import { useEffect, useRef, useState } from "react";

const EnemySection = () => {
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

  const statements = [
    "They trained you to perform.",
    "Not to be recognized.",
    "They taught you technique.",
    "Not leverage.",
    "They handed you a degree.",
    "Then abandoned you to the algorithm.",
  ];

  return (
    <section ref={sectionRef} className="py-32 md:py-48 bg-card/30">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="space-y-4">
          {statements.map((statement, index) => (
            <p
              key={index}
              className={`text-2xl md:text-4xl lg:text-5xl font-serif leading-tight transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } ${index % 2 === 1 ? "text-muted-foreground pl-8 md:pl-16" : "text-foreground"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {statement}
            </p>
          ))}
        </div>
        
        <div className="mt-24 pt-12 border-t border-border/30">
          <p className="text-lg text-primary tracking-wide">
            This is not your failure. This is their design.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EnemySection;
