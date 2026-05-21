import { useEffect, useState } from "react";
import { LibraryShell } from "@/components/library/chrome/LibraryShell";
import { ZONES } from "@/data/library-zones";
import { VaultDoorHero } from "@/components/library/VaultDoorHero";
import { WaxEnvelopeCard, type EnvelopeState } from "@/components/library/WaxEnvelopeCard";

type Release = { id: string; state: EnvelopeState; title: string; meta: string };

const RELEASES: Release[] = [
  {
    id: "now-1",
    state: "now",
    title: "The Counter Method",
    meta: "Opened 14 Nov · Break the Seal to Read",
  },
  {
    id: "now-2",
    state: "now",
    title: "Hammer Cycle, in Full",
    meta: "Opened 07 Nov · Break the Seal to Read",
  },
  {
    id: "soon-1",
    state: "soon",
    title: "The Quiet Consultation",
    meta: "Sealed · Opens Friday at Noon",
  },
  {
    id: "past-1",
    state: "past",
    title: "Venus Fly Trap",
    meta: "Sealed 09 Sept · Opened 12 Sept",
  },
  {
    id: "past-2",
    state: "past",
    title: "The Long Goodbye",
    meta: "Sealed 22 Aug · Opened 26 Aug",
  },
  {
    id: "past-3",
    state: "past",
    title: "A Letter, Retired",
    meta: "Sealed 03 Aug · Opened 07 Aug",
  },
];

const SECTION_TITLE: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
  fontStyle: "italic",
  fontWeight: 400,
  fontSize: "clamp(26px, 3vw, 36px)",
  letterSpacing: "-0.01em",
  color: "#F4F1EC",
  lineHeight: 1,
};

const SECTION_MONO: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
  fontSize: 10,
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: "rgba(201,169,110,0.7)",
};

const SectionHeader = ({ kicker, title }: { kicker: string; title: string }) => (
  <div className="mb-6 md:mb-8">
    <div style={SECTION_MONO}>{kicker}</div>
    <div className="mt-2 flex items-baseline gap-4">
      <h2 style={SECTION_TITLE}>{title}</h2>
      <div
        aria-hidden
        className="flex-1"
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, rgba(201,169,110,0.6) 0%, rgba(201,169,110,0.15) 100%)",
          transform: "translateY(-6px)",
        }}
      />
    </div>
  </div>
);

const VaultPage = () => {
  const zone = ZONES.vault;
  const [active, setActive] = useState<string>("sealed-now");
  useEffect(() => {
    document.title = "The Vault — The Pasted Library";
  }, []);

  const sealedNow = RELEASES.filter((r) => r.state === "now");
  const sealedSoon = RELEASES.filter((r) => r.state === "soon");
  const past = RELEASES.filter((r) => r.state === "past");

  return (
    <LibraryShell
      zone={zone}
      surface="oxblood"
      activeSubsection={active}
      onSubsectionChange={setActive}
      hero={<VaultDoorHero />}
    >
      <div className="px-5 md:px-12 lg:px-16 py-10 md:py-16">
        {/* Mission line — proprietor's hand */}
        <div
          className="mb-12 md:mb-16 max-w-2xl"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(20px, 2.2vw, 26px)",
            lineHeight: 1.5,
            color: "rgba(244,241,236,0.78)",
          }}
        >
          The rare materials. Released on schedule, witnessed once, kept on record.
          <span style={{ display: "block", marginTop: 14, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(201,169,110,0.65)", fontStyle: "normal", fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
            — From the proprietor's desk
          </span>
        </div>

        {/* Sealed Now */}
        <section className="mb-16 md:mb-20">
          <SectionHeader kicker={`Sealed Now · ${sealedNow.length}`} title="On the table." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {sealedNow.map((r) => (
              <WaxEnvelopeCard key={r.id} {...r} />
            ))}
          </div>
        </section>

        {/* Sealed Soon */}
        <section className="mb-16 md:mb-20">
          <SectionHeader kicker={`Sealed Soon · ${sealedSoon.length}`} title="What waits." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {sealedSoon.map((r) => (
              <WaxEnvelopeCard key={r.id} {...r} />
            ))}
          </div>
        </section>

        {/* Past Releases */}
        <section>
          <SectionHeader kicker={`Past Releases · ${past.length}`} title="On record." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {past.map((r) => (
              <WaxEnvelopeCard key={r.id} {...r} />
            ))}
          </div>
        </section>

        {/* Dispatch line */}
        <div
          className="mt-20 md:mt-28 text-center"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(16px, 1.6vw, 19px)",
            color: "rgba(244,241,236,0.6)",
            lineHeight: 1.5,
          }}
        >
          The seal opens Friday at noon. Set your hour.
        </div>
      </div>
    </LibraryShell>
  );
};

export default VaultPage;