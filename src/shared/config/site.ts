const ORIGIN = 'https://seongmincho33.github.io'
const BASE_PATH = '/stock-diary-blog'

export const site = {
  title: '단타마스터',
  tagline: '치고 빠지려다 풀스윙 헛스윙 — 어느 개미의 웃픈 매매일지',
  description: '단타로 흥하고 단타로 물린 코스피 반도체 랠리 생존기. 웃프고 솔직한 개미의 매매 회고록.',
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
