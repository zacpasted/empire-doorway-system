type Props = {
  width?: number;
  height?: number;
  className?: string;
  open?: boolean;
};

/**
 * CSS/SVG placeholder briefcase. Oxblood body, gold corners, P monogram.
 * Will be swapped for photographic asset pre-launch.
 */
export const Briefcase = ({ width = 280, height = 200, className, open = false }: Props) => {
  return (
    <svg
      viewBox="0 0 280 200"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bcase-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8A2828" />
          <stop offset="55%" stopColor="#7A1F1F" />
          <stop offset="100%" stopColor="#5C1414" />
        </linearGradient>
        <linearGradient id="bcase-handle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a1010" />
          <stop offset="100%" stopColor="#1a0606" />
        </linearGradient>
      </defs>
      {/* handle */}
      <rect x="118" y="16" width="44" height="14" rx="2" fill="url(#bcase-handle)" />
      <rect x="124" y="22" width="32" height="4" rx="1" fill="#0A0A0A" opacity="0.6" />
      {/* body */}
      <rect x="20" y="34" width="240" height="150" rx="2" fill="url(#bcase-grad)" />
      {/* lid line */}
      {open ? (
        <line x1="20" y1="84" x2="260" y2="84" stroke="#3a1010" strokeWidth="1" opacity="0.7" />
      ) : (
        <line x1="20" y1="100" x2="260" y2="100" stroke="#3a1010" strokeWidth="1" opacity="0.7" />
      )}
      {/* corners */}
      <rect x="20" y="34" width="14" height="14" fill="#C9A96E" opacity="0.85" />
      <rect x="246" y="34" width="14" height="14" fill="#C9A96E" opacity="0.85" />
      <rect x="20" y="170" width="14" height="14" fill="#C9A96E" opacity="0.85" />
      <rect x="246" y="170" width="14" height="14" fill="#C9A96E" opacity="0.85" />
      {/* clasps */}
      <rect x="70" y="92" width="22" height="14" fill="#C9A96E" opacity="0.9" />
      <rect x="188" y="92" width="22" height="14" fill="#C9A96E" opacity="0.9" />
      {/* monogram */}
      <circle cx="140" cy="125" r="22" fill="none" stroke="#C9A96E" strokeWidth="1.25" opacity="0.95" />
      <text
        x="140"
        y="134"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontStyle="italic"
        fontWeight={400}
        fontSize="26"
        fill="#C9A96E"
        opacity="0.95"
      >
        P
      </text>
      {/* subtle grain */}
      <rect x="20" y="34" width="240" height="150" fill="#000" opacity="0.04" />
    </svg>
  );
};

export default Briefcase;