import { useEffect, useRef, useState } from 'react';
import { Crown, Users, Globe } from 'lucide-react';
const PrivateAdvisorySection = () => {
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
  const features = [{
    icon: Crown,
    label: "Founder-led"
  }, {
    icon: Users,
    label: "Invitation-only"
  }, {
    icon: Globe,
    label: "Globally relevant"
  }];
  return (
    <section ref={sectionRef} className="py-20 md:py-32">
      <div className="container max-w-4xl mx-auto px-4 text-center">
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">
          Private Advisory
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-12">
          An invitation-only network for ambitious practitioners
        </h2>
        <div className={`flex justify-center gap-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center gap-3">
              <feature.icon className="w-6 h-6 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default PrivateAdvisorySection;