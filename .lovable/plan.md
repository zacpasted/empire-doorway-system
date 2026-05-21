# Library Chrome v2 — Implementation Plan

A persistent, dashboard-style frame that wraps every `/library/*` zone. Architecture from v1 stands; we are adding chrome.

---

## Scope

Pages affected:
- `/library` (Atrium — full canvas, no right rail)
- `/library/stacks`, `/library/cinema`, `/library/periodicals`, `/library/vault`, `/library/reading-room`, `/library/index`
- `/card` → folds into `/library/me` (member zone) inside the chrome
- `/library/asset/:id` (detail still inside chrome)

Out of scope: the cinematic `/library` corridor entry (kept as the Atrium hero treatment), v1 zone content, database schema.

---

## Phase 1 — Frame primitives

New components under `src/components/library/chrome/`:

- `LibraryShell.tsx` — three-column layout: `LeftRail | <main> | RightRail`. Props: `zone`, `subsections`, `hero`, `showRightRail` (default true; false on Atrium), `activeSubsection`. Handles responsive collapse (tablet → right rail becomes top drawer; mobile → both rails fold into a bottom sheet triggered from a masthead glyph).
- `Masthead.tsx` (rewrite existing) — slim 56px bone strip: empty left, centered Cormorant italic small-caps wordmark, right cluster (member name in mono gold + bell + monogram avatar). Hairline below. Horizontal `ZoneNav` removed.
- `LeftRail.tsx` — fixed 72px column. Stacks `RailIcon`s (P-monogram → divider → Stacks/Cinema/Periodicals/Vault/Reading Room → divider → Index → P-monogram member). Active state: oxblood icon + 3px gold left bar. Hover: tooltip slides in 8px right (200ms).
- `RailIcon.tsx` — accepts `icon` (Lucide or inline SVG), `to`, `label`, `active`. Renders monoline 22px charcoal glyph + tooltip.
- `RightRail.tsx` — 320px column. Header strip (zone name + metadata mono caps) → hairline → list of `SubsectionCard`s → `SaveShelfCard` at bottom.
- `SubsectionCard.tsx` — outlined rounded card (6px radius, 1px charcoal/12%), icon left, Playfair 18px name, mono count right. Active: warmer bone fill, gold border, oxblood name, oxblood 3px left bar.
- `SaveShelfCard.tsx` — oxblood-bordered dashed "+ SAVE A SHELF" mono caps button.
- `PhotoHero.tsx` — 16:6 full-width image, atmospheric treatment (slight grain, darken). Inset bottom-left label: `ZONE · • LIVE · COUNT` in mono uppercase gold; the `•` pulses 6% opacity over 2s.
- `StatusPillRow.tsx` — row of mono-caps outlined pills (`JUST ARRIVED · 3`, `ON THE COUNTER`, `FROM THE PROPRIETOR`). Click → filter callback.
- `ChapterHead.tsx` (exists) — keep, drop in below the pill row.
- `CardGrid.tsx` — flexible 12-col grid (`grid-cols-12 gap-6`). Children declare `cols={3|4|6|8|12}`.
- Card variants: `BriefcaseCard`, `BriefcaseFeaturedCard`, `ScreeningCard`, `PeriodicalCard`, `VaultCard`, `MemberCard` — all share base geometry (`LibraryCardShell`): bone bg + 4% paper texture, 1px charcoal/12% border, 6px radius, hover → gold/60 border + 4px lift, 200ms ease-out.

Tokens added to `index.css`:
- `--rail-w-left: 72px`, `--rail-w-right: 320px`, `--masthead-h: 56px`
- `--cream-warm: #EDE7DC` (active subsection fill)
- Utilities: `.lib-hero-live-dot` (pulse 2s), `.lib-card-shell` (paper bg + border + radius + lift hover), `.lib-pill` (outlined mono caps)
- Responsive: at `<lg`, hide right rail, mount it as a `Sheet`. At `<md`, hide left rail, mount both rails behind a masthead glyph.

---

## Phase 2 — Routes & zone wiring

- `src/App.tsx`: add `/library/stacks`, `/library/cinema`, `/library/periodicals`, `/library/vault`, `/library/reading-room`, `/library/index`, `/library/me`. Each renders a thin page component that calls `<LibraryShell zone="..." hero={...} subsections={...}>`.
- Subsection registry: a `src/data/library-zones.ts` const map keyed by zone slug, listing `{ slug, label, icon, count }` per subsection. Counts read from Supabase where available, otherwise placeholder 0.
- Atrium (`/library`) keeps the cinematic Corridor + Mark as its hero treatment, then transitions into the chrome (no right rail, full-width grid for The Counter / Just Arrived). The chrome's left rail and masthead overlay the cinematic hero (transparent on Atrium only).
- `/card` route: keep the URL working but render the same `MemberZonePage` used at `/library/me` (LibraryCard centered in the chrome).

---

## Phase 3 — Motion + polish

- Zone transitions sequenced via `framer-motion`: hero `opacity` 320ms → right rail `opacity + y:-4` 240ms → grid `opacity` 280ms. Driven by `location.pathname` key on `<AnimatePresence>`.
- Status pill click → grid filters in place with 200ms cross-fade (`AnimatePresence mode="wait"`).
- Counter featured card: 6% scale breathing 8s loop.
- Verify at 375px (mobile rail sheet), 768px (right rail drawer), 1280px+ (full three-column).
- Take screenshots of each zone post-implementation, confirm rails align, hero crops correctly, no horizontal scroll at 375px.

---

## Technical notes

- Icons: use Lucide where the glyph reads cleanly (`BookOpen` for Stacks, `Play` for Cinema, `FileText` for Periodicals, `LibraryBig` for Index, `Armchair` for Reading Room). Custom inline SVG for wax-seal and P-monogram (already in `Monogram.tsx`).
- Hero images: reuse existing `library-v8-*` and `library-v9-*` assets where possible; generate new ones (screening room, writing desk, sealed door, leather chair close-up) only if no existing asset fits.
- The legacy bone `LibraryLayout` is deprecated by `LibraryShell` and removed from `AssetDetail.tsx` / `Card.tsx` in Phase 2.
- No database changes in this brief — counts use whatever the asset table already exposes; missing zones show `—`.

---

## Confirm and I'll start with Phase 1.