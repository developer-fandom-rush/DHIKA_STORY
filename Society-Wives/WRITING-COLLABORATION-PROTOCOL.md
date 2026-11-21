# Society Wives — Author, ChatGPT & External Writer Collaboration Protocol

**Version:** 1.1 · **Status:** Workflow guidance; NOT approved story canon · **Creative director:** Author  
**Applies to:** Society Wives story discussions, scene drafting, external-writer handoffs, reviews and continuity audits.  
**Purpose:** Preserve the author's choices while allowing different writers to contribute different prose styles without silently rewriting the plot.

> **Core agreement:** The author decides the plot, scene events, motivations, writing intensity, revisions and final approval. ChatGPT supplies plot alternatives, structure, non-graphic creative support, factual/continuity audits, and integration logistics. An external writer (for example, Grok) has its own drafting role and capabilities. ChatGPT's limits on its own generated output do **not** impose a writing style or a restriction on another writer or the author.

## 1. Roles and authority

| Role | Owns / can do | Must not silently do |
|---|---|---|
| **Author / creative director** | Choose scenes, degree of intimacy, action labels, motivations, chronology, narrative viewpoint, final dialogue, prose revisions, approvals and publication | Nothing is final merely because an assistant suggested it |
| **ChatGPT / plot architect** | Offer plot ideas and counter-options; explain psychological causality; write ordinary dialogue and supported non-graphic narration when requested; suggest beat orders; build neutral action ledgers and writer handoff locations; identify contradictions | Invent decisions or motivations as canon; change the author's precise event into its own preferred scene; dictate an external writer's style |
| **External writer (Grok / other)** | Draft assigned passages according to the author's own brief, chosen voice, narrative intensity and material; return full replacement prose or selected inserts | Treat unapproved expansions as locked canon, or change actor, receiver, consent, timeline or outcome without flagging |
| **ChatGPT / continuity and integration editor** | Compare source, author revision and returned text; map which insert belongs where; check order, clothes, positions, POV, knowledge, dialogue tone and consequences; preserve supplied approved wording as far as supported | Silently soften, replace, summarize or claim approval of a provided passage; invent missing action details; present inferred effects as facts |
| **Author / final reviewer** | Accept, revise, reject, freeze, request an alternative, or authorize publishing | Approval cannot be inferred from a request to discuss or draft |

**Working boundary:** ChatGPT can document neutral sexual-action identifiers and discuss the craft, psychology and continuity of mature fiction. It cannot itself supply explicit erotic prose or instructions specifically designed to make another model generate graphic erotic descriptions. This is a limit on *ChatGPT's output*, not a condition placed upon independent writers or the author's work. A brief need not repeat any restriction about another writer's prose style.

## 2. Select writing mode per beat, not per episode

| Beat type | Pace | Typical content |
|---|---|---|
| Everyday exchange | Fast, dialogue-driven | Casual Hinglish, banter, teasing, double entendres where character-appropriate, jokes |
| Flirting / subtext | Medium | Interpretive ambiguity, observable attention, verbal push-and-pull, micro-reactions |
| Decision / interiority | Slower | Character's motive, alternatives considered, agency, recalled experiences, private physical comfort or discomfort |
| Unexpected incident | Variable / briefly slow | Exact physical geometry, causal order, sound, texture, immediate action and reaction |
| Intimate discussion | Character-led | Explicitness category recorded by author, relationship stakes, dialogue shifts, choices and reactions |
| Aftermath | Reflective | Information gained, confusion remaining, practical consequences and next-scene hook |

Narrative intensity must follow **significant change**, not be applied to every line. Prolonged sensory explanation in ordinary banter dilutes the impact of genuinely consequential moments.

### Eight narrative dimensions to document where relevant

1. **Physical:** clothes and layer state, posture, position, proximity, movement, contact, actions.
2. **Sensory:** temperature, fabric, pressure, sound, smell, light and bodily perception.
3. **Psychological:** interpretation, attention, intention, conflicting beliefs, memory, decision.
4. **Emotional:** anticipation, fear, confidence, embarrassment, pleasure, uncertainty and mood change.
5. **Somatic / arousal state:** whether bodily arousal or physiological sensitivity matters to character motivation; distinguish it from heat, sweat, friction and other nonsexual sensations.
6. **Behavioral:** pauses, facial reactions, words, gaze, distance, changed voice and visible choices.
7. **POV & knowledge:** who knows what, who merely guesses, what only the reader knows.
8. **Consequences:** state after a beat, new question, next action and unresolved conflict.

