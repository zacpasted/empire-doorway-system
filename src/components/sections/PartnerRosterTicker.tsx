import { useState } from "react";

const ROSTER_ITEMS = [
  "Dr. Jon Marashi · Celebrity Dentist, LA",
  "Dr. Brian Harris · Smile Virtual & Smile Sculpt",
  "Dr. Marshall Hanson · Founder, Marshall Hanson Method",
  "Dr. Sam Saleh · LA & London",
  "Dr. Rhona Eksander · Chelsea Dental Clinic",
  "Dr. Patrick McCann · Dublin",
  "SmileTrend · Global Aesthetic Network",
];

const PartnerRosterTicker = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden border-y border-border/30 bg-card/80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>{`
        @keyframes partner-roster {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .animate-partner-roster {
          animation: partner-roster 50s linear infinite;
        }
      `}</style>

      {/* Static label — sits above ticker on mobile, inline on desktop */}
      <div className="px-4 pt-3 pb-1 md:absolute md:left-0 md:top-0 md:bottom-0 md:z-20 md:flex md:items-center md:pl-6 md:pr-8 md:pt-0 md:pb-0">
        <span className="text-[10px] md:text-[10px] tracking-[0.3em] uppercase text-primary font-semibold whitespace-nowrap">
          Partner Roster
        </span>
      </div>

      {/* Scrolling ticker */}
      <div
        className="py-3 md:py-4"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
        }}
      >
        <div
          className="flex items-center whitespace-nowrap animate-partner-roster md:pl-40"
          style={{ animationPlayState: isHovered ? "paused" : "running" }}
        >
          {[...Array(4)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center">
              {ROSTER_ITEMS.map((item) => (
                <span key={`${setIndex}-${item}`} className="flex items-center mx-5 md:mx-8">
                  <span className="w-2 h-2 md:w-1.5 md:h-1.5 rounded-full bg-primary/50 mr-3 md:mr-4 flex-shrink-0" />
                  <span className="text-[15px] md:text-base tracking-wide text-muted-foreground/80 font-medium">
                    {item}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerRosterTicker;
