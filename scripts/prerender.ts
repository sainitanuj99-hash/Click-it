/**
 * Runs after `vite build`. Writes one HTML file per page (dist/about-us.html, ...)
 * with that page's own <title>, description, canonical and share-card tags, plus a
 * dist/404.html. Vercel serves them at /about-us etc. (cleanUrls in vercel.json), so
 * WhatsApp, Facebook and LinkedIn previews and non-JavaScript crawlers see the right
 * page details instead of the homepage's.
 *
 * Page details come from SEO_PAGES in src/hooks/usePageSeo.ts, the same source the
 * app uses after it loads.
 */
import fs from 'node:fs';
import path from 'node:path';
import { SEO_PAGES, SITE_ORIGIN, NOINDEX_TABS, OG_IMAGE } from '../src/hooks/usePageSeo.ts';

const DIST = path.resolve(process.cwd(), 'dist');
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8');

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function setTag(html: string, pattern: RegExp, replacement: string, label: string): string {
  if (!pattern.test(html)) throw new Error(`prerender: could not find ${label} in dist/index.html`);
  return html.replace(pattern, replacement);
}

function renderPage(tab: string): string {
  const page = SEO_PAGES[tab];
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const url = `${SITE_ORIGIN}${page.canonicalPath}`;
  const image = page.ogImage || OG_IMAGE;
  let html = template;

  html = setTag(html, /<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`, '<title>');
  html = setTag(html, /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${description}" />`, 'meta description');
  if (page.keywords) {
    html = setTag(html, /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i, `<meta name="keywords" content="${escapeHtml(page.keywords)}" />`, 'meta keywords');
  }
  html = setTag(html, /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${url}" />`, 'canonical');
  html = setTag(html, /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${url}" />`, 'og:url');
  html = setTag(html, /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${title}" />`, 'og:title');
  html = setTag(html, /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${description}" />`, 'og:description');
  html = setTag(html, /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:image" content="${image}" />`, 'og:image');
  html = setTag(html, /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:url" content="${url}" />`, 'twitter:url');
  html = setTag(html, /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${title}" />`, 'twitter:title');
  html = setTag(html, /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${description}" />`, 'twitter:description');
  html = setTag(html, /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:image" content="${image}" />`, 'twitter:image');

  if (NOINDEX_TABS.has(tab)) {
    html = setTag(html, /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i, '<meta name="robots" content="noindex, follow" />', 'meta robots');
    html = setTag(html, /<meta\s+name="googlebot"\s+content="[^"]*"\s*\/?>/i, '<meta name="googlebot" content="noindex, follow" />', 'meta googlebot');
    html = setTag(html, /<meta\s+name="bingbot"\s+content="[^"]*"\s*\/?>/i, '<meta name="bingbot" content="noindex, follow" />', 'meta bingbot');
  }

  // The crawler-visible content shown before React loads: give it this page's heading.
  html = setTag(html, /(<div id="root">[\s\S]*?<h1[^>]*>)[\s\S]*?(<\/h1>)/i, `$1${title}$2`, 'pre-load <h1>');
  html = setTag(html, /(<div id="root">[\s\S]*?<\/h1>\s*<p[^>]*>)[\s\S]*?(<\/p>)/i, `$1\n          ${description}\n        $2`, 'pre-load intro paragraph');

  return html;
}

const written: string[] = [];
for (const [tab, page] of Object.entries(SEO_PAGES)) {
  if (tab === 'home') continue;
  const file = tab === 'not-found' ? '404.html' : `${page.canonicalPath.replace(/^\//, '')}.html`;
  fs.writeFileSync(path.join(DIST, file), renderPage(tab));
  written.push(file);
}
console.log(`prerender: wrote ${written.length} pages -> ${written.join(', ')}`);
