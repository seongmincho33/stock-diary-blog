/** 어느 일지인가 — 매매일지(stock) / 개발일지(dev) */
export type PostKind = 'stock' | 'dev'

export interface Post {
  /** 라우트 슬러그 (파일명에서 확장자 제거) */
  slug: string
  title: string
  /** YYYY-MM-DD */
  date: string
  /** 본문 첫 인용구에서 뽑은 위트 부제목 */
  subtitle?: string
  /** 목록 카드용 요약 (본문 첫 문단에서 자동 추출) */
  excerpt: string
  /** 검색용 메타 description (프론트매터 description:). 없으면 부제+excerpt 사용 */
  description?: string
  categories: string[]
  /** front matter를 제거한 마크다운 본문 */
  body: string
  kind: PostKind
}

/** 종류별 라우트 접두사 (/posts/<slug>, /dev/<slug>) */
export function baseOf(kind: PostKind): string {
  return kind === 'dev' ? '/dev' : '/posts'
}
