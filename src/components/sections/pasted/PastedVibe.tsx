import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useWistiaLoader, getWistiaPlaceholderStyles } from "@/hooks/use-wistia";

const VIBE_MEDIA_ID = "tcg2sxyjch";

const PastedVibe = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1, rootMargin: "200px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useWistiaLoader(VIBE_MEDIA_ID, { loadOnMount: isVisible });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-48 border-t border-white/5 overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="max-w-[1680px] mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="col-span-12 lg:col-span-5"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px" style={{ background: "var(--color-gold)" }} />
              <span className="text-[10px] uppercase tracking-[0.32em]" style={{ color: "var(--color-gold)" }}>
                The Culture
              </span>
            </div>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-light tracking-[-0.015em]">
              This is PASTED.
            </h2>
            <p className="mt-8 text-white/60 text-[15px] leading-[1.9] font-light max-w-md">
              We love what we do. We are selective about who we do it with. That selectivity
              is what makes it work. This is not a roster — it is a circle.
            </p>
          </motion.div>

          {/* Video */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="col-span-12 lg:col-span-5 lg:col-start-8"
          >
            <div className="max-w-sm mx-auto lg:mx-0">
              <div
                className="overflow-hidden"
                style={{ borderRadius: '2px', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <style>{getWistiaPlaceholderStyles(VIBE_MEDIA_ID, '176.67%')}</style>
                {/* @ts-ignore */}
                <wistia-player
                  media-id={VIBE_MEDIA_ID}
                  aspect="0.5660377358490566"
                  autoplay="false"
                  end-video-behavior="default"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PastedVibe;
