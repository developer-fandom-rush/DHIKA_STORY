# Society Wives — Verbatim Continuity Archive

**Purpose:** Answer new-chat questions like "What are all Meenakshi–Mohan references?" or "Find every Shreya–Chauhan dialogue" using the **exact original source prose, line by line**.

This is an extraction/index of the material already published in the GitHub repository, **not a rewrite, summary, completion, or canon approval**.

## Files

Open [INDEX.json](./INDEX.json) for the machine-readable directory and update rules.

| Female | Episode 02 verbatim JSON | Episode 01 source draft (NOT APPROVED) |
|---|---|---|
| Ankita | [ankita.json](./episode-02/ankita.json) | [ankita.json](./episode-01-DRAFT/ankita.json) |
| Shivani | [shivani.json](./episode-02/shivani.json) | [shivani.json](./episode-01-DRAFT/shivani.json) |
| Taniya | [taniya.json](./episode-02/taniya.json) | [taniya.json](./episode-01-DRAFT/taniya.json) |
| Soniya | [soniya.json](./episode-02/soniya.json) | [soniya.json](./episode-01-DRAFT/soniya.json) |
| Meenakshi | [meenakshi.json](./episode-02/meenakshi.json) | [meenakshi.json](./episode-01-DRAFT/meenakshi.json) |
| Shreya | [shreya.json](./episode-02/shreya.json) | [shreya.json](./episode-01-DRAFT/shreya.json) |

## Absolute source-fidelity rules

1. **Do not summarize, shorten, merge, censor, paraphrase, invent or reword prose.** Source scene text is copied and archived verbatim.
2. Each Episode 02 scene has `source_html_lines_exact`. Joining that array using the literal newline `\n` reconstructs the original HTML scene fragment character for character, **including all text and markup**. No words are removed from these preserved fragments.
3. `prose_line_records` is an additional navigation index of the HTML paragraph/dialogue records. Each record has `html_exact`, `text_for_lookup` and a stable scene-local line ID. It is a **convenience projection**; when you need every word, use the complete `source_html_lines_exact` and all records, not only name hits.
4. Episode 01 source was itself marked **NOT APPROVED**. Its source JSON objects are preserved in `episode-01-DRAFT` with unchanged narration/dialogue/internal text, and **must not be presented as final canon**.
5. `character_name_index` is a **strict explicit-name/unique-alias locator**. It is not automatic proof of face-to-face contact, reciprocal attraction, physical presence, knowledge, consent or person speaking to another. To answer interactions, read **the entire matching scene**, not only the sentences with names. Unnamed/pronoun-only links must be left ambiguous unless the source resolves them.
6. Treat `approved_scene_ids`, `nonapproved_scene_ids` / `draft_scene_ids`, source badges, and approval fields as distinct. A published draft is not automatically approved. Never silently promote unapproved prose.
7. **Source gaps stay gaps.** Meenakshi M09 and Shreya SR03 were not found as full published scene prose. Taniya–Soniya TS12–TS16 are plan-only in the audited source. TS07 *does* have TS07A/TS07B/TS07C, so the parent TS07 is not wholly missing.
8. Older unverified or contradictory story references are not silently reconciled. If a line contradicts another source, quote the exact conflicting lines and request an editorial decision later.

## How the next chat should answer

When the user asks about one female + character:

- Open `INDEX.json`, then that female's Episode 02 JSON.
- Search `character_name_index` for the character. Read every listed `scene_id` and **all** its `prose_line_records`; dialogue often continues through pronouns after the name disappears.
- Return the **verbatim lines in original source order** with `scene_id` and `line id`. Do not omit narration, internal reactions, or dialogue turns that are within the user-requested scene/span.
- For strict byte-level reconstruction, use `source_html_lines_exact`, preserving embedded HTML markup and punctuation exactly.
- If the user says **approved scenes only**, exclude all records not explicitly marked approved in the archive's approval evidence, and say what was excluded.
- No new prose. No inference. No omissions. If content is not in the source, explicitly say it is absent.

## Update rule — user controlled

**After each episode, update these files only when the user explicitly says to update the JSON.** Merely finishing an episode or publishing a new chapter does not automatically authorize an archive rewrite.

When requested, fetch the current source from GitHub, compare it with the prior snapshot, retain all unchanged scenes exactly, replace/add only genuinely changed source fragments, rerun the line-fidelity verification, rebuild speaker/character indexes and update the source blob hash. Keep the previous approval and review distinctions unless the user explicitly authorizes a status change.

## Source of truth

- Unified Episode 02 HTML: [episode-02.html](../episode-02.html)
- Episode 01 draft scene data: [episode-01.json](../episode-01.json)
- Episode 02 closure boundary: [episode-02-closure.json](../episode-02-closure.json)
- Title/episode catalogue: [episode-catalog.json](../episode-catalog.json)

**Important:** This index is a search tool, not evidence that a character physically interacted with every mentioned person.
