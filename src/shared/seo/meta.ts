import { site, absUrl } from '@/shared/config/site'
import { posts, getPost } from '@/entities/post'

export interface PageMeta {
  title: string
  description: string
  canonical: string
  ogImage: string
  ogType: 'website' | 'article'
  jsonLd: object
  publishedDate?: string
}

function ogImageFor(slug?: string): string {
  return absUrl(`/og/${slug ?? 'default'}.png`)
}

function truncate(s: string, n: number): string {
  return s.length > n ? s.slice(0, n).trim() + '…' : s
}

function websiteJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: site.title,
    description: site.description,
    url: absUrl('/'),
    inLanguage: 'ko-KR',
    blogPost: posts.slice(0, 20).map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      datePublished: p.date,
      url: absUrl(`/posts/${p.slug}`),
    })),
  }
}

/** 경로(basename 제외, 예: '/', '/about', '/posts/xxx') → 페이지 메타 */
export function getMeta(path: string): PageMeta {
  const postMatch = /^\/posts\/(.+?)\/?$/.exec(path)
  if (postMatch) {
    const post = getPost(decodeURIComponent(postMatch[1]))
    if (post) {
      const desc = truncate(post.subtitle ? `${post.subtitle} — ${post.excerpt}` : post.excerpt, 150)
      const canonical = absUrl(`/posts/${post.slug}`)
      return {
        title: `${post.title} · ${site.title}`,
        description: desc,
        canonical,
        ogImage: ogImageFor(post.slug),
        ogType: 'article',
        publishedDate: post.date,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: desc,
          datePublished: post.date,
          dateModified: post.date,
          author: { '@type': 'Person', name: site.author },
          publisher: { '@type': 'Organization', name: site.title },
          mainEntityOfPage: canonical,
          url: canonical,
          image: ogImageFor(post.slug),
          inLanguage: 'ko-KR',
        },
      }
    }
  }

  if (path === '/about') {
    return {
      title: `소개 · ${site.title}`,
      description: site.description,
      canonical: absUrl('/about'),
      ogImage: ogImageFor(),
      ogType: 'website',
      jsonLd: websiteJsonLd(),
    }
  }

  return {
    title: `${site.title} — ${site.tagline}`,
    description: site.description,
    canonical: absUrl('/'),
    ogImage: ogImageFor(),
    ogType: 'website',
    jsonLd: websiteJsonLd(),
  }
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** <head>에 주입할 메타 태그 문자열 */
export function renderHeadTags(meta: PageMeta): string {
  const tags: string[] = []
  tags.push(`<title>${esc(meta.title)}</title>`)
  tags.push(`<meta name="description" content="${esc(meta.description)}" />`)
  tags.push(`<link rel="canonical" href="${meta.canonical}" />`)

  // Open Graph (카카오톡/페북)
  tags.push(`<meta property="og:type" content="${meta.ogType}" />`)
  tags.push(`<meta property="og:title" content="${esc(meta.title)}" />`)
  tags.push(`<meta property="og:description" content="${esc(meta.description)}" />`)
  tags.push(`<meta property="og:url" content="${meta.canonical}" />`)
  tags.push(`<meta property="og:image" content="${meta.ogImage}" />`)
  tags.push(`<meta property="og:image:width" content="1200" />`)
  tags.push(`<meta property="og:image:height" content="630" />`)
  tags.push(`<meta property="og:site_name" content="${esc(site.title)}" />`)
  tags.push(`<meta property="og:locale" content="${site.locale}" />`)
  if (meta.publishedDate) {
    tags.push(`<meta property="article:published_time" content="${meta.publishedDate}" />`)
  }

  // Twitter/X
  tags.push(`<meta name="twitter:card" content="summary_large_image" />`)
  tags.push(`<meta name="twitter:title" content="${esc(meta.title)}" />`)
  tags.push(`<meta name="twitter:description" content="${esc(meta.description)}" />`)
  tags.push(`<meta name="twitter:image" content="${meta.ogImage}" />`)

  // RSS
  tags.push(
    `<link rel="alternate" type="application/rss+xml" title="${esc(site.title)}" href="${absUrl('/rss.xml')}" />`,
  )

  // 사이트 소유 인증 (코드 있을 때만)
  if (site.googleSiteVerification) {
    tags.push(`<meta name="google-site-verification" content="${esc(site.googleSiteVerification)}" />`)
  }
  if (site.naverSiteVerification) {
    tags.push(`<meta name="naver-site-verification" content="${esc(site.naverSiteVerification)}" />`)
  }

  // JSON-LD (구조화 데이터)
  const ld = JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c')
  tags.push(`<script type="application/ld+json">${ld}</script>`)

  return tags.join('\n    ')
}
