import { useRef, useEffect } from "react";

import video01 from "@/assets/videos/showcase-01.mp4";
import video02 from "@/assets/videos/showcase-02.mp4";
import video03 from "@/assets/videos/showcase-03.mp4";
import video04 from "@/assets/videos/showcase-04.mp4";
import video05 from "@/assets/videos/showcase-05.mp4";
import video06 from "@/assets/videos/showcase-06.mp4";

const videos = [video01, video02, video03, video04, video05, video06];

const VideoCarouselSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

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
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <h2 className="font-display text-3xl md:text-4xl text-foreground text-center mb-4">
          Content in Motion
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto">
          A glimpse into the visual narratives we craft for our clients
        </p>
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
