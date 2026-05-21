import { useEffect, useState } from "react";
import { LibraryShell } from "@/components/library/chrome/LibraryShell";
import { StatusPillRow } from "@/components/library/chrome/StatusPillRow";
import { CardGrid, Cell } from "@/components/library/chrome/CardGrid";
import { MemberCard } from "@/components/library/chrome/cards";
import { ZONES } from "@/data/library-zones";
import { ReadingNookHero } from "@/components/library/ReadingNookHero";
import { LibraryCardVitrine } from "@/components/library/LibraryCardVitrine";

const ReadingRoomPage = () => {
  const zone = ZONES["reading-room"];
  const [active, setActive] = useState<string>("checked-out");
  useEffect(() => { document.title = "The Reading Room — The Pasted Library"; }, []);

  return (
    <LibraryShell
      zone={zone}
      activeSubsection={active}
      onSubsectionChange={setActive}
      hero={<ReadingNookHero />}
    >
      <StatusPillRow
        pills={[
          { id: "checked", label: "Checked Out" },
          { id: "saved", label: "Saved" },
          { id: "history", label: "History" },
        ]}
      />
      <LibraryCardVitrine />
      <div className="max-w-[1240px] mx-auto px-6 mt-10 md:mt-14">
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
            On the Side Table
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
        <p
          className="max-w-xl mb-8"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontSize: 18,
            color: "rgba(26,20,14,0.72)",
            lineHeight: 1.55,
          }}
        >
          Nothing taken down yet. The briefcases you check out, the essays you set aside, and the pages the proprietor leaves for you will collect here.
        </p>
      </div>
      <CardGrid>
        <Cell cols={3}><MemberCard kicker="EXAMPLE" title="The Founder Letter Framework" taken="CHECK OUT TO BEGIN" /></Cell>
        <Cell cols={3}><MemberCard kicker="EXAMPLE" title="A Deck for Saying No" taken="CHECK OUT TO BEGIN" /></Cell>
        <Cell cols={3}><MemberCard kicker="EXAMPLE" title="The Saturday Note" taken="CHECK OUT TO BEGIN" /></Cell>
        <Cell cols={3}><MemberCard kicker="EXAMPLE" title="The Quiet Audit" taken="CHECK OUT TO BEGIN" /></Cell>
      </CardGrid>
    </LibraryShell>
  );
};

export default ReadingRoomPage;