import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import logoFigs from "@/assets/logos/figs-white.png";
import logoCocofloss from "@/assets/logos/cocofloss-white.png";
import logoSolventum from "@/assets/logos/solventum-white.png";
import logoMHM from "@/assets/logos/marshall-hanson-method-white.png";
import logoSmileVirtual from "@/assets/logos/smile-virtual-white.png";

interface ClientLogosSectionProps {
  onApplyClick?: () => void;
}

const ClientLogosSection = ({ onApplyClick }: ClientLogosSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const logos = [
    { src: logoFigs, alt: "FIGS" },
    { src: logoCocofloss, alt: "Cocofloss" },
    { src: logoSolventum, alt: "Solventum" },
    { src: logoMHM, alt: "Marshall Hanson Method" },
    { src: logoSmileVirtual, alt: "Smile Virtual" },
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
                  className="h-8 md:h-10 max-w-[120px] md:max-w-[140px] object-contain"
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
