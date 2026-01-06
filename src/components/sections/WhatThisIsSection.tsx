import { useEffect, useRef, useState } from "react";
const WhatThisIsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
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
  useEffect(() => {
    if (!isVisible) return;
    const intervals = transformations.map((_, i) => {
      return setTimeout(() => setActiveIndex(i), 400 + i * 300);
    });
    return () => intervals.forEach(clearTimeout);
  }, [isVisible]);
  const transformations = [{
    before: "Trained but invisible",
    after: "Recognized and chosen",
    icon: "◇"
  }, {
    before: "Guessing what to post",
    after: "Strategic clarity",
    icon: "◈"
  }, {
    before: "Vendor roulette",
    after: "Authored infrastructure",
    icon: "◆"
  }, {
    before: "Competing on price",
    after: "Commanding premiums",
    icon: "✦"
  }];
  return null;
};
export default WhatThisIsSection;