**Precision rule:** Not every dimension goes in every paragraph. Use only what is motivated by source and point of view. Do not replace an author-stated private motivation with the vague word "comfortable" if that loses the intended causal meaning.

## 2A. MICRO-BEAT CONTRACT — author-requested update, 19 November 2026

This expands the existing scene-level beats into **writer-ready micro-beats**, without assuming a rewrite or plot approval. The author wants encounter-led fiction, not a requirement to delay physical progression across successive meetings. Episode-specific pace and action selection remain the author's choice.

### Beat-size rule (applies when creating or revising beat breakdowns)

- **One primary action per micro-beat**; at most **two directly connected actions** when splitting would break the causal mechanism. A costume decision, physical contact, dialogue question, direct reaction, change of position, and aftermath are separately traceable transitions when they alter the scene state.
- Identify **actor / receiver** and **before-action / after-action**. Separating actions is an **editorial clarity technique**, not a mandate to extend or invent the encounter.
- Never treat an unmentioned action as completed. Mark it `NOT SPECIFIED — AUTHOR REVIEW`, and leave the neutral insertion space to the appropriate writer.
- Prior existing A01–A05 or N01–N10 **macro-beat IDs stay intact** as parent IDs. New IDs use `A01.1`, `A01.2`, etc.; the parent plan remains unchanged until the author approves a rewrite.

### POV and character-thought field — mandatory per micro-beat

Each micro-beat must carry **`pov`**, **`thought_or_interpretation`**, **`visible_response`** and **`knowledge_limit`**. When no thought can be credibly inferred or sourced, write `UNSPECIFIED / N/A — do not invent` rather than manufacture an interior monologue. **Do not give one character another person's private thought.** The author can decide when to switch POV.

### Sensory/physical checklist — mandatory tracking, not mandatory invention

For each micro-beat, independently record:

- `contact_or_touch`: who touches what, or `N/A`.
- `sound`: speech, ambient/mechanical sound, silence, or `N/A`.
- `temperature_or_environment`: water, airflow, fabric, room conditions, or `UNSPECIFIED`.
- `physical_response`: **source-confirmed** body motion or response, otherwise `UNSPECIFIED`.
- `emotional_response`: **source-confirmed** immediate reaction or `UNSPECIFIED`.
- `clothing_state`, `position`, `object_state` and `exit_state`: record only details materially changed.

**Quality rule:** Sensory fields must be considered individually, but a scene without touch or a stated temperature must **not** be padded with invented touching, heat, sounds or reactions. `N/A` and `UNSPECIFIED` are legitimate data.

### Distinguish all similarly labeled men / uncles

Where several older male characters are involved, every micro-beat identifies **the actual named person**, age/role/relationship if verified, current location and knowledge; never use vague group labels in place of actor/receiver. **Rajeev's "Uncle" is a social address, not proof he is a biological or legal father-in-law**. Do not combine Gopal, Rajeev, Mahendra, Om, Subhash, Mohan or Arvind into a single assumed actor. When a named person is only a reference or private thought, mark them **not present**, not a participant.

### External-writer handoff / word-budget field

- Author-requested **target: 300–400 words per selected *expanded* micro-beat** in a Grok or other external-writer assignment. Record `target_word_count: "300–400 (author target)"` in the sidecar handoff.
- This is a **target, not a licence to repeat descriptions, fabricate interiority, add unsourced acts or overwrite author lines**. For normal quick banter, use a concise prose mode unless the author specifically assigns expansion.
- At scene scale, show the math: e.g. 15 selected expanded beats × 300–400 = **4,500–6,000 words**. The author may adjust scope or word budget; do not compress against their wishes without highlighting the tradeoff.
- Preserve the author's **requested_style** as a tag for the assigned writer. Do not prescribe the other writer's limits or exact prose techniques. ChatGPT may supply source-grounded structure and neutral action labels, not explicit erotic prose generation briefs.

### Micro-beat record fields

`micro_beat_id | parent_beat_id | source_status | time | location | primary_action | actor | receiver | entry_state | contact_or_touch | sound | temperature_or_environment | clothing_state | object_state | physical_response | emotional_response | pov | thought_or_interpretation | visible_response | knowledge_limit | exit_state | next_beat_anchor | writer_assignment | requested_style | target_word_count | approval_status`.

**Review gates:** (a) action count ≤2; (b) every field completed or explicitly `N/A / UNSPECIFIED`; (c) source vs author proposal separate; (d) no continuity leak; (e) cross-scene state preserved. This is a planning/review aid; **no automatic canon change**.

