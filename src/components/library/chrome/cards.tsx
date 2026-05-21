import { Play } from "lucide-react";
import waxSeal from "@/assets/library-wax-seal.png";

const MONO: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
  fontSize: 10,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "rgba(10,10,10,0.55)",
};

const TITLE: React.CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontStyle: "italic",
  fontWeight: 400,
  color: "#0A0A0A",
  lineHeight: 1.15,
};

/* ---------- Briefcase (small) ---------- */
export const BriefcaseCard = ({
  caseNumber,
  title,
  meta,
  img,
}: {
  caseNumber: string;
  title: string;
  meta: string;
  img: string;
}) => (
  <a href="#" className="lib-card-shell block overflow-hidden">
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "5/3", background: "#5C1414" }}>
      <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
    </div>
    <div className="p-6">
      <div style={MONO}>{caseNumber}</div>
      <div style={{ ...TITLE, fontSize: 20, marginTop: 8 }}>{title}</div>
      <div style={{ ...MONO, marginTop: 14, color: "rgba(10,10,10,0.4)" }}>{meta}</div>
    </div>
  </a>
);

/* ---------- Briefcase (featured / The Counter) ---------- */
export const BriefcaseFeaturedCard = ({
  kicker,
  title,
  blurb,
  img,
  breathe,
}: {
  kicker: string;
  title: string;
  blurb: string;
  img: string;
  breathe?: boolean;
}) => (
  <a href="#" className="lib-card-shell block overflow-hidden">
    <div
      className={`relative w-full overflow-hidden ${breathe ? "lib-counter-breathe" : ""}`}
      style={{ aspectRatio: "16/9", background: "#5C1414" }}
    >
      <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
    </div>
    <div className="p-8 md:p-10">
      <div style={{ ...MONO, color: "#7A1F1F" }}>{kicker}</div>
      <div style={{ ...TITLE, fontSize: 32, marginTop: 10 }}>{title}</div>
      <p
        className="mt-4 max-w-xl"
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 15, color: "rgba(10,10,10,0.7)", lineHeight: 1.65 }}
      >
        {blurb}
      </p>
    </div>
  </a>
);

/* ---------- Screening ---------- */
export const ScreeningCard = ({
  kicker,
  title,
  speaker,
  img,
}: {
  kicker: string;
  title: string;
  speaker: string;
  img: string;
}) => (
  <a href="#" className="lib-card-shell block overflow-hidden">
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9", background: "#14100C" }}>
      <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" style={{ filter: "brightness(0.78)" }} />
      <div
        className="absolute left-5 bottom-5 flex items-center justify-center rounded-full"
        style={{ width: 38, height: 38, background: "rgba(201,169,110,0.95)", color: "#0A0A0A" }}
      >
        <Play size={14} strokeWidth={2} fill="#0A0A0A" />
      </div>
    </div>
    <div className="p-6">
      <div style={MONO}>{kicker}</div>
      <div style={{ ...TITLE, fontSize: 22, marginTop: 8 }}>{title}</div>
      <div
        className="mt-2"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          fontSize: 14,
          color: "rgba(10,10,10,0.6)",
        }}
      >
        {speaker}
      </div>
    </div>
  </a>
);

/* ---------- Periodical (typographic) ---------- */
export const PeriodicalCard = ({
  kicker,
  title,
  pullquote,
  byline,
}: {
  kicker: string;
  title: string;
  pullquote: string;
  byline: string;
}) => (
  <a href="#" className="lib-card-shell block p-7 md:p-8 flex flex-col h-full">
    <div style={MONO}>{kicker}</div>
    <div style={{ ...TITLE, fontSize: 22, marginTop: 10 }}>{title}</div>
    <blockquote
      className="my-7 mx-auto text-center max-w-[24ch]"
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontStyle: "italic",
        fontSize: 16,
        color: "rgba(10,10,10,0.75)",
        lineHeight: 1.5,
      }}
    >
      “{pullquote}”
    </blockquote>
    <div className="mt-auto" style={{ ...MONO, color: "rgba(10,10,10,0.4)" }}>{byline}</div>
  </a>
);

/* ---------- Vault (oxblood, full row) ---------- */
export const VaultCard = ({
  title,
  countdown,
}: {
  title: string;
  countdown: string;
}) => (
  <a
    href="#"
    className="relative block overflow-hidden p-10 md:p-14"
    style={{
      background: "linear-gradient(135deg, #6E1E26 0%, #5C1A1F 60%, #3e1014 100%)",
      border: "1px solid rgba(201,169,110,0.3)",
      borderRadius: 6,
      color: "#F4F1EC",
      transition: "border-color 200ms ease-out, transform 200ms ease-out",
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,169,110,0.7)";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,169,110,0.3)";
    }}
  >
    <img
      src={waxSeal}
      alt=""
      aria-hidden
      className="absolute top-6 right-6 opacity-80"
      style={{ width: 64, height: 64 }}
    />
    <div style={{ ...MONO, color: "#C9A96E" }}>{countdown}</div>
    <div
      className="mt-4 max-w-2xl"
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontStyle: "italic",
        fontSize: "clamp(28px, 4vw, 44px)",
        color: "#F4F1EC",
        lineHeight: 1.05,
      }}
    >
      {title}
    </div>
    <div
      className="inline-flex items-center justify-center mt-8 px-6 py-3"
      style={{
        border: "1px solid #C9A96E",
        color: "#C9A96E",
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        fontSize: 11,
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        borderRadius: 4,
      }}
    >
      Witness →
    </div>
  </a>
);

/* ---------- Member (Reading Room) ---------- */
export const MemberCard = ({
  kicker,
  title,
  taken,
}: {
  kicker: string;
  title: string;
  taken: string;
}) => (
  <a href="#" className="lib-card-shell block p-5">
    <div style={MONO}>{kicker}</div>
    <div style={{ ...TITLE, fontSize: 18, marginTop: 6 }}>{title}</div>
    <div style={{ ...MONO, marginTop: 12, color: "rgba(10,10,10,0.4)" }}>{taken}</div>
  </a>
);