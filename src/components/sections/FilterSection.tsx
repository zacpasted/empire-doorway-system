import { useRef } from "react";
import { motion, useInView } from "framer-motion";
const FilterSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2
  });
  const notFor = [{
    text: "Trend chasers",
    icon: "◇"
  }, {
    text: "Loud marketers",
    icon: "◈"
  }, {
    text: "Volume-first clinicians",
    icon: "◆"
  }, {
    text: "Those who outsource responsibility",
    icon: "◇"
  }];
  const isFor = [{
    text: "Dentists who feel overlooked despite merit",
    icon: "△"
  }, {
    text: "Those ready to author their own position",
    icon: "▲"
  }, {
    text: "Practitioners who value restraint over noise",
    icon: "△"
  }, {
    text: "The ones who understand patience",
    icon: "▲"
  }];
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };
  const itemVariantsRight = {
    hidden: {
      opacity: 0,
      x: 20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };
  return;
};
export default FilterSection;