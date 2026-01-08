import { useEffect, useRef, useState } from "react";
const TransformationSection = () => {
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
  const transformations = [{
    before: "Skilled",
    after: "Recognized"
  }, {
    before: "Unknown",
    after: "Chosen"
  }, {
    before: "Reactive",
    after: "In control"
  }, {
    before: "Hoping",
    after: "Inevitable"
  }];
  return;
};
export default TransformationSection;