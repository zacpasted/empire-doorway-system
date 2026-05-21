export type RackItem = {
  id: string;
  kicker: string;     // ESSAY · 9 MIN
  title: string;
  date: string;       // 04 · APR
  pullquote?: string;
};

type Props = { label: string; items: RackItem[] };

/**
 * A wooden newspaper rack — folded periodicals hanging from a brass rail.
 * Each item is a folded broadsheet preview with kicker, title and pullquote.
 */
export const NewspaperRack = ({ label, items }: Props) => {
  return (
    <section className="w-full mt-14 md:mt-20">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex items-center gap-6 mb-5">
          <div
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 10,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(120,90,40,0.85)",
            }}
          >
            {label}
          </div>
          <div
            className="flex-1"
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, rgba(120,90,40,0.55), rgba(120,90,40,0.1) 70%, transparent)",
            }}
          />
        </div>

        <div className="relative">
          {/* brass rail */}
          <div
            aria-hidden
            className="absolute left-0 right-0"
            style={{
              top: 6,
              height: 4,
              background:
                "linear-gradient(180deg, #F3E2B4 0%, #B8924F 60%, #7A5A28 100%)",
              borderRadius: 2,
              boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 pt-4">
            {items.map((it, idx) => (
              <article
                key={it.id}
                className="relative group"
                style={{
                  background:
                    "linear-gradient(180deg, #F4ECD6 0%, #E6D9B5 100%)",
                  border: "1px solid rgba(120,90,40,0.35)",
                  padding: "22px 22px 20px",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,250,235,0.7), 0 12px 24px rgba(0,0,0,0.35)",
                  transform: `rotate(${(idx % 2 === 0 ? -0.4 : 0.5)}deg)`,
                  transition: "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {/* clip on rail */}
                <div
                  aria-hidden
                  className="absolute left-1/2 -translate-x-1/2"
                  style={{
                    top: -10,
                    width: 22,
                    height: 14,
                    background:
                      "linear-gradient(180deg, #E8C88C, #8E6F3A)",
                    border: "1px solid rgba(40,20,8,0.5)",
                    borderRadius: 2,
                    boxShadow: "inset 0 1px 0 rgba(255,240,200,0.6)",
                  }}
                />
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 9,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#7A4E1C",
                  }}
                >
                  {it.kicker}
                </div>
                <h3
                  className="mt-2"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: 24,
                    lineHeight: 1.1,
                    color: "#1A140E",
                  }}
                >
                  {it.title}
                </h3>
                {it.pullquote && (
                  <p
                    className="mt-3"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 15,
                      lineHeight: 1.5,
                      color: "#3A2A1A",
                      borderLeft: "2px solid rgba(184,146,79,0.55)",
                      paddingLeft: 10,
                    }}
                  >
                    “{it.pullquote}”
                  </p>
                )}
                <div
                  className="mt-4 flex items-center justify-between"
                  style={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 9,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: "#7A4E1C",
                  }}
                >
                  <span>{it.date}</span>
                  <span>Read →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewspaperRack;