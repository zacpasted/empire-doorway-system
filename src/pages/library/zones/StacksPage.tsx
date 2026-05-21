import { useEffect, useState } from "react";
import { LibraryShell } from "@/components/library/chrome/LibraryShell";
import { StatusPillRow } from "@/components/library/chrome/StatusPillRow";
import { ChapterHead } from "@/components/library/ChapterHead";
import { CardGrid, Cell } from "@/components/library/chrome/CardGrid";
import { BriefcaseCard, BriefcaseFeaturedCard } from "@/components/library/chrome/cards";
import { ZONES } from "@/data/library-zones";
import { StacksShelfWallHero } from "@/components/library/StacksShelfWallHero";
import { BrassCatalogueRail } from "@/components/library/BrassCatalogueRail";
import courierImg from "@/assets/library-v9-courier.png";
import aceImg from "@/assets/library-v9-ace.png";
import pawnImg from "@/assets/library-v9-pawn.webp";
import deskNightImg from "@/assets/library-v8-desk-night.jpg";

const StacksPage = () => {
  const zone = ZONES.stacks;
  const [active, setActive] = useState<string>("frameworks");
  const [drawer, setDrawer] = useState<string>("all");
  useEffect(() => { document.title = "The Stacks — The Pasted Library"; }, []);

  return (
    <LibraryShell
      zone={zone}
      activeSubsection={active}
      onSubsectionChange={setActive}
      hero={<StacksShelfWallHero />}
    >
      <StatusPillRow
        pills={[
          { id: "new", label: "Just Arrived", count: 3 },
          { id: "counter", label: "On the Counter" },
          { id: "proprietor", label: "From the Proprietor" },
        ]}
      />
      <BrassCatalogueRail
        active={drawer}
        onSelect={setDrawer}
        drawers={[
          { id: "all", label: "All", count: 28 },
          { id: "frameworks", label: "Frameworks", count: 9 },
          { id: "playbooks", label: "Playbooks", count: 7 },
          { id: "scripts", label: "Scripts", count: 6 },
          { id: "decks", label: "Decks", count: 4 },
          { id: "tools", label: "Tools", count: 2 },
        ]}
      />
      <ChapterHead zone="The Stacks" subtitle={zone.subtitle} />
      <CardGrid>
        <Cell cols={4}><BriefcaseCard caseNumber="CASE № 014" title="The Founder Letter Framework" meta="FRAMEWORK · 22 PAGES" img={courierImg} /></Cell>
        <Cell cols={4}><BriefcaseCard caseNumber="CASE № 015" title="Clinic Brand Repositioning" meta="PLAYBOOK · 14 PAGES" img={aceImg} /></Cell>
        <Cell cols={4}><BriefcaseCard caseNumber="CASE № 016" title="The First-Visit Script" meta="SCRIPT · 6 PAGES" img={pawnImg} /></Cell>
        <Cell cols={12}>
          <BriefcaseFeaturedCard
            kicker="On the Counter · This Week"
            title="What the room looks like when the door closes."
            blurb="A full deck on rebuilding a single-operator practice from the inside — what stayed, what was cut, and what the proprietor would do differently if it were tomorrow."
            img={deskNightImg}
            breathe
          />
        </Cell>
        <Cell cols={4}><BriefcaseCard caseNumber="CASE № 017" title="The Saturday Note" meta="SCRIPT · 4 PAGES" img={pawnImg} /></Cell>
        <Cell cols={4}><BriefcaseCard caseNumber="CASE № 018" title="A Deck for Saying No" meta="DECK · 11 PAGES" img={courierImg} /></Cell>
        <Cell cols={4}><BriefcaseCard caseNumber="CASE № 019" title="The Quiet Audit" meta="TOOL · 1 PAGE" img={aceImg} /></Cell>
      </CardGrid>
    </LibraryShell>
  );
};

export default StacksPage;