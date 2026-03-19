import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";
import OptimizedImage from "@/components/ui/optimized-image";

interface InlineTestimonialProps {
  name: string;
  role: string;
  quote: string;
  cardImage?: string;
  /** Visual variant */
  variant?: "default" | "accent" | "minimal";
}

const InlineTestimonial = ({ name, role, quote, cardImage, variant = "default" }: InlineTestimonialProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const bgClass = variant === "accent"
    ? "bg-primary/[0.03] border-primary/20"
    : variant === "minimal"
      ? "bg-transparent border-border/20"
      : "bg-card/40 border-border/30";

  return (
    <section ref={ref} className="py-10 md:py-16 bg-background">
      <div className="container max-w-3xl mx-auto px-4">
        <motion.div
          className={`relative rounded-xl border p-6 md:p-10 ${bgClass}`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Player card image */}
            {cardImage && (
              <div className="flex-shrink-0">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <OptimizedImage
                    src={cardImage}
                    alt={`${name} player card`}
                    wrapperClassName="w-28 md:w-36 rounded-lg shadow-lg overflow-hidden"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            )}

            {/* Quote content */}
            <div className="flex-grow text-center md:text-left">
              <Quote className="w-5 h-5 text-primary/40 mb-3 mx-auto md:mx-0" />
              <blockquote className="text-foreground/85 text-sm md:text-base leading-relaxed mb-4 font-serif italic">
                "{quote}"
              </blockquote>
              <div>
                <p className="font-medium text-foreground text-sm">{name}</p>
                <p className="text-xs text-muted-foreground">{role}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InlineTestimonial;
