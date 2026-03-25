import { useEffect, useRef } from "react";
import Index from "./Index";

const Discover = () => {
  const attempted = useRef(false);

  useEffect(() => {
    if (attempted.current) return;
    attempted.current = true;

    const scrollToCalendly = () => {
      const el = document.getElementById("eligibility-form");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      }
      return false;
    };

    // Poll until the lazy-loaded section is in the DOM
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (scrollToCalendly() || attempts > 20) {
        clearInterval(interval);
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return <Index />;
};

export default Discover;
