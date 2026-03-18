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
          The Industry Isn't Built for Your Breakthrough
        </p>
        
        <h2
          className={`text-2xl md:text-4xl font-serif text-foreground mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Most Solutions Are Designed to<br />Keep You Where You Are.
        </h2>

        <div className="space-y-3 mb-10">
          {[
            "Keep you spending.",
            "Keep you dependent.",
            "Keep you optimizing small pieces.",
          ].map((line, i) => (
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
          className={`text-lg text-muted-foreground/60 mb-10 transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Because treating symptoms is profitable.<br />
          Fixing structure is not.
        </p>

        <div className="h-px bg-border/50 max-w-xs mx-auto mb-10" />

        <p
          className={`text-xl md:text-3xl font-serif text-foreground transition-all duration-700 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          PASTED Fixes What Everything Else Avoids.
        </p>
        
        <p
          className={`mt-6 text-muted-foreground max-w-xl mx-auto transition-all duration-700 delay-[1200ms] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          We don't layer on tactics. We rebuild the system that drives patient perception,
          case value, conversion, and long-term growth. This is why the results compound.
        </p>
      </div>
    </section>
  );
};
export default TheGapSection;
