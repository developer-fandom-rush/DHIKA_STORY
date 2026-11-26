# New Chat Handoff — Restore and Use Exact EP04B/EP05 Source Text

## Critical project rule
The original full content has ALREADY been copied to GitHub. **Never rewrite, summarize, backfill or silently overwrite these source snapshots.** A source snapshot's wording is author-approved as the immutable baseline for later plot decisions, while editorial status such as "working plan", "draft" and "prose pending" *inside the documents* remains exactly as written. Archive lock ≠ every episode scene has already been published or frozen as prose.

## Open these exact GitHub sources before planning or publishing
1. **Canonical index:** `Society-Wives/source-vault/index.json`
2. **Meenakshi × Shivani EP05 (9 scenes plus addendum):** `source-vault/ep05-meenakshi-shivani-jan02.txt` (161 paragraphs, 24,741 extracted characters); matching structured `.json`
3. **Shivani EP04B 2 Jan Office Plan v2:** `source-vault/ep04b-shivani-office-jan02.txt` (151 paragraphs, 24,943 extracted characters); matching `.json`
4. **Taniya EP05 (9 scenes):** `source-vault/ep05-taniya-jan02.txt` (147 paragraphs, 21,047 extracted characters); matching `.json`
5. **Taniya EP04B plot:** `source-vault/ep04b-taniya-existing-plot-frozen.json` is a whole-file exact copy of `episode-04b-taniya-author-updated-plan.json` (28,574 characters as fetched).

Paths above are relative to `Society-Wives/`.

**Direct UI:** https://developer-fandom-rush.github.io/DHIKA_STORY/Society-Wives/#/source-vault

## Verbatim audit already performed
Each of the three .txt copies matched the Google Docs paragraph extraction EXACTLY, and its .json paragraphs joined by LF matched the .txt. Taniya 04B frozen JSON content matched its original GitHub source exactly. These are **text/paragraph snapshots**, not pixel-identical Google Docs: page layout, image objects and fonts are not archived in text.

## How to work in future chats
- Before new plot planning: read `source-vault/index.json`, each relevant full text document and `episode-catalog.json`; then the current character plan and cross-household gate.
- If the user requests Read Story publication, copy from the archived source as-is into the appropriate reader. Do not treat paragraph snapshots as if every scene already passed publication approval. Respect exact original text and paragraph breaks; make the UI source readable without editing its prose.
- Preserve all existing current Reader scenes. Do not replace Taniya 04B's source with invented new material. Shivani 04B was not in the older Episode 04B Reader; it now has a Source Vault view.
- Confirm all new scene changes with the author; future changes create **versioned files** and update the index, keeping original snapshots untouched.
- EP06 Shivani three-day plot is separate: `shivani-episode-06-three-day-plot.json`. Five-lead cross-mentor handoff: `cross-lead-ayaan-armaan-jam-2026.json`. Five-household society hold: `episode-06-cross-household-hold.json`.
- Never assume another chat automatically has GitHub context. Give it the full GitHub link to this handoff or the Source Vault and explicitly request retrieval before writing.

## Recommended next-chat prompt
"Open the connected GitHub repository developer-fandom-rush/DHIKA_STORY. First read Society-Wives/source-vault/NEW-CHAT-HANDOFF.md and index.json and verify the four locked EP04B/EP05 sources exist. Use the word-for-word archived content as the only baseline; do not paraphrase, rewrite, overwrite or invent missing text. Check the Episode 04B/05 publication indexes and catalog to distinguish archive source, working plot and published Reader prose. Use #/source-vault UI and update only new/versioned plot or reader files after my instructions. Before any 3–5 January Episode 06 society crossover, check the five-household gate and Ayaan–Armaan cross-lead mentorship ledger. Report exact file paths, validation counts and unresolved statuses." 
