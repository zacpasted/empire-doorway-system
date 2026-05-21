## The PASTED Library — The Interior

Restructure `/library` from a single content grid into a **multi-zone architecture**: members enter an Atrium, then walk into wings (Stacks, Cinema, Periodicals, Vault, Reading Room) via a persistent masthead nav. Unity comes from typography, color, and the chapter-head pattern — not from a single tile template.

This is a large build. I'll ship it in 4 phases so you can review at each gate.

---

### Phase 1 — Foundation (shared chrome + design tokens)

**Goal:** every Library page renders with the same masthead, nav, footer, paper/grain treatment, and typography hierarchy.

1. **Tokens & fonts** (`src/index.css`, `tailwind.config.ts`)
   - Add Cormorant Garamond (italic, small-caps) to the font stack alongside Playfair Display, JetBrains Mono, DM Sans.
   - Lock the 5 type registers as utility classes: `.lib-wordmark`, `.lib-chapter`, `.lib-display`, `.lib-section`, `.lib-body`, `.lib-meta` (mono).
   - Add atmosphere utilities: `.lib-vignette`, `.lib-paper`, `.lib-grain`, `.lib-woodgrain` (Stacks floor), `.lib-wax` (Vault watermark).

2. **`<LibraryLayout>`** — new wrapper component
   - Renders `<Masthead>` (P monogram left, wordmark center in Cormorant italic small caps, member context right) + hairline + `<ZoneNav>` (mono caps row: ATRIUM · STACKS · CINEMA · PERIODICALS · VAULT · READING ROOM · INDEX, active in gold, hover gold underline draw L→R).
   - Persistent small monogram appears top-left after 240px scroll (oxblood disc, gold P, 40px).
   - Renders `<LibraryFooter>` (mono caps, embossed P at 30% opacity).
   - Background slot accepts `surface="bone" | "smoke" | "oxblood"` per zone.
   - The existing `<Masthead>` is rebuilt; the old single-page header is replaced.

3. **`<ChapterHead>`** — shared zone opener
   - Gold ornament dingbat → Cormorant italic 64px zone name → italic subtitle → short centered hairline.

4. **`<BellLine>`** — Cormorant italic line just under the chapter head announcing the most recent addition across the Library; auto-hides after 7 days based on the asset's `created_at`. Quill-on-paper type-in over 600ms on mount.

---

### Phase 2 — Routes + The Atrium (the arrival)

**Goal:** the new `/library` is The Atrium. Other zones exist as scaffolds that render the chapter head + a placeholder grid, so nav works end-to-end.

1. **Routes** (`src/App.tsx`)
   ```
   /library                → Atrium       (replaces current LibraryHome)
   /library/stacks         → Stacks       (port today's briefcase shelves)
   /library/cinema         → Cinema
   /library/periodicals    → Periodicals
   /library/vault          → Vault
   /library/me             → ReadingRoom
   /library/index          → IndexCatalogue
   /library/:slug          → AssetDetail  (unchanged)
   ```
   Keep all existing redirects.

2. **The Atrium** (`src/pages/library/Atrium.tsx`) — 5 blocks in order:
   - **Welcome** — `*Welcome back, {first_name}.*` Cormorant italic 56px, then mono kicker `THE LIBRARY IS FULLER THAN WHEN YOU LEFT.`
   - **The Counter** — two-column editorial spread (image left full-bleed to page edge, kicker `NOW ON THE COUNTER`, zone+type meta, Playfair title, two-sentence blurb, mono metadata, oxblood `TAKE IT WITH YOU` button). Driven by a new `featured_asset` flag (see schema note below).
   - **Just Arrived** — single row of 4–5 newest items across all zones, each rendered with the tile shape of its native zone.
   - **Currently in residence** — short editorial italic block (recent Reading Room dispatches / upcoming releases). Static copy first pass; sourced from a `library_dispatches` table later.
   - **The Dispatch** — single Cormorant italic centered line, 24px. Sourced from a `proprietor_dispatch` row (latest active).

3. **Member orientation block** — small standing block (Cormorant italic *Member № 0247*, mono meta `Joined May 2026 · Madrid`, mono oxblood `view your card →`). Rendered on Atrium + Reading Room only.

---

### Phase 3 — The wings

**Goal:** each zone has its own atmosphere and tile shape.

1. **The Stacks** (`/library/stacks`) — port the existing `<Shelf>` + `<BriefcaseCard>`. Add the 3% wood-grain floor texture along the bottom 200px. Group by section (Frameworks / Scripts / Playbooks / Decks / Tools) using existing `section` column.

