import { useEffect } from "react";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const ScrollProgressBar = () => {
  const { scrollPercent } = useScrollPosition();

  useEffect(() => {
    document.documentElement.style.setProperty("--scroll-progress", `${scrollPercent * 100}%`);
  }, [scrollPercent]);

  return <div className="scroll-progress-bar" />;
};

export default ScrollProgressBar;
