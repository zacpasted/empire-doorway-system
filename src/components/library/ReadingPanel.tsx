import { useEffect, useState } from "react";
import type { VolumeData } from "./Volume";

export type ReadingContent = {
  volume: VolumeData;
  category: string;
  pages: { heading?: string; body: string }[];
};

type Props = {
  content: ReadingContent | null;
  onClose: () => void;
};

export const ReadingPanel = ({ content, onClose }: Props) => {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState<"in" | "next" | "prev">("in");

  useEffect(() => { if (content) { setPage(0); setDir("in"); } }, [content]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!content) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && page < content.pages.length - 1) { setDir("next"); setPage((p) => p + 1); }
      if (e.key === "ArrowLeft" && page > 0) { setDir("prev"); setPage((p) => p - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [content, page, onClose]);

  if (!content) return null;
  const { volume, category, pages } = content;
  const p = pages[page];
  const total = pages.length;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-6"
      style={{ background: "rgba(10,10,10,0.96)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-[720px] py-14 px-10 md:px-14"
        style={{
          background: "#F4F1EC",
          color: "#0A0A0A",
          animation: "lib-fade-in 600ms ease-out both",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top hairline */}
        <div className="absolute left-0 right-0 top-0 h-px" style={{ background: "rgba(201,169,110,0.55)" }} />
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-6 hover:text-[#7A1F1F] transition-colors"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.18em" }}
        >
          CLOSE
        </button>

        <div
          key={page}
          style={{
            animation: dir === "in"
              ? "lib-fade-in 600ms ease-out both"
              : dir === "next"
              ? "rp-in-right 700ms cubic-bezier(0.65,0,0.35,1) both"
              : "rp-in-left 700ms cubic-bezier(0.65,0,0.35,1) both",
          }}
        >
          <div
            className="mb-5"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.18em", color: "#C9A96E" }}
          >
            VOL. {volume.number} — {category.toUpperCase()}
          </div>
          <h2
            className="mb-8"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 300, fontSize: 44, lineHeight: 1.05, letterSpacing: "-0.01em" }}
          >
            {volume.title}
          </h2>
          {p.heading && (
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 300, fontSize: 22, marginBottom: 16 }}>
              {p.heading}
            </h3>
          )}
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 17,
              lineHeight: 1.7,
              maxWidth: 580,
              color: "rgba(10,10,10,0.85)",
              whiteSpace: "pre-line",
            }}
          >
            {p.body}
          </p>
        </div>

        {total > 1 && (
          <div className="mt-12 pt-6 flex items-center justify-between border-t" style={{ borderColor: "rgba(10,10,10,0.08)" }}>
            <button
              disabled={page === 0}
              onClick={() => { setDir("prev"); setPage((p) => Math.max(0, p - 1)); }}
              className="disabled:opacity-20 hover:text-[#C9A96E] transition-colors"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.18em" }}
              aria-label="Previous page"
            >
              ← PREV
            </button>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.18em", color: "rgba(10,10,10,0.55)" }}>
              PAGE {page + 1} / {total}
            </span>
            <button
              disabled={page === total - 1}
              onClick={() => { setDir("next"); setPage((p) => Math.min(total - 1, p + 1)); }}
              className="disabled:opacity-20 hover:text-[#C9A96E] transition-colors"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.18em" }}
              aria-label="Next page"
            >
              NEXT →
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes rp-in-right { from { opacity: 0.85; transform: translateX(24px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes rp-in-left { from { opacity: 0.85; transform: translateX(-24px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>
  );
};

export default ReadingPanel;