2. **The Cinema** (`/library/cinema`) — new `<ScreeningTile>` (16:9, warm-graded still, open-triangle play glyph in gold lower-left, Playfair title, mono runtime + session label). Hover: still → 4s silent loop cross-fade (600ms). Darker `#1F1A17` surround beyond masthead.

3. **The Periodicals** (`/library/periodicals`) — new `<PeriodicalCard>` (typographic, cream on bone, Playfair title, Cormorant italic byline, large centered pull-quote, mono `ESSAY · 9 MIN READ · MAY 2026`). Optional quarter-width photo sidebar.

4. **The Vault** (`/library/vault`) — new `<VaultPiece>` (one-per-row, large oxblood card, wax-seal SVG corner, Cormorant italic title, mono countdown `SEALED UNTIL 14 JUNE` / `OPEN FOR 72 HOURS`). Deep oxblood field background + 4% wax-seal watermark. CTA verbs: *witness / attend / enter the room*.

5. **The Reading Room** (`/library/me`) — member's saved + checked-out items, rendered with the tile shape of each item's home zone, with an added mono line `CHECKED OUT 14 MAY` / `SAVED 22 MAY`. Slightly warmer/darker background. Link to `/card`.

6. **The Index** (`/library/index`) — searchable card catalogue table: case №, title, type, zone, date, small thumbnail. Mono throughout.

---

### Phase 4 — Motion + announcement plumbing

1. **Motion language** (locked across all tiles)
   - Tile hover: 4px translateY lift + gold hairline underline draw, 200ms ease-out, **no scale**.
   - Vault items: no hover state.
   - Zone transitions: 280ms cross-fade on route change.
   - Bell line: 600ms quill-on-paper type-in once on mount.
   - No parallax, no infinite scroll, no skeletons.

2. **Announcement system**
   - **The Counter** → `assets.is_on_counter` boolean + `counter_set_at` timestamp (manually curated; admin sets one at a time).
   - **Just Arrived** → query newest 4–5 by `created_at` across all zones.
   - **The Bell** → newest single asset within last 7 days; render Cormorant italic line under every zone's chapter head.

---

### Technical details

**Database (Phase 2 migration)** — additive only, no breaking changes:
- `ALTER TABLE assets ADD COLUMN zone TEXT` (values: `stacks` | `cinema` | `periodicals` | `vault`). Backfill all existing rows to `stacks`.
- `ALTER TABLE assets ADD COLUMN is_on_counter BOOLEAN DEFAULT FALSE`, `counter_set_at TIMESTAMPTZ`.
- `ALTER TABLE assets ADD COLUMN runtime_minutes INT` (Cinema), `read_minutes INT` (Periodicals), `seal_until TIMESTAMPTZ`, `open_for_hours INT` (Vault).
- New table `proprietor_dispatch (id, body TEXT, active BOOLEAN, created_at)` for the rotating dispatch line.
- RLS: read-only `SELECT` for authenticated members on `assets` (existing), same pattern for `proprietor_dispatch`.

**Files created**
- `src/components/library/LibraryLayout.tsx`, `ZoneNav.tsx`, `LibraryFooter.tsx`, `ChapterHead.tsx`, `BellLine.tsx`, `MemberOrientation.tsx`
- `src/components/library/ScreeningTile.tsx`, `PeriodicalCard.tsx`, `VaultPiece.tsx`
- `src/pages/library/Atrium.tsx`, `Stacks.tsx`, `Cinema.tsx`, `Periodicals.tsx`, `Vault.tsx`, `ReadingRoom.tsx`, `IndexCatalogue.tsx`

**Files modified**
- `src/App.tsx` (routes), `src/index.css` + `tailwind.config.ts` (tokens + fonts), `src/components/library/Masthead.tsx` (rebuilt as wordmark + member context), `src/pages/library/LibraryHome.tsx` (redirects to `Atrium.tsx` or is replaced).

**Out of scope this round** — admin UI for setting The Counter / writing dispatches (you can set values via DB until we add an admin screen); silent-loop hover assets for Cinema (placeholder still frames until video poster loops exist); real Vault content (scaffolding renders with sample copy).

---

### Review gates

I'll stop and show you the preview at the end of each phase so you can redirect before I build the next one. Phase 1 alone will visibly transform every Library page (new masthead, nav, footer, typography, paper/grain) — that's the biggest single-step shift in feel.

Confirm and I'll start with Phase 1.