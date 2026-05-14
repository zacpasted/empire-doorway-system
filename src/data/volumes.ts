import type { VolumeData } from "@/components/library/Volume";
import type { ReadingContent } from "@/components/library/ReadingPanel";

// Curated archive — used both for the hero shelf and the catalogue.
// Bindings are deterministic (irregular middle band positions, 0..1).

const b = (...xs: number[]) => xs;

export type CatalogueEntry = {
  volume: VolumeData;
  category: "NOTES" | "CASES" | "PRINCIPLES" | "TRANSCRIPTS" | "ARTEFACTS";
  hero: boolean; // appears in the hero shelf
  pages: { heading?: string; body: string }[];
};

export const CATALOGUE: CatalogueEntry[] = [
  {
    volume: { id: "v1", number: "I", title: "On Saying Less", year: "2023", shade: 0, binding: b(0.28, 0.41, 0.62) },
    category: "PRINCIPLES",
    hero: true,
    pages: [
      {
        body:
          "We were taught, somewhere along the way, that clarity comes from saying more.\n\nIt does not. Clarity comes from removing every sentence that did not need to be there. The library was built on the leftover ones.",
      },
      {
        heading: "A note on restraint",
        body:
          "Restraint reads as authority. Authority reads as trust. Trust is the only durable currency in a relationship that has not yet started.",
      },
    ],
  },
  {
    volume: { id: "v2", number: "II", title: "The Soft Open", year: "2023", shade: 2, binding: b(0.22, 0.55, 0.78) },
    category: "CASES",
    hero: true,
    pages: [
      {
        body:
          "A practice in Antwerp opened without an opening. No press. No event. One letter, on paper, to forty patients.\n\nThree weeks later, fully booked through Q3.",
      },
      { heading: "What we learned", body: "When the room is the right size, the door does not need to be loud." },
    ],
  },
  {
    volume: { id: "v3", number: "III", title: "Field Notes — Mayfair", year: "2024", shade: 1, binding: b(0.31, 0.49, 0.66, 0.84) },
    category: "NOTES",
    hero: true,
    pages: [
      {
        body:
          "Walked the same hundred metres of Mount Street for an hour. Counted twelve practices. Two had any reason for me to remember them.\n\nThe other ten had paid a great deal not to be remembered.",
      },
    ],
  },
  {
    volume: { id: "v4", number: "IV", title: "Letters to a New Operator", year: "2024", shade: 3, binding: b(0.18, 0.38, 0.71) },
    category: "PRINCIPLES",
    hero: true,
    pages: [
      {
        body:
          "First — do not confuse output with movement. The week you produce the most is rarely the week the business moved most.\n\nSecond — protect the calendar before the inbox. The inbox is somebody else's plan for your time.",
      },
      {
        heading: "On hiring",
        body: "Hire one taste before you hire two hands. The hands will follow a taste. They will not follow a process.",
      },
    ],
  },
  {
    volume: { id: "v5", number: "V", title: "A Conversation in Lisbon", year: "2024", shade: 0, binding: b(0.25, 0.5, 0.74) },
    category: "TRANSCRIPTS",
    hero: true,
    pages: [
      {
        body:
          "— Why did you stop writing the newsletter?\n— Because I noticed I was writing it for the people who already agreed.\n— And the others?\n— The others find you when the work is good. Not before.",
      },
    ],
  },
  {
    volume: { id: "v6", number: "VI", title: "The Operator's Quiet", year: "2024", shade: 4, binding: b(0.3, 0.6, 0.82) },
    category: "PRINCIPLES",
    hero: true,
    pages: [
      {
        body:
          "There is a kind of silence good operators keep. Not secrecy. Not modesty. Just the absence of noise where noise was not required.\n\nThe quiet is the work.",
      },
    ],
  },
  {
    volume: { id: "v7", number: "VII", title: "Three Studios, One Brief", year: "2025", shade: 2, binding: b(0.21, 0.44, 0.69) },
    category: "CASES",
    hero: true,
    pages: [
      {
        body:
          "We commissioned the same brief from three studios. Same audience, same constraint, same fee. The brief is enclosed in the next pages, with each response.",
      },
    ],
  },
  {
    volume: { id: "v8", number: "VIII", title: "On Patience as a Strategy", year: "2025", shade: 1, binding: b(0.27, 0.53, 0.77) },
    category: "PRINCIPLES",
    hero: true,
    pages: [
      {
        body:
          "Most of what is sold as growth is the cost of having been impatient. Patience is not the absence of action. It is the absence of bad action.",
      },
    ],
  },
  {
    volume: { id: "v9", number: "IX", title: "Margin Notes — Q1", year: "2025", shade: 3, binding: b(0.19, 0.36, 0.58, 0.81) },
    category: "NOTES",
    hero: true,
    pages: [
      {
        body:
          "Margin notes from the first quarter. Loose. Some will be promoted to principles in time. Some will be quietly removed.",
      },
    ],
  },
  // Catalogue-only volumes (not in the hero shelf)
  {
    volume: { id: "v10", number: "X", title: "On Refusing Work", year: "2023", shade: 0, binding: b(0.3, 0.6) },
    category: "PRINCIPLES",
    hero: false,
    pages: [{ body: "The first piece of work the studio refused was the largest fee on the table that year. The second was the second largest." }],
  },
  {
    volume: { id: "v11", number: "XI", title: "An Index of Borrowed Ideas", year: "2024", shade: 2, binding: b(0.22, 0.44, 0.66, 0.88) },
    category: "ARTEFACTS",
    hero: false,
    pages: [{ body: "An honest index. Where the idea was found, who was carrying it, and what was changed." }],
  },
  {
    volume: { id: "v12", number: "XII", title: "Sunday with the Founder", year: "2024", shade: 4, binding: b(0.31, 0.55) },
    category: "TRANSCRIPTS",
    hero: false,
    pages: [{ body: "An unedited Sunday afternoon. Coffee, the studio, three questions." }],
  },
  {
    volume: { id: "v13", number: "XIII", title: "What the Brief Did Not Ask For", year: "2024", shade: 1, binding: b(0.29, 0.48, 0.71) },
    category: "CASES",
    hero: false,
    pages: [{ body: "Two cases where the answer was outside the brief. Both client conversations are reproduced." }],
  },
  {
    volume: { id: "v14", number: "XIV", title: "Walking the Long Room", year: "2024", shade: 3, binding: b(0.21, 0.42, 0.63) },
    category: "NOTES",
    hero: false,
    pages: [{ body: "Notes taken in the Long Room at Trinity, on a Tuesday in November. The room is what we keep returning to." }],
  },
  {
    volume: { id: "v15", number: "XV", title: "The Studio Constitution", year: "2025", shade: 0, binding: b(0.18, 0.39, 0.61, 0.82) },
    category: "ARTEFACTS",
    hero: false,
    pages: [{ body: "The original constitution, six pages, signed by the four founders the week the studio opened." }],
  },
  {
    volume: { id: "v16", number: "XVI", title: "An Hour with the Editor", year: "2025", shade: 2, binding: b(0.25, 0.5, 0.75) },
    category: "TRANSCRIPTS",
    hero: false,
    pages: [{ body: "Sixty minutes with the editor on cadence, line breaks, and what the silence between paragraphs is doing." }],
  },
  {
    volume: { id: "v17", number: "XVII", title: "On Drawing the Floorplan First", year: "2025", shade: 4, binding: b(0.3, 0.55, 0.78) },
    category: "PRINCIPLES",
    hero: false,
    pages: [{ body: "Architects draw the floorplan before they pick the chair. Most operators do the opposite." }],
  },
  {
    volume: { id: "v18", number: "XVIII", title: "Unsent Letters", year: "2025", shade: 1, binding: b(0.22, 0.44, 0.66) },
    category: "ARTEFACTS",
    hero: false,
    pages: [{ body: "Three letters that were written and not sent. They have been useful longer than the sent ones." }],
  },
];

export const HERO_VOLUMES: VolumeData[] = CATALOGUE.filter((c) => c.hero).map((c) => c.volume);

export const getReadingContent = (id: string): ReadingContent | null => {
  const e = CATALOGUE.find((c) => c.volume.id === id);
  if (!e) return null;
  return { volume: e.volume, category: e.category, pages: e.pages };
};

export const FILTERS: { key: "ALL" | CatalogueEntry["category"]; label: string }[] = [
  { key: "ALL", label: "ALL" },
  { key: "NOTES", label: "NOTES" },
  { key: "CASES", label: "CASES" },
  { key: "PRINCIPLES", label: "PRINCIPLES" },
  { key: "TRANSCRIPTS", label: "TRANSCRIPTS" },
  { key: "ARTEFACTS", label: "ARTEFACTS" },
];