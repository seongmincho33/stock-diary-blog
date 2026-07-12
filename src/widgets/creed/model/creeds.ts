export type CreedSlug = 'principles' | 'mindset' | 'truths'

export interface CreedData {
  slug: CreedSlug
  path: string
  /** 네비게이션 라벨 (원칙/심법/진리) */
  nav: string
  /** 화면 라벨(타이틀바·상태바) */
  screenLabel: string
  emoji: string
  /** panel__title 브랜드 문구 */
  panelTitle: string
  /** 문서 제목(가시 h1) */
  heading: string
  /** 하단 편집자 캡션 */
  caption: string
  /** 원문 문구 그대로 보존 — 한 글자도 바꾸지 않는다 */
  items: string[]
  metaDescription: string
}

/**
 * 투자 신조 3종 — 블로그 원문(1.블로그 원문/원칙.md·심법.md·진리.md)을 구조화한 것.
 * items는 원문 문구·띄어쓰기를 그대로 보존한다(교정 없음).
 */
export const creeds: Record<CreedSlug, CreedData> = {
  principles: {
    slug: 'principles',
    path: '/principles',
    nav: '원칙',
    screenLabel: '원칙',
    emoji: '📜',
    panelTitle: '단타마스터의 원칙',
    heading: '나의 투자 원칙',
    caption: '※ 매매 전에 한 번씩 되새기는, 잃지 않기 위한 규칙.',
    items: [
      '야수성',
      '이세상에 안전한 주식판은 없다',
      '욕심부리지 마라',
      '확실하지 않은 것에 승부를 걸지마라',
      '이바닥엔 영원한 주도주도 영원한 잡주도 없다',
      '절대로 돈을 잃지 않는다.',
      '한 종목에 영혼까지 태우지 않는다.',
      '예측하지 말고 대응한다.',
      '현금도 포지션이다.',
      '오르는 주식은 함부로 팔지 않는다.',
      '시간을 적으로 돌리지 말라.',
      '차트를 무시하지 마라.',
      '주도주를 사라.',
      '환호할때 떠나고 아무도 안사는걸 사라.',
      '손실난 종목에 추가로 돈을 넣지 마라.',
    ],
    metaDescription:
      '단타마스터의 투자 원칙 — 야수성, 이 세상에 안전한 주식판은 없다, 절대로 돈을 잃지 않는다, 예측하지 말고 대응한다, 현금도 포지션이다.',
  },
  mindset: {
    slug: 'mindset',
    path: '/mindset',
    nav: '심법',
    screenLabel: '심법',
    emoji: '🧘',
    panelTitle: '단타마스터의 심법',
    heading: '나의 심법',
    caption: '※ 계좌보다 마음을 먼저 지키기 위한 심법.',
    items: [
      '외로운 혼자만의 싸움이다.',
      '계좌 자랑 금지. 심법이 무너진다.',
      '내 안에 버핏과 야수의 심장이 같이있다. 인정하자.',
      '빨리 부자가 될 생각을 하지마라.',
      '마음을 비워라.',
      '세상에 좋은 주식 나쁜주식 없다.',
      '주식을 믿지 마라.',
      '투자 아이디어가 떠오르면 일주일간 실행을 미뤄라.',
    ],
    metaDescription:
      '단타마스터의 심법 — 외로운 혼자만의 싸움, 계좌 자랑 금지, 마음을 비워라, 빨리 부자가 될 생각을 하지 마라.',
  },
  truths: {
    slug: 'truths',
    path: '/truths',
    nav: '진리',
    screenLabel: '진리',
    emoji: '🧭',
    panelTitle: '단타마스터의 진리',
    heading: '나의 진리',
    caption: '※ 시장이 반복해서 증명하는 두 가지.',
    items: [
      '모두가 몰려사는 자산은 이미 오를대로 오른 자산이다.',
      '바닥에서 매집할때는 시끄럽지 않다.',
    ],
    metaDescription:
      '단타마스터의 진리 — 모두가 몰려사는 자산은 이미 오를 대로 오른 자산이다, 바닥에서 매집할 때는 시끄럽지 않다.',
  },
}
