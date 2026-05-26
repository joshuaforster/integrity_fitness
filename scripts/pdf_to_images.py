"""
Convert Active IQ PDF manuals to JPG page images for use in the site booklet.

Usage:
    python3 scripts/pdf_to_images.py <pdf_path> <output_folder_name>

Examples:
    python3 scripts/pdf_to_images.py "public/Level3 Diploma .pdf" level-3-diploma
    python3 scripts/pdf_to_images.py "public/Level2 Gym Instructor.pdf" level-2-gym-instructor

Output:
    public/booklet-images/<output_folder_name>/page_01.jpg, page_02.jpg, ...

The images are sized at 880x1160px (2x the flipbook page dimensions) so
they look sharp on retina screens.
"""

import sys
import os
from pathlib import Path

DPI = 150          # 150 DPI produces ~1240×1754px for A4 — more than enough
QUALITY = 85       # JPEG quality (85 is a good balance)
PUBLIC_DIR = Path(__file__).parent.parent / "public"
OUTPUT_ROOT = PUBLIC_DIR / "booklet-images"


def convert_with_pymupdf(pdf_path: Path, out_dir: Path) -> list[Path]:
    """Convert using pymupdf (fitz) — no system dependencies needed."""
    import fitz  # type: ignore

    doc = fitz.open(str(pdf_path))
    mat = fitz.Matrix(DPI / 72, DPI / 72)
    saved: list[Path] = []

    for i, page in enumerate(doc):
        pix = page.get_pixmap(matrix=mat, alpha=False)
        out_path = out_dir / f"page_{i + 1:02d}.jpg"
        pix.save(str(out_path))
        saved.append(out_path)
        print(f"  page {i + 1:02d} → {out_path.relative_to(PUBLIC_DIR.parent)}")

    return saved


def convert_with_pdf2image(pdf_path: Path, out_dir: Path) -> list[Path]:
    """Convert using pdf2image + poppler (install: brew install poppler)."""
    from pdf2image import convert_from_path  # type: ignore

    pages = convert_from_path(str(pdf_path), dpi=DPI)
    saved: list[Path] = []

    for i, img in enumerate(pages):
        out_path = out_dir / f"page_{i + 1:02d}.jpg"
        img.save(str(out_path), "JPEG", quality=QUALITY)
        saved.append(out_path)
        print(f"  page {i + 1:02d} → {out_path.relative_to(PUBLIC_DIR.parent)}")

    return saved


def main() -> None:
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)

    pdf_path = Path(sys.argv[1])
    if not pdf_path.is_absolute():
        pdf_path = Path(__file__).parent.parent / pdf_path

    folder_name = sys.argv[2]
    out_dir = OUTPUT_ROOT / folder_name

    if not pdf_path.exists():
        print(f"Error: PDF not found at {pdf_path}")
        sys.exit(1)

    out_dir.mkdir(parents=True, exist_ok=True)
    print(f"\nConverting: {pdf_path.name}")
    print(f"Output:     {out_dir.relative_to(PUBLIC_DIR.parent)}\n")

    try:
        import fitz  # noqa: F401
        pages = convert_with_pymupdf(pdf_path, out_dir)
    except ImportError:
        try:
            pages = convert_with_pdf2image(pdf_path, out_dir)
        except ImportError:
            print("Error: install pymupdf or pdf2image+poppler:")
            print("  pip install pymupdf")
            print("  -- or --")
            print("  brew install poppler && pip install pdf2image")
            sys.exit(1)

    print(f"\nDone — {len(pages)} pages saved to {out_dir.relative_to(PUBLIC_DIR.parent)}/")
    print("\nTo reference an image in Next.js:")
    print(f'  src="/booklet-images/{folder_name}/page_01.jpg"')


if __name__ == "__main__":
    main()
