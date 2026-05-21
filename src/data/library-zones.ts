import {
  BookOpen,
  Play,
  FileText,
  ShieldCheck,
  Armchair,
  LibraryBig,
  Home,
  type LucideIcon,
} from "lucide-react";
import corridorImg from "@/assets/library-v8-corridor.jpg";
import shelfImg from "@/assets/library-v8-shelfwall.jpg";
import deskNightImg from "@/assets/library-v8-desk-night.jpg";
import librarianDeskImg from "@/assets/library-v8-librarian-desk.jpg";
import keyholeImg from "@/assets/library-v9-keyhole.png";
import courtyardImg from "@/assets/library-v9-courtyard.webp";
import plaqueImg from "@/assets/library-v8-plaque.jpg";

export type ZoneSlug =
  | "atrium"
  | "stacks"
  | "cinema"
  | "periodicals"
  | "vault"
  | "reading-room"
  | "index"
  | "me";

export type Subsection = {
  slug: string;
  label: string;
  icon: LucideIcon;
  count: number | string;
};

export type ZoneDef = {
  slug: ZoneSlug;
  label: string;       // "The Stacks"
  short: string;       // "Stacks" — for hero label + rail tip
  path: string;
  icon: LucideIcon;
  subtitle: string;
  hero: string;
  totalCount: number | string;
  subsections: Subsection[];
};

export const ZONES: Record<ZoneSlug, ZoneDef> = {
  atrium: {
    slug: "atrium",
    label: "The Atrium",
    short: "Atrium",
    path: "/library",
    icon: Home,
    subtitle: "Where the room opens, and the proprietor sets the day.",
    hero: corridorImg,
    totalCount: "—",
    subsections: [],
  },
  stacks: {
    slug: "stacks",
    label: "The Stacks",
    short: "Stacks",
    path: "/library/stacks",
    icon: BookOpen,
    subtitle: "Where the working instruments live.",
    hero: shelfImg,
    totalCount: 57,
    subsections: [
      { slug: "frameworks", label: "Frameworks", icon: BookOpen, count: 14 },
      { slug: "scripts",    label: "Scripts",    icon: FileText, count: 22 },
      { slug: "playbooks",  label: "Playbooks",  icon: BookOpen, count: 9  },
      { slug: "decks",      label: "Decks",      icon: FileText, count: 8  },
      { slug: "tools",      label: "Tools",      icon: LibraryBig, count: 4  },
    ],
  },
  cinema: {
    slug: "cinema",
    label: "The Cinema",
    short: "Cinema",
    path: "/library/cinema",
    icon: Play,
    subtitle: "Recordings of the work, kept in the dark.",
    hero: deskNightImg,
    totalCount: 23,
    subsections: [
      { slug: "masterclasses", label: "Masterclasses", icon: Play, count: 8 },
      { slug: "talks",         label: "Talks",         icon: Play, count: 6 },
      { slug: "films",         label: "Films",         icon: Play, count: 5 },
      { slug: "teardowns",     label: "Teardowns",     icon: Play, count: 4 },
    ],
  },
  periodicals: {
    slug: "periodicals",
    label: "The Periodicals",
    short: "Periodicals",
    path: "/library/periodicals",
    icon: FileText,
    subtitle: "Letters from the desk, sent later.",
    hero: librarianDeskImg,
    totalCount: 38,
    subsections: [
      { slug: "essays",      label: "Essays",      icon: FileText, count: 12 },
      { slug: "dispatches",  label: "Dispatches",  icon: FileText, count: 14 },
      { slug: "interviews",  label: "Interviews",  icon: FileText, count: 7  },
      { slug: "case-notes",  label: "Case Notes",  icon: FileText, count: 5  },
    ],
  },
  vault: {
    slug: "vault",
    label: "The Vault",
    short: "Vault",
    path: "/library/vault",
    icon: ShieldCheck,
    subtitle: "Sealed pieces. Witnessed once, kept on record.",
    hero: keyholeImg,
    totalCount: 6,
    subsections: [
      { slug: "sealed-now",   label: "Sealed Now",    icon: ShieldCheck, count: 2 },
      { slug: "sealed-soon",  label: "Sealed Soon",   icon: ShieldCheck, count: 1 },
      { slug: "past",         label: "Past Releases", icon: ShieldCheck, count: 3 },
    ],
  },
  "reading-room": {
    slug: "reading-room",
    label: "The Reading Room",
    short: "Reading Room",
    path: "/library/reading-room",
    icon: Armchair,
    subtitle: "What you've taken down, and what you've kept.",
    hero: courtyardImg,
    totalCount: "—",
    subsections: [
      { slug: "checked-out", label: "Checked Out", icon: BookOpen, count: 0 },
      { slug: "saved",       label: "Saved",       icon: BookOpen, count: 0 },
      { slug: "history",     label: "History",     icon: BookOpen, count: 0 },
      { slug: "card",        label: "Your Card",   icon: Armchair, count: "—" },
    ],
  },
  index: {
    slug: "index",
    label: "The Index",
    short: "Index",
    path: "/library/index",
    icon: LibraryBig,
    subtitle: "Everything the building holds, in one card-catalogue.",
    hero: plaqueImg,
    totalCount: 124,
    subsections: [
      { slug: "type", label: "By Type", icon: LibraryBig, count: 5 },
      { slug: "date", label: "By Date", icon: LibraryBig, count: 3 },
      { slug: "tag",  label: "By Tag",  icon: LibraryBig, count: 18 },
      { slug: "zone", label: "By Zone", icon: LibraryBig, count: 6 },
    ],
  },
  me: {
    slug: "me",
    label: "Your Card",
    short: "Member",
    path: "/library/me",
    icon: Home,
    subtitle: "Kept on record. Show it at the door.",
    hero: courtyardImg,
    totalCount: "—",
    subsections: [],
  },
};

export const ZONE_ORDER: ZoneSlug[] = [
  "stacks",
  "cinema",
  "periodicals",
  "vault",
  "reading-room",
];
