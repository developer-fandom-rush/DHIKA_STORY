# Society Wives — GPT GitHub Change Log

> **Changed by GPT** — Created 2026-11-20 at the author's explicit request.
>
> Purpose: Make GPT-applied repository changes conspicuous, reviewable, and distinguishable from author-written material, Grok-written material, and merely proposed edits.

## Author lock

- **Episode 02: APPROVED / FROZEN.**
- **Episode 03: APPROVED / FROZEN.**
- Do not edit, reformat, merge, overwrite, reinterpret, retime, republish, or change approval statuses for either episode unless the author expressly requests and approves a specific change.
- This log does **not** assert that any earlier unauthorized change occurred. Suspected earlier alterations must be verified by comparing source files and Git history, then reviewed with the author before any corrective write.

## Required notation for future GPT-applied GitHub changes

Use the exact label **Changed by GPT** in the Git commit message AND add a dated entry below. Each entry must identify:
- affected repository path(s);
- whether text originated from the author, Grok, or GPT, and whether GPT only integrated it;
- what changed and why, including approval/status;
- Git commit link/SHA when available (or a pointer to the named commit).

**Do not insert this label into the story's narrative prose.** Use this change log and suitable metadata/comments instead. Discussion-only proposals are not repository changes and must not be logged as applied edits.

## Entries

### 2026-11-20 — Changed by GPT — Provenance rule established
- **Affected paths:** `Society-Wives/GPT-CHANGE-LOG.md` (created); `Society-Wives/WRITING-COLLABORATION-PROTOCOL.md` (policy appendix added).
- **Source of change:** Author requested permanent visible identification of future GPT-applied GitHub changes and froze Episodes 02 and 03. GPT implemented the supporting documentation.
- **Approval:** Author explicitly requested this rule; no story-text modification was authorized or performed.
- **Story content:** None changed. Episodes 02 and 03 left untouched.
- **Commits:** Locate the commits beginning `Changed by GPT:` in Git history for these two documentation files.


### 2026-11-20 — Changed by GPT — Sunday Ankita–twins idea deferred
- **Affected path:** `Society-Wives/ANKITA-SUNDAY-KARAN-AMAN-PARTY-FUTURE-PROPOSAL.md` (created; proposal only).
- **Source attribution:** `Author-provided` idea and potential working title; `GPT integration only` for organizing the alternatives and editorial pacing recommendation.
- **What and why:** Preserved a possible Sunday, 2026-01-04, card-night/party with Karan, Aman and Ankita for future discussion instead of forcing another accident into Episode 04A on January 1. Kabir's possible late return is not fixed as Sunday canon.
- **Approval/status:** Author requested saving this future idea conditionally. Story encounter, physical details, and Sunday slot all remain **NOT APPROVED PROSE / PROPOSAL ONLY**.
- **Episodes 02–03:** No modifications.
- **Commit:** `b57ad2cb72f3fb55e8fb9064fbd9a1944c2a5cbf` — https://github.com/developer-fandom-rush/DHIKA_STORY/commit/b57ad2cb72f3fb55e8fb9064fbd9a1944c2a5cbf


### 2026-11-20 — Changed by GPT — Publish Ankita EP04A final tab, visuals, and future-planning UI

