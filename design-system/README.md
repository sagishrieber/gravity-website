# Gravity design system

The book artwork translated into a reusable web system. Preview `/design-system.html`; the English and Hebrew homepages demonstrate it in use.

## Files

- `tokens.css`: source of truth for colors, semantic theme mappings, fonts, spacing, motion, and layout tokens.
- `site.css`: shared buttons, cards, forms, headings, orbital geometry, responsive page layouts, and RTL behavior.
- `tokens.json`: portable token values for future design and code tools.
- `specimen.css`: layout for the design-system reference page only.

Include `tokens.css` and then `site.css` **after** existing layout CSS. Current pages keep their original structural styles so the redesign can be reviewed independently of functional changes. Future pages should use the shared foundations directly and avoid adding duplicate visual constants.

## Visual principles

Warm paper is the canvas. Black is the primary content and action color. Red identifies the center of gravity or a meaningful emphasis. Pale lines explain relationships without competing with the idea. Use space, thin rules, large sans-serif headings, and numbered steps.

Avoid gradients, glow, shadows, emoji, and decorative imagery. Diagrams must explain a point. Black dots represent opportunities/assets, solid red represents the founder or core idea, rings represent increasing influence, and dashed arrows show movement. Give each diagram an accessible description. Decorative geometry is hidden from assistive technology.

## Typography and bilingual layouts

Inter for English, Heebo for Hebrew, Arial fallback. Display: 42–68px / 1.04 / weight 800. Section headings: 32–52px / 1.12 / weight 700. Body: 14–17px / 1.65–1.8 / weight 400. Labels: 10px / weight 700 / .16em tracking. Hebrew uses native RTL and logical start/end borders. Keep diagram relationships intact when changing language.

## Layout and components

Maximum content width: 1200px. Gutters: 32px desktop, 24px mobile. Section spacing: 96px desktop, 64px mobile. Use the 4px spacing scale. Rectangular cards have 1px rules, no shadows; controls have 4px corners and at least 44px height. Primary actions are black, with red hover. Preserve visible focus and native HTML controls.

## Theme and accessibility

Components consume semantic variables, never raw theme-dependent colors. Light accent text uses #E3170A; dark accent text uses #FF6357. Decorative focus dots retain the original brand red in either theme. Pale rules are decorative; do not use them for text. Minimum font sizes are not a substitute for user zoom: ensure content reflows on small screens. Diagrams are static. Control transitions are 180ms; honor prefers-reduced-motion.

## Existing integrations

Language preference, theme preference, TidyCal, Substack, cookie consent, accessibility controls, and webinar APIs retain their current behavior. The webinar page generator attaches the shared styles after its inline layout styles. The theme of external TidyCal/Substack embeds is controlled by those providers.
