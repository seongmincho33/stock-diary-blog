import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { AppRoutes } from '@/app/AppRoutes'
import { posts, devPosts } from '@/entities/post'
import { researchNotes } from '@/entities/research'
import { getMeta, renderHeadTags } from '@/shared/seo/meta'

const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '')

export interface RenderResult {
  html: string
  head: string
}

/** path: basename 제외 경로('/', '/about', '/posts/xxx') */
export function render(path: string): RenderResult {
  const location = path === '/' ? `${BASENAME}/` : `${BASENAME}${path}`
  const html = renderToString(
    <StaticRouter location={location} basename={BASENAME || '/'}>
      <AppRoutes />
    </StaticRouter>,
  )
  const head = renderHeadTags(getMeta(path))
  return { html, head }
}

export function getStaticPaths(): string[] {
  return [
    '/',
    '/posts',
    '/dev',
    '/study',
    '/about',
    '/books',
    '/prayer',
    '/principles',
    '/mindset',
    '/truths',
    '/admin',
    '/research',
    ...researchNotes.map((n) => `/research/${n.num}`),
    ...posts.map((p) => `/posts/${p.slug}`),
    ...devPosts.map((p) => `/dev/${p.slug}`),
  ]
}

export interface OgCard {
  slug: string
  title: string
  subtitle?: string
  date: string
}

export function getOgCards(): OgCard[] {
  return [
    ...posts.map((p) => ({ slug: p.slug, title: p.title, subtitle: p.subtitle, date: p.date })),
    // 개발일지는 매매일지와 슬러그가 겹쳐도 되도록 dev- 접두사로 파일명을 분리
    ...devPosts.map((p) => ({ slug: `dev-${p.slug}`, title: p.title, subtitle: p.subtitle, date: p.date })),
  ]
}

export { posts, devPosts, researchNotes }
