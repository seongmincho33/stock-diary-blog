import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { AppRoutes } from '@/app/AppRoutes'
import { posts } from '@/entities/post'
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
  return ['/', '/posts', '/about', '/books', ...posts.map((p) => `/posts/${p.slug}`)]
}

export interface OgCard {
  slug: string
  title: string
  subtitle?: string
  date: string
}

export function getOgCards(): OgCard[] {
  return posts.map((p) => ({ slug: p.slug, title: p.title, subtitle: p.subtitle, date: p.date }))
}

export { posts }
