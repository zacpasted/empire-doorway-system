import cabinetUrl from "@/assets/stacks-brass-cabinet.png";

export type CatalogueDrawer = {
  id: string;
  label: string;   // FRAMEWORKS
  count?: number;
};

type Props = {
  drawers: CatalogueDrawer[];
  active?: string;
  onSelect?: (id: string) => void;
};

/**
 * Brass catalogue cabinet styled filter rail. Each "drawer" is a filter chip
 * with a brass label plate, pull knobs and a section count.
 */
export const BrassCatalogueRail = ({ drawers, active, onSelect }: Props) => {
  return (
    <section className="w-full mt-12 md:mt-16">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex items-center gap-6 mb-5">
          <div
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 10,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(212,181,122,0.85)",
            }}
          >
            The Catalogue
          </div>
          <div
            className="flex-1"
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, rgba(212,181,122,0.5), rgba(212,181,122,0.1) 70%, transparent)",
            }}
          />
          <img
            src={cabinetUrl}
            alt=""
            width={64}
            height={48}
            loading="lazy"
            className="hidden md:block opacity-80"
            style={{ filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.5))" }}
          />
        </div>

        <div
          className="rounded-md p-2 md:p-3"
          style={{
            background:
              "linear-gradient(180deg, #3a1f10 0%, #25140a 100%)",
            border: "1px solid rgba(212,181,122,0.35)",
            boxShadow:
              "inset 0 1px 0 rgba(232,200,140,0.18), 0 10px 24px rgba(0,0,0,0.45)",
          }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
            {drawers.map((d) => {
              const isActive = active === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => onSelect?.(d.id)}
                  className="relative group text-left transition-transform"
                  style={{
                    background: isActive
                      ? "linear-gradient(180deg, #E8C88C 0%, #B8924F 100%)"
                      : "linear-gradient(180deg, #C9A96E 0%, #8E6F3A 100%)",
                    border: "1px solid rgba(40,20,8,0.6)",
                    borderRadius: 6,
                    padding: "10px 12px 12px",
                    boxShadow: isActive
                      ? "inset 0 1px 0 rgba(255,240,200,0.6), 0 2px 0 rgba(0,0,0,0.4)"
                      : "inset 0 1px 0 rgba(255,235,190,0.45), 0 1px 0 rgba(0,0,0,0.4)",
                    transform: isActive ? "translateY(1px)" : "translateY(0)",
                  }}
                  aria-pressed={isActive}
                >
                  {/* brass label plate */}
                  <div
                    style={{
                      background:
                        "linear-gradient(180deg, #F3E2B4 0%, #D7B775 100%)",
                      border: "1px solid rgba(60,30,10,0.5)",
                      borderRadius: 3,
                      padding: "5px 8px",
                      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#3a1f10",
                      textAlign: "center",
                      boxShadow: "inset 0 0 0 1px rgba(255,250,220,0.5)",
                    }}
                  >
                    {d.label}
                    {typeof d.count === "number" && (
                      <span style={{ marginLeft: 6, opacity: 0.7 }}>· {d.count}</span>
                    )}
                  </div>
                  {/* pull knobs */}
                  <div className="absolute left-2 bottom-2 w-2 h-2 rounded-full"
                    style={{ background: "radial-gradient(circle at 30% 30%, #FBE7B0, #8E6F3A 70%)" }} />
                  <div className="absolute right-2 bottom-2 w-2 h-2 rounded-full"
                    style={{ background: "radial-gradient(circle at 30% 30%, #FBE7B0, #8E6F3A 70%)" }} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrassCatalogueRail;