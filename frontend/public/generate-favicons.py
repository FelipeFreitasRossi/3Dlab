"""
Gera os arquivos de favicon a partir de logo-original.jpg.
Rodar uma vez: python generate-favicons.py
"""
from pathlib import Path
from PIL import Image, ImageOps


def make_square(img: Image.Image, fill=(10, 10, 11)) -> Image.Image:
    """Recorta/padroniza para quadrado, mantendo a proporção."""
    return ImageOps.pad(
        img.convert("RGB"),
        size=(max(img.width, img.height),) * 2,
        color=fill,
        centering=(0.5, 0.5),
    )


def main() -> None:
    base = Path(__file__).parent
    src = base / "logo-original.jpg"

    if not src.exists():
        raise SystemExit(f"[erro] Não encontrei {src}. Baixe a logo primeiro.")

    img = make_square(Image.open(src))

    # PNG principal do site (usado em Header/Footer)
    img.resize((256, 256), Image.LANCZOS).save(
        base / "logo.jpg", "JPEG", quality=92
    )

    # Favicons PNG
    img.resize((16, 16), Image.LANCZOS).save(base / "favicon-16x16.png", "PNG")
    img.resize((32, 32), Image.LANCZOS).save(base / "favicon-32x32.png", "PNG")
    img.resize((48, 48), Image.LANCZOS).save(base / "favicon-48x48.png", "PNG")

    # Apple touch icon (iPhone/iPad adicionar à home)
    img.resize((180, 180), Image.LANCZOS).save(
        base / "apple-touch-icon.png", "PNG"
    )

    # Android Chrome
    img.resize((192, 192), Image.LANCZOS).save(
        base / "android-chrome-192x192.png", "PNG"
    )
    img.resize((512, 512), Image.LANCZOS).save(
        base / "android-chrome-512x512.png", "PNG"
    )

    # favicon.ico multi-tamanho (16, 32, 48)
    img.resize((48, 48), Image.LANCZOS).save(
        base / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )

    print("[ok] Arquivos gerados:")
    for f in sorted(base.glob("*icon*")) + [base / "logo.jpg"]:
        if f.exists():
            print(f"  - {f.name} ({f.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()