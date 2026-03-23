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
      className="relative py-4 overflow-hidden border-y border-border/30 bg-card/80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>{`
        @keyframes partner-roster {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .animate-partner-roster {
          animation: partner-roster 30s linear infinite;
        }
      `}</style>

      {/* Static label */}
      <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center pl-4 md:pl-6 bg-gradient-to-r from-card/80 via-card/80 to-transparent pr-8">
        <span className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-primary font-semibold whitespace-nowrap">
          Partner Roster
        </span>
      </div>

      {/* Fade edges */}
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-card/80 to-transparent z-10 pointer-events-none" />

      <div
        className="flex items-center whitespace-nowrap animate-partner-roster pl-32 md:pl-40"
        style={{ animationPlayState: isHovered ? "paused" : "running" }}
      >
        {[...Array(4)].map((_, setIndex) => (
          <div key={setIndex} className="flex items-center">
            {ROSTER_ITEMS.map((item) => (
              <span key={`${setIndex}-${item}`} className="flex items-center mx-4 md:mx-6">
                <span className="w-1 h-1 rounded-full bg-primary/50 mr-3 flex-shrink-0" />
                <span className="text-[10px] md:text-xs tracking-wide text-muted-foreground/80 font-medium">
                  {item}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerRosterTicker;
