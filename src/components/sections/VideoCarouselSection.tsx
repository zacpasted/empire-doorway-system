import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

import video01 from "@/assets/videos/showcase-01.mp4";
import video02 from "@/assets/videos/showcase-02.mp4";
import video03 from "@/assets/videos/showcase-03.mp4";
import video04 from "@/assets/videos/showcase-04.mp4";
import video05 from "@/assets/videos/showcase-05.mp4";
import video06 from "@/assets/videos/showcase-06.mp4";

const videos = [video01, video02, video03, video04, video05, video06];

const VideoCarouselSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headlineRef, { once: true, margin: "-100px" });

  const words = ["Create", "Content", "That", "Builds", "Your", "Dream", "Life"];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 1.5;

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset scroll position when we've scrolled through half the content (since it's duplicated)
      const maxScroll = scrollContainer.scrollWidth / 2;
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Pause animation on hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Duplicate videos for seamless loop
  const duplicatedVideos = [...videos, ...videos];

  return (
    <section className="py-10 bg-background overflow-hidden">
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

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ scrollBehavior: "auto" }}
      >
        {duplicatedVideos.map((video, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[280px] md:w-[320px] aspect-[9/16] rounded-xl overflow-hidden bg-card/50 shadow-lg"
          >
            <video
              src={video}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoCarouselSection;
