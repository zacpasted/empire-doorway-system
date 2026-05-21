import { useRef } from "react";
import { toPng } from "html-to-image";
import { PMonogram } from "@/components/library/PMonogram";

type Props = { firstName: string; memberNumber: number; joinedAt: string | Date };

const pad4 = (n: number) => n.toString().padStart(4, "0");

/**
 * The Library Card — oxblood leather, landscape format.
 * Gold embossed: P monogram in oval (top-right), italic serif name (left),
 * MEMBER № below, vertical "THE PASTED LIBRARY · MADRID · MMXXVI" on right edge.
 */
export const LibraryCard = ({ firstName, memberNumber, joinedAt }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  void joinedAt;
  const handleDownload = async () => {
    if (!ref.current) return;
    try {
      const dataUrl = await toPng(ref.current, { cacheBust: true, pixelRatio: 3, backgroundColor: "#2a0e10" });
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
        className="relative w-full max-w-[420px] md:max-w-[640px] overflow-hidden lib-grain"
        style={{
          aspectRatio: "1.585 / 1",
          background:
            "radial-gradient(ellipse at 35% 30%, #6a1e22 0%, #4d1417 55%, #2e0a0d 100%)",
          borderRadius: "14px",
          boxShadow:
            "inset 0 1px 0 rgba(255,200,160,0.10), inset 0 0 80px rgba(0,0,0,0.55), 0 30px 60px -20px rgba(0,0,0,0.6), 0 8px 20px rgba(0,0,0,0.4)",
          color: "#D4AF6A",
        }}
      >
        {/* subtle leather grain */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{
            opacity: 0.35,
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(255,180,140,0.08) 0px, transparent 2px), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.25) 0px, transparent 2px), radial-gradient(circle at 40% 80%, rgba(255,180,140,0.06) 0px, transparent 2px)",
            backgroundSize: "7px 7px, 11px 11px, 9px 9px",
          }}
        />
        {/* edge sheen */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,210,170,0.10) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.25) 100%)",
          }}
        />

        <div className="relative h-full flex p-6 md:p-9">
          {/* LEFT — name + member */}
          <div className="flex-1 flex flex-col justify-end pr-4">
            <div
              className="leading-[0.95]"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(28px, 6.2vw, 52px)",
                color: "#E2BE7A",
                textShadow: "0 1px 0 rgba(0,0,0,0.45), 0 0 8px rgba(226,190,122,0.15)",
              }}
            >
              {firstName}
            </div>
            <div
              className="mt-4 lib-mono"
              style={{
                letterSpacing: "0.22em",
                color: "#C9A266",
                fontSize: "clamp(9px, 1.4vw, 11px)",
              }}
            >
              MEMBER № {pad4(memberNumber)}
            </div>
          </div>

          {/* RIGHT — monogram + divider + vertical legend */}
          <div className="flex items-stretch gap-3 md:gap-4">
            <div className="flex flex-col items-center justify-between">
              {/* P monogram in oval */}
              <PMonogram color="#E2BE7A" style={{ width: "clamp(48px, 9vw, 72px)", height: "auto", aspectRatio: "1 / 1.05" }} />
              <div />
            </div>

            {/* vertical thin gold rule */}
            <div className="w-px self-stretch" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(212,175,106,0.7) 15%, rgba(212,175,106,0.7) 85%, transparent 100%)" }} />

            {/* vertical engraved legend */}
            <div className="flex flex-col items-center justify-between py-1">
              <div
                className="lib-mono"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  letterSpacing: "0.34em",
                  color: "#C9A266",
                  fontSize: "clamp(8px, 1.1vw, 10px)",
                }}
              >
                THE PASTED LIBRARY · MADRID · MMXXVI
              </div>
              {/* diamond mark */}
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" style={{ marginTop: 8 }}>
                <rect x="1.5" y="1.5" width="7" height="7" transform="rotate(45 5 5)" fill="none" stroke="#D4AF6A" strokeWidth="0.8" />
                <rect x="3.5" y="3.5" width="3" height="3" transform="rotate(45 5 5)" fill="#D4AF6A" />
              </svg>
            </div>
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