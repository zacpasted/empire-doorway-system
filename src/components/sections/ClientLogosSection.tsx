import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import logo1 from "@/assets/logos/brand-logo-01.jpeg";
import logo2 from "@/assets/logos/brand-logo-02.jpeg";
import logo3 from "@/assets/logos/brand-logo-03.jpeg";
import logo4 from "@/assets/logos/brand-logo-04.png";
import logo5 from "@/assets/logos/brand-logo-05.png";
import logo6 from "@/assets/logos/brand-logo-06.webp";
import logo11 from "@/assets/logos/brand-logo-11.jpeg";

import logo13 from "@/assets/logos/brand-logo-13.jpeg";
import logo14 from "@/assets/logos/brand-logo-14.jpeg";
import logo15 from "@/assets/logos/brand-logo-15.png";
import logo16 from "@/assets/logos/brand-logo-16.png";
import logo17 from "@/assets/logos/brand-logo-17.jpeg";
import logo18 from "@/assets/logos/brand-logo-18.webp";

import logo20 from "@/assets/logos/brand-logo-20.jpeg";

interface ClientLogosSectionProps {
  onApplyClick?: () => void;
}

const ClientLogosSection = ({ onApplyClick }: ClientLogosSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const logos = [
    { src: logo11, alt: "Brand Partner 11" },
    { src: logo13, alt: "Brand Partner 13" },
    { src: logo14, alt: "Brand Partner 14" },
    { src: logo15, alt: "Brand Partner 15" },
    { src: logo16, alt: "Brand Partner 16" },
    { src: logo17, alt: "Brand Partner 17" },
    { src: logo18, alt: "Brand Partner 18" },
    { src: logo20, alt: "Brand Partner 20" },
  ];

  // Duplicate for seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 1.5;

    const animate = () => {
      if (!isHovered) {
        scrollPos += speed;
        const totalWidth = scrollContainer.scrollWidth / 3;
        if (scrollPos >= totalWidth) {
          scrollPos = 0;
        }
        scrollContainer.style.transform = `translateX(-${scrollPos}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isHovered]);

  return (
    <section className="py-16 md:py-20 overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4 mb-10">
        <p className="text-center text-muted-foreground text-sm uppercase tracking-widest">
          Brands That Trust Us
        </p>
      </div>

      {/* Rolling Marquee */}
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Marquee track */}
        <div 
          ref={scrollRef}
          className="flex items-center will-change-transform"
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-6 md:mx-10 flex items-center justify-center"
            >
                <img 
                  src={logo.src} 
                  alt={logo.alt}
                  className="h-8 md:h-10 max-w-[120px] md:max-w-[140px] object-contain opacity-50 hover:opacity-80 transition-opacity duration-300 grayscale brightness-200 contrast-50"
                />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="container max-w-6xl mx-auto px-4 mt-12 text-center">
        <Button 
          onClick={onApplyClick}
          className="px-8 py-6 text-base"
        >
          Request Consideration
        </Button>
        <p className="text-xs text-muted-foreground mt-4">
          Limited capacity. Application required.
        </p>
      </div>
    </section>
  );
};

export default ClientLogosSection;
