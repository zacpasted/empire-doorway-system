import type { ReadingContent } from "@/components/library/ReadingPanel";

// ============================================================================
// THE BOOKSHELF — distributed catalogue of physical volumes.
// Each book is a real volume with binding, spine colour, height, width, lean.
// Some books carry full reading content (the "live" volumes); the rest are
// scenery — the working library around them. All are rendered on the shelf.
// ============================================================================

export type BindingType = "leather" | "half" | "cloth" | "vellum";

// Extended palette — used INSIDE the shelf only (never in chrome).
export const SPINE_COLORS = {
  oxblood: { base: "#4A1F1F", deep: "#2E1010", high: "#6E2E2E" },
  forest: { base: "#1F3A2E", deep: "#102217", high: "#2F5848" },
  midnight: { base: "#14213D", deep: "#0A1326", high: "#243763" },
  tan: { base: "#8B6F47", deep: "#5C4830", high: "#A88B62" },
  ivory: { base: "#D4C8B0", deep: "#A8997A", high: "#E8DEC6" },
  ink: { base: "#0F0F0F", deep: "#050505", high: "#1F1F1F" },
  cognac: { base: "#5A2F18", deep: "#3A1D0E", high: "#7A4528" },
  moss: { base: "#3A4A2A", deep: "#252F1A", high: "#56683E" },
} as const;
export type SpineKey = keyof typeof SPINE_COLORS;

export type Book = {
  id: string;
  vol: string;            // roman numeral or number e.g. "XII"
  title: string;
  year: string;
  category: "NOTES" | "CASES" | "PRINCIPLES" | "TRANSCRIPTS" | "ARTEFACTS";
  binding: BindingType;
  spine: SpineKey;
  heightPct: number;      // 80..100
  widthPx: number;        // 14..38
  leanDeg: number;        // -3..3, mostly 0
  pulled: boolean;        // pulled forward 3-5px
  shelfRow: 0 | 1 | 2 | 3 | 4;
  pages?: { heading?: string; body: string }[]; // when undefined, scenery only
};

// Per-shelf palette clusters — books on a shelf share a curated tonal family.
const SHELF_PALETTES: SpineKey[][] = [
  ["oxblood", "ink", "tan", "cognac", "ivory"],          // 0 — top
  ["midnight", "ink", "ivory", "tan"],                    // 1
  ["forest", "moss", "tan", "ivory", "ink"],              // 2 — middle
  ["oxblood", "cognac", "tan", "ink", "ivory"],           // 3
  ["midnight", "ink", "tan", "oxblood", "ivory"],         // 4 — bottom
];

const ROMAN = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX","XXI","XXII","XXIII","XXIV","XXV","XXVI","XXVII","XXVIII","XXIX","XXX","XXXI","XXXII","XXXIII","XXXIV","XXXV","XXXVI","XXXVII","XXXVIII","XXXIX","XL","XLI","XLII","XLIII","XLIV","XLV","XLVI","XLVII","XLVIII","XLIX","L","LI","LII","LIII","LIV","LV","LVI","LVII","LVIII","LIX","LX","LXI","LXII","LXIII","LXIV","LXV","LXVI","LXVII","LXVIII","LXIX","LXX","LXXI","LXXII","LXXIII","LXXIV","LXXV"];

// ----------------------------------------------------------------------------
// LIVE VOLUMES — the volumes that open into real reading content.
// Distributed naturally across the shelves.
// ----------------------------------------------------------------------------
const LIVE: Array<Omit<Book, "vol"> & { volIdx: number }> = [
  {
    volIdx: 0, id: "L01", title: "On Saying Less", year: "2023", category: "PRINCIPLES",
    binding: "leather", spine: "oxblood", heightPct: 96, widthPx: 30, leanDeg: 0, pulled: false, shelfRow: 0,
    pages: [
      { body: "We were taught, somewhere along the way, that clarity comes from saying more.\n\nIt does not. Clarity comes from removing every sentence that did not need to be there. The library was built on the leftover ones." },
      { heading: "A note on restraint", body: "Restraint reads as authority. Authority reads as trust. Trust is the only durable currency in a relationship that has not yet started." },
    ],
  },
  {
    volIdx: 1, id: "L02", title: "The Soft Open", year: "2023", category: "CASES",
    binding: "half", spine: "midnight", heightPct: 92, widthPx: 26, leanDeg: 0, pulled: true, shelfRow: 1,
    pages: [
      { body: "A practice in Antwerp opened without an opening. No press. No event. One letter, on paper, to forty patients.\n\nThree weeks later, fully booked through Q3." },
      { heading: "What we learned", body: "When the room is the right size, the door does not need to be loud." },
    ],
  },
  {
    volIdx: 2, id: "L03", title: "Field Notes — Mayfair", year: "2024", category: "NOTES",
    binding: "cloth", spine: "forest", heightPct: 88, widthPx: 22, leanDeg: 0, pulled: false, shelfRow: 2,
    pages: [{ body: "Walked the same hundred metres of Mount Street for an hour. Counted twelve practices. Two had any reason for me to remember them.\n\nThe other ten had paid a great deal not to be remembered." }],
  },
  {
    volIdx: 3, id: "L04", title: "Letters to a New Operator", year: "2024", category: "PRINCIPLES",
    binding: "leather", spine: "cognac", heightPct: 100, widthPx: 34, leanDeg: 0, pulled: false, shelfRow: 3,
    pages: [
      { body: "First — do not confuse output with movement. The week you produce the most is rarely the week the business moved most.\n\nSecond — protect the calendar before the inbox. The inbox is somebody else's plan for your time." },
      { heading: "On hiring", body: "Hire one taste before you hire two hands. The hands will follow a taste. They will not follow a process." },
    ],
  },
  {
    volIdx: 4, id: "L05", title: "A Conversation in Lisbon", year: "2024", category: "TRANSCRIPTS",
    binding: "vellum", spine: "ivory", heightPct: 84, widthPx: 18, leanDeg: 0, pulled: false, shelfRow: 4,
    pages: [{ body: "— Why did you stop writing the newsletter?\n— Because I noticed I was writing it for the people who already agreed.\n— And the others?\n— The others find you when the work is good. Not before." }],
  },
  {
    volIdx: 5, id: "L06", title: "The Operator's Quiet", year: "2024", category: "PRINCIPLES",
    binding: "leather", spine: "ink", heightPct: 94, widthPx: 28, leanDeg: 2, pulled: false, shelfRow: 0,
    pages: [{ body: "There is a kind of silence good operators keep. Not secrecy. Not modesty. Just the absence of noise where noise was not required.\n\nThe quiet is the work." }],
  },
  {
    volIdx: 6, id: "L07", title: "Three Studios, One Brief", year: "2025", category: "CASES",
    binding: "half", spine: "tan", heightPct: 90, widthPx: 24, leanDeg: 0, pulled: false, shelfRow: 2,
    pages: [{ body: "We commissioned the same brief from three studios. Same audience, same constraint, same fee. The brief is enclosed in the next pages, with each response." }],
  },
  {
    volIdx: 7, id: "L08", title: "On Patience as a Strategy", year: "2025", category: "PRINCIPLES",
    binding: "leather", spine: "midnight", heightPct: 98, widthPx: 32, leanDeg: 0, pulled: true, shelfRow: 3,
    pages: [{ body: "Most of what is sold as growth is the cost of having been impatient. Patience is not the absence of action. It is the absence of bad action." }],
  },
  {
    volIdx: 8, id: "L09", title: "Margin Notes — Q1", year: "2025", category: "NOTES",
    binding: "cloth", spine: "moss", heightPct: 86, widthPx: 20, leanDeg: 0, pulled: false, shelfRow: 1,
    pages: [{ body: "Margin notes from the first quarter. Loose. Some will be promoted to principles in time. Some will be quietly removed." }],
  },
  {
    volIdx: 9, id: "L10", title: "On Refusing Work", year: "2023", category: "PRINCIPLES",
    binding: "leather", spine: "oxblood", heightPct: 92, widthPx: 26, leanDeg: 0, pulled: false, shelfRow: 4,
    pages: [{ body: "The first piece of work the studio refused was the largest fee on the table that year. The second was the second largest." }],
  },
  {
    volIdx: 10, id: "L11", title: "An Index of Borrowed Ideas", year: "2024", category: "ARTEFACTS",
    binding: "vellum", spine: "ivory", heightPct: 82, widthPx: 16, leanDeg: -2, pulled: false, shelfRow: 2,
    pages: [{ body: "An honest index. Where the idea was found, who was carrying it, and what was changed." }],
  },
  {
    volIdx: 11, id: "L12", title: "Sunday with the Founder", year: "2024", category: "TRANSCRIPTS",
    binding: "cloth", spine: "tan", heightPct: 88, widthPx: 22, leanDeg: 0, pulled: false, shelfRow: 0,
    pages: [{ body: "An unedited Sunday afternoon. Coffee, the studio, three questions." }],
  },
  {
    volIdx: 12, id: "L13", title: "What the Brief Did Not Ask For", year: "2024", category: "CASES",
    binding: "half", spine: "cognac", heightPct: 94, widthPx: 28, leanDeg: 0, pulled: false, shelfRow: 1,
    pages: [{ body: "Two cases where the answer was outside the brief. Both client conversations are reproduced." }],
  },
  {
    volIdx: 13, id: "L14", title: "Walking the Long Room", year: "2024", category: "NOTES",
    binding: "leather", spine: "forest", heightPct: 96, widthPx: 30, leanDeg: 0, pulled: false, shelfRow: 3,
    pages: [{ body: "Notes taken in the Long Room at Trinity, on a Tuesday in November. The room is what we keep returning to." }],
  },
  {
    volIdx: 14, id: "L15", title: "The Studio Constitution", year: "2025", category: "ARTEFACTS",
    binding: "leather", spine: "oxblood", heightPct: 100, widthPx: 36, leanDeg: 0, pulled: false, shelfRow: 4,
    pages: [{ body: "The original constitution, six pages, signed by the four founders the week the studio opened." }],
  },
  {
    volIdx: 15, id: "L16", title: "An Hour with the Editor", year: "2025", category: "TRANSCRIPTS",
    binding: "cloth", spine: "midnight", heightPct: 86, widthPx: 20, leanDeg: 0, pulled: false, shelfRow: 0,
    pages: [{ body: "Sixty minutes with the editor on cadence, line breaks, and what the silence between paragraphs is doing." }],
  },
  {
    volIdx: 16, id: "L17", title: "On Drawing the Floorplan First", year: "2025", category: "PRINCIPLES",
    binding: "vellum", spine: "ivory", heightPct: 84, widthPx: 18, leanDeg: 0, pulled: false, shelfRow: 2,
    pages: [{ body: "Architects draw the floorplan before they pick the chair. Most operators do the opposite." }],
  },
  {
    volIdx: 17, id: "L18", title: "Unsent Letters", year: "2025", category: "ARTEFACTS",
    binding: "half", spine: "ink", heightPct: 90, widthPx: 24, leanDeg: 0, pulled: false, shelfRow: 4,
    pages: [{ body: "Three letters that were written and not sent. They have been useful longer than the sent ones." }],
  },
];

// ----------------------------------------------------------------------------
// SCENERY VOLUMES — flesh out each shelf to ~14-16 books with plausible titles.
// Generated deterministically from a fixed list (no random per-render).
// ----------------------------------------------------------------------------
const SCENERY_TITLES: Array<{ title: string; year: string; cat: Book["category"] }> = [
  { title: "Quiet Practice", year: "2022", cat: "PRINCIPLES" },
  { title: "Drafts, Volume One", year: "2022", cat: "ARTEFACTS" },
  { title: "Notes from a Long Lunch", year: "2023", cat: "TRANSCRIPTS" },
  { title: "On the First Hire", year: "2023", cat: "PRINCIPLES" },
  { title: "A Brief History of Pricing", year: "2023", cat: "NOTES" },
  { title: "Six Conversations", year: "2023", cat: "TRANSCRIPTS" },
  { title: "The Smaller Room", year: "2023", cat: "CASES" },
  { title: "On Reading Aloud", year: "2024", cat: "PRINCIPLES" },
  { title: "Memoranda", year: "2024", cat: "ARTEFACTS" },
  { title: "Walking Notes", year: "2024", cat: "NOTES" },
  { title: "On Slow Decisions", year: "2024", cat: "PRINCIPLES" },
  { title: "Antwerp Diary", year: "2024", cat: "NOTES" },
  { title: "The Quiet Door", year: "2024", cat: "CASES" },
  { title: "Bound Reports", year: "2024", cat: "ARTEFACTS" },
  { title: "Two Hours with a Printer", year: "2024", cat: "TRANSCRIPTS" },
  { title: "On Margins", year: "2024", cat: "NOTES" },
  { title: "A Letter to the Studio", year: "2024", cat: "ARTEFACTS" },
  { title: "Drafts, Volume Two", year: "2024", cat: "ARTEFACTS" },
  { title: "Tea with the Architect", year: "2024", cat: "TRANSCRIPTS" },
  { title: "On Owning the Calendar", year: "2024", cat: "PRINCIPLES" },
  { title: "An Edition of Refusals", year: "2024", cat: "ARTEFACTS" },
  { title: "Late Pages", year: "2025", cat: "NOTES" },
  { title: "On the Second Founding", year: "2025", cat: "PRINCIPLES" },
  { title: "A Quarter in Review", year: "2025", cat: "NOTES" },
  { title: "Postscripts", year: "2025", cat: "ARTEFACTS" },
  { title: "On Drawing Down Work", year: "2025", cat: "PRINCIPLES" },
  { title: "The Belgian Notebook", year: "2025", cat: "NOTES" },
  { title: "Two Reviewers", year: "2025", cat: "TRANSCRIPTS" },
  { title: "On Writing the Door", year: "2025", cat: "PRINCIPLES" },
  { title: "A Reading List", year: "2025", cat: "ARTEFACTS" },
  { title: "Notes Toward a Manual", year: "2025", cat: "PRINCIPLES" },
  { title: "On Repeating Yourself", year: "2025", cat: "NOTES" },
  { title: "A Long Walk", year: "2025", cat: "TRANSCRIPTS" },
  { title: "Drafts, Volume Three", year: "2025", cat: "ARTEFACTS" },
  { title: "On the Last Page", year: "2025", cat: "PRINCIPLES" },
  { title: "An Index of Quiet", year: "2025", cat: "ARTEFACTS" },
  { title: "Field Notes — Lisbon", year: "2025", cat: "NOTES" },
  { title: "Three Cases, No Names", year: "2025", cat: "CASES" },
  { title: "On Holding the Line", year: "2025", cat: "PRINCIPLES" },
  { title: "A Memoir of Decisions", year: "2025", cat: "TRANSCRIPTS" },
  { title: "Endpapers", year: "2025", cat: "ARTEFACTS" },
  { title: "Footnotes", year: "2025", cat: "NOTES" },
  { title: "On Ending Engagements", year: "2025", cat: "PRINCIPLES" },
  { title: "The Other Notebook", year: "2025", cat: "ARTEFACTS" },
  { title: "On Quiet Years", year: "2025", cat: "PRINCIPLES" },
  { title: "An Apology, Bound", year: "2025", cat: "ARTEFACTS" },
  { title: "Three Letters Returned", year: "2025", cat: "TRANSCRIPTS" },
  { title: "On the Shelf", year: "2025", cat: "PRINCIPLES" },
  { title: "Salt and Paper", year: "2025", cat: "NOTES" },
  { title: "On Two Studios", year: "2025", cat: "CASES" },
  { title: "Closing Notes", year: "2025", cat: "PRINCIPLES" },
  { title: "An Inventory", year: "2025", cat: "ARTEFACTS" },
  { title: "On a Single Reader", year: "2025", cat: "PRINCIPLES" },
  { title: "Marginalia", year: "2025", cat: "NOTES" },
  { title: "A Note on Cadence", year: "2025", cat: "PRINCIPLES" },
  { title: "Late Letters", year: "2025", cat: "TRANSCRIPTS" },
  { title: "On the Closed Door", year: "2025", cat: "PRINCIPLES" },
  { title: "Drafts of a Door", year: "2025", cat: "ARTEFACTS" },
];

