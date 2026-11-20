# Gravity website pass: growgravity.com (2026-11-20)

Brand: Gravity. Scope: `/` (English) and `/he` (Hebrew). Branch only; nothing merged or deployed.

## Fixed on this branch (top 3)

| # | Problem (before) | Fix | After |
|---|---|---|---|
| 1 | **Speed.** Phone first load was 4.7 MB: Sagi's photo was a 1 MB PNG shown at 100 px, Gal's 227 KB; the TidyCal booking widget pulled ~1.6 MB of scripts/styles (plus its own Google Tag Manager) before anyone scrolled to it. Fonts arrived via a CSS `@import` chain. | Founder photos re-saved as 240 px WebP (4 KB each) with width/height and lazy loading. TidyCal script now loads only when the booking section is ~800 px away (or on `#contact`). Fonts linked directly in the page head. | Phone first load **288 KB (HE) / 252 KB (EN)**, local load time 3.9 s → 1.2 s. Calendar still renders when scrolled to (checked: iframe present, 925 px tall). |
| 2 | **SEO and link previews.** No canonical URL; share image was the raw logo PNG (815 KB, URL with spaces, not 1200x630); no `twitter:image`, `og:locale`, `og:site_name`; no structured data. | Canonical per language, 1200x630 share cards in the site's current look (EN + HE), image size/alt, locale + alternate, site name, Organization JSON-LD with both founders and their LinkedIn. | WhatsApp/LinkedIn/X previews show a real card with the headline. Google gets a clear canonical and business entity. |
| 3 | **Mobile taps.** Menu button 24 px tall, language switch 22 px, footer links 12–15 px: easy to miss with a thumb. | Phone-only CSS: menu button 44 px, language buttons 36 px, footer links ~40 px rows. | Small tap targets on the Hebrew phone view: 19 → 5 (the rest are inside the cookie banner/legal links). |

## Checked, fine as is
- **Positioning:** founder-brand agency is clear; IG → IP → IA method is explained in both languages; founder names lead.
- **Hebrew RTL:** `dir="rtl"`, Heebo everywhere, arrows point the right way, no sideways scroll at 390 px.
- **One CTA:** every primary button goes to the same 45-minute strategy call (TidyCal). Newsletter is a quiet secondary link. Client login is a ghost button.

## Open (needs Sagi or Gal, not fixed)
- **No proof on the page.** The testimonials section is hidden because only placeholder quotes exist. Needs 2–3 real, attributed client quotes (name, role, company, one concrete result) and permission to use them. Not invented.
- **Cookie banner covers ~half the phone screen** on first visit (three stacked full-width buttons). Worth a compact version; legal wording untouched here.
- **Hebrew footer "תנאים" links to the English terms page.** No Hebrew terms page exists.
- **Shared team memory describes the old dark/sand look;** the live site now uses the paper/ink/red design system (shipped in the last commit). Share cards follow the live site.

## Files
- `index.html`, `he.html`: metadata, photos, lazy booking widget, font link.
- `design-system/site.css`: phone tap targets.
- `assets/og-gravity-en.png`, `assets/og-gravity-he.png`, `assets/gal-agadi-240.webp`, `assets/sagi-shrieber-240.webp`.
- `docs/agent-217/`: this audit, share-card sources, screenshots (not deployed; `.vercelignore` excludes `docs/`).
