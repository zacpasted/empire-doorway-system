import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useWistiaLoader, getWistiaPlaceholderStyles } from "@/hooks/use-wistia";

const FOUNDER_VIDEO_ID = "h2xbzknj3f";

const PastedDossier = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const [isVidVisible, setIsVidVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVidVisible(true); },
      { threshold: 0.1, rootMargin: "200px" }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  useWistiaLoader(FOUNDER_VIDEO_ID, { loadOnMount: isVidVisible });

  return (
    <section id="dossier" className="relative py-32 lg:py-48 border-t border-white/5" style={{ background: "var(--color-bg)" }}>
      <div className="max-w-[1680px] mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-8 lg:gap-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="col-span-12 lg:col-span-3"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px" style={{ background: "var(--color-gold)" }} />
              <span className="text-[10px] uppercase tracking-[0.32em]" style={{ color: "var(--color-gold)" }}>
                Dossier
              </span>
            </div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
              A letter from the founder
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="col-span-12 lg:col-span-9"
          >
            <p className="font-serif text-3xl lg:text-4xl leading-[1.3] font-light tracking-[-0.01em] text-white/90">
              &ldquo;The best clinicians in the world are not served by agencies. They are served
              by operators who take the weight off their shoulders and return the practice to
              them, scaled.&rdquo;
            </p>
            <p className="mt-10 text-[11px] uppercase tracking-[0.24em] text-white/50">
              &mdash; Zac, Founder
            </p>

            {/* Founder Video */}
            <div ref={videoRef} className="mt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="max-w-sm"
              >
                <div
                  className="overflow-hidden"
                  style={{ borderRadius: '2px', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <style>{getWistiaPlaceholderStyles(FOUNDER_VIDEO_ID, '176.67%')}</style>
                  {/* @ts-ignore */}
                  <wistia-player
                    media-id={FOUNDER_VIDEO_ID}
                    aspect="0.5660377358490566"
                    autoplay="false"
                    end-video-behavior="default"
                  />
                </div>
                <p className="mt-4 text-[10px] uppercase tracking-[0.24em] text-white/30">
                  A message from Zac
                </p>
              </motion.div>
            </div>

            <div className="mt-20 grid md:grid-cols-2 gap-12 text-white/65 text-[15px] leading-[1.9] font-light max-w-5xl">
              <div className="space-y-6">
                <p>
                  Every practice we partner with has the same problem and none of them will say
                  it out loud. The clinical work is ahead of the brand. The craft is ahead of the
                  market&apos;s awareness of it. The gap between what they do and what the world
                  sees is the most expensive number in the business.
                </p>
                <p>
                  We close that gap. Not with more content. Not with more agencies. With a small
                  operating team that takes full ownership of the parts of the business the
                  founder was never meant to run.
                </p>
              </div>
              <div className="space-y-6">
                <p>
                  We are selective by necessity. A partnership with PASTED means weekly contact,
                  monthly executive review, and an unreasonable standard of taste applied to
                  every asset that leaves the building. That level of care does not scale to
                  hundreds of clients. So it does not.
                </p>
                <p>
                  If the gap between the practice you built and the business around it has become
                  the thing keeping you up at night, there is a conversation worth having.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PastedDossier;
