"""Import Taniya Episode 04B's original Google Doc inline assets, preserving their order.
No image regeneration; all manuscript prose remains byte-for-byte unchanged.
"""
import hashlib
import json
import pathlib
import time
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[2]
MANIFEST = ROOT / "Society-Wives/taniya-04b-image-import.json"
SOURCE = ROOT / "Society-Wives/episode-04b-taniya-gym-source.json"
ASSETS = ROOT / "Society-Wives/assets/episode-04b-taniya-doc"

def image_ext(data):
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return "png"
    if data.startswith(b"\xff\xd8\xff"):
        return "jpg"
    if data.startswith(b"RIFF") and data[8:12] == b"WEBP":
        return "webp"
    if data.startswith((b"GIF87a", b"GIF89a")):
        return "gif"
    raise ValueError("Not an image payload")

def get_bytes(url, idx):
    for attempt in range(3):
        try:
            req = urllib.request.Request(
                url, headers={"User-Agent": "Mozilla/5.0 (compatible; StoryDocImporter/1.0)",
                              "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8"})
            with urllib.request.urlopen(req, timeout=40) as response:
                data = response.read(16_000_001)
            if len(data) > 16_000_000 or len(data) < 2500:
                raise ValueError("Invalid source image length")
            return data, image_ext(data)
        except Exception as err:
            print("Image", idx, "attempt", attempt + 1, "failed", type(err).__name__, str(err)[:100])
            time.sleep(2)
    raise RuntimeError("Cannot download original image " + str(idx))

def main():
    m = json.loads(MANIFEST.read_text(encoding="utf-8"))
    if m.get("status") == "completed":
        print("Previously imported. No changes.")
        return
    assert m["status"] == "pending"
    assert m["docId"] == "1zcFlF9rWeIzaenBEmatt4K8bw3L-LcH3c_45JwoNM3o"
    assert m["tabId"] == "t.ev8l8ayp8dhq"
    images = m["images"]
    assert len(images) == 3
    assert [x["objectId"] for x in images] == [
        "kix.6eyh6fkvghn9", "kix.u4krv1uhskzc", "kix.hc4unnzexqdu"
    ]
    source = json.loads(SOURCE.read_text(encoding="utf-8"))
    blocks = source["scenes"][0]["blocks"]
    original_text = [b["text"] for b in blocks if b["type"] == "text"]
    source_image_ids = [b["inlineObjectId"] for b in blocks if b["type"] == "image"]
    assert source_image_ids == [x["objectId"] for x in images], "Document order mismatch"
    ASSETS.mkdir(parents=True, exist_ok=True)
    for index, item in enumerate(images, start=1):
        data, ext = get_bytes(item["contentUri"], index)
        f = ASSETS / ("taniya04b-original-%02d.%s" % (index, ext))
        f.write_bytes(data)
        item["asset"] = "assets/episode-04b-taniya-doc/" + f.name
        item["sha256"] = hashlib.sha256(data).hexdigest()
        for block in blocks:
            if block.get("inlineObjectId") == item["objectId"]:
                block["asset"] = item["asset"]
        print("Saved source image", index, f, len(data))
    assert original_text == [b["text"] for b in blocks if b["type"] == "text"]
    source["imageStatus"] = "THREE_ORIGINAL_DOC_IMAGES_IMPORTED_VERIFIED"
    source["imageOrder"] = [x["objectId"] for x in images]
    SOURCE.write_text(json.dumps(source, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for item in images:
        del item["contentUri"]
    m["status"] = "completed"
    MANIFEST.write_text(json.dumps(m, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("DONE, 3 original images imported in source order; text unchanged.")

if __name__ == "__main__":
    main()
