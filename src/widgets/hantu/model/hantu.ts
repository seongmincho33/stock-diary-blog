/**
 * 한투마스터 — 내가 만든 개인용 주식 데스크톱 앱 소개 데이터.
 * 저장소: github.com/seongmincho33/hantu-master
 */

/** ⚠️ 저장소를 공개(Public)로 바꾸고 릴리스를 올린 뒤 true 로. false 면 버튼이 '준비 중'으로 뜬다. */
export const RELEASED = false

export const hantu = {
  name: '한투마스터',
  repoName: 'hantu-master',
  tagline: '한국투자증권 Open API로 직접 만든 개인용 주식 데스크톱 앱',
  version: '0.1.0',
  summary:
    '시세 조회·관심종목·차트·보유 포트폴리오 분석을 한 화면에서 다루려고 직접 만들었습니다. ' +
    '증권사 HTS가 안 보여주는 것들 — 내 포트폴리오의 스타일 팩터, 매크로 국면, 지수의 가치↔성장 스펙트럼 — 을 보고 싶어서 시작한 개인 프로젝트입니다.',
  repoUrl: 'https://github.com/seongmincho33/hantu-master',
  releaseUrl: 'https://github.com/seongmincho33/hantu-master/releases/latest',
  menus: [
    { label: '보유 현황', desc: '종목·수량·평단가를 넣으면 평가손익·수익률·오늘 손익. 원화/달러 통화별 합계' },
    { label: '관심종목', desc: '한글·영문·코드로 검색해 추가. 국내·해외 시세 일괄 조회' },
    { label: '주식차트', desc: '캔들·라인·영역, 일/주/월봉, 1·2·4분할 멀티차트. 이동평균·볼린저·VWAP·매물대·MACD·RSI·이격도·투자자 매매동향' },
    { label: '팩터모델', desc: '포트폴리오를 스타일 팩터 6인방(시장·사이즈·밸류·모멘텀·퀄리티·저변동성)으로 분해한 레이더. 관심종목 가상 편입 시뮬레이션' },
    { label: '매크로', desc: '한국·미국·일본·중국 거시 지표. 한국은 수출증가율까지' },
    { label: '플레이북', desc: '시장 국면(레짐)별 대응 플레이북과 과거 검증' },
    { label: '지수투자', desc: '지수를 가치↔성장 스타일 스펙트럼 위에 놓고 비교' },
  ],
  stack: ['Tauri v2', 'React 19', 'TypeScript', 'Rust', 'axum', 'sqlx', 'PostgreSQL 17', 'Docker'],
  requirements: ['macOS', 'Docker Desktop 또는 OrbStack', 'Node.js', 'Rust (rustup)'],
} as const
