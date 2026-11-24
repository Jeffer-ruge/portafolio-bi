from pathlib import Path
import sys

from PIL import Image, ImageDraw, ImageFont, ImageOps

root = Path(__file__).resolve().parents[1]
public = root / "public"
public.mkdir(exist_ok=True)

if len(sys.argv) > 1:
    with Image.open(sys.argv[1]) as original:
        art = original.convert("RGB")
        art.resize((1200, 800), Image.Resampling.LANCZOS).save(public / "core.webp", quality=88, method=6)
        art.resize((600, 400), Image.Resampling.LANCZOS).save(public / "core-small.webp", quality=86, method=6)
        social = Image.new("RGB", (1200, 630), "#030712")
        social.paste(ImageOps.fit(art, (650, 560)), (550, 35))
        draw = ImageDraw.Draw(social)
        font_dir = Path("C:/Windows/Fonts")
        bold = ImageFont.truetype(str(font_dir / "arialbd.ttf"), 68)
        regular = ImageFont.truetype(str(font_dir / "arial.ttf"), 24)
        draw.text((64, 166), "Jefferson\nZambrano", font=bold, spacing=2, fill="#F8FAFC")
        draw.text((69, 360), "DATOS, BI Y AUTOMATIZACIÓN", font=regular, fill="#93C5FD")
        draw.line((69, 415, 168, 415), fill="#00D4FF", width=4)
        social.save(public / "social.png", optimize=True)

icon = Image.new("RGBA", (64, 64), "#07111F")
draw = ImageDraw.Draw(icon)
draw.line((19, 42, 37, 42, 37, 18), fill="#00D4FF", width=7)
draw.ellipse((44, 38, 50, 44), fill="#93C5FD")
icon.save(root / "app" / "icon.png")

