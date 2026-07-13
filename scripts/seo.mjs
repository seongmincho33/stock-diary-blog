// sitemap.xml / robots.txt / rss.xml 생성
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const { posts, researchNotes } = await import(join(root, 'dist-server', 'entry-server.js'))

const ORIGIN = 'https://seongmincho33.github.io'
const BASE = '/stock-diary-blog'
const HOME = `${ORIGIN}${BASE}/`
const abs = (p) => (p === '/' ? HOME : `${ORIGIN}${BASE}${p}`)
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// ── sitemap.xml ──
const urls = [
  { loc: HOME, lastmod: posts[0]?.date },
  { loc: abs('/posts'), lastmod: posts[0]?.date },
  { loc: abs('/about') },
  { loc: abs('/books') },
  { loc: abs('/prayer') },
  { loc: abs('/principles') },
  { loc: abs('/mindset') },
  { loc: abs('/truths') },
  { loc: abs('/research') },
  ...researchNotes.map((n) => ({ loc: abs(`/research/${n.num}`) })),
  ...posts.map((p) => ({ loc: abs(`/posts/${p.slug}`), lastmod: p.date })),
]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}\n  </url>`,
  )
  .join('\n')}
</urlset>
`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)

// ── robots.txt ──
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}${BASE}/sitemap.xml\n`)

// ── rss.xml ──
const rfc822 = (d) => new Date(`${d}T09:00:00+09:00`).toUTCString()
const items = posts
  .map(
    (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${abs(`/posts/${p.slug}`)}</link>
      <guid isPermaLink="true">${abs(`/posts/${p.slug}`)}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <description>${esc(p.subtitle ? `${p.subtitle} — ${p.excerpt}` : p.excerpt)}</description>
    </item>`,
  )
  .join('\n')
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>개미의 웃픈 매매일지</title>
    <link>${HOME}</link>
    <description>공포와 욕심 사이를 자이로드롭처럼 오간 어느 개미의 회고록</description>
    <language>ko</language>
${items}
  </channel>
</rss>
`
writeFileSync(join(dist, 'rss.xml'), rss)

console.log('wrote sitemap.xml, robots.txt, rss.xml')
