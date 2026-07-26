export type BookCategory = 'stock' | 'dev'

export interface Book {
  title: string
  author: string
  cover: string
  url: string
  category: BookCategory
}

export interface BookSection {
  key: BookCategory
  label: string
  note: string
  books: Book[]
}

const B = import.meta.env.BASE_URL

export const books: Book[] = [
  // ── 주식 · 투자 ─────────────────────────────
  // 투자 고전 (맨 앞)
  {
    category: 'stock',
    title: '위대한 기업에 투자하라',
    author: '필립 피셔',
    cover: `${B}books/book6.jpg`,
    url: 'https://product.kyobobook.co.kr/detail/S000217068294',
  },
  {
    category: 'stock',
    title: '돈, 뜨겁게 사랑하고 차갑게 다루어라',
    author: '앙드레 코스톨라니',
    cover: `${B}books/book7.jpg`,
    url: 'https://product.kyobobook.co.kr/detail/S000209182287',
  },
  {
    category: 'stock',
    title: '주식투자를 잘한다는 것',
    author: '육과장',
    cover: `${B}books/book3.jpg`,
    url: 'https://ebook-product.kyobobook.co.kr/dig/epd/ebook/E000012908828',
  },
  {
    category: 'stock',
    title: '진보를 위한 주식투자',
    author: '이광수',
    cover: `${B}books/book5.jpg`,
    url: 'https://ebook-product.kyobobook.co.kr/dig/epd/ebook/E000012437401',
  },
  {
    category: 'stock',
    title: '투자 디톡스',
    author: '문홍철',
    cover: `${B}books/book1.jpg`,
    url: 'https://ebook-product.kyobobook.co.kr/dig/epd/ebook/E000013102387',
  },
  {
    category: 'stock',
    title: '박곰희 연금 부자 수업',
    author: '박곰희',
    cover: `${B}books/book2.jpg`,
    url: 'https://ebook-product.kyobobook.co.kr/dig/epd/ebook/E000011833340',
  },
  {
    category: 'stock',
    title: '누구나 투자로 부자가 될 수 있다',
    author: '배재규',
    cover: `${B}books/book4.jpg`,
    url: 'https://product.kyobobook.co.kr/detail/S000218358457',
  },
  {
    category: 'stock',
    title: '위기의 역사',
    author: '오건영',
    cover: `${B}books/book8.jpg`,
    url: 'https://product.kyobobook.co.kr/detail/S000203074371',
  },
  {
    category: 'stock',
    title: '한눈에 보는 AI 반도체 산업',
    author: 'MrTrigger',
    cover: `${B}books/book9.jpg`,
    url: 'https://product.kyobobook.co.kr/detail/S000219545154',
  },
  {
    category: 'stock',
    title: '거인의 어깨 1',
    author: '홍진채',
    cover: `${B}books/book10.jpg`,
    url: 'https://product.kyobobook.co.kr/detail/S000200348347',
  },
  {
    category: 'stock',
    title: '포즈랑의 투자 이야기',
    author: '포즈랑',
    cover: `${B}books/book11.jpg`,
    url: 'https://product.kyobobook.co.kr/detail/S000218171892',
  },
  {
    category: 'stock',
    title: '전설로 떠나는 월가의 영웅',
    author: '피터 린치',
    cover: `${B}books/book12.jpg`,
    url: 'https://product.kyobobook.co.kr/detail/S000220340144',
  },
  {
    category: 'stock',
    title: '세이노의 가르침',
    author: '세이노',
    cover: `${B}books/book13.jpg`,
    url: 'https://ebook-product.kyobobook.co.kr/dig/epd/ebook/E000005140391',
  },
  {
    category: 'stock',
    title: '미국 주식으로 살아남기',
    author: '문남중',
    cover: `${B}books/book14.jpg`,
    url: 'https://ebook-product.kyobobook.co.kr/dig/epd/ebook/E000003086825',
  },
  {
    category: 'stock',
    title: '윤제성의 월가의 투자',
    author: '윤제성·김현석',
    cover: `${B}books/book15.jpg`,
    url: 'https://ebook-product.kyobobook.co.kr/dig/epd/ebook/E000005494268',
  },

  // ── 개발 ────────────────────────────────────
  {
    category: 'dev',
    title: '다시, 소프트웨어 엔지니어',
    author: '네서니얼 슈타·댄 베가',
    cover: `${B}books/dev1.jpg`,
    url: 'https://product.kyobobook.co.kr/detail/S000220036708',
  },
  {
    category: 'dev',
    title: 'AI 시대에 개발자가 알아야 할 인프라 구성 배포 with 클로드 코드',
    author: '조훈',
    cover: `${B}books/dev2.jpg`,
    url: 'https://product.kyobobook.co.kr/detail/S000220220936',
  },
  {
    category: 'dev',
    title: '아키텍처는 진화한다',
    author: '공상휘',
    cover: `${B}books/dev3.jpg`,
    url: 'https://product.kyobobook.co.kr/detail/S000220307813',
  },
]

export const bookSections: BookSection[] = [
  {
    key: 'stock',
    label: '주식 · 투자',
    note: '계좌로 수업료 낸 뒤에 밑줄 그은 책들',
    books: books.filter((b) => b.category === 'stock'),
  },
  {
    key: 'dev',
    label: '개발',
    note: '먹고사는 본업 쪽 책들',
    books: books.filter((b) => b.category === 'dev'),
  },
]