**Episode 04A application:** [EP04A-ANKITA-MICROBEAT-REWRITE-PREP.md](EP04A-ANKITA-MICROBEAT-REWRITE-PREP.md) maps current seven scenes into the more precise breakdown before any future rewrite.


## 2B. Neutral choreography and named-action requests — author correction, 21 November 2026

**Default mode:** When the author requests who acts, who receives an action, its **exact concise action name**, who observes it, physical positions, sensory transitions and immediate reactions, respond with a **neutral planning breakdown**. This is NOT inherently a request for explicit sexual prose. Keep literal author-specified identifiers, such as **self-touch (fingering)**, in a factual ledger when needed. Do not silently substitute vague memories or omit the event. Do not supply anatomically graphic detail, sexual technique or erotic prose instructions.

**Steps to apply to every lead and scene:**

1. **Identify requested output mode:** neutral ledger, plot discussion, ordinary prose, or a separately authored insert. Do not treat action identification as a request for graphic narration.
2. **Preserve author event order:** one primary action per micro-beat; record **actor → receiver/affected → action name → observable effect → immediate reaction → exit state**. Use **Self** as receiver when appropriate.
3. **Separate the witness row:** **observer → observed person → witnessed action**. An observer does not become the actor of another person's action. Distinguish what they saw from what they thought, and what the observed person knows.
4. **Track neutral sensory causality:** sound, water, door movement, airflow, warmth, posture, clothing/object states, turning or stillness, and pauses when grounded. Mark unsourced additions as **PROPOSAL**, not canon. No invented erotic detail.
5. **Preserve the real turning point:** note the precise cause of a character's shift in attention and the subsequent choice. Established private attraction does not automatically mean the other person knows or reciprocates it.
6. **Handover without erasure:** If an external author will supply missing manuscript text, put **[GRAPHICAL DESCRIPTION REQUIRED]** only at the exact unwritten insertion anchor and keep a separate neutral ledger with a stable ID. Do not claim to have contacted Grok or received prose. Do not write a prompt specifically designed to generate graphic sexual content.
7. **Clarify genuine uncertainty once:** ask only where it affects plot causality or continuity; do not reconfirm an approved decision. Do not publish or alter approved episodes just because a planning workflow was updated.

**Worked case — Shreya Episode 04A Scene 02 (author-corrected working breakdown, not approved story prose):**

| Beat | Actor → receiver / witness | Exact neutral action | Effect / information |
|---|---|---|---|
| SC06 | Shreya → Self | Private self-touch; author label: **fingering** while recalling Vivek Rao | Her private activity; Arvind not invited |
| SC07.1 | Arvind → Bathroom door; Arvind witnesses Shreya | Opens the door unexpectedly and sees Shreya's ongoing private action | Shreya has not noticed him yet |
| SC07.2 | Door/airflow → Shreya | Airflow changes when door opens | She becomes aware of an interruption |
| SC07.3 | Shreya → Self / Arvind | Startled vocal reaction; suppresses further shouting, turns away and becomes still | Shreya faces away from the doorway |
| SC07.4 | Arvind → observes Shreya | Brief sightline of her unclothed back, not a prolonged inspection | His prior one-sided interest is reader-only knowledge |
| SC07.5 | Arvind → Self | Regains composure, exits and collects a towel | Shreya's privacy and comfort now take immediate priority |
| SC08 | Arvind → Shreya | Returns with towel, offers coverage, apologizes and withdraws | Privacy restored; no assumption of shared attraction |

**Source status:** The example records the author's correction to an earlier assistant draft, **not a final change to Episode 04A canon**. Exact door-entry motive and any unclear interval or physical staging remain open for author review. Do not frame the assistant's previous omission as an author's decision.

**Anti-pattern:** Do not answer a neutral action ledger request by removing the named action and reducing the scene to generic reminiscence. Instead deliver actor/receiver/witness, action names, sensory transitions, reactions, and the actual character turning point.

## 3. Scene development — step by step

