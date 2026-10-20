# growgravity.com improvement pass — 2026-10-20 (job #75)

Branch: `agent/75-website-pass`. Not merged, not deployed.

## Fixed (top 3)
1. **Hebrew meta tags were broken.** `מנכ"לים` put a raw `"` inside `content="…"`, truncating `description` and `twitter:description` on /he (Google/WhatsApp previews cut mid-word). Now escaped. Also added `og:locale`, `og:site_name`, and canonical URLs on both pages.
2. **Fonts the design asks for were never loaded.** Pages use Urbanist + Playfair Display, but only Inter/Heebo were loaded, via a render-blocking CSS `@import` in `tokens.css`, so visitors saw fallback fonts. Now Urbanist, Playfair (and Heebo on /he) load through `<link>` with `display=swap`; the `@import` is removed. /he headings use Heebo, which has Hebrew glyphs (Playfair does not).
3. **Page weight and share image.** Profile photos 1,014 KB + 227 KB → 22 KB each (JPG 440px, width/height set, lazy). OG image was an 815 KB PNG with spaces in the URL → clean 23 KB 1200×630 `og-gravity.jpg`. Added `ProfessionalService` JSON-LD (en + he).

## Still open (not done, needs Sagi/Gal)
- **Proof:** the testimonials section is correctly hidden (no fabricated quotes), but the page has zero proof: no client names, logos, results or numbers. Biggest conversion gap. Need 2–3 real attributed quotes or outcomes.
- **Positioning:** hero says "premium advisory"; brief says founder-brand agency with IG/IP/IA. The IG→IP→IA method is clear in the body; consider naming it in the hero/meta title.
- **CTA:** one CTA (strategy call) is consistent, but the page has a second path (The Weekly) and "Client Login" in the header; fine, just keep the call dominant.
- No `sitemap.xml`/`robots.txt`; `script.js` is dead code (targets `.navbar`, not loaded); `assets/optional assets` has ~8 MB of unused PNGs; `styles.css` unused. Safe cleanups for a later pass.
- Lighthouse was not run (no preview URL; deploy workflow is production-only).
