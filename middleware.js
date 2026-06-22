// Vercel Edge Middleware — geo + language auto-routing for the homepage only.
// Israeli visitors (by IP country) or Hebrew-language browsers are sent to /he.
// An explicit choice (the `g-lang` cookie, set by the EN/HE switch) always wins.
// Runs only on "/", so /he, /assets, and every other path are untouched.

export const config = { matcher: '/' };

export default function middleware(request) {
  const url = new URL(request.url);
  if (url.pathname !== '/') return;

  const cookie = request.headers.get('cookie') || '';
  const choice = cookie.match(/(?:^|;\s*)g-lang=(en|he)/);
  if (choice) {
    // Respect the visitor's explicit choice.
    if (choice[1] === 'he') return Response.redirect(new URL('/he', url), 307);
    return; // 'en' → stay on the English homepage
  }

  const country = (request.headers.get('x-vercel-ip-country') || '').toUpperCase();
  const accept = (request.headers.get('accept-language') || '').toLowerCase();
  const hebrewBrowser = /(?:^|[,\s])(he|iw)\b/.test(accept);

  if (country === 'IL' || hebrewBrowser) {
    return Response.redirect(new URL('/he', url), 307);
  }
}
