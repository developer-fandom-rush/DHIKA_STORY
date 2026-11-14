# Society Wives — Repository Audit & Content Migration Map

Audit date: 2026-11-14  
Audited repository: `developer-fandom-rush/DHIKA_STORY`  
Base revision: `f111fa1a5d19cb45ca129be801b3c3d619c18a7d` (`main`)  
Change type: **non-destructive, draft PR only; not deployed**

## Audit summary

- Recursive Society-Wives tree on main: **100 tree entries** including directories.
- Episode 01: `episode-01.html` and `episode-01.json`; JSON contains **17** original scenes and explicitly says **NOT APPROVED**. The later `episode-catalog.json` calls it `PUBLISHED_SOURCE`. This is an **approval conflict**, not permission to rewrite the text. Home displays the existing source with a notice.
- Episode 02: `episode-02.html` plus six individual character verbatim JSON files under `continuity-verbatim/episode-02/`. **85** scene records; **67 unique source HTML fragments**. The 18 Taniya scenes and 18 Soniya scenes share identical HTML source; the new reader reuses one archive for those tabs. All original files remain untouched.
- Six stricter `continuity-verbatim/episode-02-APPROVED/` archives remain preserved. Strict approved-only evidence contains **22 perspective-scene records** (**21 distinct** after the Taniya/Soniya shared-source duplication). Published != individually approved for all scenes. The author's episode-window closure is not silently converted to blanket approval.
- Missing full published prose documented in source: **Meenakshi M09**, **Shreya SR03**; **Taniya/Soniya TS12–TS16** are not promoted from plans. These remain missing or planning-only.
- Character directory: **5 leads and 102 person records**, one canonical person ID per record. **Soniya** exists as a separate supporting profile and shares Taniya's household continuity. Family/Office/Society grouping uses actual `group` and relation records, not invented labels. `college-student` maps to the workplace/college category.
- Existing image folder: **26 stored asset files** on the original main branch, and **one unique embedded WebP** in the Episode 02 HTML (Shivani A03). The embedded image has been extracted byte-for-byte to a new asset on this draft branch, without changing the old HTML.
- A connected private Google Drive folder contains **10 Meenakshi EP02 scene images and one contact sheet**. One separate legacy M01 Drive thumbnail is also referenced in standalone HTML; its Drive metadata is **not shared**. These **11** source Drive images are link-only, without changing permissions.
- Planning: Meenakshi `episode-03-meenakshi-scene-01.json` is **2026-01-01 13:50–14:15** at the hospital, with four beats, ending at an intentional hard cut. Episode 04 starts at **14:15** without unwritten continuation. Another Meenakshi planning file is dated **2026-01-02**, with reserved M08 Senior Review. Shreya's `episode-03-shreya-plan.json` is dated **2026-01-03**. Ankita's pending Episode 03 file includes a date-review constraint and is not silently reassigned.
- Prior HTML readers, arc planner, character audit, relationship atlas, source manuscripts, old JSON, Drive links and legacy URLs are **preserved**.

## Migration map

| Resource | Original location | Story date | Source status | New destination | Action |
| --- | --- | --- | --- | --- | --- |
| Opening/prologue | `episode-01.json`, `episode-01.html` | Opening | Draft in JSON / published in catalog — conflict | Home | Render all 17 scene records; show conflict notice; leave source untouched |
| Episode 02 complete prose | `episode-02.html`, `continuity-verbatim/episode-02/*.json` | 2026-01-01 | Published archive with scene reviews | Episode Reading | Render exact HTML fragments under one reader, six character tabs and scene deep links |
| Strict approval evidence | `continuity-verbatim/episode-02-APPROVED/*.json` | 2026-01-01 | Approved-only subset | Read-only source preservation | Never promote other scenes implicitly |
| Five female leads, supporting cast | `character-directory.json` | Cross-episode | Working roster | Characters | Reuse source IDs and classifications; Soniya standalone |
| Full encounter evidence | `continuity-verbatim/episode-02/*.json`, indexes | 2026-01-01 | Mixed | Character → Encounter records | Link direct scene; expandable original JSON, no AI-only replacement |
| 26 original repository images | `assets/**/*.{png,jpg,svg}` | Various | Original assets | Image Gallery | Index once, preserve original files |
| Embedded Shivani A03 visualization | `episode-02.html` inline WebP | 2026-01-01 | Existing source illustration | `assets/shivani-a03-inline-original.webp` | Lossless extraction on PR branch |
| Private Meenakshi Drive set | Drive review folder + standalone M01 thumb | 2026-01-01 | Review / private | Image Gallery | Restricted original links only, no hotlink or permission change |
| Meenakshi EP03 Scene 01 | `episode-03-meenakshi-scene-01.json` | 2026-01-01, 13:50–14:15 | User-directed outline, no prose | Planning / canonical cut | Read four existing beats; do not create goodbye |
| Meenakshi EP04 marker | `episode-04-meenakshi-cutpoint.html` | 2026-01-01, 14:15 | Handoff only | Planning | Show marker, no invented scene |
| Meenakshi future day | `episode-03-meenakshi-plan.json` | 2026-01-02 | Proposal | Planning / global clock | Preserve M08 and future-day date |
| Shreya reserved scenes | `episode-03-shreya-plan.json` | 2026-01-03 | Proposal | Planning / global clock | Preserve date and status |
| Ankita pending scenes | `episode-03-ankita-pending.json` | Needs date review | Unapproved | Planning | Do not silently choose a date |
| Older separate UI | `index.html`, `episode-*.html`, `characters.html`, `arc-planner.html` | Mixed | Mixed | Legacy kept on disk | Keep URLs/files until verified and author approves retirement |

## New architecture

```text
Society-Wives/
├── ui/
│   ├── src/
│   │   ├── App.tsx            # Five primary destinations + Home icon
│   │   ├── Home.tsx           # Original Episode 01 JSON-driven prologue
│   │   ├── Reading.tsx        # Shared Episode 02 source reader
│   │   ├── Characters.tsx     # Canonical directory + encounter viewer
│   │   ├── Gallery.tsx        # One complete image manifest/gallery
│   │   ├── Planning.tsx       # Future outlines + global story clock
│   │   ├── data/gallery.json  # Source image manifest
│   │   ├── lib.ts             # Hash routing + read-only JSON fetching
│   │   └── styles.css
│   ├── tests/verify.mjs
│   ├── package.json
│   └── vite.config.ts
├── episode-01.json           # Unmodified source
├── episode-02.html           # Unmodified source
├── continuity-verbatim/      # Unmodified source
├── character-directory.json  # Unmodified source
├── assets/                   # Original assets + lossless embedded extraction
└── ...
```

A new PR-only check workflow compiles the application and verifies source integrity. The Pages workflow adjustment is staged **inside the feature branch**: on an eventual author-approved merge, it builds the UI then overlays the built files at `/DHIKA_STORY/Society-Wives/` while retaining legacy files. The existing `main` deployment is unchanged.

## Pending author decisions and parity checks

1. Confirm whether Episode 01's existing draft label is editorially superseded; currently it remains visible.
2. Reconcile the 46 unique published Episode 02 fragments that are not marked strict-approved in the repository (the UI does not silently upgrade them).
3. Decide whether to retain or redirect old public reader URLs **after** direct-route tests, character/encounter parity checks, and content comparison.
4. Review future-day travel and character timing. Automatic overlap detection checks direct time collisions only; travel-time feasibility still needs editorial review.
5. Private Drive links may be visited by authorized accounts only. Public image delivery requires explicit author action, not automatic permission changes.
6. The feature branch must remain **unmerged and unpublished** until the author approves the replacement.
