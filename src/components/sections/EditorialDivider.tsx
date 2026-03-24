import { motion } from "framer-motion";

interface EditorialDividerProps {
  variant?: "dots" | "line" | "diamond" | "rule";
}

const EditorialDivider = ({ variant = "dots" }: EditorialDividerProps) => {
  if (variant === "diamond") {
    return (
      <div className="py-16 md:py-20 flex items-center justify-center gap-4">
        <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-primary/30" />
        <div className="w-2 h-2 rotate-45 border border-primary/40" />
        <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-primary/30" />
      </div>
    );
  }

  if (variant === "line") {
    return (
      <div className="py-14 md:py-18">
        <div className="max-w-5xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
      </div>
    );
  }

  if (variant === "rule") {
    return (
      <div className="py-16 md:py-20 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-primary/30" />
          <div className="w-1 h-1 rounded-full bg-primary/40" />
          <div className="w-1 h-1 rounded-full bg-primary/40" />
          <div className="w-1 h-1 rounded-full bg-primary/40" />
          <div className="w-8 h-px bg-primary/30" />
        </div>
      </div>
    );
  }

  // Default: dots
  return (
    <div className="py-14 md:py-18 flex items-center justify-center">
      <span className="text-primary/30 text-sm tracking-[0.5em] select-none">· · ·</span>
    </div>
  );
};

export default EditorialDivider;
