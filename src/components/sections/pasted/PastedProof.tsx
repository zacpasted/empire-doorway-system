import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useWistiaLoader, getWistiaPlaceholderStyles } from "@/hooks/use-wistia";

const stats = [
  { figure: "41+", label: "Clinics scaled to eight figures" },
  { figure: "9.7x", label: "Avg ROI on ad spend" },
  { figure: "$100M+", label: "Tracked revenue under management" },
  { figure: "12", label: "Global partners at any one time" },
];

const TESTIMONIAL_VIDEO_IDS = ["5ue7wlj8b6", "af7m87juf2", "wqd6gdwzc8"];

const PastedProof = () => {
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

  useWistiaLoader(TESTIMONIAL_VIDEO_IDS, { loadOnMount: isVidVisible });

  return (
    <section id="proof" className="relative py-32 lg:py-48 border-t border-white/5" style={{ background: "var(--color-bg)" }}>
      <div className="max-w-[1680px] mx-auto px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20 lg:mb-28"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-8 h-px" style={{ background: "var(--color-gold)" }} />
            <span className="text-[10px] uppercase tracking-[0.32em]" style={{ color: "var(--color-gold)" }}>
              The Record
            </span>
          </div>
          <h2 className="font-serif text-[clamp(2.25rem,5vw,5rem)] leading-[0.98] font-light tracking-[-0.015em] max-w-4xl">
            Measured in clinics built,
            <br />
            <span className="italic text-white/50">not awards won.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.12 }}
              className="border-t border-white/10 pt-8"
            >
              <div className="font-serif text-6xl lg:text-7xl xl:text-8xl font-light tracking-[-0.02em]" style={{ color: "var(--color-gold)" }}>
                {s.figure}
              </div>
              <p className="mt-6 text-[11px] uppercase tracking-[0.24em] text-white/60 max-w-[200px] leading-relaxed">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Video Testimonials */}
        <div ref={videoRef} className="mt-28 lg:mt-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-12"
          >
            <p className="text-[10px] uppercase tracking-[0.32em] text-white/40 mb-4">Hear it directly</p>
            <h3 className="font-serif text-2xl lg:text-3xl font-light text-white/80 italic">
              Unscripted. From dentists who've been through it.
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {TESTIMONIAL_VIDEO_IDS.map((videoId, index) => (
              <motion.div
                key={videoId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="relative overflow-hidden aspect-[9/16]"
                style={{
                  borderRadius: '2px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <style>{getWistiaPlaceholderStyles(videoId, "177.78%")}</style>
                {/* @ts-ignore */}
                <wistia-player media-id={videoId} aspect="0.5625" autoplay="false" end-video-behavior="default"></wistia-player>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PastedProof;
