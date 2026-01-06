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
  return;
};
export default PrivateAdvisorySection;