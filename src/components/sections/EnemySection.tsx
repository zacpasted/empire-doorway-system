import { useEffect, useRef, useState } from "react";

const EnemySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.2
    });
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
    "Then abandoned you to the algorithm."
  ];
  
  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container max-w-4xl mx-auto px-4 text-center">
        <div className="space-y-6">
          {statements.map((statement, index) => (
            <p
              key={index}
              className={`text-2xl md:text-4xl font-serif text-foreground/90 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {statement}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnemySection;