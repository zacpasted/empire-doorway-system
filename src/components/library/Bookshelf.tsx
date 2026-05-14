import { useEffect, useRef, useState } from "react";
import { BOOKS_BY_SHELF, type Book } from "@/data/books";
import { BookSpine } from "./BookSpine";

type Props = {
  onOpen: (b: Book) => void;
  focusedId: string | null;
  onFocusChange: (id: string | null) => void;
};

/**
 * The bookshelf: a deep wooden case with five shelves of real volumes.
 * - Walnut frame with subtle grain
 * - Warm directional light from upper-left
 * - Cursor-light (candle) brightens books underneath
 * - Library ladder leaning at the left
 * - Quiet scenery: a brass desk lamp, folded reading glasses, stacked books
 */
export const Bookshelf = ({ onOpen, focusedId, onFocusChange }: Props) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [shelfH, setShelfH] = useState(180);
  const cursorRef = useRef({ x: -9999, y: -9999 });
  const [, force] = useState(0);

  // Measure shelf row height responsively
  useEffect(() => {
    const measure = () => {
      const vh = window.innerHeight;
      // Each shelf row gets ~18.5% of viewport height, min 150
      setShelfH(Math.max(150, Math.round(vh * 0.185)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Track cursor for candle proximity (rAF throttled)
  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => force((n) => (n + 1) % 1024));
    };
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  // Compute candle proximity for a book by element rect
  const proximity = (id: string): number => {
    const el = wrapRef.current?.querySelector<HTMLButtonElement>(`[data-book-id="${id}"]`);
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = cx - cursorRef.current.x;
    const dy = cy - cursorRef.current.y;
    const d = Math.sqrt(dx * dx + dy * dy);
    // 250px radius candle
    return Math.max(0, 1 - d / 250);
  };

  // Keyboard navigation: arrows pan; up/down move row; enter opens
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const flat = BOOKS_BY_SHELF.flat();
      if (!focusedId) {
        if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)) {
          onFocusChange(flat[0]?.id ?? null);
        }
        return;
      }
      const cur = flat.find((b) => b.id === focusedId);
      if (!cur) return;
      const row = BOOKS_BY_SHELF[cur.shelfRow];
      const idx = row.findIndex((b) => b.id === cur.id);
      if (e.key === "ArrowRight" && idx < row.length - 1) onFocusChange(row[idx + 1].id);
      else if (e.key === "ArrowLeft" && idx > 0) onFocusChange(row[idx - 1].id);
      else if (e.key === "ArrowUp" && cur.shelfRow > 0) {
        const next = BOOKS_BY_SHELF[cur.shelfRow - 1];
        onFocusChange(next[Math.min(idx, next.length - 1)]?.id ?? null);
      } else if (e.key === "ArrowDown" && cur.shelfRow < 4) {
        const next = BOOKS_BY_SHELF[cur.shelfRow + 1];
        onFocusChange(next[Math.min(idx, next.length - 1)]?.id ?? null);
      } else if (e.key === "Enter") {
        if (cur.pages) onOpen(cur);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focusedId, onFocusChange, onOpen]);

  // Scroll focused book into view when it changes
  useEffect(() => {
    if (!focusedId) return;
    const el = wrapRef.current?.querySelector<HTMLButtonElement>(`[data-book-id="${focusedId}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [focusedId]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden" aria-label="Bookshelf">
      {/* DEEP RECESSED BACK WALL */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 20% 30%, #2a1f15 0%, #14100c 45%, #0a0806 90%)`,
        }}
      />
      {/* warm directional light wash from upper-left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 18% 12%, rgba(201,169,110,0.18) 0%, rgba(201,169,110,0.06) 35%, transparent 70%)`,
        }}
      />
      {/* corner vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 50%, rgba(10,10,10,0.55) 100%)",
        }}
      />

      {/* CURSOR CANDLE — warm radial glow following the cursor */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: cursorRef.current.x - 250,
          top: cursorRef.current.y - 250,
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(255,205,135,0.13) 0%, rgba(201,169,110,0.06) 35%, transparent 70%)",
          mixBlendMode: "screen",
          transition: "left 120ms ease-out, top 120ms ease-out",
          zIndex: 25,
        }}
      />

      {/* WOODEN CASE — outer frame */}
      <div
        className="absolute inset-x-0"
        style={{
          top: 0,
          bottom: 0,
          background:
            "linear-gradient(180deg, #2a1c10 0%, #1f1409 50%, #170d05 100%)",
          opacity: 0,
        }}
      />

      {/* SHELVES — 5 rows */}
      <div className="absolute inset-0 flex flex-col">
        {BOOKS_BY_SHELF.map((row, rowIdx) => (
          <ShelfRow
            key={rowIdx}
            books={row}
            shelfHeightPx={shelfH}
            isFirst={rowIdx === 0}
            isLast={rowIdx === 4}
            rowIdx={rowIdx}
            hoveredId={hoveredId}
            focusedId={focusedId}
            onHover={(b) => setHoveredId(b?.id ?? null)}
            onClick={(b) => { if (b.pages) onOpen(b); else onFocusChange(b.id); }}
            proximity={proximity}
          />
        ))}
      </div>

      {/* LADDER — leaning against the left third */}
      <Ladder />

      {/* EXTRA SOFT VIGNETTE — corners */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow:
            "inset 80px 60px 200px -40px rgba(10,10,10,0.55), inset -80px -60px 200px -40px rgba(10,10,10,0.7)",
        }}
      />
    </div>
  );
};

