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
    text: "Clinically ready.",
    delay: 0
  }, {
    text: "Invisible.",
    delay: 200
  }, {
    text: "Watching others live the life you expected.",
    delay: 400
  }];
  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-background">
      <div className="container max-w-3xl mx-auto px-4 text-center">
        <div className={`space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {statements.map((statement, index) => (
            <p
              key={index}
              className="text-xl md:text-2xl text-muted-foreground font-serif"
              style={{ transitionDelay: `${statement.delay}ms` }}
            >
              {statement.text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TheGapSection;