# Dhika — Story Intelligence

A public, searchable, source-first archive for the **41 episode tabs** in the source Google Doc.

## Website

After Pages is enabled: **https://developer-fandom-rush.github.io/DHIKA_STORY/**

One-time setup: **[Repository Settings → Pages](https://github.com/developer-fandom-rush/DHIKA_STORY/settings/pages)** → **Build and deployment → Source → GitHub Actions**. A deployment workflow is included at `.github/workflows/pages.yml`. Pushes to `main` then publish automatically.

## What is in the UI?

- **Evidence Search:** Filter by one or two characters (including Dhika–Uncle and the combined Dhika–Twins alias), episode, text phrase, reference cue (dialogue / memory / thought / imagined / physical-scene words) and topic.
- **Episode Reader:** All 41 episodes with paragraph IDs, links to the source Google Doc and individual forum post URLs.
- **Relationship Atlas:** Counts candidate mentions and proximity-based references, then opens the original source evidence.
- **Export JSON:** Download filtered results including all matching raw paragraphs plus surrounding source context, or an entire episode.

## Source integrity

`data/corpus.json` stores **41 episodes, 55 source parts and 10,450 Google Docs paragraphs**. Its paragraphs retain exact extracted Google Docs text and document indices, including a small set of editorial canon notes in EP01. The archive is *not* a byte-identical copy of original forum HTML.

No AI-generated summaries or plot lines are inserted into the story source. Search classifications are **lexical/heuristic hints only**: a character name in the same or adjacent paragraph does *not* prove a physical encounter, consent, or a specific action; the UI labels these results as references to verify against text.

## Privacy

**This GitHub repository and GitHub Pages website are public.** Story source is shipped with the site and can be downloaded by visitors. Do not publish confidential text in this repository.

## Live-site smoke test

When the Pages workflow finishes, open the website and confirm that the 41-episode counter, Evidence Search, Episode Reader, Relationship Atlas, and raw-source JSON export load successfully. The source corpus is public because the repository is public.
