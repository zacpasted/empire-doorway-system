import { useEffect, useState } from "react";
import { LibraryShell } from "@/components/library/chrome/LibraryShell";
import { StatusPillRow } from "@/components/library/chrome/StatusPillRow";
import { ChapterHead } from "@/components/library/ChapterHead";
import { CardGrid, Cell } from "@/components/library/chrome/CardGrid";
import { PeriodicalCard } from "@/components/library/chrome/cards";
import { ZONES } from "@/data/library-zones";

const PeriodicalsPage = () => {
  const zone = ZONES.periodicals;
  const [active, setActive] = useState<string>("essays");
  useEffect(() => { document.title = "The Periodicals — The Pasted Library"; }, []);

  return (
    <LibraryShell zone={zone} activeSubsection={active} onSubsectionChange={setActive}>
      <StatusPillRow
        pills={[
          { id: "new", label: "Just Arrived", count: 2 },
          { id: "counter", label: "On the Counter" },
          { id: "proprietor", label: "From the Proprietor" },
        ]}
      />
      <ChapterHead zone="The Periodicals" subtitle={zone.subtitle} />
      <CardGrid>
        <Cell cols={4}>
          <PeriodicalCard
            kicker="ESSAY · 9 MIN"
            title="Why we close the door."
            pullquote="Membership is a constraint, not a privilege."
            byline="By the proprietor · Vol. III"
          />
        </Cell>
        <Cell cols={4}>
          <PeriodicalCard
            kicker="DISPATCH · 6 MIN"
            title="Letters, sent later."
            pullquote="Six pieces of mail held back, then released together."
            byline="From the desk · April"
          />
        </Cell>
        <Cell cols={4}>
          <PeriodicalCard
            kicker="INTERVIEW · 14 MIN"
            title="On the moment a brand becomes a house."
            pullquote="It is not the day it launches. It is the day the staff stops apologising for it."
            byline="A conversation, kept on record"
          />
        </Cell>
        <Cell cols={8}>
          <PeriodicalCard
            kicker="CASE NOTES · 11 MIN"
            title="A quarter, rebuilt from the inside."
            pullquote="The work was not the campaign. The work was the staff meeting on Tuesday."
            byline="Field report · Q1"
          />
        </Cell>
        <Cell cols={4}>
          <PeriodicalCard
            kicker="ESSAY · 5 MIN"
            title="Practice over performance."
            pullquote="The work is the proof. The post is the postscript."
            byline="By the proprietor"
          />
        </Cell>
      </CardGrid>
    </LibraryShell>
  );
};

export default PeriodicalsPage;