// ===== A single shelf row: wooden plank + books standing on it =====
const ShelfRow = ({
  books,
  shelfHeightPx,
  isFirst,
  isLast,
  rowIdx,
  hoveredId,
  focusedId,
  onHover,
  onClick,
  proximity,
}: {
  books: Book[];
  shelfHeightPx: number;
  isFirst: boolean;
  isLast: boolean;
  rowIdx: number;
  hoveredId: string | null;
  focusedId: string | null;
  onHover: (b: Book | null) => void;
  onClick: (b: Book) => void;
  proximity: (id: string) => number;
}) => {
  // Quiet scenery decisions per row
  const showLamp = rowIdx === 2;
  const showStack = rowIdx === 3;
  const showGlasses = rowIdx === 1;

  return (
    <div
      className="relative flex-1 min-h-0"
      style={{
        // Inset shadow so the back of the shelf feels recessed
        boxShadow: "inset 0 12px 30px -12px rgba(0,0,0,0.85)",
      }}
    >
      {/* Back wall darker behind books */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* TOP EDGE OF SHELF (the underside of the plank above) */}
      {!isFirst && (
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none z-20"
          style={{
            height: 6,
            background:
              "linear-gradient(180deg, #1a1006 0%, #271707 50%, #14090a 100%)",
            boxShadow: "0 4px 8px -2px rgba(0,0,0,0.7)",
          }}
        />
      )}

      {/* BOOKS — horizontally scrollable strip standing on the shelf base */}
      <div
        className="absolute left-0 right-0 bottom-0 overflow-x-auto overflow-y-visible lib-shelf-scroll"
        style={{
          top: isFirst ? 0 : 6,
          bottom: 12,
          paddingLeft: 120, // leave room for the ladder
          paddingRight: 24,
          scrollSnapType: "none",
        }}
      >
        <div className="flex items-end h-full" style={{ minWidth: "max-content" }}>
          {books.map((b) => (
            <BookSpine
              key={b.id}
              book={b}
              shelfHeightPx={shelfHeightPx}
              hovered={hoveredId === b.id}
              focused={focusedId === b.id}
              candleBoost={proximity(b.id)}
              onHover={onHover}
              onClick={onClick}
            />
          ))}

          {/* Quiet scenery — placed inline with books */}
          {showLamp && <DeskLamp />}
          {showStack && <BookStack />}
          {showGlasses && <Glasses />}
        </div>
      </div>

      {/* BOTTOM SHELF PLANK — the wooden surface books rest on */}
      <div
        className="absolute left-0 right-0 bottom-0 pointer-events-none z-20"
        style={{
          height: 12,
          background:
            "linear-gradient(180deg, #2c1c0c 0%, #3a2510 35%, #1c1006 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,200,140,0.06), inset 0 -1px 0 rgba(0,0,0,0.7), 0 6px 12px -4px rgba(0,0,0,0.8)",
        }}
      >
        {/* subtle grain */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(0,0,0,0.18) 0 1px, transparent 1px 7px), repeating-linear-gradient(90deg, rgba(255,180,110,0.06) 0 1px, transparent 1px 19px)",
          }}
        />
      </div>

      {/* SOFT INNER SHADOW WHERE BOOKS MEET THE SHELF */}
      <div
        className="absolute left-0 right-0 pointer-events-none z-10"
        style={{
          bottom: 12,
          height: 18,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Bottom case rail (only on last shelf) */}
      {isLast && (
        <div className="absolute left-0 right-0 -bottom-2 h-2 pointer-events-none" style={{ background: "linear-gradient(180deg, #1a1006, #0a0604)" }} />
      )}
    </div>
  );
};

