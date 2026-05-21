import { Monogram } from "./Monogram";

type Props = { surface?: "bone" | "smoke" | "oxblood" };

export const LibraryFooter = ({ surface = "bone" }: Props) => {
  const isDark = surface !== "bone";
  const text = isDark ? "text-bone/40" : "text-lib-charcoal/40";
  const variant = isDark ? "gold-on-charcoal" : "charcoal-on-bone";

  return (
    <footer className="w-full mt-24 md:mt-32">
      <div className={isDark ? "lib-hairline-gold" : "lib-hairline"} />
      <div className="max-w-[1240px] mx-auto px-6 py-14 flex flex-col items-center gap-6 text-center">
        <div className={`lib-meta ${text} leading-relaxed`}>
          <div>The Pasted Library · Madrid · MMXXVI</div>
          <div className="mt-1">New briefcases arrive weekly · Visit your card any time</div>
        </div>
        <div className="opacity-30">
          <Monogram size={28} variant={variant} />
        </div>
      </div>
    </footer>
  );
};

export default LibraryFooter;