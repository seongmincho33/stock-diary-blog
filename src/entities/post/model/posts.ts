import type { Post, PostKind } from './types'
import { parseFrontmatter } from '../lib/frontmatter'

// 빌드 타임에 마크다운 원문을 전부 인라인 (eager)
// ⚠️ vite:import-glob 은 두 번째 인자가 인라인 객체 리터럴이어야 한다 (상수로 빼면 빌드 실패)
const stockRaws = import.meta.glob('/src/shared/content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const devRaws = import.meta.glob('/src/shared/content/devlog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function buildPost(path: string, raw: string, kind: PostKind): Post {
  const filename = path.split('/').pop() ?? ''
  const slug = filename.replace(/\.md$/, '')
  const { data, body } = parseFrontmatter(raw)

  const title = typeof data.title === 'string' ? data.title : slug
  const date = typeof data.date === 'string' ? data.date.slice(0, 10) : slug.slice(0, 10)
  const categories = Array.isArray(data.categories) ? data.categories : []

  const lines = body.split('\n')

  // 부제목: 본문 첫 비어있지 않은 줄이 인용구(>)면 채택
  let subtitle: string | undefined
  for (const line of lines) {
    const t = line.trim()
    if (!t) continue
    if (t.startsWith('>')) {
      subtitle = t.replace(/^>+\s*/, '').replace(/[*_`「」]/g, '').trim()
    }
    break
  }

  // 요약: 인용구/헤딩/메타줄(🗓)을 건너뛴 첫 문단
  let excerpt = ''
  for (const line of lines) {
    const t = line.trim()
    if (!t) continue
    if (t.startsWith('>') || t.startsWith('#') || t.startsWith('🗓')) continue
    excerpt = t.replace(/[#>*_`]/g, '').trim()
    break
  }
  if (excerpt.length > 130) excerpt = excerpt.slice(0, 130).trim() + '…'

  return { slug, title, date, categories, subtitle, excerpt, body, kind }
}

function collect(raws: Record<string, string>, kind: PostKind): Post[] {
  return Object.entries(raws)
    .map(([path, raw]) => buildPost(path, raw, kind))
    // 최신 글 먼저. 같은 날짜면 슬러그 내림차순 → 같은 날 여러 편을 올릴 땐 슬러그에 ep02, ep03… 을 넣어 순서를 고정
    .sort((a, b) => (a.date === b.date ? b.slug.localeCompare(a.slug) : a.date < b.date ? 1 : -1))
}

/** 매매일지 */
export const posts: Post[] = collect(stockRaws, 'stock')
/** 개발일지 */
export const devPosts: Post[] = collect(devRaws, 'dev')

export function postsOf(kind: PostKind): Post[] {
  return kind === 'dev' ? devPosts : posts
}

export function getPost(slug: string, kind: PostKind = 'stock'): Post | undefined {
  return postsOf(kind).find((p) => p.slug === slug)
}

/**
 * 인접 글. 목록은 최신순(내림차순) 정렬이므로
 * - newer(다음 글) = 더 최근 날짜 = 한 칸 위(i-1)
 * - older(이전 글) = 더 과거 날짜 = 한 칸 아래(i+1)
 */
export function getAdjacent(slug: string, kind: PostKind = 'stock'): { older?: Post; newer?: Post } {
  const list = postsOf(kind)
  const i = list.findIndex((p) => p.slug === slug)
  if (i === -1) return {}
  return {
    newer: i > 0 ? list[i - 1] : undefined,
    older: i < list.length - 1 ? list[i + 1] : undefined,
  }
}
