import { site, absUrl } from '@/shared/config/site'
import { posts, getPost } from '@/entities/post'
import { getResearchNote } from '@/entities/research'

export interface PageMeta {
  title: string
  description: string
  canonical: string
  ogImage: string
  ogType: 'website' | 'article'
  jsonLd: object
  publishedDate?: string
  noindex?: boolean
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

  if (path === '/posts') {
    return {
      title: `매매일지 · ${site.title}`,
      description: '단타마스터의 매매일지 전체 목록 — 공포와 욕심 사이를 자이로드롭처럼 오간 어느 개미의 기록.',
      canonical: absUrl('/posts'),
      ogImage: ogImageFor(),
      ogType: 'website',
      jsonLd: websiteJsonLd(),
    }
  }

  if (path === '/books') {
    return {
      title: `추천도서 · ${site.title}`,
      description: '단타마스터가 추천하는 투자 도서 — 주식투자를 잘한다는 것(육과장), 진보를 위한 주식투자(이광수), 투자 디톡스, 박곰희 연금 부자 수업, 누구나 투자로 부자가 될 수 있다.',
      canonical: absUrl('/books'),
      ogImage: ogImageFor(),
      ogType: 'website',
      jsonLd: websiteJsonLd(),
    }
  }

  if (path === '/prayer') {
    return {
      title: `기도문 · ${site.title}`,
      description:
        '초보투자자들을 위한 기도 — 탐욕과 공포 사이에서 길을 잃지 않도록 인내·지혜·용기·원칙을 구하는 단타마스터의 기도문.',
      canonical: absUrl('/prayer'),
      ogImage: ogImageFor(),
      ogType: 'website',
      jsonLd: websiteJsonLd(),
    }
  }

  if (path === '/principles') {
    return {
      title: `원칙 · ${site.title}`,
      description:
        '단타마스터의 투자 원칙 — 절대로 돈을 잃지 않는다, 예측하지 말고 대응한다, 현금도 포지션이다, 오르는 주식은 함부로 팔지 않는다.',
      canonical: absUrl('/principles'),
      ogImage: ogImageFor(),
      ogType: 'website',
      jsonLd: websiteJsonLd(),
    }
  }

  if (path === '/mindset') {
    return {
      title: `심법 · ${site.title}`,
      description:
        '단타마스터의 심법 — 외로운 혼자만의 싸움, 계좌 자랑 금지, 마음을 비워라, 빨리 부자가 될 생각을 하지 마라.',
      canonical: absUrl('/mindset'),
      ogImage: ogImageFor(),
      ogType: 'website',
      jsonLd: websiteJsonLd(),
    }
  }

  if (path === '/truths') {
    return {
      title: `진리 · ${site.title}`,
      description:
        '단타마스터의 진리 — 모두가 몰려사는 자산은 이미 오를 대로 오른 자산이다, 바닥에서 매집할 때는 시끄럽지 않다.',
      canonical: absUrl('/truths'),
      ogImage: ogImageFor(),
      ogType: 'website',
      jsonLd: websiteJsonLd(),
    }
  }

  const researchMatch = /^\/research\/(\d+)\/?$/.exec(path)
  if (researchMatch) {
    const note = getResearchNote(parseInt(researchMatch[1], 10))
    if (note) {
      const canonical = absUrl(`/research/${note.num}`)
      return {
        title: `연구 ${String(note.num).padStart(2, '0')} ${note.title} · ${site.title}`,
        description: truncate(`「${note.subtitle}」 — 단타마스터의 투자 연구노트.`, 150),
        canonical,
        ogImage: ogImageFor(),
        ogType: 'article',
        jsonLd: websiteJsonLd(),
      }
    }
  }

  if (path === '/research') {
    return {
      title: `연구 · ${site.title}`,
      description:
        '단타마스터의 투자 연구노트 — 종목 선정, 이격도, 비중 조절, 매크로, 거래대금, 실적, 매물대, 외국인 수급, 8부능선, RSI. 물리고 배운 것들의 정리.',
      canonical: absUrl('/research'),
      ogImage: ogImageFor(),
      ogType: 'website',
      jsonLd: websiteJsonLd(),
    }
  }

  if (path === '/admin') {
    return {
      title: `관리자 · ${site.title}`,
      description: '단타마스터 관리자 페이지.',
      canonical: absUrl('/admin'),
      ogImage: ogImageFor(),
      ogType: 'website',
      jsonLd: websiteJsonLd(),
      noindex: true,
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
  if (meta.noindex) {
    tags.push(`<meta name="robots" content="noindex, nofollow" />`)
  }

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
