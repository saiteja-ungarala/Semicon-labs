# Semicon Labs — how to build with this design system

Marketing site for a VLSI cloud-labs platform. Light, near-white surfaces; one
electric indigo-blue brand colour; deep indigo-black text. Confident but
technical — mono type carries the engineering register.

## Wrapping

Components render **unwrapped**. There is no theme provider: every token is a
CSS custom property in the stylesheet, so a component styles itself as soon as
`styles.css` is loaded.

One exception: `Button`, `PageHero` and `DomainCard` render react-router
`<Link>`s and **throw outside a router**. An app already inside a `<Router>`
needs nothing extra; an isolated render needs one:

```jsx
import { MemoryRouter } from 'react-router-dom';
<MemoryRouter><Button to="/pricing">View Pricing</Button></MemoryRouter>
```

## Styling idiom: Tailwind utilities with a custom palette

Style your own layout glue with these utilities — **do not invent colour names**,
these are the palette:

| Family | Classes |
|---|---|
| Surfaces | `bg-void` `bg-void-2` `bg-panel` `bg-panel-raised` |
| Borders | `border-line` `border-line-strong` |
| Text | `text-ink` `text-ink-dim` `text-ink-faint` |
| Brand | `text-blue` `bg-blue` `bg-blue-50` `bg-blue-soft` `text-blue-400` `text-blue-600` `border-blue` |
| Accent | `text-sky` `bg-sky-soft` `text-navy` `bg-navy-soft` |
| Headings | `text-display-lg` `text-display-md` |
| Shadows | `shadow-card` `shadow-card-hover` `shadow-glow` `shadow-pill` |
| Type | `font-display` (Plus Jakarta Sans) `font-mono` (JetBrains Mono) |

Two project classes worth knowing:

- `text-gradient` — brand gradient clipped to text. Use on the second half of a
  heading: `<h2>VLSI Current Hiring <span className="text-gradient">1 Lakh+</span></h2>`
- `eyebrow` — small uppercase mono kicker above a heading.

Radii run large: `rounded-2xl` for cards, `rounded-full` for buttons and pills.

## Where the truth lives

- `_ds/<folder>/styles.css` and its `@import` closure — the full compiled
  utility set and every token. Read it before styling.
- `components/<group>/<Name>/<Name>.d.ts` — the prop contract.
- `components/<group>/<Name>/<Name>.prompt.md` — per-component usage.

## Composing a page

`Section` owns vertical rhythm and page width; `SectionHead` opens it. Alternate
`alt` between consecutive sections so the page reads as bands.

```jsx
<Section alt>
  <SectionHead
    eyebrow="the skills companies are hiring for — right now"
    title={<>VLSI Current Hiring <span className="text-gradient">1 Lakh+</span></>}
    lede="Real project challenges on industry EDA tools."
  />
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <Card interactive className="p-7">
      <Badge tone="blue">Enrolling</Badge>
      <h3 className="mt-3 text-xl font-bold text-ink">Physical Design</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-dim">
        Floorplan, place &amp; route and timing closure.
      </p>
    </Card>
  </div>
</Section>
```

`PageHero` is the top of a sub-page (breadcrumbs, eyebrow, title, lede).
`IndividualOffer` and `StarterPackCard` are the ₹499 pricing blocks — use them
whole rather than rebuilding pricing from cards.

The curriculum badges (`ToolBadge`, `LabTypeBadge`, `DifficultyDots`,
`LabMixBar`, `StatChip`) take fixed enums, not free text: vendors are
`CADENCE` / `SYNOPSYS` / `SIEMENS`; lab types `GOLDEN` / `BUGGY` / `EXERCISE` /
`GUIDED` / `CHALLENGE`; difficulty `BEGINNER` / `INTERMEDIATE` / `ADVANCED`.

## Not in this library

No `Logo` — the site's logo is an app-served image, so place your own brand mark.
No navigation or footer: those are app shell, not design-system parts.
