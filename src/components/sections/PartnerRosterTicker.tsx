import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const ROSTER_ITEMS = [
  "Dr. Jon Marashi · Celebrity Dentist, LA",
  "Dr. Brian Harris · Smile Virtual & Smile Sculpt",
  "Dr. Marshall Hanson · Founder, Marshall Hanson Method",
  "Dr. Sam Saleh · LA & London",
  "Dr. Rhona Eksander · Chelsea Dental Clinic",
  "Dr. Patrick McCann · Dublin",
  "Dr. James Heaton & Dr. Michael Allen · SmileTrend",
];

const MOBILE_NAMES = [
  { name: "Dr. Jon Marashi", subtitle: "Celebrity Dentist, LA" },
  { name: "Dr. Brian Harris", subtitle: "Smile Virtual & Smile Sculpt" },
  { name: "Dr. Marshall Hanson", subtitle: "Founder, Marshall Hanson Method" },
  { name: "Dr. Drew Ballard", subtitle: "Gilbert, AZ" },
];

const PartnerRosterTicker = () => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  // Mobile: static stacked guest list
  if (isMobile) {
    return (
      <div className="border-y border-border/30 py-6 px-4" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold text-center mb-4">
          Partner Roster
        </p>
        <div className="space-y-3">
          {MOBILE_NAMES.map((item) => (
            <div key={item.name} className="flex items-center justify-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0" />
              <div className="text-center">
                <span className="text-[13px] font-sans font-medium" style={{ color: '#F5F0E8' }}>{item.name}</span>
                <span className="text-[11px] font-sans ml-1.5" style={{ color: 'rgba(245,240,232,0.4)' }}>{item.subtitle}</span>
              </div>
            </div>
          ))}
          <p className="text-[11px] text-center font-sans" style={{ color: 'rgba(245,240,232,0.35)' }}>
            + 7 more partners
          </p>
        </div>
      </div>
    );
  }

  // Desktop: scrolling ticker (unchanged)
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

      <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center pl-6 pr-8">
        <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold whitespace-nowrap">
          Partner Roster
        </span>
      </div>

      <div
        className="py-4"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
        }}
      >
        <div
          className="flex items-center whitespace-nowrap animate-partner-roster pl-40"
          style={{ animationPlayState: isHovered ? "paused" : "running" }}
        >
          {[...Array(4)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center">
              {ROSTER_ITEMS.map((item) => (
                <span key={`${setIndex}-${item}`} className="flex items-center mx-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-4 flex-shrink-0" />
                  <span className="text-base tracking-wide font-medium" style={{ color: 'rgba(245,240,232,0.6)' }}>
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
