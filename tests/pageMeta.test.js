import assert from 'node:assert/strict'
import { test } from 'node:test'
import { PAGES } from '../src/config/pages.ts'
import { resolvePageMeta, renderPageHead, contentDescription } from '../src/scripts/pageMeta.ts'

test('configured pages have complete Open Graph with canonical-domain image URLs', () => {
  for (const page of Object.values(PAGES)) {
    const meta = resolvePageMeta(page.meta, page.path, 'https://example.test')
    const tags = Object.fromEntries(meta.tags.map(([, name, content]) => [name, content]))
    for (const name of ['og:title', 'og:type', 'og:url', 'og:image', 'og:image:alt', 'og:description', 'og:locale', 'og:site_name']) {
      assert.ok(tags[name], `${page.path}: ${name}`)
    }
    assert.match(tags['og:image'], /^https:\/\/example\.test\//)
    assert.equal(tags['og:image'], tags['twitter:image'])
    assert.ok(!meta.title.endsWith(' | Гагара Тур | Гагара Тур'))
    if (page.meta.robots.includes('noindex')) assert.equal(meta.canonical, null)
  }
})

test('dynamic images do not inherit the dimensions of the default image', () => {
  const meta = resolvePageMeta({ title: 'Квест', description: 'Описание', robots: 'index, follow',
    openGraph: { image: { url: '/img/quest.webp', alt: 'Изображение квеста' } },
  }, '/quest?utm_source=test#details', 'https://configured.test')
  const tags = Object.fromEntries(meta.tags.map(([, name, content]) => [name, content]))
  assert.equal(meta.canonical, 'https://configured.test/quest')
  assert.equal(tags['og:image'], 'https://configured.test/img/quest.webp')
  for (const name of ['og:image:width', 'og:image:height', 'og:image:type']) assert.equal(tags[name], null)
})

test('metadata escapes user content and content descriptions omit HTML', () => {
  const description = contentDescription(['<p>Прогулка&nbsp;&amp; открытия</p>', '<script>alert(1)</script><b>Город</b>'])
  assert.equal(description, 'Прогулка & открытия Город')
  const html = renderPageHead(resolvePageMeta({ title: '"><img src=x onerror=alert(1)> $1',
    description, robots: 'index, follow',
  }, '/quest', 'https://example.test'))
  assert.ok(!html.includes('<img'))
  assert.ok(html.includes('&lt;img'))
  assert.ok(html.includes('$1'))
  assert.equal((html.match(/<title>/g) || []).length, 1)
  assert.equal((html.match(/property="og:title"/g) || []).length, 1)
})
