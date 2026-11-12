"""Quantora Industries website asset generator (v1).
Run:  python make_quantora_assets_v1.py   (needs: pip install pillow)
Output: ./quantora_assets/ + quantora_assets.zip
"""
import os, math, json, shutil
from PIL import Image, ImageDraw, ImageFont, ImageChops

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "quantora_assets")

NAVY = (20, 48, 106)
NAVY_D = (9, 24, 62)
NAVY_L = (30, 70, 150)
BLUE = (111, 164, 234)
BLUE_D = (47, 111, 208)
SIL_HI = (232, 235, 240)
SIL_LO = (148, 154, 164)
WHITE = (255, 255, 255)

FONT_BOLD = [
    "/usr/share/fonts/truetype/google-fonts/Poppins-Bold.ttf",
    "C:/Windows/Fonts/segoeuib.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]
FONT_REG = [
    "/usr/share/fonts/truetype/google-fonts/Poppins-Regular.ttf",
    "C:/Windows/Fonts/segoeui.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
]


def font(size, bold=True):
    for p in (FONT_BOLD if bold else FONT_REG):
        if os.path.exists(p):
            return ImageFont.truetype(p, int(size))
    return ImageFont.load_default()


def mk(*parts):
    p = os.path.join(OUT, *parts)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    return p


# ---------- logo ----------
def vgrad(size, top, bottom):
    g = Image.new("RGB", (1, size))
    for y in range(size):
        t = y / (size - 1)
        g.putpixel((0, y), tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3)))
    return g.resize((size, size))


def make_q(size=1024, mono=None, accent=True):
    S = size * 2
    mask = Image.new("L", (S, S), 0)
    d = ImageDraw.Draw(mask)
    cx, cy = S * 0.46, S * 0.46
    ro, ri = S * 0.42, S * 0.27
    d.ellipse([cx - ro, cy - ro, cx + ro, cy + ro], fill=255)
    d.ellipse([cx - ri, cy - ri, cx + ri, cy + ri], fill=0)
    x1, y1, x2, y2, w = S * 0.50, S * 0.55, S * 0.88, S * 0.93, S * 0.065
    a = math.atan2(y2 - y1, x2 - x1)
    px, py = -math.sin(a) * w, math.cos(a) * w
    d.polygon([(x1 + px, y1 + py), (x2 + px, y2 + py), (x2 - px, y2 - py), (x1 - px, y1 - py)], fill=255)
    if mono:
        layer = Image.new("RGB", (S, S), mono)
    else:
        layer = vgrad(S, SIL_HI, SIL_LO)
    out = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    out.paste(layer, (0, 0), mask)
    if accent and not mono:
        m2 = Image.new("L", (S, S), 0)
        d2 = ImageDraw.Draw(m2)
        r = ri * 0.93
        d2.arc([cx - r, cy - r, cx + r, cy + r], start=95, end=215, fill=255, width=int(S * 0.045))
        out.paste(Image.new("RGB", (S, S), BLUE), (0, 0), m2)
    return out.resize((size, size), Image.LANCZOS)


def tracked(d, x, y, txt, f, fill, track):
    for ch in txt:
        d.text((x, y), ch, font=f, fill=fill)
        x += d.textlength(ch, font=f) + track
    return x


def tracked_w(d, txt, f, track):
    return sum(d.textlength(c, font=f) + track for c in txt) - track


def make_logo_full(h=400, main=WHITE, sub=BLUE):
    tmp = ImageDraw.Draw(Image.new("RGB", (10, 10)))
    f1 = font(h * 0.36)
    f2 = font(h * 0.30)
    tr1 = h * 0.012
    w1 = tracked_w(tmp, "QUANTORA", f1, tr1)
    tr2 = (w1 - tracked_w(tmp, "INDUSTRIES", f2, 0)) / 9
    gap = h * 0.08
    W = int(h + gap + w1 + h * 0.05)
    img = Image.new("RGBA", (W, h), (0, 0, 0, 0))
    img.alpha_composite(make_q(h), (0, 0))
    d = ImageDraw.Draw(img)
    tx = h + gap
    tracked(d, tx, h * 0.15, "QUANTORA", f1, main, tr1)
    tracked(d, tx, h * 0.15 + h * 0.36 * 1.22, "INDUSTRIES", f2, sub, tr2)
    return img


