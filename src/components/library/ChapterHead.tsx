type Props = {
  zone: string;       // e.g. "The Stacks"
  subtitle: string;   // e.g. "Where the working instruments live."
  tone?: "dark" | "light";
};

export const ChapterHead = ({ zone, subtitle, tone = "light" }: Props) => {
  const text = tone === "dark" ? "text-bone" : "text-lib-charcoal";
  const sub = tone === "dark" ? "text-bone/65" : "text-lib-charcoal/70";
  const rule = tone === "dark" ? "bg-bone/22" : "bg-lib-charcoal/20";

  return (
    <header className="w-full text-center pt-20 md:pt-28 pb-10 md:pb-14">
      {/* Ornament dingbat */}
      <div aria-hidden className="mx-auto mb-5" style={{ width: 24, height: 24 }}>
        <svg viewBox="0 0 24 24" width="24" height="24" className="mx-auto">
          <g fill="none" stroke="#C9A96E" strokeWidth="1" strokeLinecap="round">
            <path d="M2 12 Q8 12 12 6 Q16 12 22 12 Q16 12 12 18 Q8 12 2 12 Z" />
            <circle cx="12" cy="12" r="1.2" fill="#C9A96E" />
          </g>
        </svg>
      </div>
      <h1 className={`lib-chapter ${text} mx-auto`}>{zone}</h1>
      <p className={`lib-chapter-sub ${sub} mt-4 max-w-[640px] mx-auto px-6`}>{subtitle}</p>
      <div className={`mx-auto mt-7 h-px w-[120px] ${rule}`} aria-hidden />
    </header>
  );
};

export default ChapterHead;