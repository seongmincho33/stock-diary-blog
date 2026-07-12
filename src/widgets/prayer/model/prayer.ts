export interface Petition {
  /** 청원 제목 (예: "원칙을 지키게 하소서") */
  title: string
  /** 청원의 세부 간구들 */
  details: string[]
}

export interface Prayer {
  intro: string
  petitions: Petition[]
  closing: string
  amen: string
}

/**
 * 초보투자자들을 위한 기도 — 블로그 원문(1.블로그 원문/초보투자자들을 위한 기도.md)을 구조화한 것.
 * 문구·띄어쓰기는 원문 그대로 한 글자도 바꾸지 않고 보존한다.
 */
export const prayer: Prayer = {
  intro: '매일 요동치는 주식시장의 탐욕과 공포 사이에서 길을 잃지 않도록 지혜와 평온을 청합니다.',
  petitions: [
    {
      title: '기다릴줄 아는 인내를 주소서',
      details: [
        '눈앞의 주가 등락에 일희일비 하지 않고',
        '내가 선택한 기업의 가치와 굳건한 투자원칙을 믿고 견뎌내게 하소서',
      ],
    },
    {
      title: '집단화를 벗어날 수 있는 지혜를 주소서',
      details: ['군중의 심리에 휩쓸려 뇌동매매 하지 않게 하소서'],
    },
    {
      title: '실패를 수용할 용기를 주소서',
      details: [
        '손실에 대한 자책과 절망에 얽매이지 않게 하시고,',
        '이를 더 큰 성장을 위한 값진 배움으로 받아드릴 수 있는 마음을 주소서',
      ],
    },
    {
      title: '원칙을 지키게 하소서',
      details: [
        '장이 아무리 흔들릴지라도 제 마음만큼은 고요하기를 소망합니다.',
        '오늘도 탐욕과 공포에 짓눌리지 말고 묵묵히 일상의 일에 평안이 깃들게 하소서',
      ],
    },
  ],
  closing: '간절한 마음으로 기도드립니다.',
  amen: '아멘.',
}
