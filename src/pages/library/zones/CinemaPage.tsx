import { useEffect, useState } from "react";
import { LibraryShell } from "@/components/library/chrome/LibraryShell";
import { StatusPillRow } from "@/components/library/chrome/StatusPillRow";
import { ChapterHead } from "@/components/library/ChapterHead";
import { CardGrid, Cell } from "@/components/library/chrome/CardGrid";
import { ScreeningCard } from "@/components/library/chrome/cards";
import { ZONES } from "@/data/library-zones";
import deskNightImg from "@/assets/library-v8-desk-night.jpg";
import librarianDeskImg from "@/assets/library-v8-librarian-desk.jpg";
import shelfImg from "@/assets/library-v8-shelfwall.jpg";
import chamberImg from "@/assets/library-v8-chamber.jpg";

const CinemaPage = () => {
  const zone = ZONES.cinema;
  const [active, setActive] = useState<string>("masterclasses");
  useEffect(() => { document.title = "The Cinema — The Pasted Library"; }, []);

  return (
    <LibraryShell zone={zone} activeSubsection={active} onSubsectionChange={setActive}>
      <StatusPillRow
        pills={[
          { id: "new", label: "Just Arrived", count: 1 },
          { id: "counter", label: "On the Counter" },
          { id: "proprietor", label: "From the Proprietor" },
        ]}
      />
      <ChapterHead zone="The Cinema" subtitle={zone.subtitle} />
      <CardGrid>
        <Cell cols={6}><ScreeningCard kicker="MASTERCLASS · 48 MIN" title="On showing up." speaker="With the proprietor" img={deskNightImg} /></Cell>
        <Cell cols={6}><ScreeningCard kicker="TALK · 22 MIN" title="What the librarian keeps." speaker="A conversation about archives" img={librarianDeskImg} /></Cell>
        <Cell cols={6}><ScreeningCard kicker="FILM · 9 MIN" title="The first read." speaker="A short, on a brand becoming a house" img={shelfImg} /></Cell>
        <Cell cols={6}><ScreeningCard kicker="TEARDOWN · 34 MIN" title="Inside the room." speaker="A rebuild, end to end" img={chamberImg} /></Cell>
      </CardGrid>
    </LibraryShell>
  );
};

export default CinemaPage;