import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
const TransformationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px"
  });
  const transformations = [{
    before: "Skilled",
    after: "Recognized"
  }, {
    before: "Unknown",
    after: "Chosen"
  }, {
    before: "Reactive",
    after: "In Control"
  }, {
    before: "Hoping",
    after: "Inevitable"
  }];
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };
  return;
};
export default TransformationSection;