1. **Retrieve source** — read the linked planning UI, existing prose, previous and overlapping character scenes. Record exact source paths and approval status.
2. **Identify the job of the scene** — its core change: whose choice? whose interpretation? what alters between entry and exit?
3. **Propose alternatives** — offer 2–3 causal plot paths with a reason and tradeoff; clearly label **proposal** versus **source**.
4. **Author chooses** — only chosen elements move to a working outline. Do not infer consent or sexual intention from a character's bodily arousal.
5. **Create timeline/beat sheet** — beat ID, local clock, location, entry state, trigger, actions, reactions, consequence, exit state.
6. **Choose prose mode by beat** — normal dialogue, deep point of view, incident choreography, intimate conversation, aftermath, or other author-selected mode.
7. **Optional insertion system** — use a direct complete prose assignment when one writer handles a scene; use separate markers/sidecar action ledger when different writers contribute or passages are still pending.
8. **Draft and external contribution** — ChatGPT writes what it can; external writer or author provides assigned replacement passages in their chosen style. Preserve the original text and separately identify proposals.
9. **Integration** — insert accepted text at specified beat anchors; check transitions and semantic consistency; never claim that a placeholder is an already-written scene.
10. **Continuity and author review** — clothing, location, duration, participants, actor/receiver, character knowledge, active intentions, outcomes and cross-episode overlap.
11. **Approval and publishing** — explicit author sign-off before marking **APPROVED / FINAL** or updating reader canon. Review drafts remain drafts. Publishing is a separate action.


**Micro-beat expansion:** After step 5, apply the `§2A MICRO-BEAT CONTRACT` (one major action, per-beat thought/knowledge and sensory fields, named participants, author-set word budget) before authoring external-writer assignments.

## 4. Optional insertion markers and action ledger

**The ledger is a coordination tool, not a mandatory writing format.** A single writer may simply receive the scene outline and write full prose. In a multi-writer scene, we separate the narrative body from machine-readable editorial notes.

**Existing Society Wives repository convention:** In the *story body*, if a writer-controlled passage has not yet been supplied, place the literal marker `[GRAPHICAL DESCRIPTION REQUIRED]` at **each** separate location. Do not insert explanatory instructions into the story itself. The matching ID and coordination details are tracked in a **separate ledger**, not inside the narrative body. This is a legacy naming convention, not a declaration that every gap must be graphic.

### Neutral ledger schema

| Field | Meaning |
|---|---|
| `insert_id` | Stable identifier, e.g. `E04B-ANKITA-S02-G01` |
| `scene_anchor` | Exact scene, beat, line/before-after location |
| `author_status` | Proposed / author-confirmed / reviewed / approved |
| `action_label` | Literal **neutral**, author-specified name of action, if applicable |
| `initiator_or_actor` | Who initiates or performs the action |
| `receiver_or_affected` | Who experiences or receives it (may be self) |
| `agency` | Who chooses, responds, stops, changes their mind; distinguish visible facts from assumed consent |
| `requested_style` | Author-selected label: non-graphic / semi-graphic / full-graphic / custom; for routing only |
| `pov` | Internal / limited / external / multiple POV; when POV switches |
| `entry_state` | Clothing, body position, environment, preceding dialogue, available knowledge |
| `event_sequence` | Ordered actions and observable changes; no inferred step filling |
| `exit_state` | Garment location, people positions, knowledge, relationship shift, unresolved question |
| `sensory_focus` | Relevant senses, physical and emotional experience; author-defined |
| `source_reference` | Filename, scene/beat ID, author note or original passage |
| `writer_assignment` | Which contributor owns the missing passage |
| `review_decision` | Accept / revise / reject / pending |

**Intensity labels are author-defined metadata**, not instructions ChatGPT must transform into erotic output, and not promises of what any specific external model will produce. The assigned writer follows their own capabilities and rules.

**Compact neutral example (hypothetical, NOT canon):**

```yaml
insert_id: E04B-ANKITA-S02-G01
scene_anchor: "After the repair visit begins, before the next dialogue turn"
author_status: PROPOSED
action_label: "Deliberately staged water spill"
initiator_or_actor: Ankita
receiver_or_affected: Ankita
agency: "Ankita plans the spill; Rinku's inference remains unknown"
requested_style: "Author to set"
pov: "Ankita limited"
entry_state: "Author-confirmed outfit and bottle state required"
event_sequence:
  - "Ankita chooses and initiates the spill"
  - "An observable reaction is recorded, without inventing inner thoughts"
exit_state: "Clothing and floor condition must be checked"
writer_assignment: "Author / external contributor"
review_decision: PENDING
```

**Actor versus receiver** must be explicit for every action where those roles matter. When facts are absent, put `UNSPECIFIED` rather than guess. A previous example's action labels cannot by themselves be treated as approval, chronology or a complete passage.

### How to place multiple inserts

