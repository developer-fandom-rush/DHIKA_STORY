"""Import the nine original Shreya 04B inline images from the author's Google Doc.
Only downloads original contentUris; never regenerates images or modifies prose.
Triggered by the short-lived image manifest. GitHub Actions writes permanent assets.
"""
import hashlib
import json
import pathlib
import time
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[2]
MANIFEST = ROOT / "Society-Wives" / "shreya-04b-image-import.json"
SOURCE = ROOT / "Society-Wives" / "episode-04b-shreya-source.json"
ASSETS = ROOT / "Society-Wives" / "assets" / "episode-04b-shreya"


def extension(data):
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return "png"
    if data.startswith(b"\xff\xd8\xff"):
        return "jpg"
    if data.startswith(b"RIFF") and data[8:12] == b"WEBP":
        return "webp"
    if data.startswith((b"GIF87a", b"GIF89a")):
        return "gif"
    raise RuntimeError("Expected valid image bytes from Google Docs image endpoint")


def fetch_image(url, position):
    last_error = None
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": "Mozilla/5.0",
                "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
            })
            with urllib.request.urlopen(req, timeout=40) as response:
                payload = response.read(16000001)
            if len(payload) > 16000000 or len(payload) < 2500:
                raise RuntimeError("Invalid image size")
            ext = extension(payload)
            print("Downloaded original image", position, ext, len(payload), flush=True)
            return payload, ext
        except Exception as exc:
            last_error = str(exc).split("https://")[0][:180]
            print("Retry", attempt + 1, "image", position, last_error, flush=True)
            time.sleep(2)
    raise RuntimeError("Original image " + str(position) + " could not be downloaded: " + str(last_error))


def main():
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    if manifest.get("status") == "completed":
        print("Previously completed")
        return
    assert manifest["status"] == "pending"
    assert manifest["docId"] == "1zcFlF9rWeIzaenBEmatt4K8bw3L-LcH3c_45JwoNM3o"
    assert manifest["tabId"] == "t.xr77c5bqwj1p"
    entries = manifest["images"]
    assert len(entries) == 9
    source = json.loads(SOURCE.read_text(encoding="utf-8"))
    current = [b for s in source["scenes"] for b in s["blocks"] if b["type"] == "image"]
    assert len(current) == len(entries)
    assert [b["inlineObjectId"] for b in current] == [e["objectId"] for e in entries], "Image source/order mismatch"
    assert not any(b.get("asset") for b in current), "Original image paths already filled"

    originals = []
    for n, item in enumerate(entries, 1):
        payload, ext = fetch_image(item["contentUri"], n)
        name = "shreya-doc-%02d.%s" % (n, ext)
        path = ASSETS / name
        item["asset"] = "assets/episode-04b-shreya/" + name
        item["sha256"] = hashlib.sha256(payload).hexdigest()
        originals.append((path, payload))

    for block, item in zip(current, entries):
        block["asset"] = item["asset"]
    source["imageStatus"] = "ALL_9_ORIGINAL_GOOGLE_DOC_IMAGES_IMPORTED"
    source["notes"] = "Verbatim Google Doc text and nine original images, in exact paragraph/inline-object order. Text unchanged. Working manuscript, not final frozen."
    ASSETS.mkdir(parents=True, exist_ok=True)
    for path, payload in originals:
        path.write_bytes(payload)
    SOURCE.write_text(json.dumps(source, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for item in entries:
        item.pop("contentUri", None)
    manifest["status"] = "completed"
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("Imported exactly 9 original Shreya 04B images, preserved all source text", flush=True)


if __name__ == "__main__":
    main()
