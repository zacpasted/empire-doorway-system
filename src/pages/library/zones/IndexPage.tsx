import { useEffect, useState } from "react";
import { LibraryShell } from "@/components/library/chrome/LibraryShell";
import { StatusPillRow } from "@/components/library/chrome/StatusPillRow";
import { ChapterHead } from "@/components/library/ChapterHead";
import { CardGrid, Cell } from "@/components/library/chrome/CardGrid";
import { BriefcaseCard } from "@/components/library/chrome/cards";
import { ZONES } from "@/data/library-zones";
import courierImg from "@/assets/library-v9-courier.png";
import aceImg from "@/assets/library-v9-ace.png";
import pawnImg from "@/assets/library-v9-pawn.webp";

const IndexPage = () => {
  const zone = ZONES.index;
  const [active, setActive] = useState<string>("type");
  useEffect(() => { document.title = "The Index — The Pasted Library"; }, []);

  return (
    <LibraryShell zone={zone} activeSubsection={active} onSubsectionChange={setActive}>
      <StatusPillRow
        pills={[
          { id: "stacks", label: "Stacks · 57" },
          { id: "cinema", label: "Cinema · 23" },
          { id: "periodicals", label: "Periodicals · 38" },
          { id: "vault", label: "Vault · 6" },
        ]}
      />
      <ChapterHead zone="The Index" subtitle={zone.subtitle} />
      <CardGrid>
        <Cell cols={4}><BriefcaseCard caseNumber="STACKS · CASE № 014" title="The Founder Letter Framework" meta="FRAMEWORK · 22 PAGES" img={courierImg} /></Cell>
        <Cell cols={4}><BriefcaseCard caseNumber="STACKS · CASE № 015" title="Clinic Brand Repositioning" meta="PLAYBOOK · 14 PAGES" img={aceImg} /></Cell>
        <Cell cols={4}><BriefcaseCard caseNumber="STACKS · CASE № 016" title="The First-Visit Script" meta="SCRIPT · 6 PAGES" img={pawnImg} /></Cell>
        <Cell cols={4}><BriefcaseCard caseNumber="STACKS · CASE № 017" title="The Saturday Note" meta="SCRIPT · 4 PAGES" img={pawnImg} /></Cell>
        <Cell cols={4}><BriefcaseCard caseNumber="STACKS · CASE № 018" title="A Deck for Saying No" meta="DECK · 11 PAGES" img={courierImg} /></Cell>
        <Cell cols={4}><BriefcaseCard caseNumber="STACKS · CASE № 019" title="The Quiet Audit" meta="TOOL · 1 PAGE" img={aceImg} /></Cell>
      </CardGrid>
    </LibraryShell>
  );
};

export default IndexPage;