import { site } from '@/shared/config/site'

// giscus (GitHub Discussions 기반 댓글) 설정값
// repoId / categoryId 는 GitHub GraphQL 에서 발급받은 고정값
export const giscus = {
  repo: 'seongmincho33/stock-diary-blog',
  repoId: 'R_kgDOTHaT4Q',
  category: 'Announcements',
  categoryId: 'DIC_kwDOTHaT4c4DARJo',
  // 커스텀 Win98 테마 (public/giscus-win98.css → 배포 시 사이트 루트에서 서빙)
  // giscus 가 iframe 안에서 fetch 로 불러오므로 절대 URL 이어야 함
  themeUrl: `${site.baseUrl}/giscus-win98.css`,
} as const
