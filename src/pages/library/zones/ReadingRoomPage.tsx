import { useEffect, useState } from "react";
import { LibraryShell } from "@/components/library/chrome/LibraryShell";
import { StatusPillRow } from "@/components/library/chrome/StatusPillRow";
import { ChapterHead } from "@/components/library/ChapterHead";
import { CardGrid, Cell } from "@/components/library/chrome/CardGrid";
import { MemberCard } from "@/components/library/chrome/cards";
import { ZONES } from "@/data/library-zones";

const ReadingRoomPage = () => {
  const zone = ZONES["reading-room"];
  const [active, setActive] = useState<string>("checked-out");
  useEffect(() => { document.title = "The Reading Room — The Pasted Library"; }, []);

  return (
    <LibraryShell zone={zone} activeSubsection={active} onSubsectionChange={setActive}>
      <StatusPillRow
        pills={[
          { id: "checked", label: "Checked Out" },
          { id: "saved", label: "Saved" },
          { id: "history", label: "History" },
        ]}
      />
      <ChapterHead zone="The Reading Room" subtitle={zone.subtitle} />
      <div className="px-6 md:px-10 pb-24">
        <p
          className="max-w-xl mb-10"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            fontSize: 18,
            color: "rgba(10,10,10,0.65)",
            lineHeight: 1.55,
          }}
        >
          You haven't taken anything down yet. The cases you check out, save, or read will collect here.
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