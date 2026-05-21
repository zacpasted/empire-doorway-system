import { CORMORANT, INTER, BONE, NIGHT, BRASS, QUIET } from "./LibraryChrome";

const pad4 = (n: number) => n.toString().padStart(4, "0");

/**
 * The Library Card — 340px wide, ~180px tall on mobile, scales with viewport.
 * Bone surface, paper grain, brass border, member name + card_no.
 */
export const LibraryCardGraphic = ({
  name,
  cardNo,
}: {
  name: string;
  cardNo: number;
}) => (
  <div
    className="mx-auto relative"
    style={{
      width: "min(340px, 100%)",
      aspectRatio: "340 / 200",
      background: BONE,
      border: `1px solid ${BRASS}`,
      borderRadius: 4,
      padding: 16,
      color: NIGHT,
      boxShadow: `0 8px 24px ${NIGHT}1A, inset 0 0 0 1px ${BRASS}22`,
      overflow: "hidden",
    }}
  >
    {/* paper grain */}
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: 0.07,
        mixBlendMode: "multiply",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />

    <div className="relative h-full flex flex-col justify-between">
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div
          style={{
            fontFamily: INTER,
            fontSize: 9,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: NIGHT,
            fontWeight: 500,
          }}
        >
          The PASTED Library
        </div>
        <div
          style={{
            fontFamily: INTER,
            fontSize: 9,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: BRASS,
            fontWeight: 500,
          }}
        >
          Card № {pad4(cardNo)}
        </div>
      </div>

      {/* Middle */}
      <div className="text-center">
        <div
          style={{
            fontFamily: CORMORANT,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 22,
            color: NIGHT,
            lineHeight: 1.1,
          }}
        >
          {name || "Member"}
        </div>
        <div
          style={{
            fontFamily: CORMORANT,
            fontStyle: "italic",
            fontSize: 13,
            color: QUIET,
            marginTop: 6,
          }}
        >
          The bearer of this card is a member of The Library.
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex items-end justify-between">
        <div
          style={{
            fontFamily: INTER,
            fontSize: 9,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: QUIET,
            fontWeight: 500,
          }}
        >
          Valid MMXXVI — MMXXVII
        </div>
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            border: `1px solid ${BRASS}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: CORMORANT,
            fontStyle: "italic",
            fontSize: 13,
            color: BRASS,
          }}
        >
          PL
        </div>
      </div>
    </div>
  </div>
);

export default LibraryCardGraphic;