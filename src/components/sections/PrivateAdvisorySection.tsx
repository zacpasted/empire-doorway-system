import { useEffect, useRef, useState } from 'react';
import { Crown, Users, Globe } from 'lucide-react';

const PrivateAdvisorySection = () => {
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

  const features = [
    { icon: Crown, label: "Founder-led" },
    { icon: Users, label: "Invitation-only" },
    { icon: Globe, label: "Globally relevant" }
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-secondary/20">
      <div className="container max-w-5xl mx-auto px-4">
        <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-primary uppercase tracking-[0.3em] text-xs mb-6">
            Pasted Studio / Private Advisory
          </p>
          
          <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-8 max-w-2xl mx-auto">
            For globally relevant aesthetic dentists seeking strategic alignment at the highest level.
          </h2>

          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {features.map((item, index) => (
              <div 
                key={item.label}
                className={`flex items-center gap-2 px-4 py-2 border border-border/40 bg-background/50 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <item.icon className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">{item.label}</span>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            This is not a programme. It is strategic partnership for those ready to define the industry.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivateAdvisorySection;
