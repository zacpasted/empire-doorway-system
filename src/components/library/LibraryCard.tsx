import { useRef } from "react";
import { toPng } from "html-to-image";

type Props = { firstName: string; memberNumber: number; joinedAt: string | Date };

const formatDate = (d: string | Date) => {
  const date = typeof d === "string" ? new Date(d) : d;
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}.${date.getFullYear()}`;
};
const pad4 = (n: number) => n.toString().padStart(4, "0");

/**
 * The Library Card — rendered like a slim hardback book cover (portrait).
 * Charcoal cloth, gold embossed type, P monogram in oval, bookmark ribbon.
 */
export const LibraryCard = ({ firstName, memberNumber, joinedAt }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleDownload = async () => {
    if (!ref.current) return;
    try {
      const dataUrl = await toPng(ref.current, { cacheBust: true, pixelRatio: 2, backgroundColor: "#0A0A0A" });
      const link = document.createElement("a");
      link.download = `pasted-library-card-${pad4(memberNumber)}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <div
        ref={ref}
        className="relative w-full max-w-[360px] md:max-w-[480px] text-bone overflow-hidden lib-cloth lib-grain"
        style={{
          aspectRatio: "480 / 680",
          background:
            "radial-gradient(ellipse at 50% 35%, #1a1715 0%, #0E0C0A 70%, #060504 100%)",
          borderRadius: "2px",
          boxShadow:
            "inset 0 1px 0 rgba(255,225,170,0.06), inset 0 0 60px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        {/* gold ribbon bookmark */}
        <div
          className="absolute top-0"
          style={{
            left: "12%",
            width: "20px",
            height: "64px",
            background: "linear-gradient(180deg, #C9A96E 0%, #8C7340 100%)",
            boxShadow: "0 1px 2px rgba(0,0,0,0.4)",
          }}
        />
        {/* embossed gold inner border */}
        <div
          className="absolute pointer-events-none"
          style={{ inset: "16px", border: "1px solid rgba(201,169,110,0.45)", borderRadius: "1px" }}
        />

        <div className="relative h-full flex flex-col items-center px-8 md:px-10 py-14 md:py-16">
          {/* P monogram inside oval */}
          <svg viewBox="0 0 80 100" width={64} height={80} aria-hidden="true">
            <ellipse cx="40" cy="50" rx="30" ry="42" fill="none" stroke="#C9A96E" strokeWidth="1.1" />
            <text x="40" y="66" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontStyle="italic" fontSize="56" fill="#C9A96E">P</text>
          </svg>

          <div className="lib-mono lib-emboss-gold mt-6 md:mt-8" style={{ letterSpacing: "0.22em" }}>
            THE PASTED LIBRARY
          </div>
          <div className="my-6 w-16" style={{ height: 1, background: "rgba(201,169,110,0.55)" }} />

          {/* Member name engraved */}
          <div className="flex-1 flex items-center">
            <div className="lib-editorial text-bone text-3xl md:text-5xl leading-none text-center">{firstName}</div>
          </div>

          <div className="lib-mono text-center space-y-1 lib-emboss-gold pb-4">
            <div>MEMBER № {pad4(memberNumber)}</div>
            <div style={{ opacity: 0.85 }}>JOINED {formatDate(joinedAt)}</div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleDownload}
        className="lib-mono text-lib-charcoal border border-lib-charcoal/30 px-6 py-3 hover:border-lib-charcoal hover:bg-lib-charcoal hover:text-bone transition-colors duration-200 cursor-pointer"
        style={{ borderRadius: "2px" }}
      >
        Download as image
      </button>
      <p className="lib-mono text-lib-charcoal/55">SHOW YOUR CARD AT THE DOOR.</p>
    </div>
  );
};

export default LibraryCard;