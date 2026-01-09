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
  return;
};
export default TheGapSection;