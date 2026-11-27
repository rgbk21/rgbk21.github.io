from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import quote
import xml.etree.ElementTree as ET

SITE_DIR = Path(".")
BASE_URL = "https://rgbk21.github.io"
OUTPUT_FILE = SITE_DIR / "sitemap.xml"
EXCLUDE_DIRS = {".git", ".github", "node_modules", "__pycache__"}
EXCLUDE_FILES = {"404.html", "google_verification.html"}


def path_to_url(file_path: Path, root_dir: Path, base_url: str) -> str:
    rel = file_path.relative_to(root_dir).as_posix()
    root = base_url.rstrip("/")
    if rel == "index.html":
        return f"{root}/"
    if rel.endswith("/index.html"):
        folder = quote(rel[: -len("index.html")], safe="/")
        return f"{root}/{folder}"
    encoded = quote(rel, safe="/")
    return f"{root}/{encoded}"


def main() -> None:
    ns = "http://www.sitemaps.org/schemas/sitemap/0.9"
    ET.register_namespace("", ns)
    urlset = ET.Element(f"{{{ns}}}urlset")

    html_files = sorted(
        p for p in SITE_DIR.rglob("*.html")
        if not (set(p.parts) & EXCLUDE_DIRS) and p.name not in EXCLUDE_FILES
    )

    for file_path in html_files:
        url_el = ET.SubElement(urlset, f"{{{ns}}}url")
        loc_el = ET.SubElement(url_el, f"{{{ns}}}loc")
        loc_el.text = path_to_url(file_path, SITE_DIR, BASE_URL)

        mtime = datetime.fromtimestamp(file_path.stat().st_mtime, tz=timezone.utc).strftime("%Y-%m-%d")
        lastmod_el = ET.SubElement(url_el, f"{{{ns}}}lastmod")
        lastmod_el.text = mtime

    tree = ET.ElementTree(urlset)
    ET.indent(tree, space="  ")
    tree.write(OUTPUT_FILE, encoding="utf-8", xml_declaration=True)
    print(f"Wrote {len(html_files)} URLs to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()