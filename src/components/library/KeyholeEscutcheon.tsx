type Props = {
  size?: number;
  className?: string;
};

/**
 * Ornate Victorian gold keyhole escutcheon. Single SVG, accepts a glow class on hover.
 */
export const KeyholeEscutcheon = ({ size = 96, className }: Props) => {
  return (
    <svg
      width={size}
      height={(size * 4) / 3}
      viewBox="0 0 96 128"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="kh-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E6C786" />
          <stop offset="55%" stopColor="#C9A96E" />
          <stop offset="100%" stopColor="#8C7340" />
        </linearGradient>
        <radialGradient id="kh-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* glow layer (revealed on parent hover) */}
      <circle cx="48" cy="64" r="60" fill="url(#kh-glow)" className="kh-glow" />
      {/* escutcheon plate — elongated cartouche */}
      <path
        d="M48 6
           C 70 6, 84 22, 84 44
           C 84 66, 80 88, 70 108
           C 64 120, 56 124, 48 124
           C 40 124, 32 120, 26 108
           C 16 88, 12 66, 12 44
           C 12 22, 26 6, 48 6 Z"
        fill="url(#kh-gold)"
        stroke="#6B5328"
        strokeWidth="0.75"
      />
      {/* outer filigree hairline */}
      <path
        d="M48 12
           C 66 12, 78 26, 78 44
           C 78 64, 74 86, 66 104
           C 62 114, 56 118, 48 118
           C 40 118, 34 114, 30 104
           C 22 86, 18 64, 18 44
           C 18 26, 30 12, 48 12 Z"
        fill="none"
        stroke="#6B5328"
        strokeWidth="0.6"
        opacity="0.7"
      />
      {/* small flourishes at top and bottom */}
      <circle cx="48" cy="10" r="2.4" fill="#6B5328" />
      <circle cx="48" cy="120" r="2.4" fill="#6B5328" />
      {/* keyhole — circle + tapered stem */}
      <circle cx="48" cy="50" r="9" fill="#0A0806" />
      <path
        d="M44 56 L52 56 L50 86 L46 86 Z"
        fill="#0A0806"
      />
      {/* highlight glint */}
      <path
        d="M30 22 C 36 16, 50 14, 60 18"
        stroke="#F1DEAE"
        strokeWidth="0.8"
        fill="none"
        opacity="0.65"
      />
    </svg>
  );
};

export default KeyholeEscutcheon;