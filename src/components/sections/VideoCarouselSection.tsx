import { useRef, useState, memo, useEffect } from "react";
import { motion, useInView } from "framer-motion";

import video01 from "@/assets/videos/showcase-01.mp4";
import video02 from "@/assets/videos/showcase-02.mp4";
import video03 from "@/assets/videos/showcase-03.mp4";
import video04 from "@/assets/videos/showcase-04.mp4";
import video05 from "@/assets/videos/showcase-05.mp4";
import video06 from "@/assets/videos/showcase-06.mp4";

const videos = [video01, video02, video03, video04, video05, video06];

// Memoized video component to prevent unnecessary re-renders
const LazyVideo = memo(({ src, isVisible }: { src: string; isVisible: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay was prevented, that's okay
      });
    }
  }, [isVisible]);

  return (
    <video
      ref={videoRef}
      src={isVisible ? src : undefined}
      className="w-full h-full object-cover"
      loop
      muted
      playsInline
      autoPlay
      preload="none"
    />
  );
});

LazyVideo.displayName = 'LazyVideo';

const VideoCarouselSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headlineRef, { once: true, margin: "-100px" });
  const isSectionVisible = useInView(sectionRef, { margin: "200px" });
  const [isPaused, setIsPaused] = useState(false);

  const words = ["The", "content", "that", "makes", "patients", "choose", "you", "before", "they", "call"];

  // Duplicate videos for seamless loop
  const duplicatedVideos = [...videos, ...videos];

  return (
    <section ref={sectionRef} className="py-10 bg-background overflow-hidden">
      <div ref={headlineRef} className="container mx-auto px-6 mb-6 text-center overflow-hidden">
        <h2 className="font-display font-medium text-lg md:text-xl lg:text-2xl text-foreground tracking-tight inline-flex flex-wrap justify-center gap-x-2">
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`inline-block ${index >= 4 ? 'text-muted-foreground/60' : ''}`}
            >
              {word}
            </motion.span>
          ))}
          <motion.span
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.4, ease: "backOut" }}
            className="text-primary"
          >
            .
          </motion.span>
        </h2>
      </div>

      {/* CSS-animated carousel for better performance */}
      <div 
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className={`flex gap-6 ${isPaused ? '' : 'animate-carousel'}`}
          style={{
            width: 'fit-content',
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {duplicatedVideos.map((video, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[280px] md:w-[320px] aspect-[9/16] rounded-xl overflow-hidden bg-card/50 shadow-lg"
            >
              <LazyVideo src={video} isVisible={isSectionVisible} />
            </div>
          ))}
        </div>
      </div>

      {/* Add carousel animation styles */}
      <style>{`
        @keyframes carousel {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-carousel {
          animation: carousel 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default VideoCarouselSection;