// ============================================================================
// SCENERY: ladder, brass desk lamp, stacked books, reading glasses
// All static, non-interactive, layered into the room.
// ============================================================================

const Ladder = () => (
  <svg
    className="absolute pointer-events-none"
    style={{ left: "8%", top: 0, height: "100%", width: 110, zIndex: 28 }}
    viewBox="0 0 110 800"
    preserveAspectRatio="none"
    aria-hidden
  >
    <defs>
      <linearGradient id="lad-rail" x1="0" x2="1">
        <stop offset="0%" stopColor="#2a1a0a" />
        <stop offset="50%" stopColor="#4a2e15" />
        <stop offset="100%" stopColor="#1c1006" />
      </linearGradient>
    </defs>
    {/* Two rails, leaning at ~7 degrees */}
    <g transform="rotate(7 55 400)">
      <rect x="20" y="0" width="6" height="800" fill="url(#lad-rail)" opacity="0.88" />
      <rect x="80" y="0" width="6" height="800" fill="url(#lad-rail)" opacity="0.88" />
      {/* Rungs every 90px */}
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x="22" y={50 + i * 90} width="62" height="4" fill="#3a2410" opacity="0.85" />
      ))}
      {/* Highlight on left rail (light from upper-left) */}
      <rect x="20" y="0" width="1" height="800" fill="rgba(255,210,150,0.18)" />
    </g>
    {/* Cast shadow on the wall */}
    <g transform="rotate(7 55 400) translate(8 0)" opacity="0.35">
      <rect x="20" y="0" width="6" height="800" fill="#000" />
      <rect x="80" y="0" width="6" height="800" fill="#000" />
    </g>
  </svg>
);

const DeskLamp = () => (
  <div
    className="relative shrink-0 pointer-events-none"
    style={{ width: 50, height: "85%", marginRight: 10, alignSelf: "flex-end" }}
    aria-hidden
  >
    <svg viewBox="0 0 50 200" preserveAspectRatio="none" className="w-full h-full">
      {/* base */}
      <ellipse cx="25" cy="195" rx="18" ry="3.5" fill="#1a1006" opacity="0.7" />
      <rect x="10" y="180" width="30" height="14" rx="2" fill="#5a3d1a" />
      <rect x="10" y="180" width="30" height="2" fill="#8a6a3a" />
      {/* stem */}
      <rect x="22.5" y="80" width="5" height="100" fill="#6a4520" />
      <rect x="22.5" y="80" width="1" height="100" fill="#a07a48" />
      {/* shade */}
      <path d="M5 80 L45 80 L38 50 L12 50 Z" fill="#3a2410" stroke="#6a4520" strokeWidth="0.5" />
      <path d="M5 80 L45 80 L38 50 L12 50 Z" fill="url(#shade-light)" opacity="0.5" />
      <defs>
        <linearGradient id="shade-light" x1="0" x2="1">
          <stop offset="0%" stopColor="#a07a48" />
          <stop offset="100%" stopColor="#3a2410" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const BookStack = () => (
  <div
    className="relative shrink-0 pointer-events-none flex flex-col justify-end"
    style={{ width: 90, marginLeft: 14, marginRight: 10 }}
    aria-hidden
  >
    {/* two horizontal books */}
    <div
      style={{
        height: 14, width: 90,
        background: "linear-gradient(180deg, #3a2410, #5a3018, #2a1408)",
        boxShadow: "inset 0 1px 0 rgba(255,210,150,0.1), 0 2px 4px -2px rgba(0,0,0,0.7)",
      }}
    />
    <div
      style={{
        height: 12, width: 86, marginTop: 1,
        background: "linear-gradient(180deg, #14213D, #243763, #0a1326)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 4px -2px rgba(0,0,0,0.7)",
      }}
    />
  </div>
);

const Glasses = () => (
  <div
    className="relative shrink-0 pointer-events-none flex items-end"
    style={{ width: 68, height: "100%", marginLeft: 14, marginRight: 8 }}
    aria-hidden
  >
    <svg viewBox="0 0 68 30" className="w-full" style={{ marginBottom: 4 }}>
      <g fill="none" stroke="#8a6a3a" strokeWidth="1.4">
        <circle cx="14" cy="16" r="10" />
        <circle cx="50" cy="16" r="10" />
        <path d="M24 16 L40 16" />
        <path d="M4 16 L0 12" />
        <path d="M60 16 L66 12" />
      </g>
      <g fill="rgba(0,0,0,0.35)">
        <circle cx="14" cy="16" r="9" />
        <circle cx="50" cy="16" r="9" />
      </g>
    </svg>
  </div>
);

export default Bookshelf;