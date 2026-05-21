import { useEffect, useState } from "react";
import { LibraryShell } from "@/components/library/chrome/LibraryShell";
import { StatusPillRow } from "@/components/library/chrome/StatusPillRow";
import { ZONES } from "@/data/library-zones";
import { BroadsheetHero } from "@/components/library/BroadsheetHero";
import { BroadsheetFeature } from "@/components/library/BroadsheetFeature";
import { NewspaperRack } from "@/components/library/NewspaperRack";

const PeriodicalsPage = () => {
  const zone = ZONES.periodicals;
  const [active, setActive] = useState<string>("essays");
  useEffect(() => { document.title = "The Periodicals — The Pasted Library"; }, []);

  return (
    <LibraryShell
      zone={zone}
      activeSubsection={active}
      onSubsectionChange={setActive}
      hero={<BroadsheetHero />}
    >
      <StatusPillRow
        pills={[
          { id: "new", label: "Just Arrived", count: 2 },
          { id: "counter", label: "On the Counter" },
          { id: "proprietor", label: "From the Proprietor" },
        ]}
      />
      <div className="max-w-[1240px] mx-auto px-6 mt-10 md:mt-14">
        <BroadsheetFeature
          kicker="Above the Fold · Essay · 9 min"
          title="Why we close the door."
          dropCapBody="Membership is a constraint, not a privilege. We close the door because the room only works at the size it currently is. The work we publish here is written for the people inside it — and the moment we begin writing for anyone else, the work flattens, the proprietor stops signing it, and the periodical becomes content. So the door stays shut, and the writing stays personal, and the page stays worth folding."
          pullquote="The door stays shut so the writing can stay personal."
          byline="By the proprietor · Vol. III · — Z."
        />
      </div>

      <NewspaperRack
        label="The Rack · This Quarter"
        items={[
          {
            id: "1",
            kicker: "Dispatch · 6 min",
            title: "Letters, sent later.",
            date: "04 · Apr",
            pullquote: "Six pieces of mail held back, then released together.",
          },
          {
            id: "2",
            kicker: "Interview · 14 min",
            title: "On the moment a brand becomes a house.",
            date: "21 · Mar",
            pullquote: "It is the day the staff stops apologising for it.",
          },
          {
            id: "3",
            kicker: "Case Notes · 11 min",
            title: "A quarter, rebuilt from the inside.",
            date: "08 · Mar",
            pullquote: "The work was the staff meeting on Tuesday.",
          },
          {
            id: "4",
            kicker: "Essay · 5 min",
            title: "Practice over performance.",
            date: "22 · Feb",
            pullquote: "The work is the proof. The post is the postscript.",
          },
          {
            id: "5",
            kicker: "Field Note · 7 min",
            title: "The Tuesday a price changed everything.",
            date: "09 · Feb",
            pullquote: "Nothing on the page moved. The room did.",
          },
          {
            id: "6",
            kicker: "Dispatch · 4 min",
            title: "On not posting the win.",
            date: "25 · Jan",
            pullquote: "The quiet quarter is the one that compounds.",
          },
        ]}
      />
    </LibraryShell>
  );
};

export default PeriodicalsPage;