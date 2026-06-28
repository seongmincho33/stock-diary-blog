const ORIGIN = 'https://seongmincho33.github.io'
const BASE_PATH = '/stock-diary-blog'

export const site = {
  title: '개미의 웃픈 매매일지',
  tagline: '공포와 욕심 사이를 자이로드롭처럼 오간 어느 개미의 회고록',
  description: '코스피 반도체 랠리 한복판을 통과한 어느 개미의 웃프고 솔직한 매매 회고록.',
  author: 'seongmincho',
  origin: ORIGIN,
  basePath: BASE_PATH,
  baseUrl: ORIGIN + BASE_PATH, // https://seongmincho33.github.io/stock-diary-blog
  repoUrl: 'https://github.com/seongmincho33/stock-diary-blog',
  locale: 'ko_KR',

  // 웹마스터 사이트 소유 인증코드 — 발급 후 채우면 메타태그가 자동 노출됨
  googleSiteVerification: '',
  naverSiteVerification: '',
} as const

/** 경로를 절대 URL로 (canonical/og 용) */
export function absUrl(path: string): string {
  if (path === '/') return site.baseUrl + '/'
  return site.baseUrl + path
}
