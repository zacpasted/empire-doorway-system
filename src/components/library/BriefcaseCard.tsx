import { Link } from "react-router-dom";
import { useState } from "react";
import briefcaseClosed from "@/assets/briefcase-closed.jpg";
import { PMonogram } from "@/components/library/PMonogram";

type Props = {
  slug: string;
  caseNumber: number;
  section: string;
  title: string;
  fileFormat?: string | null;
  fileMeta?: string | null;
};

const pad3 = (n: number) => n.toString().padStart(3, "0");

export const BriefcaseCard = ({ slug, caseNumber, section, title, fileFormat, fileMeta }: Props) => {
  const [animating, setAnimating] = useState(false);

  const onClick = (e: React.MouseEvent) => {
    if (animating) return;
    e.preventDefault();
    setAnimating(true);
    setTimeout(() => { window.location.href = `/library/${slug}`; }, 320);
  };

  return (
    <Link to={`/library/${slug}`} onClick={onClick} className="group flex-shrink-0 w-[240px] md:w-[280px] cursor-pointer">
      <div
        className={`relative w-full aspect-[7/5] overflow-hidden transition-transform duration-200 ease-out group-hover:-translate-y-1 ${animating ? "lib-checkout-anim" : ""}`}
        style={{ background: "#0A0A0A" }}
      >
        <img
          src={briefcaseClosed}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
          draggable={false}
        />
        {/* P monogram overlay on the case face */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[22%] opacity-90">
          <PMonogram size={64} color="#C9A96E" style={{ width: "100%", height: "auto", aspectRatio: "1 / 1.05" }} />
        </div>
      </div>
      <div className="h-px w-full bg-lib-gold/0 group-hover:bg-lib-gold/60 transition-colors duration-200 mt-2" />
      <div className="pt-3 space-y-2">
        <p className="lib-mono text-lib-charcoal/55">№ {pad3(caseNumber)} — {section.toUpperCase()}</p>
        <h3 className="lib-display text-lib-charcoal text-lg leading-tight line-clamp-2">{title}</h3>
        {(fileFormat || fileMeta) && (
          <p className="lib-mono text-lib-charcoal/45">{[fileFormat, fileMeta].filter(Boolean).join(" — ")}</p>
        )}
      </div>
    </Link>
  );
};

export default BriefcaseCard;