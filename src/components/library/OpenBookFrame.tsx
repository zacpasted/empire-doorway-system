import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Negative-space die-cut shape resembling an open book, in bone (#F4F1EC).
 * Sits on top of a background image; holds its children centered.
 */
export const OpenBookFrame = ({ children, className }: Props) => {
  return (
    <div className={`relative ${className ?? ""}`}>
      <svg
        viewBox="0 0 360 480"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full h-auto"
        aria-hidden="true"
      >
        <defs>
          <filter id="ob-soft" x="-2%" y="-2%" width="104%" height="104%">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
        </defs>
        {/* Open book silhouette: two leaves meeting at the spine */}
        <path
          filter="url(#ob-soft)"
          d="
            M 30,60
            C 70,42 130,40 176,56
            L 176,440
            C 130,422 70,420 30,438
            Z
            M 184,56
            C 230,40 290,42 330,60
            L 330,438
            C 290,420 230,422 184,440
            Z
          "
          fill="#F4F1EC"
        />
        {/* hairline gold frame inside each leaf */}
        <path
          d="
            M 46,76
            C 82,62 132,60 168,72
            L 168,420
            C 132,408 82,410 46,422
            Z
            M 192,72
            C 228,60 278,62 314,76
            L 314,422
            C 278,410 228,408 192,420
            Z
          "
          fill="none"
          stroke="#C9A96E"
          strokeWidth="0.6"
          opacity="0.55"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center px-[12%] py-[10%]">
        <div className="w-full text-center text-lib-charcoal">{children}</div>
      </div>
    </div>
  );
};

export default OpenBookFrame;