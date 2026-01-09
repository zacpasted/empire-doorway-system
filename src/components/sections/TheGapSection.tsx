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
    <section ref={sectionRef} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          {statements.map((statement, index) => (
            <p
              key={index}
              className={`font-playfair text-2xl md:text-4xl lg:text-5xl font-bold transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
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