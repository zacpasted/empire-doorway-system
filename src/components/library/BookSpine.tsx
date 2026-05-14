import { useMemo } from "react";
import { SPINE_COLORS, type Book } from "@/data/books";

type Props = {
  book: Book;
  shelfHeightPx: number;
  hovered: boolean;
  candleBoost: number; // 0..1
  onHover: (b: Book | null) => void;
  onClick: (b: Book) => void;
  focused: boolean;
};

/**
 * A single book spine — composed from layered divs + SVG, no images.
 * Renders four binding types with real depth, ribbing, and gold leaf.
 */
export const BookSpine = ({ book, shelfHeightPx, hovered, candleBoost, onHover, onClick, focused }: Props) => {
  const palette = SPINE_COLORS[book.spine];
  // Book height as % of inner shelf height
  const h = Math.round((shelfHeightPx - 18) * (book.heightPct / 100));
  const w = book.widthPx;

  // Lift / pull animation
  const lift = hovered ? -4 : 0;
  const slideOut = hovered ? 8 : (book.pulled ? 4 : 0);
  // Brightness from cursor candle proximity
  const brighten = 1 + Math.min(0.12, candleBoost * 0.12) + (hovered ? 0.04 : 0);

  // Title visibility — only on books wide enough
  const showTitle = w >= 18;
  const titleSize = w < 22 ? 8 : w < 28 ? 9 : 10;

  // Ribbing positions for leather / half-bound — 4 raised bands
  const ribs = useMemo(() => {
    if (book.binding === "leather" || book.binding === "half") {
      return [0.18, 0.36, 0.62, 0.82];
    }
    return [];
  }, [book.binding]);

  // Vertical gradient — subtle, suggests cylindrical light on the spine.
  const spineGradient = `linear-gradient(90deg,
    ${palette.deep} 0%,
    ${palette.base} 18%,
    ${palette.high} 50%,
    ${palette.base} 82%,
    ${palette.deep} 100%)`;

  // Half-bound: cloth upper section with leather corners + bottom
  const isHalf = book.binding === "half";
  const isCloth = book.binding === "cloth";
  const isVellum = book.binding === "vellum";
  const isLeather = book.binding === "leather";

  // Cloth has matte flat finish; vellum is pale ivory.
  const clothBg = isCloth
    ? `linear-gradient(90deg, ${palette.deep}, ${palette.base} 50%, ${palette.deep})`
    : undefined;
  const vellumBg = isVellum
    ? `linear-gradient(90deg, #B8AC92, #D4C8B0 50%, #B8AC92)`
    : undefined;

  // Gold label inset — cloth & sometimes vellum
  const goldLabelTop = h * 0.28;
  const goldLabelHeight = h * 0.18;

  const titleColor = isVellum ? "#7A4528" : "#C9A96E";

  return (
    <button
      data-book-id={book.id}
      onMouseEnter={() => onHover(book)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(book)}
      aria-label={`${book.title}, volume ${book.vol}, ${book.year}`}
      className="relative shrink-0 outline-none focus-visible:ring-0 group"
      style={{
        width: w,
        height: h,
        marginRight: 1,
        transformOrigin: "bottom center",
        transform: `translate3d(${slideOut}px, ${lift}px, 0) rotate(${book.leanDeg}deg)`,
        transition: "transform 800ms cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform",
        zIndex: hovered ? 30 : (book.pulled ? 5 : 1),
        cursor: "pointer",
      }}
    >
      {/* SPINE BODY — base colour + gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: clothBg || vellumBg || spineGradient,
          filter: `brightness(${brighten})`,
          boxShadow: [
            "inset 1px 0 0 rgba(255,255,255,0.05)",
            "inset -1px 0 0 rgba(0,0,0,0.55)",
            "inset 0 1px 0 rgba(255,255,255,0.04)",
            "inset 0 -2px 4px rgba(0,0,0,0.4)",
            hovered ? "0 8px 18px -8px rgba(0,0,0,0.85)" : "0 3px 6px -3px rgba(0,0,0,0.6)",
          ].join(", "),
          transition: "filter 700ms ease, box-shadow 700ms ease",
        }}
      />

      {/* HALF-BOUND seam — leather lower third + cloth upper, gold rule between */}
      {isHalf && (
        <>
          <div
            className="absolute left-0 right-0 bottom-0 pointer-events-none"
            style={{
              height: "33%",
              background: spineGradient,
              filter: `brightness(${brighten})`,
              boxShadow: "inset 0 -2px 3px rgba(0,0,0,0.45)",
            }}
          />
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{ bottom: "33%", height: 1, background: "rgba(201,169,110,0.55)" }}
          />
          {/* Top corner caps (leather corners, suggested) */}
          <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: 4, background: palette.deep, opacity: 0.7 }} />
        </>
      )}

      {/* RIBBING — raised horizontal bands for leather / half */}
      {ribs.map((y, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: `${y * 100}%`,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(180deg, ${palette.high} 0%, ${palette.base} 50%, ${palette.deep} 100%)`,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.5)",
          }}
        >
          <div className="absolute left-0 right-0 -top-px h-px" style={{ background: "rgba(201,169,110,0.45)" }} />
          <div className="absolute left-0 right-0 -bottom-px h-px" style={{ background: "rgba(201,169,110,0.35)" }} />
        </div>
      ))}

      {/* GOLD LABEL INSET — cloth bindings, rectangular leather-coloured plate */}
      {(isCloth) && showTitle && (
        <div
          className="absolute pointer-events-none"
          style={{
            top: goldLabelTop,
            left: Math.max(2, w * 0.14),
            right: Math.max(2, w * 0.14),
            height: goldLabelHeight,
            background: `linear-gradient(180deg, ${SPINE_COLORS.oxblood.deep}, ${SPINE_COLORS.oxblood.base})`,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.5), 0 1px 0 rgba(0,0,0,0.4)",
          }}
        />
      )}

      {/* TOP & FOOT GOLD HAIRLINES (all bindings) */}
      <div className="absolute pointer-events-none" style={{ top: 4, left: 2, right: 2, height: 1, background: "rgba(201,169,110,0.55)" }} />
      <div className="absolute pointer-events-none" style={{ bottom: 4, left: 2, right: 2, height: 1, background: "rgba(201,169,110,0.45)" }} />

      {/* TITLE — vertical text running up the spine */}
      {showTitle && (
        <div
          className="absolute pointer-events-none flex flex-col items-center justify-between"
          style={{
            top: isCloth ? goldLabelTop + 2 : ribs.length ? "20%" : "12%",
            bottom: isCloth ? h - goldLabelTop - goldLabelHeight + 2 : ribs.length ? "20%" : "12%",
            left: 0,
            right: 0,
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 300,
              fontSize: titleSize + 1,
              letterSpacing: "0.04em",
              color: titleColor,
              opacity: 0.92,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxHeight: h * 0.55,
              textShadow: isVellum ? "none" : "0 1px 0 rgba(0,0,0,0.45)",
            }}
          >
            {book.title}
          </span>
          {w >= 22 && (
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 7,
                letterSpacing: "0.18em",
                color: titleColor,
                opacity: 0.7,
              }}
            >
              {book.vol}
            </span>
          )}
        </div>
      )}

      {/* HOVER GOLD RIM */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: hovered || focused ? "inset 0 0 0 1px rgba(201,169,110,0.55)" : "inset 0 0 0 1px rgba(201,169,110,0)",
          transition: "box-shadow 600ms ease",
        }}
      />
    </button>
  );
};

export default BookSpine;