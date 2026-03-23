import { useState } from "react";

const SERVICES = [
  "Branding", "Content", "Strategy", "Consulting", "Systems",
  "Conversion", "Advertising", "Marketing", "Production", "Global",
  "Events", "CE", "Media", "PR", "Editorial",
];

const ServiceTicker = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="mb-6 md:mb-8 overflow-hidden relative py-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>{`
        @keyframes service-ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-service-ticker {
          animation: service-ticker 18s linear infinite;
        }
      `}</style>

      <div className="absolute left-0 top-0 bottom-0 w-10 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-10 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div
        className="flex items-center whitespace-nowrap animate-service-ticker"
        style={{ animationPlayState: isHovered ? "paused" : "running" }}
      >
        {[...Array(2)].map((_, setIndex) => (
          <div key={setIndex} className="flex items-center">
            {SERVICES.map((service) => (
              <span key={`${setIndex}-${service}`} className="flex items-center mx-2.5 md:mx-5">
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary/60 mr-2 md:mr-4 flex-shrink-0" />
                <span className="text-[10px] md:text-sm tracking-[0.15em] md:tracking-[0.2em] uppercase text-muted-foreground/70 font-sans font-medium">
                  {service}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceTicker;
