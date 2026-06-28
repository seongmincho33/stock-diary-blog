export interface Post {
  /** 라우트 슬러그 (파일명에서 확장자 제거) */
  slug: string
  title: string
  /** YYYY-MM-DD */
  date: string
  /** 본문 첫 인용구에서 뽑은 위트 부제목 */
  subtitle?: string
  /** 목록 카드용 요약 */
  excerpt: string
  categories: string[]
  /** front matter를 제거한 마크다운 본문 */
  body: string
}
