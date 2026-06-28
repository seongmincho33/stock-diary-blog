import type { Post } from './types'
import { parseFrontmatter } from '../lib/frontmatter'

// 빌드 타임에 마크다운 원문을 전부 인라인 (eager)
const raws = import.meta.glob('/src/shared/content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function buildPost(path: string, raw: string): Post {
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

  return { slug, title, date, categories, subtitle, excerpt, body }
}

export const posts: Post[] = Object.entries(raws)
  .map(([path, raw]) => buildPost(path, raw))
  .sort((a, b) => (a.date < b.date ? 1 : -1)) // 최신 글 먼저

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

/**
 * 인접 글. posts는 최신순(내림차순) 정렬이므로
 * - newer(다음 매매일지) = 더 최근 날짜 = 한 칸 위(i-1)
 * - older(이전 매매일지) = 더 과거 날짜 = 한 칸 아래(i+1)
 */
export function getAdjacent(slug: string): { older?: Post; newer?: Post } {
  const i = posts.findIndex((p) => p.slug === slug)
  if (i === -1) return {}
  return {
    newer: i > 0 ? posts[i - 1] : undefined,
    older: i < posts.length - 1 ? posts[i + 1] : undefined,
  }
}
