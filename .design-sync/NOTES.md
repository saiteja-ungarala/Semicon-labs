# design-sync notes — @semiconlabs/web

## Repo shape

- **Not a component library.** This is a Vite marketing site with no `dist/`
  library entry, so the converter is pointed at a hand-written barrel,
  `.design-sync/entry.tsx`, via `--entry`. That barrel is the component list:
  adding a component to the sync means exporting it there AND adding it to
  `componentSrcMap`.
- Without `--entry` the build dies on
  `node_modules/@semiconlabs/web/package.json` — npm never self-installs a
  package into its own `node_modules`, and that is the path the dts step walks
  when no entry override is given.
- `buildCmd` is `node .design-sync/build-css.mjs`, not the app's `npm run
  build`. The app's build emits a hashed `dist/assets/index-*.css`; the script
  compiles Tailwind to the stable path `cfg.cssEntry` points at, scanning all
  of `src/` so every utility any synced component uses is emitted.

## Full build command

```sh
node .design-sync/build-css.mjs
node .ds-sync/package-build.mjs --config .design-sync/config.json \
  --node-modules ./node_modules --entry ./.design-sync/entry.tsx --out ./ds-bundle
PLAYWRIGHT_BROWSERS_PATH="$LOCALAPPDATA/ms-playwright" \
  node .ds-sync/package-validate.mjs ./ds-bundle
```

`--entry` is required on every run. Playwright needs
`PLAYWRIGHT_BROWSERS_PATH` on Windows — chromium lives under `%LOCALAPPDATA%`,
not `~/.cache`. Install playwright into `.ds-sync/`, matching the cached
chromium build (1243 at time of writing) or launch fails.

## Deliberate exclusions

- **Logo** — renders `<img src="/images/main-logo.png">`, an app-served path
  that does not exist in a design project, so its card was a broken image.
  Excluded via `componentSrcMap: {"Logo": null}`. To include it, the image has
  to ship in the bundle and the component needs a src prop.
- **SocialIcons** — exports an icon map, not a component.
- `CurriculumBits.tsx` exports five badge components rather than one; they are
  synced individually (ToolBadge, LabTypeBadge, DifficultyDots, LabMixBar,
  StatChip).

## Provider

`Button`, `PageHero` and `DomainCard` render react-router `<Link>`s and throw
outside a router. `.design-sync/router.tsx` supplies a `MemoryRouter` wrapper,
wired as `cfg.provider.component = "RouterShell"` and exported from the barrel.

## Known render warns

- `[FONT_REMOTE]` for Plus Jakarta Sans / JetBrains Mono / IBM Plex Mono /
  Caveat — expected. The app loads these from Google Fonts at runtime; the
  same `@import` is prepended to the compiled CSS by `build-css.mjs`, so
  designs get the real families. Nothing to fix.
- `tokens: 3 missing` — below threshold, non-blocking.

## Card overrides

`Modal` is `cardMode: single` at 900x620 (it renders open, so it needs the
room). `IndividualOffer`, `CorporateEnquiryForm` and `PageHero` are
`cardMode: column` — they are full-width page blocks and mispresent in a
multi-column grid cell.

## Scope

Synced for redesigning the Who We Serve sub-pages and the Physical Design
domain page: the UI primitives plus the marketing blocks those pages compose.
19 components, all with authored previews. Nothing is on the floor card.

## Re-sync risks

- **`entry.tsx` and `componentSrcMap` drift.** Neither is derived — a
  component added to the app appears in neither until someone adds it. A
  re-sync will silently sync the same 19.
- **`DomainCard` preview inlines a Domain object.** It is a copy of the shape
  in `src/data/curriculum.ts`; if that interface gains a required field the
  preview keeps compiling against the old shape until it doesn't. Same for the
  curriculum enum values in the badge previews.
- **Tailwind emits only what it sees.** `bg-blue-100` and `text-display-xl` are
  defined in `tailwind.config.ts` but absent from the compiled CSS because no
  source file uses them; both were cut from `conventions.md` for that reason.
  If a future component uses them they will appear, and the header can name
  them again. Always re-verify the class table against the fresh build.
- **Font families are remote.** If Google Fonts is unreachable, every design
  renders in a fallback; nothing in the pipeline will flag it.
