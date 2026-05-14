import { useRef } from "react";
import { toPng } from "html-to-image";
import { Monogram } from "./Monogram";

type Props = { firstName: string; memberNumber: number; joinedAt: string | Date };

const formatDate = (d: string | Date) => {
  const date = typeof d === "string" ? new Date(d) : d;
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}.${date.getFullYear()}`;
};
const pad4 = (n: number) => n.toString().padStart(4, "0");

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
    } catch (e) { console.error(e); }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div ref={ref} className="relative w-full max-w-[640px] aspect-[16/10] bg-lib-charcoal text-bone overflow-hidden lib-grain" style={{ borderRadius: "2px" }}>
        <div className="absolute pointer-events-none" style={{ inset: "8px", border: "1px solid rgba(201, 169, 110, 0.3)", borderRadius: "1px" }} />
        <div className="relative h-full flex flex-col p-8 md:p-10">
          <div className="flex items-start justify-between">
            <Monogram size={48} variant="gold-on-charcoal" />
            <div className="lib-mono text-bone text-right">THE PASTED LIBRARY</div>
          </div>
          <div className="my-auto py-6 lib-hairline-gold" />
          <div className="flex items-end justify-between mt-auto">
            <div className="lib-editorial text-bone text-3xl md:text-5xl leading-none">{firstName}</div>
            <div className="lib-mono text-bone text-right space-y-1">
              <div>MEMBER № {pad4(memberNumber)}</div>
              <div className="opacity-70">JOINED {formatDate(joinedAt)}</div>
            </div>
          </div>
        </div>
      </div>
      <button type="button" onClick={handleDownload} className="lib-mono text-lib-charcoal border border-lib-charcoal/30 px-6 py-3 hover:border-lib-charcoal hover:bg-lib-charcoal hover:text-bone transition-colors duration-200 cursor-pointer" style={{ borderRadius: "2px" }}>
        Download as image
      </button>
      <p className="lib-mono text-lib-charcoal/50">SHOW YOUR CARD AT THE DOOR.</p>
    </div>
  );
};

export default LibraryCard;