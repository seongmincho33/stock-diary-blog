// 각 매매일지의 각색 전 원문(볼트 1.블로그 원문/)을 빌드 타임에 인라인.
// ⚠️ 사이트 내장(baked) — 원문 텍스트는 번들/소스에 포함된다(소프트 게이트).
const raws = import.meta.glob('/src/shared/content/originals/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const byDate: Record<string, string> = {}
for (const [path, raw] of Object.entries(raws)) {
  const date = (path.split('/').pop() ?? '').replace(/\.md$/, '') // YYYY-MM-DD
  byDate[date] = raw.replace(/\s+$/, '') // 끝쪽 개행/공백 정리
}

/** 날짜(YYYY-MM-DD)로 원문 텍스트 조회. 없으면 undefined. */
export function getOriginal(date: string): string | undefined {
  return byDate[date]
}