// Deterministic spread of binding/height/width across scenery
const seed = (s: string) => {
  let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};
const pick = <T,>(arr: T[], k: number) => arr[k % arr.length];
const BINDINGS: BindingType[] = ["leather", "leather", "half", "cloth", "cloth", "vellum"];

const buildBooks = (): Book[] => {
  const live: Book[] = LIVE.map((l) => ({
    ...l, vol: ROMAN[l.volIdx],
  }));

  // Distribute scenery so each shelf totals ~15
  const TARGET_PER_SHELF = 15;
  const liveByRow = [0,1,2,3,4].map((r) => live.filter((b) => b.shelfRow === r).length);
  const scenery: Book[] = [];
  let sIdx = 0;
  let volCounter = LIVE.length;

  for (let row = 0; row < 5; row++) {
    const need = TARGET_PER_SHELF - liveByRow[row];
    const palette = SHELF_PALETTES[row];
    for (let i = 0; i < need; i++) {
      const t = SCENERY_TITLES[sIdx++ % SCENERY_TITLES.length];
      const sd = seed(t.title + row + i);
      const binding = pick(BINDINGS, sd);
      const spine = pick(palette as SpineKey[], sd >> 3);
      const h = 80 + ((sd >> 5) % 21);            // 80..100
      const w = 14 + ((sd >> 7) % 25);            // 14..38
      const lean = ((sd >> 11) % 17 === 0) ? ((sd >> 13) % 2 === 0 ? 2 : -2) : 0;
      const pulled = ((sd >> 9) % 23 === 0);
      scenery.push({
        id: `S${row}-${i}`,
        vol: ROMAN[volCounter++] ?? String(volCounter),
        title: t.title,
        year: t.year,
        category: t.cat,
        binding,
        spine,
        heightPct: h,
        widthPx: w,
        leanDeg: lean,
        pulled,
        shelfRow: row as 0|1|2|3|4,
      });
    }
  }

  return [...live, ...scenery];
};