- One **unique ledger ID** per distinct action or transition. In story prose, a simple placeholder can occur multiple times, with position mapping held in the separate ledger.
- Keep the **before text** and **after text** exact so a returned insert can be placed deterministically.
- Do not skip a missing intermediate reaction or garment-state transition by pretending it occurred.
- Multiple insert requests can be returned as separate passages or one consolidated rewrite, whichever the **author** specifies.
- If external prose contradicts the source, record a **conflict note** rather than silently overwrite. The author resolves it.
- The exact user's supplied action names can be preserved **as neutral labels** for tracking. Do not invent unnamed sexual actions, sensations, positions or consent details.

## 5. Character agency and POV are first-class fields

For each beat identify:

**Choice → Action → Observable response → Character's interpretation → New choice / aftermath**

Distinguish:
- **Author knowledge:** facts set behind the scenes.
- **Reader knowledge:** facts revealed on the page.
- **POV character knowledge:** what this character actually witnessed or inferred.
- **Other character's knowledge:** must not leak automatically from narrative to mind.
- **Agency:** anticipation, willingness, hesitation, objection, boundary, revision of choice. Arousal does **not** automatically imply permission.

For multi-POV work, a character's private reaction can be narrated in **their own POV** or through grounded observable cues, not omnisciently attributed to another character.

## 6. Physical continuity ledger (minimum)

At entry and exit of every major beat record, as necessary:

- **When / where:** actual clock, elapsed duration, room and door state, cross-lead overlaps.
- **Who:** physically present, on phone, nearby, absent and who can witness.
- **Clothes:** outerwear, optional layer state where author-established, wet/dry state, removed/returned garment locations.
- **Movement:** positions, facing direction, reachability, balance and travel.
- **Objects:** bottle amount and position, tools, water, phone, keys, broken fitting, cleanup.
- **Body / sensation:** author-established physical states, which sensations are recalled versus happening now.
- **Knowledge:** seen/heard/assumed versus secret, and when new information becomes available.
- **Outcome:** consequence that *must* carry to the next beat, including deferred repairs or later revisit.

Always distinguish a **physical action that actually occurs on-page** from a **character's memory, imagination or theory**.

## 7. Example: Ankita / Rinku, without approving a new scene

- **January 1:** Rinku, age 23; familiar helper; existing EP04A Scene 01 water-filter accident. Current source: a cracked coupler, water on Ankita's kurti/forearm, short reflexive clothed-arm support, brief glance, changed silence, temporary repair. The actor's interpretation is not necessarily visible to Ankita.
- **January 2:** A different proposed follow-up exists in `episode-04b-ankita-chotu-archive.json`. Any deliberately staged event, repeated wardrobe choice, or revised encounter requires **separate author approval** and reconciliation with the existing planned pressure test.
- **Wardrobe proposal:** if an author adds a no-innerwear choice to Episode 03 Scene 08, that changes earlier private motivation and may contradict EP04A's existing *inner clothing outline* wording. This is a flagged proposal, **not** permission to rewrite EP03/04 automatically.
- **POV guard:** Ankita does not acquire knowledge of the private parcel chain or another person's internal reaction by guessing.
- **No implied new scene:** previous discussion examples are hypothetical until explicitly locked.

## 8. How ChatGPT helps think up a plot

Plot ideation is not limited to arranging requested actions. ChatGPT can actively offer **credible alternatives** while keeping every new idea distinct from canon:

1. **Define the dramatic question:** What does the protagonist want to learn, change, hide or choose in this scene?
2. **Identify prior causes:** Which approved earlier event changed their feelings or options?
3. **Find a real-world occasion:** Why do characters plausibly meet now, and why here? A practical task is stronger than a coincidence without setup.
4. **Choose a turning point:** An unexpected incident, revealing conversation, mistaken assumption, choice, or new information.
5. **Add asymmetry:** What does the audience know that one character does not?
6. **Offer 2–3 plot paths:** For each show **setup → shift → response → aftermath → next hook**, plus a plausibility risk.
7. **Check behavior against character history:** Does this choice fit prior competence, trust, maturity, family and workplace roles?
8. **Continuity audit:** Check same clock across all leads, clothes, movement, locations, other characters' commitments and previous boundaries.
9. **Keep a decision log:** Source-canon, author's locked choice, assistant suggestion, external writer suggestion and rejected ideas remain distinguishable.
10. **Write only the selected path:** Do not merge multiple options into an accidental new canon.

### Example of plot-architecture discussion (neutral)

