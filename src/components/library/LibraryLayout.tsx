import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Masthead } from "./Masthead";
import { ZoneNav } from "./ZoneNav";
import { LibraryFooter } from "./LibraryFooter";
import { Monogram } from "./Monogram";
import { useMember } from "@/hooks/useMember";

type Surface = "bone" | "smoke" | "oxblood";

type Props = {
  surface?: Surface;
  children: ReactNode;
  paper?: boolean;      // 3% cotton-paper noise
  woodgrain?: boolean;  // Stacks floor only
  wax?: boolean;        // Vault watermark
  vignette?: boolean;
};

const SURFACE_BG: Record<Surface, string> = {
  bone: "bg-bone text-lib-charcoal",
  smoke: "bg-smoke text-bone",
  oxblood: "bg-oxblood-dark text-bone",
};

/**
 * Shared Library chrome: Masthead → hairline → ZoneNav → page → Footer.
 * Persistent small monogram appears top-left after 240px of scroll.
 */
export const LibraryLayout = ({
  surface = "bone",
  children,
  paper = true,
  woodgrain = false,
  wax = false,
  vignette = true,
}: Props) => {
  const { member } = useMember();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bg = SURFACE_BG[surface];

  return (
    <div className={`min-h-screen w-full ${bg} relative ${vignette ? "lib-vignette" : ""}`}>
      {paper && (
        <div aria-hidden className="pointer-events-none fixed inset-0 lib-paper" style={{ opacity: 0.6, mixBlendMode: "multiply" }} />
      )}
      {wax && (
        <div aria-hidden className="pointer-events-none fixed inset-0 lib-wax-watermark" />
      )}

      {/* Persistent mini-monogram (oxblood disc, gold P) after 240px scroll */}
      <Link
        to="/library"
        aria-label="Return to the Atrium"
        className="fixed top-4 left-4 z-50 flex items-center justify-center rounded-full transition-opacity duration-300"
        style={{
          width: 40,
          height: 40,
          background: "#5C1414",
          boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
          opacity: scrolled ? 0.92 : 0,
          pointerEvents: scrolled ? "auto" : "none",
        }}
      >
        <span
          aria-hidden
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            color: "#C9A96E",
            fontSize: 22,
            lineHeight: 1,
            transform: "translateY(-1px)",
          }}
        >
          P
        </span>
      </Link>

      <div className="relative z-10">
        <Masthead
          surface={surface}
          memberName={member?.first_name}
          memberNumber={member?.member_number}
        />
        <ZoneNav surface={surface} />

        <main className="lib-zone-in relative">{children}</main>

        {woodgrain && (
          <div aria-hidden className="lib-floor-woodgrain absolute left-0 right-0 h-[200px] pointer-events-none" style={{ bottom: 0 }} />
        )}

        <LibraryFooter surface={surface} />
      </div>
    </div>
  );
};

export default LibraryLayout;