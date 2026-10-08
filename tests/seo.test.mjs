import test from 'node:test';
import { get } from 'node:http';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createPreviewServer } from '../scripts/preview.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');
const origin = 'https://www.bookra.im';
const pairs = [['/', '/en/'], ...['pricing', 'support', 'privacy', 'terms'].map((name) => [`/${name}-zh.html`, `/${name}.html`])];
const sourceFor = (path) => path === '/' ? 'index.html' : path === '/en/' ? 'en/index.html' : path.slice(1);
const pages = new Map(await Promise.all(pairs.flat().map(async (path) => [path, await readFile(join(dist, sourceFor(path)), 'utf8')])));
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map((m) => m[0]);
const schemas = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));

test('ten static pages have matching language, self-canonical and reciprocal hreflang', () => {
  for (const [zh, en] of pairs) {
    for (const [path, language] of [[zh, 'zh-CN'], [en, 'en']]) {
      const html = pages.get(path);
      assert.equal(attr(tags(html, 'html')[0], 'lang'), language, path);
      assert.equal((html.match(/<h1\b/g) ?? []).length, 1, path);
      const links = tags(html, 'link');
      assert.equal(attr(links.find((t) => attr(t, 'rel') === 'canonical'), 'href'), origin + path);
      for (const [locale, target] of [['zh', zh], ['en', en]]) {
        assert.equal(attr(links.find((t) => attr(t, 'hreflang') === locale), 'href'), origin + target);
      }
      assert.doesNotMatch(html, /https:\/\/bookra\.im|cdn\.tailwindcss\.com|switchLanguage|bookra-lang/);
      assert.ok(html.includes('rel="icon"'));
      const description = attr(tags(html, 'meta').find((t) => attr(t, 'name') === 'description'), 'content');
      assert.ok(description?.length > 20);
    }
  }
  assert.match(pages.get('/'), /<title>[^<]*书架扫描/);
  assert.match(pages.get('/en/'), /<h1[^>]*>Bookra: Book Scanner/);
});

test('all internal links, anchors and responsive assets resolve in the published output', async () => {
  for (const [path, html] of pages) {
    for (const tag of [...tags(html, 'a'), ...tags(html, 'link'), ...tags(html, 'img'), ...tags(html, 'script')]) {
      const urlValue = attr(tag, 'href') ?? attr(tag, 'src');
      if (!urlValue || /^(mailto:|tel:)/.test(urlValue)) continue;
      const url = new URL(urlValue.replaceAll('&amp;', '&'), origin + path);
      if (url.origin !== origin) continue;
      await access(join(dist, sourceFor(url.pathname)));
      if (url.hash && pages.has(url.pathname)) {
        assert.ok(pages.get(url.pathname).includes(`id="${url.hash.slice(1)}"`), `${path}: ${urlValue}`);
      }
      for (const candidate of (attr(tag, 'srcset') ?? '').split(',').filter(Boolean)) {
        await access(join(dist, candidate.trim().split(/\s+/)[0]));
      }
    }
    for (const img of tags(html, 'img')) {
      assert.ok(attr(img, 'alt'));
      assert.ok(Number(attr(img, 'width')) > 0 && Number(attr(img, 'height')) > 0);
    }
  }
});

test('schema contains no fabricated ratings, search actions, expiration dates or old family limits', () => {
  for (const [path, html] of pages) {
    schemas(html);
    assert.doesNotMatch(html, /aggregateRating|ratingCount|ratingValue|SearchAction|potentialAction|priceValidUntil|数千|thousands of readers|5 family members|5 people|最多\s*5\s*人/);
    if (path.startsWith('/support')) {
      const schema = schemas(html).find((s) => s['@type'] === 'FAQPage');
      assert.equal(schema.mainEntity.length, 10);
    }
  }
  assert.match(pages.get('/terms.html'), /do not include a free trial/);
  assert.match(pages.get('/terms-zh.html'), /不提供免费试用期/);
  assert.doesNotMatch(pages.get('/support-zh.html'), /每月\s*5\s*次/);
});

test('sitemap lists every canonical language page and no invented modification dates', async () => {
  const xml = await readFile(join(dist, 'sitemap.xml'), 'utf8');
  const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.deepEqual(locations.sort(), [...pages.keys()].map((path) => origin + path).sort());
  assert.doesNotMatch(xml, /lastmod|2025-05-03|https:\/\/bookra\.im|\?lang=/);
  assert.match(await readFile(join(dist, 'robots.txt'), 'utf8'), /Sitemap: https:\/\/www\.bookra\.im\/sitemap.xml/);
});

test('local routing exercise preserves campaign queries, fixes terms and returns true 404', async (t) => {
  const server = createPreviewServer();
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;
  for (const [from, to] of [
    ['/terms', '/terms.html'], ['/privacy', '/privacy.html'], ['/support', '/support.html'],
    ['/index.html', '/'], ['/en', '/en/'], ['/en/index.html', '/en/'],
    ['/?lang=en&utm_source=test', '/en/?lang=en&utm_source=test'], ['/index.html?lang=en', '/en/?lang=en']
  ]) {
    const response = await fetch(base + from, { redirect: 'manual' });
    assert.equal(response.status, 308, from);
    assert.equal(response.headers.get('location'), to);
    assert.equal((await fetch(base + to)).status, 200);
  }
  const hostRedirect = await new Promise((resolve, reject) => {
    get(base + '/terms.html?utm_source=test', { headers: { Host: 'bookra.im' } }, (response) => {
      response.resume();
      resolve(response);
    }).on('error', reject);
  });
  assert.equal(hostRedirect.statusCode, 308);
  assert.equal(hostRedirect.headers.location, origin + '/terms.html?utm_source=test');
  assert.equal((await fetch(base + '/missing-seo-test-page')).status, 404);
  assert.match(await (await fetch(base + '/terms')).text(), /<h1[^>]*>Terms of Service/);
});