export const BOOKS: Book[] = buildBooks();

// Books grouped by shelf (preserves visual order — live first, then scenery
// of that row, gently interleaved so live volumes are not all clustered left).
export const BOOKS_BY_SHELF: Book[][] = (() => {
  const rows: Book[][] = [[], [], [], [], []];
  for (const b of BOOKS) rows[b.shelfRow].push(b);
  // Interleave by sorting on a stable hash
  return rows.map((row) => {
    return row.slice().sort((a, b) => seed(a.id + "k") - seed(b.id + "k"));
  });
})();

export const getReadingFor = (id: string): ReadingContent | null => {
  const b = BOOKS.find((x) => x.id === id);
  if (!b || !b.pages) return null;
  return {
    volume: { id: b.id, number: b.vol, title: b.title, year: b.year, shade: 0, binding: [] },
    category: b.category,
    pages: b.pages,
  };
};

export const FILTERS: { key: "ALL" | Book["category"]; label: string }[] = [
  { key: "ALL", label: "ALL" },
  { key: "NOTES", label: "NOTES" },
  { key: "CASES", label: "CASES" },
  { key: "PRINCIPLES", label: "PRINCIPLES" },
  { key: "TRANSCRIPTS", label: "TRANSCRIPTS" },
  { key: "ARTEFACTS", label: "ARTEFACTS" },
];