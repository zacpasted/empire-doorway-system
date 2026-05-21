type Pill = { id: string; label: string; count?: number | string };

type Props = {
  pills: Pill[];
  active?: string;
  onSelect?: (id: string) => void;
};

export const StatusPillRow = ({ pills, active, onSelect }: Props) => (
  <div className="w-full flex flex-wrap items-center gap-3 px-6 md:px-10 py-6">
    {pills.map((p) => (
      <button
        key={p.id}
        type="button"
        className="lib-pill"
        data-active={active === p.id || undefined}
        onClick={() => onSelect?.(p.id)}
      >
        <span>{p.label}</span>
        {p.count != null && (
          <span style={{ color: "rgba(10,10,10,0.45)" }}>· {p.count}</span>
        )}
      </button>
    ))}
  </div>
);

export default StatusPillRow;