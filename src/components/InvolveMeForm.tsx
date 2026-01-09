import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface InvolveMeFormProps {
  projectId?: string;
  title?: string;
}

const InvolveMeForm = ({ 
  projectId = "dentist-brand-fit-intake",
  title = "Dentist Brand Fit Intake"
}: InvolveMeFormProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://pasted.involve.me/embed"]');
    
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://pasted.involve.me/embed";
      script.async = true;
      script.onload = () => setIsLoaded(true);
      document.body.appendChild(script);
    } else {
      setIsLoaded(true);
    }

    return () => {
      // Cleanup is optional since other instances might use the script
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      <div 
        className="involveme_embed rounded-lg overflow-hidden bg-card"
        data-project={projectId}
        data-title={title}
      />
    </motion.div>
  );
};

export default InvolveMeForm;
