# Society Wives — Unified React Reader (review branch)

This is the staged **React + TypeScript** replacement for the scattered Society Wives HTML pages. **Do not merge or publish without the author's approval.** The existing story files are not modified or deleted.

## Run

From this directory:

```bash
npm install
npm run test
npm run dev
npm run build
```

The Vite production base path is `/DHIKA_STORY/Society-Wives/`. The repository's Pages workflow (staged in this branch) copies original story content and then overlays `dist/` at that path on deployment **after PR merge**, preserving archived files and old URLs.

## Content resolution

- Home reads `../episode-01.json` (all 17 original scenes). The original source explicitly says **NOT APPROVED**; the UI labels that conflict rather than pretending final approval.
- Reading reads the six `../continuity-verbatim/episode-02/*.json` source archives, displaying complete `source_html_lines_exact` fragments, preserving per-scene review badges. Strict approved-only archives remain untouched. Missing prose is not invented.
- Characters reads `../character-directory.json`, displaying the canonical 5 leads + 102 supporting persons and Soniya's independent record.
- Gallery reads `src/data/gallery.json`, linking 27 GitHub image assets (including one losslessly extracted inline WebP) and 11 private Drive references. Private Drive images do not receive public thumbnails or permission changes.
- Planning reads the Jan1 Meenakshi scene/cutpoint and separate Jan2/Jan3 future outlines, with date and character collision checks.

All application links are hash-routed, so refreshes remain GitHub Pages-safe. Original source URLs and JSON stay available.

## Approval gate

1. Review the staged PR and content migration report.
2. Confirm EP01 approval status and contested EP02 scene statuses separately.
3. Only after author approval, merge the PR; the main Pages workflow will build/serve the unified UI while keeping existing legacy documents available.
4. Later, audit and redirect legacy routes only after content parity is verified.

No permissions, story prose, image binaries, or encounter JSON have been changed by this UI migration.
