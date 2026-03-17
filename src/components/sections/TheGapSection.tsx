import { useEffect, useRef, useState } from "react";
const TheGapSection = () => {
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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  const statements = [{
    text: "Clinically exceptional.",
    delay: 0
  }, {
    text: "Invisible in your market.",
    delay: 200
  }, {
    text: "Watching less skilled competitors attract the patients you deserve.",
    delay: 400
  }];
  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background">
      <div className="container max-w-3xl mx-auto px-4 text-center">
        <p
          className={`text-xs tracking-[0.4em] uppercase text-primary mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          The Gap
        </p>
        
        <div className="space-y-6">
          {statements.map((statement, index) => (
            <h2
              key={index}
              className={`text-2xl md:text-4xl font-serif text-foreground transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${statement.delay}ms` }}
            >
              {statement.text}
            </h2>
          ))}
        </div>
        
        <p
          className={`mt-12 text-muted-foreground max-w-xl mx-auto transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Cosmetic dentistry is a perception category. The practices that dominate their market control authority, perception, and patient demand — not just clinical skill.
        </p>
      </div>
    </section>
  );
};
export default TheGapSection;