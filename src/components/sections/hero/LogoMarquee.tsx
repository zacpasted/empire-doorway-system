import { useState, useMemo } from "react";
import logoFigs from "@/assets/logos/figs-white.png";
import logoCocofloss from "@/assets/logos/cocofloss-white.png";
import logoSolventum from "@/assets/logos/solventum-white.png";
import logoMHM from "@/assets/logos/marshall-hanson-method-white.png";
import logoSmileVirtual from "@/assets/logos/smile-virtual-white.png";

const LogoMarquee = () => {
  const [isHovered, setIsHovered] = useState(false);

  const logos = useMemo(() => [
    { src: logoFigs, alt: "FIGS" },
    { src: logoCocofloss, alt: "Cocofloss" },
    { src: logoSolventum, alt: "Solventum" },
    { src: logoMHM, alt: "Marshall Hanson Method" },
    { src: logoSmileVirtual, alt: "Smile Virtual" },
  ], []);

  const duplicatedLogos = useMemo(() => [...logos, ...logos], [logos]);

  return (
    <div
      className="mb-5 md:mb-8 overflow-hidden relative py-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>{`
        @keyframes logo-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-logo-marquee {
          animation: logo-marquee 20s linear infinite;
        }
      `}</style>

      <p className="text-center text-muted-foreground/40 text-[10px] uppercase tracking-[0.2em] mb-4">
        Trusted by the world's most elite cosmetic dentists and aesthetic clinic operators
      </p>

      <div className="absolute left-0 top-8 bottom-0 w-8 md:w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-8 bottom-0 w-8 md:w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div
        className={`flex items-center ${isHovered ? "" : "animate-logo-marquee"}`}
        style={{ animationPlayState: isHovered ? "paused" : "running" }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div key={index} className="flex-shrink-0 mx-4 md:mx-10 flex items-center justify-center">
            <img
              src={logo.src}
              alt={logo.alt}
              loading="eager"
              decoding="async"
              className="h-4 md:h-6 w-auto max-w-[80px] md:max-w-[100px] object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoMarquee;
