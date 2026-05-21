import { Plus } from "lucide-react";
import type { Subsection, ZoneDef } from "@/data/library-zones";

type Props = {
  zone: ZoneDef;
  active?: string;
  onSelect?: (slug: string) => void;
};

const SubsectionCard = ({
  item,
  active,
  onClick,
}: {
  item: Subsection;
  active: boolean;
  onClick?: () => void;
}) => {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative w-full text-left flex items-center gap-3 px-4 py-3.5 transition-all duration-200"
      style={{
        background: active ? "var(--cream-warm)" : "transparent",
        border: `1px solid ${active ? "#C9A96E" : "rgba(10,10,10,0.12)"}`,
        borderRadius: 6,
      }}
      data-active={active || undefined}
    >
      {active && (
        <span
          aria-hidden
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-7 rounded-r-sm"
          style={{ background: "#7A1F1F" }}
        />
      )}
      <Icon size={16} strokeWidth={1.5} style={{ color: "rgba(201,169,110,0.85)" }} />
      <span
        className="flex-1"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 17,
          color: active ? "#7A1F1F" : "#0A0A0A",
          lineHeight: 1.2,
        }}
      >
        {item.label}
      </span>
      <span
        style={{
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(10,10,10,0.5)",
        }}
      >
        {item.count}
      </span>
    </button>
  );
};

export const RightRail = ({ zone, active, onSelect }: Props) => {
  return (
    <aside
      aria-label={`${zone.label} contents`}
      className="hidden lg:flex fixed top-0 right-0 z-30 flex-col"
      style={{
        width: "var(--rail-w-right)",
        height: "100vh",
        background: "#F4F1EC",
        borderLeft: "1px solid var(--lib-border)",
        paddingTop: "calc(var(--masthead-h) + 24px)",
        paddingBottom: 24,
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      {/* Header strip */}
      <div className="pb-4 mb-4" style={{ borderBottom: "1px solid var(--lib-border)" }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 12,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#C9A96E",
          }}
        >
          {zone.short}
        </div>
        <div
          className="mt-2"
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(10,10,10,0.5)",
          }}
        >
          {zone.totalCount} entries
        </div>
      </div>

      {/* List */}
      <nav className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {zone.subsections.map((item) => (
          <SubsectionCard
            key={item.slug}
            item={item}
            active={active === item.slug}
            onClick={() => onSelect?.(item.slug)}
          />
        ))}
      </nav>

      {/* Save a shelf */}
      <button
        type="button"
        className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 transition-all duration-200"
        style={{
          border: "1px dashed rgba(122,31,31,0.5)",
          borderRadius: 6,
          color: "#7A1F1F",
          background: "transparent",
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 11,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(122,31,31,0.06)";
          (e.currentTarget as HTMLButtonElement).style.borderStyle = "solid";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          (e.currentTarget as HTMLButtonElement).style.borderStyle = "dashed";
        }}
      >
        <Plus size={14} strokeWidth={1.5} /> Save a shelf
      </button>
    </aside>
  );
};

export default RightRail;