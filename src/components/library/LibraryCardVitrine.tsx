import { useMember } from "@/hooks/useMember";
import { PMonogram } from "@/components/library/PMonogram";

/**
 * The member's Library Card under glass — a vitrine. Brass frame, parchment
 * card, hand-set member number, etched serial. Personal totem of the room.
 */
export const LibraryCardVitrine = () => {
  const { member } = useMember();
  const name = member?.first_name?.trim() || "Guest of the House";
  const number = member?.member_number ?? "—— · ——";

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
            Your Card · Under Glass
          </div>
          <div
            className="flex-1"
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, rgba(212,181,122,0.5), rgba(212,181,122,0.1) 70%, transparent)",
            }}
          />
        </div>

        {/* Brass vitrine frame */}
        <div
          className="relative mx-auto"
          style={{
            maxWidth: 720,
            padding: 14,
            background:
              "linear-gradient(180deg, #C9A96E 0%, #8E6F3A 50%, #6E5326 100%)",
            borderRadius: 6,
            boxShadow:
              "inset 0 1px 0 rgba(255,240,200,0.55), 0 18px 40px rgba(0,0,0,0.5)",
          }}
        >
          {/* glass card */}
          <div
            className="relative"
            style={{
              background:
                "linear-gradient(180deg, #F5ECD6 0%, #E8DBB6 100%)",
              border: "1px solid rgba(120,90,40,0.5)",
              borderRadius: 3,
              padding: "clamp(22px, 4vw, 40px)",
              color: "#1A140E",
            }}
          >
            {/* glass reflection */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0) 65%, rgba(255,255,255,0.10) 100%)",
                borderRadius: 3,
              }}
            />

            <div className="flex items-start justify-between gap-6">
              <div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 9,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#7A4E1C",
                  }}
                >
                  The Pasted Library · Member of the House
                </div>
                <div
                  className="mt-2"
                  style={{
                    fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: "clamp(26px, 3.4vw, 38px)",
                    lineHeight: 1.05,
                    color: "#1A140E",
                  }}
                >
                  {name}
                </div>
              </div>
              <PMonogram size={56} color="#7A1F1F" opacity={0.85} />
            </div>

            {/* etched divider */}
            <div className="my-5 flex items-center gap-3">
              <span style={{ flex: 1, height: 1, background: "rgba(120,90,40,0.45)" }} />
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#B8924F" }} />
              <span style={{ flex: 1, height: 1, background: "rgba(120,90,40,0.45)" }} />
            </div>

            <div
              className="grid grid-cols-3 gap-4"
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#3A2A1A",
              }}
            >
              <Field label="Card №" value={String(number)} />
              <Field label="Admitted" value="MMXXVI" />
              <Field label="Seat" value="By the lamp" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div style={{ opacity: 0.7, fontSize: 9 }}>{label}</div>
    <div
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontStyle: "italic",
        fontSize: 18,
        letterSpacing: "0.02em",
        textTransform: "none",
        color: "#1A140E",
        marginTop: 2,
      }}
    >
      {value}
    </div>
  </div>
);

export default LibraryCardVitrine;