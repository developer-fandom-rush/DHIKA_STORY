"""Download the four original Ankita 04B Google Doc inline illustrations.
The image manifest is a one-use transfer list; this never generates new imagery or rewrites prose.
"""
import hashlib
import json
import pathlib
import time
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[2]
MANIFEST = ROOT / "Society-Wives" / "ankita-04b-image-import.json"
ASSETS = ROOT / "Society-Wives" / "assets" / "episode-04b-ankita"

def image_extension(data):
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return "png"
    if data.startswith(b"\xff\xd8\xff"):
        return "jpg"
    if data.startswith(b"RIFF") and data[8:12] == b"WEBP":
        return "webp"
    raise ValueError("Not a supported image")

def download_image(url, number):
    error = None
    for attempt in range(3):
        try:
            request = urllib.request.Request(url, headers={"User-Agent":"Mozilla/5.0", "Accept":"image/*"})
            with urllib.request.urlopen(request, timeout=40) as response:
                payload = response.read(16000001)
            if not 2500 < len(payload) <= 16000000:
                raise ValueError("Unexpected image size")
            return payload, image_extension(payload)
        except Exception as exc:
            error = str(exc).split("https://")[0][:150]
            print("retry image", number, attempt + 1, error, flush=True)
            time.sleep(2)
    raise RuntimeError("Could not transfer original image " + str(number) + ": " + str(error))

def main():
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    if data["status"] == "completed":
        print("Already imported")
        return
    assert data["status"] == "pending"
    assert data["tabId"] == "t.ouch4dqht9mi"
    assert len(data["images"]) == 4
    output = []
    for n, item in enumerate(data["images"], 1):
        payload, ext = download_image(item["contentUri"], n)
        asset = "assets/episode-04b-ankita/ankita-doc-%02d.%s" % (n, ext)
        item["asset"] = asset
        item["sha256"] = hashlib.sha256(payload).hexdigest()
        output.append((ROOT / "Society-Wives" / asset, payload))
    for target, payload in output:
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(payload)
    for item in data["images"]:
        item.pop("contentUri", None)
    data["status"] = "completed"
    MANIFEST.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("Imported all four original Ankita 04B illustrations", flush=True)

if __name__ == "__main__":
    main()
