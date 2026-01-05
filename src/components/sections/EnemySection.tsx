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
  const statements = ["They trained you to perform.", "Not to be recognized.", "They taught you technique.", "Not leverage.", "They handed you a degree.", "Then abandoned you to the algorithm."];
  return;
};
export default EnemySection;