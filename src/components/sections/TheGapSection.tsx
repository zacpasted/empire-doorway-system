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

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background">
      <div className="container max-w-3xl mx-auto px-4 text-center">
        <p
          className={`text-xs tracking-[0.4em] uppercase text-primary mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          The Reframe
        </p>
        
        <h2
          className={`text-2xl md:text-4xl font-serif text-foreground mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Most dentists are stuck in a loop.
        </h2>

        <div className="space-y-3 mb-10">
          {["More ads.", "More agencies.", "More spend.", "Same results."].map((line, i) => (
            <p
              key={i}
              className={`text-xl md:text-2xl text-muted-foreground/70 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              {line}
            </p>
          ))}
        </div>

        <p
          className={`text-xl md:text-3xl font-serif text-foreground transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Because no one fixed the system.
        </p>
        
        <p
          className={`mt-12 text-muted-foreground max-w-xl mx-auto transition-all duration-700 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          You don't need more marketing. You need better positioning, better patients, and better systems.
          That's what PASTED rebuilds.
        </p>
      </div>
    </section>
  );
};
export default TheGapSection;
