#!/usr/bin/env python3
"""Deterministic audit of all 41 source tabs and every character-pair reference.
No plot interpretation, paraphrasing, or external dependencies.
"""
import itertools
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
corpus = json.loads((ROOT / "data/corpus.json").read_text(encoding="utf-8"))
index = json.loads((ROOT / "data/pair_evidence_v2.json").read_text(encoding="utf-8"))

episodes = {e["n"]: e for e in corpus["episodes"]}
assert sorted(episodes) == list(range(1, 42))
assert sum(e["parts"] for e in episodes.values()) == 55
assert sum(len(e["lines"]) for e in episodes.values()) == 10450
assert all(e["lines"] and e["id"] == f"EP{n:02}" for n, e in episodes.items())
assert all(e["lines"][0][0].startswith(f"EP {n:02}") for n, e in episodes.items())
assert all(any(line[2] for line in e["lines"]) for e in episodes.values())

people = index["aliases"]
assert sorted(people) == sorted(index["aliases"])
pair_ids = {"__".join(pair) for pair in itertools.combinations(sorted(people), 2)}
assert set(index["pairs"]) == pair_ids, "Missing or unexpected character pair"
assert len(pair_ids) == 210
assert index["summary"]["paragraphs"] == 10450
assert index["summary"]["sceneTransitionCandidates"] == 5
assert index["summary"]["parts"] == 55
assert index["summary"]["episodes"] == 41

def original(ep, row):
    assert ep in episodes, f"Episode absent: {ep}"
    assert 0 <= row < len(episodes[ep]["lines"]), (ep, row)
    return episodes[ep]["lines"][row][0]

def has_name(text, person):
    if person == "uncle":
        return bool(re.search(r"\bUncle(?:ji)?\b(?!\s+Iroh\b)", text, re.I))
    if person == "twins":
        return (
            bool(re.search(r"\btwins?\b", text, re.I))
            or bool(re.search(r"\bbantu\b", text, re.I))
            and bool(re.search(r"\bbobby\b", text, re.I))
        )
    return any(re.search(r"\b" + re.escape(alias) + r"\b", text, re.I)
               for alias in people[person])

def speaker(text):
    m = re.match(r"^\s*([a-z][a-z\s-]{0,23}?)\s*:", text, re.I)
    if not m:
        return None
    name = m.group(1).strip().lower()
    if name in ("angel dhika", "angle dhika", "devil dhika"):
        return None
    if name == "uncle iroh":
        return "iroh"
    for person, aliases in people.items():
        if person != "twins" and name in [a.lower() for a in aliases]:
            return person
    return None

def story_row(ep, row):
    text = original(ep, row).strip()
    if row == 0 or (ep == 1 and row in (1, 2, 3, 4)):
        return False
    if not text or re.match(r"^(?:[-=+*_~]{6,}|Part \d+\s*:|Source\s*:)", text, re.I):
        return False
    return True

total_refs = 0
for key, entry in index["pairs"].items():
    a, b = entry["participants"]
    assert key == "__".join(sorted([a, b]))
    assert entry["counts"]["coMention"] == len(entry["direct"])
    assert entry["counts"]["speakerExchange"] == len(entry["dialogue"])
    assert entry["counts"]["thirdPartyDiscussion"] == len(entry["thirdParty"])
    assert entry["counts"]["sceneTransitionCandidate"] == len(entry["ambiguousScene"])
    candidate_eps = set()
    for ep, row in entry["direct"]:
        text = original(ep, row)
        assert story_row(ep, row), ("nonstory", key, ep, row)
        assert has_name(text, a) and has_name(text, b), ("false co-mention", key, ep, row)
        candidate_eps.add(ep)
    for ep, row, follow in entry["dialogue"]:
        assert 0 < follow - row <= 6, (key, ep, row, follow)
        assert story_row(ep, row) and story_row(ep, follow)
        assert {speaker(original(ep, row)), speaker(original(ep, follow))} == {a, b}, (
            "false speaker exchange", key, ep, row, follow)
        candidate_eps.add(ep)
    for ep, row, follow in entry["thirdParty"]:
        assert 0 < follow - row <= 2, (key, ep, row, follow)
        assert story_row(ep, row) and story_row(ep, follow)
        original_speaker = speaker(original(ep, row))
        answer_speaker = speaker(original(ep, follow))
        assert original_speaker not in {a, b, None}
        assert answer_speaker in {a, b}
        mentioned = a if answer_speaker == b else b
        assert has_name(original(ep, row), mentioned), ("not mentioned", key, ep, row)
        candidate_eps.add(ep)
    for ep, row, follow in entry["ambiguousScene"]:
        assert 0 < follow - row <= 6, (key, ep, row, follow)
        assert story_row(ep, row) and story_row(ep, follow)
        assert {speaker(original(ep, row)), speaker(original(ep, follow))} == {a, b}, (
            "ambiguous speaker mismatch", key, ep, row, follow)
        candidate_eps.add(ep)
    assert entry["episodes"] == sorted(candidate_eps), ("episode count mismatch", key)
    total_refs += sum(entry["counts"].values())

assert index["pairs"]["bantu__uncle"]["counts"] == {
    "coMention": 0, "speakerExchange": 0, "thirdPartyDiscussion": 0,
    "sceneTransitionCandidate": 0
}
assert index["pairs"]["bantu__sharmi"]["counts"]["coMention"] == 0
assert index["pairs"]["bobby__sharmi"]["counts"]["coMention"] == 0
assert index["pairs"]["bobby__sharmi"]["counts"]["speakerExchange"] == 0
assert index["pairs"]["bobby__sharmi"]["counts"]["sceneTransitionCandidate"] == 1
assert index["pairs"]["iroh__zuko"]["counts"]["coMention"] > 0
assert index["aliases"]["iroh"] == ["Iroh", "Old man"]
assert index["aliases"]["zuko"] == ["Zuko", "Young one"]
assert index["pairs"]["john__ron"]["counts"]["coMention"] == 0
assert 37 in index["pairs"]["sharmi__uncle"]["episodes"]
assert index["pairs"]["bantu__dhika"]["counts"]["speakerExchange"] > 0
assert index["pairs"]["bobby__dhika"]["counts"]["speakerExchange"] > 0

# The two individuals are not both presumed present in a collective Twins reference:
for ep in episodes.values():
    for raw, *_ in ep["lines"]:
        if re.search(r"\bbantu\b", raw, re.I) and not re.search(r"\bbobby\b|\btwins?\b", raw, re.I):
            assert not has_name(raw, "twins")

print("PASS: 41 episodes, 55 parts, 10,450 paragraphs")
print(f"PASS: all {len(pair_ids)} character-pair indexes internally consistent")
print(f"PASS: {total_refs:,} source-linked evidence pointers checked")
print("PASS: no editorial metadata counted as direct pair evidence")
print("PASS: distinct brothers, collective Twins, separate John and Ron")
print("PASS: disambiguated explicit Uncle Iroh, mapped Old Man and Young one")
print("CAUTION: textual evidence is not independently verified physical interaction.")
