/* Gravity — accessibility widget + cookie consent (vanilla, no deps).
   One file, added to every page via <script src="/compliance.js" defer></script>.
   Detects language from <html lang> (en/he) and renders RTL for Hebrew.
   Israeli-law oriented: IS 5568 / WCAG 2.0 AA accessibility menu + a consent banner. */
(function () {
  "use strict";
  if (window.__gravityCompliance) return;
  window.__gravityCompliance = true;

  var LANG = (document.documentElement.getAttribute("lang") || "en").toLowerCase().indexOf("he") === 0 ? "he" : "en";
  var RTL = LANG === "he";

  // ── Localized strings ─────────────────────────────────────────────────────
  var T = {
    en: {
      a11yOpen: "Accessibility menu", a11yTitle: "Accessibility", a11ySub: "Adjust the site to your needs",
      textSize: "Text size", inc: "Increase text size", dec: "Decrease text size",
      contrast: "Color & contrast", high: "High contrast", invert: "Invert colors", gray: "Grayscale", light: "Light background",
      content: "Content", links: "Highlight links", underline: "Underline links", readable: "Readable font",
      headings: "Highlight headings", cursor: "Bigger cursor", motion: "Motion", stop: "Stop animations",
      reset: "Reset all settings", statement: "Accessibility statement", close: "Close",
      ccTitle: "We value your privacy",
      ccBody: "We use cookies to run the site, and — only with your consent — to understand usage and improve it.",
      accept: "Accept all", reject: "Reject all", manage: "Manage preferences", save: "Save preferences",
      settings: "Cookie preferences", necessary: "Strictly necessary",
      necessaryD: "Required for the site to work and to remember your choices. Always on.",
      analytics: "Analytics", analyticsD: "Help us understand usage so we can improve the site. Loaded only if you allow them.",
      marketing: "Marketing", marketingD: "Used to measure and personalize campaigns. Loaded only if you allow them.",
      always: "Always on", privacy: "Privacy Policy", cookie: "Cookie Policy",
      statementUrl: "/accessibility.html", privacyUrl: "/privacy.html", cookieUrl: "/cookie-policy.html"
    },
    he: {
      a11yOpen: "תפריט נגישות", a11yTitle: "נגישות", a11ySub: "התאמת האתר לצרכים שלך",
      textSize: "גודל טקסט", inc: "הגדלת טקסט", dec: "הקטנת טקסט",
      contrast: "צבע וניגודיות", high: "ניגודיות גבוהה", invert: "היפוך צבעים", gray: "גווני אפור", light: "רקע בהיר",
      content: "תוכן", links: "הדגשת קישורים", underline: "קו תחתון לקישורים", readable: "גופן קריא",
      headings: "הדגשת כותרות", cursor: "סמן גדול", motion: "אנימציות", stop: "עצירת אנימציות",
      reset: "איפוס כל ההגדרות", statement: "הצהרת נגישות", close: "סגירה",
      ccTitle: "הפרטיות שלך חשובה לנו",
      ccBody: "אנו משתמשים בעוגיות לתפעול האתר, ורק בהסכמתך — כדי להבין את השימוש ולשפר אותו.",
      accept: "אישור הכול", reject: "דחיית הכול", manage: "ניהול העדפות", save: "שמירת העדפות",
      settings: "העדפות עוגיות", necessary: "הכרחיות",
      necessaryD: "נדרשות לתפקוד האתר ולזכירת הבחירות שלך. פעיל תמיד.",
      analytics: "אנליטיקה", analyticsD: "עוזרות לנו להבין את השימוש כדי לשפר את האתר. נטענות רק אם תאשר.",
      marketing: "שיווק", marketingD: "משמשות למדידה והתאמה אישית של קמפיינים. נטענות רק אם תאשר.",
      always: "פעיל תמיד", privacy: "מדיניות פרטיות", cookie: "מדיניות עוגיות",
      statementUrl: "/accessibility-he.html", privacyUrl: "/privacy.html", cookieUrl: "/cookie-policy-he.html"
    }
  }[LANG];

  var DIR = RTL ? "rtl" : "ltr";
  var FONT_STEPS = [1, 1.1, 1.25, 1.4, 1.6];

  // ── Styles ────────────────────────────────────────────────────────────────
  var css = `
  html { zoom: var(--g-a11y-scale, 1); filter: var(--g-a11y-filter, none); }
  html[data-g-links] a { outline:2px solid #C08A2D !important; outline-offset:2px; background:rgba(192,138,45,.14)!important; font-weight:700!important; border-radius:2px; }
  html[data-g-underline] a { text-decoration:underline !important; text-underline-offset:2px; }
  html[data-g-readable] body, html[data-g-readable] body * { font-family:Arial,"Helvetica Neue",Helvetica,sans-serif !important; letter-spacing:normal !important; line-height:1.6 !important; }
  html[data-g-headings] h1, html[data-g-headings] h2, html[data-g-headings] h3, html[data-g-headings] h4, html[data-g-headings] h5, html[data-g-headings] h6 { outline:2px dashed #2f7db3 !important; outline-offset:3px; }
  html[data-g-cursor], html[data-g-cursor] * { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'%3E%3Cpath d='M4 2l16 8-6 2-2 6z' fill='white' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E") 4 2, auto !important; }
  html[data-g-lightbg] body { background:#ffffff !important; }
  html[data-g-lightbg] body p, html[data-g-lightbg] body span, html[data-g-lightbg] body a, html[data-g-lightbg] body li, html[data-g-lightbg] body h1, html[data-g-lightbg] body h2, html[data-g-lightbg] body h3, html[data-g-lightbg] body h4, html[data-g-lightbg] body h5, html[data-g-lightbg] body h6 { color:#111 !important; }
  html[data-g-nomotion] *, html[data-g-nomotion] *::before, html[data-g-nomotion] *::after { animation-duration:.001ms !important; animation-iteration-count:1 !important; transition-duration:.001ms !important; scroll-behavior:auto !important; }

  .g-fab { position:fixed; bottom:20px; inset-inline-start:20px; z-index:2147483000; width:52px; height:52px; border-radius:9999px; display:flex; align-items:center; justify-content:center; background:#1a1410; color:#F5F0ED; border:2px solid #F5F0ED; box-shadow:0 6px 24px -6px rgba(26,20,16,.5); cursor:pointer; transition:transform .2s, box-shadow .2s; }
  .g-fab:hover { transform:scale(1.06); }
  .g-fab:focus-visible, .g-c *:focus-visible { outline:3px solid #7A5C4A; outline-offset:3px; }
  .g-scrim { position:fixed; inset:0; z-index:2147483000; background:rgba(26,20,16,.4); }
  .g-panel { position:fixed; z-index:2147483001; bottom:20px; inset-inline-start:20px; width:340px; max-width:calc(100vw - 40px); max-height:calc(100vh - 40px); display:flex; flex-direction:column; background:#FFFFFF; color:#1a1410; border:1px solid #D8CFC9; border-radius:16px; box-shadow:0 24px 64px -16px rgba(26,20,16,.4); font-family:Urbanist,system-ui,sans-serif; overflow:hidden; }
  .g-head { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; padding:18px 18px 12px; border-bottom:1px solid #EDE6E1; }
  .g-title { margin:0; font-size:18px; font-weight:700; }
  .g-sub { margin:2px 0 0; font-size:12.5px; color:rgba(26,20,16,.6); }
  .g-x { flex-shrink:0; width:32px; height:32px; border-radius:8px; background:#F5F0ED; color:#1a1410; border:1px solid #D8CFC9; cursor:pointer; font-size:14px; }
  .g-body { padding:8px 14px 14px; overflow-y:auto; }
  .g-grp { margin-top:12px; }
  .g-grp-t { margin:0 0 6px; font-size:11px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:rgba(26,20,16,.5); }
  .g-step { display:flex; align-items:center; gap:8px; }
  .g-step button { flex:1; min-height:44px; border-radius:10px; background:#F5F0ED; color:#1a1410; border:1px solid #D8CFC9; font-size:16px; font-weight:700; cursor:pointer; }
  .g-step button:disabled { opacity:.4; cursor:not-allowed; }
  .g-step span { min-width:52px; text-align:center; font-size:14px; }
  .g-row { width:100%; min-height:44px; display:flex; align-items:center; justify-content:space-between; gap:12px; padding:8px 12px; margin-top:6px; border-radius:10px; background:#F7F3F0; color:#1a1410; border:1px solid #EDE6E1; font-size:14px; text-align:start; cursor:pointer; }
  .g-row:hover { background:#EDE6E1; }
  .g-row[data-on] { background:rgba(122,92,74,.14); border-color:#7A5C4A; }
  .g-ind { flex-shrink:0; width:22px; height:22px; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:13px; background:#7A5C4A; color:#fff; opacity:0; }
  .g-row[data-on] .g-ind { opacity:1; }
  .g-foot { display:flex; flex-direction:column; gap:8px; padding:12px 14px 16px; border-top:1px solid #EDE6E1; }
  .g-reset { min-height:44px; border-radius:10px; background:#1a1410; color:#F5F0ED; border:none; font-weight:600; font-size:14px; cursor:pointer; }
  .g-stmt { text-align:center; font-size:13px; color:#7A5C4A; text-decoration:underline; }
  @media (max-width:520px){ .g-panel{ inset-inline:0; bottom:0; width:100%; max-width:100%; max-height:88vh; border-radius:18px 18px 0 0; } }

  .g-banner { position:fixed; z-index:2147482000; inset-inline:0; bottom:0; background:#FFFFFF; border-top:1px solid #D8CFC9; box-shadow:0 -12px 40px -16px rgba(26,20,16,.3); font-family:Urbanist,system-ui,sans-serif; }
  .g-banner-in { max-width:1160px; margin:0 auto; padding:18px 20px calc(18px + env(safe-area-inset-bottom)); padding-inline-start:88px; display:flex; align-items:center; justify-content:space-between; gap:18px; }
  .g-cc-title { margin:0 0 4px; font-size:15px; font-weight:700; color:#1a1410; }
  .g-cc-body { margin:0; font-size:13px; line-height:1.5; color:rgba(26,20,16,.7); max-width:720px; }
  .g-cc-body a { color:#1a1410; text-decoration:underline; }
  .g-actions { display:flex; gap:10px; flex-shrink:0; }
  .g-btn { min-height:44px; padding:0 20px; border-radius:9999px; font-family:inherit; font-size:14px; font-weight:600; cursor:pointer; white-space:nowrap; border:1px solid transparent; }
  .g-ghost { background:transparent; color:#1a1410; border-color:#D8CFC9; }
  .g-ghost:hover { border-color:#7A5C4A; background:rgba(122,92,74,.08); }
  .g-solid { background:#1a1410; color:#F5F0ED; }
  .g-dialog { position:fixed; z-index:2147482002; top:50%; left:50%; transform:translate(-50%,-50%); width:460px; max-width:calc(100vw - 32px); max-height:calc(100vh - 32px); display:flex; flex-direction:column; background:#FFFFFF; color:#1a1410; border:1px solid #D8CFC9; border-radius:16px; font-family:Urbanist,system-ui,sans-serif; overflow:hidden; }
  .g-dialog-h { display:flex; align-items:center; justify-content:space-between; padding:18px 18px 12px; border-bottom:1px solid #EDE6E1; }
  .g-dialog-h h2 { margin:0; font-size:18px; font-weight:700; }
  .g-dialog-b { padding:8px 18px 4px; overflow-y:auto; }
  .g-cat { padding:14px 0; border-bottom:1px solid #EDE6E1; }
  .g-cat-h { display:flex; align-items:center; justify-content:space-between; gap:12px; }
  .g-cat-t { font-size:15px; font-weight:600; }
  .g-cat-d { margin:6px 0 0; font-size:12.5px; line-height:1.5; color:rgba(26,20,16,.65); }
  .g-always { font-size:12px; font-weight:600; color:#2e7d5b; }
  .g-sw { position:relative; display:inline-block; width:46px; height:26px; flex-shrink:0; }
  .g-sw input { position:absolute; opacity:0; width:100%; height:100%; margin:0; cursor:pointer; }
  .g-sl { position:absolute; inset:0; border-radius:9999px; background:#D8CFC9; transition:background .2s; }
  .g-sl::before { content:""; position:absolute; height:20px; width:20px; inset-inline-start:3px; top:3px; border-radius:50%; background:#fff; transition:transform .2s; }
  .g-sw input:checked + .g-sl { background:#7A5C4A; }
  .g-sw input:checked + .g-sl::before { transform:translateX(20px); }
  [dir="rtl"] .g-sw input:checked + .g-sl::before { transform:translateX(-20px); }
  .g-dialog-f { display:flex; gap:10px; justify-content:flex-end; padding:14px 18px 18px; border-top:1px solid #EDE6E1; }
  @media (max-width:720px){ .g-banner-in{ flex-direction:column; align-items:stretch; padding-inline-start:20px; padding-bottom:calc(78px + env(safe-area-inset-bottom)); gap:14px; } .g-actions{ flex-direction:column; } .g-btn{ width:100%; } .g-dialog-f{ flex-direction:column-reverse; } .g-dialog-f .g-btn{ width:100%; } }
  `;
  var style = document.createElement("style");
  style.id = "g-compliance-css";
  style.textContent = css;
  document.head.appendChild(style);

  var root = document.createElement("div");
  root.className = "g-c";
  root.setAttribute("dir", DIR);
  document.body.appendChild(root);

  function el(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }

  // ── Accessibility settings ────────────────────────────────────────────────
  var A_KEY = "g-a11y";
  var defaults = { scale:1, high:false, invert:false, gray:false, light:false, links:false, underline:false, readable:false, headings:false, cursor:false, nomotion:false };
  var a = load(A_KEY, defaults);

  function load(k, def) { try { var r = localStorage.getItem(k); return r ? Object.assign({}, def, JSON.parse(r)) : Object.assign({}, def); } catch (e) { return Object.assign({}, def); } }
  function saveA() { try { localStorage.setItem(A_KEY, JSON.stringify(a)); } catch (e) {} }

  function applyA() {
    var h = document.documentElement;
    h.style.setProperty("--g-a11y-scale", String(a.scale));
    var f = [];
    if (a.high) f.push("contrast(1.35)");
    if (a.gray) f.push("grayscale(1)");
    if (a.invert) f.push("invert(1) hue-rotate(180deg)");
    h.style.setProperty("--g-a11y-filter", f.length ? f.join(" ") : "none");
    toggleAttr(h, "data-g-lightbg", a.light);
    toggleAttr(h, "data-g-links", a.links);
    toggleAttr(h, "data-g-underline", a.underline);
    toggleAttr(h, "data-g-readable", a.readable);
    toggleAttr(h, "data-g-headings", a.headings);
    toggleAttr(h, "data-g-cursor", a.cursor);
    toggleAttr(h, "data-g-nomotion", a.nomotion);
  }
  function toggleAttr(node, name, on) { if (on) node.setAttribute(name, ""); else node.removeAttribute(name); }
  applyA();

  // Build the FAB + panel
  var fab = el('<button class="g-fab" aria-haspopup="dialog" aria-expanded="false" aria-label="' + T.a11yOpen + '" title="' + T.a11yOpen + '"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="6.4" r="1.5" fill="currentColor"/><path d="M5.5 9.2c2 .8 4.2 1.2 6.5 1.2s4.5-.4 6.5-1.2M12 10.4v4m0 0-2.4 5.2M12 14.4l2.4 5.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>');
  root.appendChild(fab);

  var panel = null, scrim = null;
  var rows = [
    { k:"high", label:T.high, sec:T.contrast }, { k:"invert", label:T.invert, sec:T.contrast },
    { k:"gray", label:T.gray, sec:T.contrast }, { k:"light", label:T.light, sec:T.contrast },
    { k:"links", label:T.links, sec:T.content }, { k:"underline", label:T.underline, sec:T.content },
    { k:"readable", label:T.readable, sec:T.content }, { k:"headings", label:T.headings, sec:T.content },
    { k:"cursor", label:T.cursor, sec:T.content }, { k:"nomotion", label:T.stop, sec:T.motion }
  ];
  var sections = [T.contrast, T.content, T.motion];

  function openPanel() {
    if (panel) return;
    scrim = el('<div class="g-scrim"></div>');
    scrim.addEventListener("click", closePanel);
    root.appendChild(scrim);

    var groups = '';
    groups += '<div class="g-grp"><p class="g-grp-t">' + T.textSize + '</p><div class="g-step"><button data-dec aria-label="' + T.dec + '">A−</button><span data-pct></span><button data-inc aria-label="' + T.inc + '">A+</button></div></div>';
    sections.forEach(function (sec) {
      groups += '<div class="g-grp"><p class="g-grp-t">' + sec + '</p>';
      rows.filter(function (r) { return r.sec === sec; }).forEach(function (r) {
        groups += '<button class="g-row" role="switch" data-k="' + r.k + '"><span>' + r.label + '</span><span class="g-ind" aria-hidden="true">✓</span></button>';
      });
      groups += '</div>';
    });

    panel = el('<div class="g-panel" role="dialog" aria-modal="true" aria-label="' + T.a11yTitle + '" dir="' + DIR + '">'
      + '<div class="g-head"><div><h2 class="g-title">' + T.a11yTitle + '</h2><p class="g-sub">' + T.a11ySub + '</p></div>'
      + '<button class="g-x" data-close aria-label="' + T.close + '">✕</button></div>'
      + '<div class="g-body">' + groups + '</div>'
      + '<div class="g-foot"><button class="g-reset" data-reset>' + T.reset + '</button>'
      + '<a class="g-stmt" href="' + T.statementUrl + '">' + T.statement + '</a></div></div>');
    root.appendChild(panel);
    fab.setAttribute("aria-expanded", "true");

    panel.querySelector("[data-inc]").addEventListener("click", function () { stepFont(1); });
    panel.querySelector("[data-dec]").addEventListener("click", function () { stepFont(-1); });
    panel.querySelector("[data-close]").addEventListener("click", closePanel);
    panel.querySelector("[data-reset]").addEventListener("click", function () { a = Object.assign({}, defaults); applyA(); saveA(); syncPanel(); });
    panel.querySelectorAll(".g-row").forEach(function (btn) {
      btn.addEventListener("click", function () { var k = btn.getAttribute("data-k"); a[k] = !a[k]; applyA(); saveA(); syncPanel(); });
    });
    syncPanel();
    document.addEventListener("keydown", onKey);
    panel.querySelector("[data-close]").focus();
  }
  function closePanel() {
    if (!panel) return;
    document.removeEventListener("keydown", onKey);
    panel.remove(); scrim.remove(); panel = null; scrim = null;
    fab.setAttribute("aria-expanded", "false"); fab.focus();
  }
  function onKey(e) {
    if (e.key === "Escape") return closePanel();
    if (e.key !== "Tab" || !panel) return;
    var f = panel.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function stepFont(dir) {
    var i = FONT_STEPS.indexOf(a.scale); if (i === -1) i = 0;
    i = Math.min(FONT_STEPS.length - 1, Math.max(0, i + dir));
    a.scale = FONT_STEPS[i]; applyA(); saveA(); syncPanel();
  }
  function syncPanel() {
    if (!panel) return;
    panel.querySelector("[data-pct]").textContent = Math.round(a.scale * 100) + "%";
    panel.querySelector("[data-dec]").disabled = a.scale <= FONT_STEPS[0];
    panel.querySelector("[data-inc]").disabled = a.scale >= FONT_STEPS[FONT_STEPS.length - 1];
    panel.querySelectorAll(".g-row").forEach(function (btn) {
      var on = a[btn.getAttribute("data-k")];
      if (on) btn.setAttribute("data-on", ""); else btn.removeAttribute("data-on");
      btn.setAttribute("aria-checked", on ? "true" : "false");
    });
  }
  fab.addEventListener("click", function () { if (panel) closePanel(); else openPanel(); });

  // ── Cookie consent ────────────────────────────────────────────────────────
  var CONSENT_VERSION = 1, C_COOKIE = "g-consent";
  function readConsent() {
    try {
      var m = document.cookie.split("; ").filter(function (r) { return r.indexOf(C_COOKIE + "=") === 0; })[0];
      if (!m) return null;
      var p = JSON.parse(decodeURIComponent(m.split("=").slice(1).join("=")));
      return p && p.version === CONSENT_VERSION ? p : null;
    } catch (e) { return null; }
  }
  function writeConsent(analytics, marketing) {
    var state = { necessary:true, analytics:!!analytics, marketing:!!marketing, version:CONSENT_VERSION, timestamp:new Date().toISOString() };
    document.cookie = C_COOKIE + "=" + encodeURIComponent(JSON.stringify(state)) + "; Max-Age=" + (60 * 60 * 24 * 365) + "; Path=/; SameSite=Lax";
    try { window.dispatchEvent(new CustomEvent("g-consent:change", { detail: state })); } catch (e) {}
    return state;
  }
  window.gravityConsent = { get: readConsent, has: function (c) { if (c === "necessary") return true; var s = readConsent(); return !!(s && s[c]); }, open: openPrefs };

  var banner = null, dialog = null, dscrim = null;
  function showBannerIfNeeded() { if (readConsent()) return; banner = buildBanner(); root.appendChild(banner); }
  function buildBanner() {
    return el('<div class="g-banner" role="region" aria-label="' + T.ccTitle + '" dir="' + DIR + '"><div class="g-banner-in">'
      + '<div><p class="g-cc-title">' + T.ccTitle + '</p><p class="g-cc-body">' + T.ccBody + ' <a href="' + T.privacyUrl + '">' + T.privacy + '</a> · <a href="' + T.cookieUrl + '">' + T.cookie + '</a></p></div>'
      + '<div class="g-actions"><button class="g-btn g-ghost" data-manage>' + T.manage + '</button>'
      + '<button class="g-btn g-ghost" data-reject>' + T.reject + '</button>'
      + '<button class="g-btn g-solid" data-accept>' + T.accept + '</button></div></div></div>');
  }
  function removeBanner() { if (banner) { banner.remove(); banner = null; } }
  root.addEventListener("click", function (e) {
    var t = e.target;
    if (t.closest && t.closest("[data-accept]")) { writeConsent(true, true); removeBanner(); }
    else if (t.closest && t.closest("[data-reject]")) { writeConsent(false, false); removeBanner(); }
    else if (t.closest && t.closest("[data-manage]")) { removeBanner(); openPrefs(); }
  });

  function openPrefs() {
    if (dialog) return;
    var cur = readConsent() || { analytics:false, marketing:false };
    dscrim = el('<div class="g-scrim" style="z-index:2147482001"></div>');
    dscrim.addEventListener("click", closePrefs);
    root.appendChild(dscrim);
    dialog = el('<div class="g-dialog" role="dialog" aria-modal="true" aria-label="' + T.settings + '" dir="' + DIR + '">'
      + '<div class="g-dialog-h"><h2>' + T.settings + '</h2><button class="g-x" data-dclose aria-label="' + T.close + '">✕</button></div>'
      + '<div class="g-dialog-b">'
      + cat(T.necessary, T.necessaryD, true, true) + cat(T.analytics, T.analyticsD, cur.analytics, false, "analytics") + cat(T.marketing, T.marketingD, cur.marketing, false, "marketing")
      + '</div><div class="g-dialog-f"><button class="g-btn g-ghost" data-reject2>' + T.reject + '</button><button class="g-btn g-solid" data-save>' + T.save + '</button></div></div>');
    root.appendChild(dialog);
    dialog.querySelector("[data-dclose]").addEventListener("click", closePrefs);
    dialog.querySelector("[data-reject2]").addEventListener("click", function () { writeConsent(false, false); closePrefs(); });
    dialog.querySelector("[data-save]").addEventListener("click", function () {
      writeConsent(dialog.querySelector('[data-c="analytics"]').checked, dialog.querySelector('[data-c="marketing"]').checked); closePrefs();
    });
    document.addEventListener("keydown", onDKey);
    dialog.querySelector("[data-dclose]").focus();
  }
  function cat(title, desc, checked, disabled, key) {
    var ctrl = disabled ? '<span class="g-always">' + T.always + '</span>'
      : '<label class="g-sw"><input type="checkbox" data-c="' + key + '"' + (checked ? " checked" : "") + '><span class="g-sl"></span></label>';
    return '<div class="g-cat"><div class="g-cat-h"><span class="g-cat-t">' + title + '</span>' + ctrl + '</div><p class="g-cat-d">' + desc + '</p></div>';
  }
  function closePrefs() { if (!dialog) return; document.removeEventListener("keydown", onDKey); dialog.remove(); dscrim.remove(); dialog = null; dscrim = null; }
  function onDKey(e) {
    if (e.key === "Escape") return closePrefs();
    if (e.key !== "Tab" || !dialog) return;
    var f = dialog.querySelectorAll('button, input, a, [tabindex]:not([tabindex="-1"])');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  showBannerIfNeeded();
})();