- **Source:** Author-shared Google Docs manuscript `1zcFlF9rWeIzaenBEmatt4K8bw3L-LcH3c_45JwoNM3o`, specifically tab `FINAL EP_04.`, ID `t.q9uiye5366b7`. **Author-provided text**, not GPT-authored prose.
- **Story source created:** `Society-Wives/episode-04a-ankita-final-source.json` (verbatim source paragraphs and 7 Google Docs image object IDs), commit `38d171affcdde43582f82e430c7a4e778d9c631f`.
- **Story reader created:** `Society-Wives/episode-04a-ankita-final.html`, commit `6e3aa9d7e23264cb80b99323281827154f550fea`. GPT integrated the author-supplied text with scene-positioned visuals; any scene headings/captions are UI-only. Original source tab has 7 embedded images; reader uses 9 existing conversation images (4 placed in story; 5 additional / older variants in gallery). The byte-for-byte identity of each source embedded image versus the matched conversation image has NOT been verified.
- **Images committed:** nine display-size JPG files in `Society-Wives/assets/episode-04a-ankita/`, binary-blob commit `b5fe3bde49a3331cdf78b8999aa11433f1b4ce46`; manifest `Society-Wives/assets/episode-04a-ankita/image-manifest.json` commit `37134c27de7c9fd477b2af73dd9c92f473bcefbf`.
- **Drive originals:** folder `https://drive.google.com/drive/folders/1QhoIMjpfq71WDc_JKLSQfS1Die2pVZv4`; nine display copies and 22 original local image versions, including incorrect variants, in ZIP `https://drive.google.com/file/d/15cLKMblD98qG1Zb6ZF4mg3r8YDey-Qp8/view`.
- **Future ideas:** `Society-Wives/future-ideas.json` (commit `1e824562eecc1efd64c39c5ac9b49d9df9b6f124`) and `Society-Wives/future-ideas.html` (commit `8f0f4094fad0c6d9d50c50be269ab10e5f59ccb9`) list author-originated "Sexcapades with Karan and Aman" Sunday card-night concept. It is IDEA ONLY, **not** approved prose or a locked Sunday event.
- **Main navigation:** A preliminary direct edit to generated `Society-Wives/index.html` (commit `28f367e5df1d1e4c4ca843df9ae5fc8b8191bbce`) was overwritten by the site's auto-build. Source-level navigation was then correctly updated in `Society-Wives/ui/src/App.tsx` (commit `d16c52a1aba93be7822a4257b83b7234138e85d9`) and `Society-Wives/ui/src/Planning.tsx` (commit `3d73f22da4f06dd0e270d47be648a3598c158277`), so the generated UI retains links.
- **Workflow handoff:** `Society-Wives/EP04A-MULTI-LEAD-CHAT-HANDOFF-PROMPT.md`, commit `04bdeb07cb5891b068276b2548b0be50f4112d83`, has a shared multi-lead prompt requiring the author to select the woman before discussing scenes.
- **Unresolved image identity:** The author mentioned two distinct "Dhika images" for Dhika's original EP04, but their specific IDs/filenames have not been verified. Do not pretend those separate Dhika images were embedded in the original Dhika storyline. The two new water-filter images belong to **Ankita A03/A04**, and are placed in Ankita's Episode 04A.
- **Approval/freeze:** User explicitly instructed to publish the author-shared FINAL tab and record the future idea; this does not automatically approve the other leads' EP04A plots. No edits to Episodes 02 or 03 or to original Dhika episode text.


### 2026-11-20 — Changed by GPT — Correct unauthorized navigation architecture

- **Reason:** Author explicitly objected to GPT adding standalone Ankita EP04A and Future Ideas links to the global navigation. This was an unauthorized UI architecture choice and is now corrected; future UI architecture ideas must be explicitly identified as **UI IDEAS / PROPOSALS** and discussed before implementation.
- **Change 1:** `Society-Wives/ui/src/App.tsx` — removed GPT-added top-level `Ankita EP04A` and `Future Ideas Before Planning` links; original global navigation (`Read Story`, `Episode 04 Plot`) retained. Commit `0422570c333eacdfe0999dc64ccde3a852b0cc73`.
- **Change 2:** `Society-Wives/ui/src/Planning.tsx` — placed the author-provided Ankita EP04A manuscript-with-images link **inside Ankita's Episode 04A Planning view only**; no final-episodes reader promotion. Future Ideas remains referenced from the planning area, as author previously requested. Commit `36a366c3d352d269db1ed1103f9d0185e831e15d`.
- **Files retained:** `episode-04a-ankita-final.html` is a source-hosted working manuscript; this correction changes its navigation, **not the author's text or archived images**.
- **Approval/source:** Explicit author correction; GPT integration only.
- **Unaffected:** Episodes 02–03 (approved/frozen), all story texts, prior scene status, the 04B unapproved planning sources.
