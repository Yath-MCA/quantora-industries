# Quantora Industries – Website Asset Guide (v1)

## Folder layout (inside quantora_assets.zip)
- favicon/ – favicon.ico (16/32/48/64), favicon.svg, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png (180), android-chrome-192x192.png, android-chrome-512x512.png, maskable-512x512.png, site.webmanifest
- logo/ – logo-q.png, logo-q-white.png, logo-q-navy.png, logo-full-for-dark-bg.png, logo-full-for-light-bg.png (all transparent)
- backgrounds/ – bg-navy-1920x1080.jpg, bg-navy-mobile-1080x1920.jpg, bg-light-1920x1080.jpg, bg-concrete-1920x1080.jpg
- carousel/ – 3 slides x (desktop 1920x720, mobile 1080x1350)
- social/ – og-image-1200x630.jpg, twitter-card-1200x600.jpg
- index.html – working demo (favicon links, auto carousel, responsive images)

## Colors
| Use | Hex |
|---|---|
| Navy (main) | #14306A |
| Navy dark | #09183E |
| Navy light | #1E4696 |
| Light blue (accent) | #6FA4EA |
| Blue (buttons) | #2F6FD0 |
| Silver | #E8EBF0 to #949AA4 |
| White | #FFFFFF |

Font: Poppins (Bold for titles, Regular for body).

## Paste into <head>
<link rel="icon" href="/favicon/favicon.ico" sizes="any">
<link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg">
<link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png">
<link rel="manifest" href="/favicon/site.webmanifest">
<meta name="theme-color" content="#14306A">
<meta property="og:image" content="/social/og-image-1200x630.jpg">
<meta name="twitter:card" content="summary_large_image">

## Regenerate / edit
Edit SLIDES (carousel text) in make_quantora_assets_v1.py, then run:
    pip install pillow
    python make_quantora_assets_v1.py
