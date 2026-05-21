import { useEffect, useState } from "react";
import { LibraryShell } from "@/components/library/chrome/LibraryShell";
import { StatusPillRow } from "@/components/library/chrome/StatusPillRow";
import { ChapterHead } from "@/components/library/ChapterHead";
import { CardGrid, Cell } from "@/components/library/chrome/CardGrid";
import { VaultCard } from "@/components/library/chrome/cards";
import { ZONES } from "@/data/library-zones";

const VaultPage = () => {
  const zone = ZONES.vault;
  const [active, setActive] = useState<string>("sealed-now");
  useEffect(() => { document.title = "The Vault — The Pasted Library"; }, []);

  return (
    <LibraryShell zone={zone} activeSubsection={active} onSubsectionChange={setActive}>
      <StatusPillRow
        pills={[
          { id: "now", label: "Sealed Now", count: 2 },
          { id: "soon", label: "Sealed Soon", count: 1 },
          { id: "past", label: "Past Releases", count: 3 },
        ]}
      />
      <ChapterHead zone="The Vault" subtitle={zone.subtitle} />
      <CardGrid>
        <Cell cols={12}><VaultCard title="The room before the meeting." countdown="SEALED FOR 36 HOURS" /></Cell>
        <Cell cols={12}><VaultCard title="What the proprietor would not put on the website." countdown="SEALED FOR 6 DAYS" /></Cell>
        <Cell cols={12}><VaultCard title="A deck, retired from public view." countdown="OPENS NEXT MONTH" /></Cell>
      </CardGrid>
    </LibraryShell>
  );
};

export default VaultPage;