import { useEffect, useMemo, useRef, useState } from "react";
import { Volume, type VolumeData } from "@/components/library/Volume";
import { CursorCandle } from "@/components/library/CursorCandle";
import { DustMotes } from "@/components/library/DustMotes";
import { ReadingPanel, type ReadingContent } from "@/components/library/ReadingPanel";
import { CATALOGUE, HERO_VOLUMES, FILTERS, getReadingContent } from "@/data/volumes";

const NAV = [
  { label: "Partnership", href: "#" },
  { label: "Library", href: "/library", active: true },
  { label: "Studio", href: "#" },
  { label: "Experiences", href: "#" },
];

const LibraryHome = () => {
  const [reading, setReading] = useState<ReadingContent | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("ALL");
  const [hintVisible, setHintVisible] = useState(false);
  const shelfRef = useRef<HTMLDivElement>(null);
  const cursorX = useRef(0);
  const [, force] = useState(0);

  useEffect(() => { document.title = "The Library — PASTED"; }, []);
  useEffect(() => { const t = setTimeout(() => setHintVisible(true), 2000); return () => clearTimeout(t); }, []);

  // Track cursor X for candle proximity boost on volumes
  useEffect(() => {
    const onMove = (e: MouseEvent) => { cursorX.current = e.clientX; force((n) => (n + 1) % 1000); };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Keyboard navigation across hero shelf
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (reading) return;
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const idx = HERO_VOLUMES.findIndex((v) => v.id === hoveredId);
      const next = e.key === "ArrowRight" ? Math.min(HERO_VOLUMES.length - 1, idx + 1) : Math.max(0, idx - 1);
      if (next >= 0) setHoveredId(HERO_VOLUMES[Math.max(0, next)].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hoveredId, reading]);

  const openVolume = (v: VolumeData) => setReading(getReadingContent(v.id));

  const filteredCatalogue = useMemo(
    () => CATALOGUE.filter((c) => filter === "ALL" || c.category === filter),
    [filter],
  );

  // Compute candle proximity boost for each hero volume by element rect
  const proximity = (id: string): number => {
    const el = shelfRef.current?.querySelector<HTMLButtonElement>(`[data-volume-id="${id}"]`);
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const dist = Math.abs(cx - cursorX.current);
    return Math.max(0, 1 - dist / 220);
  };

  if (loading || !session) return <div className="min-h-screen bg-bone" />;

  return (
    <div className="min-h-screen bg-bone text-lib-charcoal">
      {/* 1. HEADER */}
      <header className="sticky top-0 z-50 bg-bone">
        <div className="max-w-[1400px] mx-auto px-8 h-14 flex items-center justify-between">
          <a href="/library" className="select-none" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 300, fontSize: 18, letterSpacing: "0.04em" }}>
            PASTED
          </a>
          <nav className="flex items-center gap-8">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="relative pb-1"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: n.active ? "#0A0A0A" : "rgba(10,10,10,0.55)",
                }}
              >
                {n.label}
                {n.active && <span className="absolute left-0 right-0 -bottom-0.5 h-px" style={{ background: "#C9A96E" }} />}
              </a>
            ))}
          </nav>
        </div>
        <div style={{ height: 1, background: "rgba(10,10,10,0.08)" }} />
      </header>

      {/* 2. HERO — THE READING ROOM */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#0A0A0A", color: "#F4F1EC", height: "100vh", minHeight: 720 }}
      >
        <CursorCandle />
        <DustMotes />

        {/* Title block */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 pt-20 md:pt-28">
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "#C9A96E" }}>
            VOLUME ARCHIVE / 2025
          </div>
          <h1
            className="mt-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 300, fontSize: "clamp(40px, 6vw, 64px)", lineHeight: 1.0, letterSpacing: "-0.02em" }}
          >
            The library.
          </h1>
          <h2
            className="mt-1"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(40px, 6vw, 64px)", lineHeight: 1.0, letterSpacing: "-0.02em", color: "rgba(244,241,236,0.85)" }}
          >
            What we know, written down<span style={{ color: "#C9A96E" }}>.</span>
          </h2>
        </div>

        {/* The shelf */}
        <div className="absolute left-0 right-0 z-10" style={{ bottom: 120 }}>
          <div
            ref={shelfRef}
            className="overflow-x-auto lib-shelf-scroll px-8 md:px-16"
            style={{ scrollSnapType: "none" }}
          >
            <div className="flex items-end gap-5 pb-6" style={{ minWidth: "max-content" }}>
              {HERO_VOLUMES.map((v, i) => {
                const isHovered = hoveredId === v.id;
                const lean = isHovered ? 0 : hoveredId
                  ? (HERO_VOLUMES.findIndex((x) => x.id === hoveredId) === i - 1
                      ? 1
                      : HERO_VOLUMES.findIndex((x) => x.id === hoveredId) === i + 1
                      ? -1
                      : 0)
                  : 0;
                return (
                  <Volume
                    key={v.id}
                    v={v}
                    active={false}
                    dimmed={false}
                    leanDir={lean as 0 | -1 | 1}
                    hovered={isHovered}
                    candleBoost={proximity(v.id)}
                    onHover={(vol) => setHoveredId(vol?.id ?? null)}
                    onClick={openVolume}
                  />
                );
              })}
            </div>
          </div>
          {/* Shelf line */}
          <div className="mx-8 md:mx-16" style={{ height: 1, background: "rgba(201,169,110,0.5)" }} />
        </div>

        {/* Hint */}
        <div
          className="absolute left-0 right-0 z-10 text-center"
          style={{
            bottom: 40,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "rgba(244,241,236,0.5)",
            opacity: hintVisible ? 1 : 0,
            transition: "opacity 1200ms ease",
          }}
        >
          USE ARROW KEYS, OR SCROLL.
        </div>
      </section>

      {/* 4. ETHOS */}
      <section className="bg-bone" style={{ paddingTop: 200, paddingBottom: 160 }}>
        <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "rgba(10,10,10,0.6)" }}>
            ON THE LIBRARY
          </div>
          <div className="col-span-12 md:col-span-7" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 300, fontSize: 28, lineHeight: 1.4, color: "#0A0A0A", letterSpacing: "-0.005em" }}>
            The library is not content. It is a record. We keep it so we do not have to explain ourselves twice.
          </div>
        </div>
      </section>

      {/* 5. CATALOGUE */}
      <section className="bg-bone pb-32">
        <div className="max-w-[1400px] mx-auto px-8">
          {/* Filter row */}
          <div className="flex items-center gap-8 border-b" style={{ borderColor: "rgba(10,10,10,0.12)", paddingBottom: 20, marginBottom: 28 }}>
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="relative pb-2"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  color: filter === f.key ? "#0A0A0A" : "rgba(10,10,10,0.5)",
                }}
              >
                {f.label}
                {filter === f.key && (
                  <span className="absolute left-0 right-0 -bottom-0.5 h-px" style={{ background: "#C9A96E" }} />
                )}
              </button>
            ))}
          </div>

          {/* Column headers */}
          <div
            className="grid items-center pb-3 mb-2 border-b"
            style={{
              gridTemplateColumns: "80px 1fr 100px 160px",
              borderColor: "rgba(201,169,110,0.55)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.2em",
              color: "#C9A96E",
            }}
          >
            <div>VOL.</div>
            <div>TITLE</div>
            <div>YEAR</div>
            <div>CATEGORY</div>
          </div>

          {/* Rows */}
          <div>
            {filteredCatalogue.map((c) => {
              const isOpen = reading?.volume.id === c.volume.id;
              return (
                <button
                  key={c.volume.id}
                  onClick={() => setReading(getReadingContent(c.volume.id))}
                  className="group grid items-center w-full text-left relative"
                  style={{
                    gridTemplateColumns: "80px 1fr 100px 160px",
                    padding: "20px 12px",
                    borderBottom: "1px solid rgba(10,10,10,0.06)",
                    transition: "background-color 300ms ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(10,10,10,0.04)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.18em", color: "#0A0A0A" }}>
                    {c.volume.number}
                  </div>
                  <div className="relative pr-8">
                    <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 300, fontSize: 22, color: "#0A0A0A", letterSpacing: "-0.005em" }}>
                      {c.volume.title}
                    </span>
                    <span
                      className="absolute left-0 -bottom-1 h-px transition-all duration-500"
                      style={{
                        background: "#C9A96E",
                        width: isOpen ? "100%" : 0,
                      }}
                    />
                    <span
                      className="absolute left-0 -bottom-1 h-px transition-all duration-500 group-hover:w-full"
                      style={{ background: "#C9A96E", width: 0 }}
                    />
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.18em", color: "rgba(10,10,10,0.7)" }}>
                    {c.volume.year}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.18em", color: "#C9A96E" }}>
                    {c.category}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. MEDIA WING */}
      <section className="relative overflow-hidden" style={{ background: "#0A0A0A" }}>
        <DustMotes />
        <div className="grid grid-cols-1 md:grid-cols-3">
          {[
            { label: "FILM 01 / OPENING THE ROOM", kind: "video" as const, src: "" },
            { label: "STILL 02 / THE LONG ROOM", kind: "image" as const, src: "" },
            { label: "MOTION 03 / SPINE STUDY", kind: "video" as const, src: "" },
          ].map((tile, i) => (
            <MediaTile key={i} {...tile} />
          ))}
        </div>
      </section>

      {/* Foot */}
      <footer className="bg-bone py-16">
        <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "rgba(10,10,10,0.55)" }}>
            THE PASTED LIBRARY — MMXXV
          </div>
          <button
            onClick={async () => { await supabase.auth.signOut(); navigate("/"); }}
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "rgba(10,10,10,0.55)" }}
            className="hover:text-lib-charcoal transition-colors"
          >
            SIGN OUT
          </button>
        </div>
      </footer>

      <ReadingPanel content={reading} onClose={() => setReading(null)} />
    </div>
  );
};

const MediaTile = ({ label, kind }: { label: string; kind: "video" | "image"; src: string }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="relative aspect-[4/3] overflow-hidden"
      style={{ background: "#15130F" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Placeholder visual: subtle warm gradient + grain */}
      <div
        className="absolute inset-0"
        style={{
          background: kind === "video"
            ? "radial-gradient(ellipse at 30% 40%, rgba(201,169,110,0.18) 0%, rgba(10,10,10,1) 65%)"
            : "radial-gradient(ellipse at 70% 60%, rgba(201,169,110,0.14) 0%, rgba(10,10,10,1) 65%)",
        }}
      />
      {/* Scrim */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(10,10,10,0.30)",
          opacity: hover ? 0.33 : 1,
          transition: "opacity 700ms ease",
        }}
      />
      {/* Caption */}
      <div
        className="absolute left-6 bottom-6"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.22em",
          color: "rgba(244,241,236,0.85)",
          opacity: hover ? 1 : 0.6,
          transition: "opacity 600ms ease",
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default LibraryHome;