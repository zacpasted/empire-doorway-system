import { useEffect } from "react";
import Index from "./Index";

const Discover = () => {
  useEffect(() => {
    // Small delay to ensure the page has rendered before scrolling
    const timer = setTimeout(() => {
      document.getElementById("eligibility-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return <Index />;
};

export default Discover;
