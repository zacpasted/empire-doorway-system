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

  if (isMobile) {
    return (
      <div className="py-6 px-4" style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
        <p className="font-sans uppercase text-primary font-semibold text-center mb-4" style={{ fontSize: '10px', letterSpacing: '0.25em' }}>
          Partner Roster
        </p>
        <div className="space-y-3">
          {MOBILE_NAMES.map((item) => (
            <div key={item.name} className="flex items-center justify-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgba(185,146,79,0.5)' }} />
              <div className="text-center">
                <span className="font-sans font-medium" style={{ fontSize: '14px', color: 'var(--color-text)' }}>{item.name}</span>
                <span className="font-sans ml-1.5" style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{item.subtitle}</span>
              </div>
            </div>
          ))}
          <p className="text-center font-sans" style={{ fontSize: '11px', color: 'var(--color-text-subtle)' }}>
            + 7 more partners
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden"
      style={{
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        padding: '14px 0',
      }}
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
        <span className="font-sans uppercase text-primary font-semibold whitespace-nowrap" style={{ fontSize: '10px', letterSpacing: '0.22em' }}>
          Partner Roster
        </span>
      </div>

      <div
        className="py-0"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
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
                  <span className="w-1.5 h-1.5 rounded-full mr-4 flex-shrink-0" style={{ background: 'rgba(185,146,79,0.5)' }} />
                  <span className="font-sans font-medium tracking-wide" style={{ fontSize: '14px', color: 'rgba(245,237,216,0.55)' }}>
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