# ---------- backgrounds ----------
def make_bg(w, h, kind="navy"):
    rg = Image.radial_gradient("L").resize((w, h), Image.LANCZOS)
    if kind == "navy":
        base = Image.composite(Image.new("RGB", (w, h), NAVY_D), Image.new("RGB", (w, h), NAVY_L), rg)
        d = ImageDraw.Draw(base, "RGBA")
        step = max(40, w // 32)
        for x in range(-h, w, step):
            d.line([(x, h), (x + h, 0)], fill=(255, 255, 255, 7), width=2)
        return base
    if kind == "light":
        return Image.composite(Image.new("RGB", (w, h), (214, 222, 236)), Image.new("RGB", (w, h), (248, 249, 252)), rg)
    if kind == "concrete":
        base = Image.new("RGB", (w, h), (142, 144, 148))
        n1 = Image.effect_noise((w, h), 40).convert("RGB")
        n2 = Image.effect_noise((max(w // 8, 8), max(h // 8, 8)), 60).resize((w, h), Image.BICUBIC).convert("RGB")
        base = Image.blend(base, n1, 0.22)
        return Image.blend(base, n2, 0.18)
    raise ValueError(kind)


# ---------- icons ----------
def make_icon(size, maskable=False, round_corner=True):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    bg = Image.new("RGB", (size, size), NAVY)
    m = Image.new("L", (size, size), 0)
    d = ImageDraw.Draw(m)
    if maskable or not round_corner:
        d.rectangle([0, 0, size, size], fill=255)
    else:
        d.rounded_rectangle([0, 0, size - 1, size - 1], radius=int(size * 0.2), fill=255)
    img.paste(bg, (0, 0), m)
    scale = 0.56 if maskable else 0.74
    q = make_q(int(size * scale), accent=size >= 48)
    off = (size - q.width) // 2
    img.alpha_composite(q, (off, off))
    return img


FAVICON_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
<rect width="100" height="100" rx="20" fill="#14306A"/>
<circle cx="45" cy="45" r="24" fill="none" stroke="#C4C9D1" stroke-width="11"/>
<path d="M30 52 A15.5 15.5 0 0 0 46 60.5" fill="none" stroke="#6FA4EA" stroke-width="4"/>
<line x1="50" y1="54" x2="77" y2="81" stroke="#C4C9D1" stroke-width="10"/>
</svg>
"""


# ---------- carousel ----------
def wrap(d, text, f, maxw):
    words, lines, cur = text.split(), [], ""
    for wd in words:
        t = (cur + " " + wd).strip()
        if d.textlength(t, font=f) <= maxw:
            cur = t
        else:
            lines.append(cur)
            cur = wd
    lines.append(cur)
    return lines


def make_slide(w, h, title, sub, btn):
    img = make_bg(w, h, "navy").convert("RGBA")
    land = w > h
    wm = make_q(int(h * 1.05 if land else w * 0.9))
    wm.putalpha(wm.split()[3].point(lambda a: int(a * 0.13)))
    img.alpha_composite(wm, (w - wm.width + int(wm.width * 0.12), int((h - wm.height) / 2) if land else h - wm.height + int(wm.height * 0.2)))
    d = ImageDraw.Draw(img)
    u = min(w, h * 2.0)
    ft, fs, fb = font(u * 0.075), font(u * 0.032, False), font(u * 0.03)
    mx = int(w * (0.07 if land else 0.08))
    maxw = w * (0.60 if land else 0.84)
    tl = wrap(d, title, ft, maxw)
    sl = wrap(d, sub, fs, maxw)
    th, sh = int(u * 0.075 * 1.18), int(u * 0.032 * 1.5)
    bh = int(u * 0.03 * 2.6)
    total = len(tl) * th + int(u * 0.03) + len(sl) * sh + int(u * 0.045) + bh
    y = (h - total) // 2 if land else int(h * 0.12)
    for ln in tl:
        d.text((mx, y), ln, font=ft, fill=WHITE)
        y += th
    y += int(u * 0.012)
    d.rectangle([mx, y, mx + int(u * 0.09), y + max(4, int(u * 0.006))], fill=BLUE)
    y += int(u * 0.018)
    for ln in sl:
        d.text((mx, y), ln, font=fs, fill=(200, 215, 240))
        y += sh
    y += int(u * 0.045)
    bw = int(d.textlength(btn, font=fb) + u * 0.07)
    d.rounded_rectangle([mx, y, mx + bw, y + bh], radius=bh // 2, fill=BLUE_D)
    d.text((mx + bw / 2, y + bh / 2), btn, font=fb, fill=WHITE, anchor="mm")
    return img.convert("RGB")


SLIDES = [
    ("Welcome to Quantora Industries", "Chennai, Tamil Nadu", "Explore"),
    ("Visit Our Registered Office", "R60/2, South Avenue Road, Muthamizh Nagar, Kodungaiyur, Chennai 600118", "Get Directions"),
    ("Get in Touch", "Talk to us about your requirements.", "Contact Us"),
]


def main():
    if os.path.exists(OUT):
        shutil.rmtree(OUT)
    # logos
    make_q(1024).save(mk("logo", "logo-q.png"))
    make_q(1024, mono=WHITE).save(mk("logo", "logo-q-white.png"))
    make_q(1024, mono=NAVY).save(mk("logo", "logo-q-navy.png"))
    make_logo_full(400).save(mk("logo", "logo-full-for-dark-bg.png"))
    make_logo_full(400, main=NAVY, sub=BLUE_D).save(mk("logo", "logo-full-for-light-bg.png"))
    # favicons
    big = make_icon(256)
    big.save(mk("favicon", "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    make_icon(16).save(mk("favicon", "favicon-16x16.png"))
    make_icon(32).save(mk("favicon", "favicon-32x32.png"))
    make_icon(180, round_corner=False).save(mk("favicon", "apple-touch-icon.png"))
    make_icon(192).save(mk("favicon", "android-chrome-192x192.png"))
    make_icon(512).save(mk("favicon", "android-chrome-512x512.png"))
    make_icon(512, maskable=True).save(mk("favicon", "maskable-512x512.png"))
    with open(mk("favicon", "favicon.svg"), "w") as f:
        f.write(FAVICON_SVG)
    manifest = {
        "name": "Quantora Industries", "short_name": "Quantora",
        "icons": [
            {"src": "android-chrome-192x192.png", "sizes": "192x192", "type": "image/png"},
            {"src": "android-chrome-512x512.png", "sizes": "512x512", "type": "image/png"},
            {"src": "maskable-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"},
        ],
        "theme_color": "#14306A", "background_color": "#14306A", "display": "standalone",
    }
    with open(mk("favicon", "site.webmanifest"), "w") as f:
        json.dump(manifest, f, indent=2)
    # backgrounds
    make_bg(1920, 1080, "navy").save(mk("backgrounds", "bg-navy-1920x1080.jpg"), quality=88)
    make_bg(1080, 1920, "navy").save(mk("backgrounds", "bg-navy-mobile-1080x1920.jpg"), quality=88)
    make_bg(1920, 1080, "light").save(mk("backgrounds", "bg-light-1920x1080.jpg"), quality=88)
    make_bg(1920, 1080, "concrete").save(mk("backgrounds", "bg-concrete-1920x1080.jpg"), quality=88)
    # carousel
    for i, (t, s, b) in enumerate(SLIDES, 1):
        make_slide(1920, 720, t, s, b).save(mk("carousel", "slide-%d-desktop-1920x720.jpg" % i), quality=90)
        make_slide(1080, 1350, t, s, b).save(mk("carousel", "slide-%d-mobile-1080x1350.jpg" % i), quality=90)
    # social
    for (w, h, name) in [(1200, 630, "og-image-1200x630.jpg"), (1200, 600, "twitter-card-1200x600.jpg")]:
        img = make_bg(w, h, "navy").convert("RGBA")
        lg = make_logo_full(int(h * 0.34))
        img.alpha_composite(lg, ((w - lg.width) // 2, int(h * 0.26)))
        d = ImageDraw.Draw(img)
        d.text((w / 2, h * 0.78), "Reg Office | Chennai", font=font(h * 0.055, False), fill=(200, 215, 240), anchor="mm")
        img.convert("RGB").save(mk("social", name), quality=90)
    # demo page
    with open(mk("index.html"), "w", encoding="utf-8") as f:
        f.write(DEMO)
    shutil.make_archive(os.path.join(HERE, "quantora_assets"), "zip", OUT)
    print("Done:", OUT)


DEMO = """<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Quantora Industries</title>
<link rel="icon" href="favicon/favicon.ico" sizes="any">
<link rel="icon" type="image/svg+xml" href="favicon/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png">
<link rel="apple-touch-icon" href="favicon/apple-touch-icon.png">
<link rel="manifest" href="favicon/site.webmanifest">
<meta name="theme-color" content="#14306A">
<meta property="og:title" content="Quantora Industries">
<meta property="og:image" content="social/og-image-1200x630.jpg">
<meta name="twitter:card" content="summary_large_image">
<style>
body{margin:0;font-family:Poppins,Segoe UI,system-ui,sans-serif;background:#f6f8fc url(backgrounds/bg-light-1920x1080.jpg) center/cover fixed;color:#14306A}
header{background:#14306A url(backgrounds/bg-navy-1920x1080.jpg) center/cover;padding:12px 24px}
header img{height:44px}
.car{position:relative;max-width:1920px;margin:0 auto;overflow:hidden}
.car .track{display:flex;transition:transform .6s ease}
.car picture,.car img{display:block;width:100%;flex:0 0 100%}
.dots{position:absolute;bottom:12px;left:0;right:0;text-align:center}
.dots button{width:12px;height:12px;border-radius:50%;border:0;margin:0 4px;background:#ffffff88;cursor:pointer}
.dots button.on{background:#6FA4EA}
section{max-width:900px;margin:32px auto;padding:0 16px}
</style></head><body>
<header><img src="logo/logo-full-for-dark-bg.png" alt="Quantora Industries"></header>
<div class="car" id="car"><div class="track" id="track">
<picture><source media="(max-width:700px)" srcset="carousel/slide-1-mobile-1080x1350.jpg"><img src="carousel/slide-1-desktop-1920x720.jpg" alt=""></picture>
<picture><source media="(max-width:700px)" srcset="carousel/slide-2-mobile-1080x1350.jpg"><img src="carousel/slide-2-desktop-1920x720.jpg" alt=""></picture>
<picture><source media="(max-width:700px)" srcset="carousel/slide-3-mobile-1080x1350.jpg"><img src="carousel/slide-3-desktop-1920x720.jpg" alt=""></picture>
</div><div class="dots" id="dots"></div></div>
<section><h2>About</h2><p>Replace this with your content.</p></section>
<script>
var i=0,n=3,t=document.getElementById('track'),dots=document.getElementById('dots');
for(var k=0;k<n;k++){(function(k){var b=document.createElement('button');b.onclick=function(){go(k)};dots.appendChild(b)})(k)}
function go(x){i=x%n;t.style.transform='translateX('+(-100*i)+'%)';var b=dots.children;for(var j=0;j<n;j++){b[j].className=j===i?'on':''}}
go(0);setInterval(function(){go(i+1)},5000);
</script></body></html>
"""

if __name__ == "__main__":
    main()
