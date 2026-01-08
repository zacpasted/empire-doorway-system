import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
interface TakeItSectionProps {
  onApplyClick?: () => void;
}
const TakeItSection = ({
  onApplyClick
}: TakeItSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.3
  });
  return;
};
export default TakeItSection;