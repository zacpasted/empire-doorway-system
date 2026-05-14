import { BriefcaseCard } from "./BriefcaseCard";

export type ShelfAsset = {
  id: string;
  slug: string;
  case_number: number;
  section: string;
  title: string;
  file_format: string | null;
  file_meta: string | null;
};

type Props = { label: string; assets: ShelfAsset[] };

export const Shelf = ({ label, assets }: Props) => {
  if (!assets.length) return null;
  return (
    <section className="w-full mb-16 md:mb-20">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex items-center gap-6 mb-6">
          <h2 className="lib-mono text-lib-charcoal whitespace-nowrap">{label}</h2>
          <div className="lib-hairline flex-1" />
        </div>
      </div>
      <div className="relative">
        <div className="lib-shelf-scroll overflow-x-auto pl-6 pr-12 max-w-[1240px] mx-auto">
          <div className="flex gap-6 md:gap-8 pb-4">
            {assets.map((a) => (
              <BriefcaseCard
                key={a.id}
                slug={a.slug}
                caseNumber={a.case_number}
                section={a.section}
                title={a.title}
                fileFormat={a.file_format}
                fileMeta={a.file_meta}
              />
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-bone to-transparent hidden md:block" />
      </div>
    </section>
  );
};

export default Shelf;