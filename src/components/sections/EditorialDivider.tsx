import { motion } from "framer-motion";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

interface EditorialDividerProps {
  variant?: "dots" | "line" | "diamond" | "rule";
}

const EditorialDivider = ({ variant = "dots" }: EditorialDividerProps) => {
  if (variant === "diamond") {
    return (
      <motion.div 
        className="py-16 md:py-20 flex items-center justify-center gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: APPLE_EASE }}
      >
        <motion.div 
          className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-primary/30"
          initial={{ scaleX: 0, originX: 1 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: APPLE_EASE }}
        />
        <motion.div 
          className="w-2 h-2 rotate-45 border border-primary/40"
          initial={{ scale: 0, rotate: 0 }}
          whileInView={{ scale: 1, rotate: 45 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4, ease: APPLE_EASE }}
        />
        <motion.div 
          className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-primary/30"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: APPLE_EASE }}
        />
      </motion.div>
    );
  }

  if (variant === "line") {
    return (
      <div className="py-14 md:py-18">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div 
            className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: APPLE_EASE }}
          />
        </div>
      </div>
    );
  }

  if (variant === "rule") {
    return (
      <motion.div 
        className="py-16 md:py-20 flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <motion.div 
            className="w-8 h-px bg-primary/30"
            initial={{ scaleX: 0, originX: 1 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: APPLE_EASE }}
          />
          {[0, 1, 2].map((i) => (
            <motion.div 
              key={i}
              className="w-1 h-1 rounded-full bg-primary/40"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.08, ease: APPLE_EASE }}
            />
          ))}
          <motion.div 
            className="w-8 h-px bg-primary/30"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: APPLE_EASE }}
          />
        </div>
      </motion.div>
    );
  }

  // Default: dots
  return (
    <motion.div 
      className="py-14 md:py-18 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: APPLE_EASE }}
    >
      <span className="text-primary/30 text-sm tracking-[0.5em] select-none">· · ·</span>
    </motion.div>
  );
};

export default EditorialDivider;
