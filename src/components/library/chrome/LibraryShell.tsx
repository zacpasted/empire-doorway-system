import { useState, type ReactNode } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LeftRail } from "./LeftRail";
import { RightRail } from "./RightRail";
import { MastheadSlim } from "./MastheadSlim";
import { PhotoHero } from "./PhotoHero";
import { useMember } from "@/hooks/useMember";
import type { ZoneDef } from "@/data/library-zones";
import { PMonogram } from "@/components/library/PMonogram";
import wallpaperUrl from "@/assets/atrium-wallpaper-damask.jpg";
import wainscotingUrl from "@/assets/atrium-wainscoting.jpg";

type Props = {
  zone: ZoneDef;
  showRightRail?: boolean;
  activeSubsection?: string;
  onSubsectionChange?: (slug: string) => void;
  hero?: ReactNode; // override default PhotoHero (e.g. Atrium cinematic)
  children: ReactNode;
};

export const LibraryShell = ({
  zone,
  showRightRail = true,
  activeSubsection,
  onSubsectionChange,
  hero,
  children,
}: Props) => {
  const { member } = useMember();
  const [navOpen, setNavOpen] = useState(false);

  const hasRightRail = showRightRail && zone.subsections.length > 0;

  return (
    <div
      className="lib-atrium-root relative min-h-screen w-full overflow-x-hidden"
      style={{
        backgroundColor: "#3a0d12",
        backgroundImage: `url(${wallpaperUrl})`,
        backgroundRepeat: "repeat",
        backgroundSize: "520px 520px",
        backgroundAttachment: "fixed",
        color: "#1A140E",
      }}
    >
      <style>{`
        .lib-atrium-root { cursor: url('/cursors/cursor-dot.svg') 7 7, default; }
        .lib-atrium-root a,
        .lib-atrium-root button,
        .lib-atrium-root [role="button"] { cursor: url('/cursors/cursor-key.svg') 7 12, pointer; }
      `}</style>
      {/* Mobile menu trigger (top-left) — replaces left rail on small screens */}
      <Sheet open={navOpen} onOpenChange={setNavOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Open library navigation"
            className="md:hidden fixed top-3 left-3 z-50 inline-flex items-center justify-center w-9 h-9 rounded-md"
            style={{ background: "#F4F1EC", border: "1px solid var(--lib-border)", color: "#0A0A0A" }}
          >
            <Menu size={18} strokeWidth={1.5} />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-[260px] bg-bone">
          <MobileNav onClose={() => setNavOpen(false)} />
        </SheetContent>
      </Sheet>

      <MastheadSlim memberName={member?.first_name} memberNumber={member?.member_number} />
      <LeftRail />
      {hasRightRail && (
        <RightRail zone={zone} active={activeSubsection} onSelect={onSubsectionChange} />
      )}

      <div
        className="relative"
        style={{
          paddingTop: "var(--masthead-h)",
          paddingLeft: "var(--rail-w-left)",
          paddingRight: hasRightRail ? "var(--rail-w-right)" : 0,
        }}
      >
        {/* On mobile we remove the left rail padding (no fixed rail there) */}
        <style>{`@media (max-width: 767px){ .lib-shell-inner { padding-left: 0 !important; padding-right: 0 !important; } }
@media (min-width: 768px) and (max-width: 1023px){ .lib-shell-inner { padding-right: 0 !important; } }`}</style>
        <div className="lib-shell-inner relative" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <main className="relative">
            {hero ?? <PhotoHero zone={zone} />}
            <div className="lib-zone-in">{children}</div>

            {/* Gold picture rail */}
            <div aria-hidden className="mt-24 md:mt-32 relative" style={{ height: 14 }}>
              <div
                className="absolute left-0 right-0"
                style={{
                  top: 0,
                  height: 1,
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.7) 12%, rgba(212,181,122,0.95) 50%, rgba(201,169,110,0.7) 88%, transparent 100%)",
                  boxShadow: "0 1px 0 rgba(0,0,0,0.4)",
                }}
              />
              <div
                className="absolute left-0 right-0"
                style={{
                  top: 6,
                  height: 1,
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.35) 50%, transparent 100%)",
                }}
              />
            </div>

            {/* Walnut wainscoting + footer */}
            <div
              className="relative"
              style={{
                backgroundColor: "#2A1A0E",
                backgroundImage: `url(${wainscotingUrl})`,
                backgroundSize: "1200px auto",
                backgroundRepeat: "repeat",
                backgroundPosition: "center top",
                boxShadow: "inset 0 14px 28px rgba(0,0,0,0.55)",
              }}
            >
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 30%, rgba(212,181,122,0.10) 0%, transparent 60%), linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 100%)",
                }}
              />
              <footer className="relative px-6 py-14 text-center">
                <div
                  className="inline-flex flex-col items-center"
                  style={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(244,241,236,0.55)",
                    lineHeight: 1.9,
                  }}
                >
                  <span>The Pasted Library · Madrid · MMXXVI</span>
                  <span style={{ color: "rgba(244,241,236,0.45)" }}>
                    New Briefcases Arrive Weekly · Visit Your Card Any Time
                  </span>
                </div>
                <div className="mx-auto mt-6 flex justify-center">
                  <PMonogram size={28} color="#C9A96E" opacity={0.5} />
                </div>
              </footer>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

/* ---------- Mobile nav (sheet contents) ---------- */
import { Link, useLocation } from "react-router-dom";
import { ZONES, ZONE_ORDER } from "@/data/library-zones";
import type { LucideIcon } from "lucide-react";

const MobileNav = ({ onClose }: { onClose: () => void }) => {
  const { pathname } = useLocation();
  const isOn = (path: string) =>
    path === "/library" ? pathname === "/library" : pathname === path || pathname.startsWith(path + "/");
  const items: { path: string; label: string; icon?: LucideIcon }[] = [
    { path: "/library", label: "Atrium" },
    ...ZONE_ORDER.map((slug) => ({ path: ZONES[slug].path, label: ZONES[slug].label, icon: ZONES[slug].icon })),
    { path: "/library/index", label: "Index", icon: ZONES.index.icon },
    { path: "/library/me", label: "Your Card" },
  ];

  return (
    <nav className="h-full flex flex-col p-6 gap-1 bg-bone">
      <div
        className="mb-6"
        style={{
          fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          fontVariant: "small-caps",
          fontSize: 18,
          color: "#0A0A0A",
        }}
      >
        The Pasted Library
      </div>
      {items.map((i) => {
        const Icon = i.icon;
        const active = isOn(i.path);
        return (
          <Link
            key={i.path}
            to={i.path}
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-3 rounded-md"
            style={{
              color: active ? "#7A1F1F" : "#0A0A0A",
              background: active ? "var(--cream-warm)" : "transparent",
              border: `1px solid ${active ? "#C9A96E" : "transparent"}`,
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontSize: 17,
            }}
          >
            {Icon ? <Icon size={18} strokeWidth={1.5} /> : <span style={{ width: 18 }} />}
            <span>{i.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default LibraryShell;