**Question:** A character observed someone turn abruptly quiet after an accidental household mishap. What can a later encounter *do for the story*?

- **Option A — Direct conversation:** The character asks what happened; payoff is truth or discomfort. *Risk:* resolves mystery quickly.
- **Option B — Observe an ordinary repeat service task:** The character watches for a similar response without recreating the accident. *Risk:* ambiguity can linger.
- **Option C — Deliberately create a new test:** The character controls some circumstances and then interprets the other's response. *Risk:* intention and consequence must be credible and distinct from the original accident.

No option is endorsed as canon until author selection.

## 9. Editor's integration checklist

- [ ] Source scenes and status checked
- [ ] Proposed vs approved facts labeled
- [ ] Author's provided wording preserved wherever editing is supported
- [ ] Beat order and actor/receiver roles correct
- [ ] Intentions, knowledge, agency and reactions do not get assumed
- [ ] Position, clothing and object states consistent
- [ ] Time slots do not overlap unrelated scenes
- [ ] Writer's insert anchored to the right location
- [ ] Changes / conflicts visibly marked for author review
- [ ] No automatic switch to FINAL, LOCKED, APPROVED or published story
- [ ] Author decides on the final revision

## 10. Practical commands for collaboration

- **DISCUSS:** analyze plot and options; do not modify files.
- **BEAT SHEET:** produce times, actions, POV, entry/exit state and gap IDs.
- **LEDGER:** make optional insertion map and ownership assignments.
- **COMPARE:** show author text versus assistant/external version with precise diffs.
- **CONTINUITY CHECK:** list only grounded contradictions and unresolved facts.
- **SAVE DRAFT:** save a versioned, clearly unapproved draft (no reader canon change).
- **APPROVE:** only when the author explicitly authorizes a particular revision.
- **PUBLISH:** update reading UI / repository only when requested; verify deployment before claiming success.

## 11. Precedence and revision policy

**Priority:** Author's latest explicit choices > previously approved canon > external-writer proposals > assistant proposals. This is not permission to change an approved earlier scene silently; collisions are presented to the author for resolution.

**Do not rewrite merely because a prior answer was softer or more restrained.** First preserve the exact requested event and explain what supported type of transformation can be performed. A different external writer's style is not a ChatGPT editing rule. Avoid adding unsolicited directions to that writer's prose.

**Files and approvals are separate:** This protocol guides future collaboration. Saving it does not mark Ankita Episode 03, Episode 04A or Episode 04B as finalized.

---

**Related files:**
- `Society-Wives/README.md` — story universe and pre-existing exact literal marker convention.
- `Society-Wives/episode-03-ankita-scene-08-prose-draft.json` — Ankita changed into homewear, under author review.
- `Society-Wives/episode-04a-ankita-plan.json` — Jan 1 scene beats, under review.
- `Society-Wives/episode-04b-ankita-chotu-archive.json` — separate Jan 2 follow-up proposal, not approved.
- `Society-Wives/EP04A-ANKITA-GROK-PUBLIC-REVIEW.md` — public episode-specific review companion.


## 12. GPT change provenance and Episode 02–03 freeze

> **Changed by GPT — 2026-11-20. Author-directed repository tracking rule.**
>
> **AUTHOR LOCK:** All existing Episode 02 and Episode 03 material is **AUTHOR APPROVED / FROZEN**. No GPT-authored or GPT-applied edit to those episodes, including text, formatting, scene order, timing, files, reader publication, or approval metadata, without the author's explicit approval of the exact proposed change.

From this point on, every **GPT-applied** GitHub write must:

1. Have a Git commit message beginning with the literal **`Changed by GPT:`**.
2. Have a dated entry in [GPT-CHANGE-LOG.md](GPT-CHANGE-LOG.md), specifying edited paths, exact change, reason, approval status, and source attribution (`Author-provided`, `Grok-provided`, `GPT-authored`, or `GPT integration only`).
3. Preserve author/Grok wording attribution: a GPT-assisted upload does not make the underlying prose GPT-authored.
4. Keep GPT attribution **out of in-world story prose**. Prefer Git history, the change log, or non-narrative metadata/comments.
5. Keep proposals and audits distinct from **applied** changes; never claim a discussed idea was saved, approved, or published.

If the author reports a possible older GPT-made unauthorized change, compare the exact original source with Git history, identify the verified difference, flag **`Suspected prior GPT change — author review`**, and **do not silently repair or replace it**.

This provenance-policy addition changes no previously approved story material and does not retroactively accuse any past commit of unauthorized modification.
