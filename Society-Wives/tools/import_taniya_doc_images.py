"""One-shot import: transfer actual Google Doc Taniya inline images into GitHub Pages.
The manifest contains short-lived Google Docs signed contentUri values. No image regeneration.
"""
import hashlib
import json
import pathlib
import sys
import time
import urllib.error
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[2]
MANIFEST = ROOT / "Society-Wives" / "taniya-image-import.json"
SOURCE = ROOT / "Society-Wives" / "episode-04a-taniya-soniya-source.json"
ASSETS = ROOT / "Society-Wives" / "assets" / "episode-04a-taniya"

def extension(data):
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return "png"
    if data.startswith(b"\xff\xd8\xff"):
        return "jpg"
    if data.startswith(b"RIFF") and data[8:12] == b"WEBP":
        return "webp"
    if data.startswith((b"GIF87a", b"GIF89a")):
        return "gif"
    raise RuntimeError("Docs image endpoint did not return a valid image")

def fetch_image(url, position):
    last = None
    for trial in range(3):
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": "Mozilla/5.0 (compatible; StoryImageImport/1.0)",
                "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
            })
            with urllib.request.urlopen(req, timeout=40) as response:
                data = response.read(16_000_001)
            if len(data) > 16_000_000:
                raise RuntimeError("Image too large")
            if len(data) < 2500:
                raise RuntimeError("Image unexpectedly tiny")
            ext = extension(data)
            print("Fetched image", position, "format", ext, "bytes", len(data))
            return data, ext
        except Exception as exc:
            last = str(exc).split("https://")[0][:180]
            print("Download attempt", trial + 1, "for image", position, "failed:", last, flush=True)
            time.sleep(2)
    raise RuntimeError("Could not download document image " + str(position) + ": " + str(last))

def add_image_records(source, entries):
    scenes = {x["id"]: x for x in source["scenes"]}
    assert set(["03", "05"]).issubset(scenes)
    assert not any(b.get("documentInlineObjectId") for x in scenes.values() for b in x["blocks"]), "Images already imported"
    assert len(entries) == 8
    img = {}
    for n, e in enumerate(entries, 1):
        img[n] = {
            "type": "image",
            "src": e["asset"],
            "alt": "Episode 04A " + ("Soniya and Guddu" if n <= 2 else "Taniya and Rahul") + " — original Google Doc illustration " + str(n),
            "documentInlineObjectId": e["objectId"],
        }
    old3 = scenes["03"]["blocks"]
    original_text_3 = [b.get("text") for b in old3 if b["type"] == "text"]
    loc = [n for n, b in enumerate(old3) if b.get("style") == "AUTHOR_PROVIDED_VERBATIM" and b.get("text", "").startswith("Soniya ne doorway mein ek kadam aage badhaya")]
    assert len(loc) == 1, "Scene 03 Soniya passage not found"
    at = loc[0]
    scenes["03"]["blocks"] = old3[:at] + [img[1], old3[at], img[2]] + old3[at+1:]
    assert original_text_3 == [b.get("text") for b in scenes["03"]["blocks"] if b["type"] == "text"]

    old5 = scenes["05"]["blocks"]
    original_text_5 = [b.get("text") for b in old5 if b["type"] == "text"]
    after = {
        "Taniya: “Jiju? Aap? Di kahaan hain?”": 4,
        "**Taniya:** “Charger toh nahi dikh raha. Kuch aur dekh rahe ho?”": 5,
        "Rahul uske peeche ek step badha.": 6,
        "Taniya ki aankhein khul gayin.": 7,
        "Room andhera tha. Door band tha.": 8,
    }
    new5 = []
    placed = [1, 2]
    for b in old5:
        txt = b.get("text", "").strip()
        if txt == "LATER THAT NIGHT":
            new5.append(img[3])
            placed.append(3)
        new5.append(b)
        for anchor, number in after.items():
            if txt == anchor or (number in (6, 8) and txt.startswith(anchor)):
                new5.append(img[number])
                placed.append(number)
    assert sorted(placed) == list(range(1, 9)), "Document image anchor mismatch " + str(placed)
    assert original_text_5 == [b.get("text") for b in new5 if b["type"] == "text"]
    scenes["05"]["blocks"] = new5
    source.setdefault("notes", {})["googleDocInlineImages"] = {
        "status": "ORIGINAL_EMBEDDED_ASSETS_IMPORTED",
        "tabId": "t.265eheolgvsu",
        "count": 8,
        "scene03": 2,
        "scene05": 6,
        "order": [e["objectId"] for e in entries],
        "noProseChanges": True,
    }
    return source

def main():
    m = json.loads(MANIFEST.read_text(encoding="utf-8"))
    if m.get("status") == "completed":
        print("Previously imported, nothing to do.")
        return
    assert m["status"] == "pending"
    assert m["docId"] == "1zcFlF9rWeIzaenBEmatt4K8bw3L-LcH3c_45JwoNM3o"
    entries = m["images"]
    assert len(entries) == 8
    ASSETS.mkdir(parents=True, exist_ok=True)
    temporary = []
    for n, record in enumerate(entries, 1):
        data, ext = fetch_image(record["contentUri"], n)
        file_path = ASSETS / ("doc-taniya-%02d." % n + ext)
        temporary.append((file_path, data))
        record["asset"] = "assets/episode-04a-taniya/" + file_path.name
        record["sha256"] = hashlib.sha256(data).hexdigest()
    source = json.loads(SOURCE.read_text(encoding="utf-8"))
    source = add_image_records(source, entries)
    for file_path, data in temporary:
        file_path.write_bytes(data)
    SOURCE.write_text(json.dumps(source, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for record in entries:
        record.pop("contentUri", None)
    m["status"] = "completed"
    MANIFEST.write_text(json.dumps(m, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("DONE: 8 Google Doc originals inserted in reader sequence; prior text unchanged.")

if __name__ == "__main__":
    main()
