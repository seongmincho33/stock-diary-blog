export interface Book {
  title: string
  author: string
  cover: string
  url: string
}

const B = import.meta.env.BASE_URL

export const books: Book[] = [
  // 투자 고전 (맨 앞)
  {
    title: '위대한 기업에 투자하라',
    author: '필립 피셔',
    cover: `${B}books/book6.jpg`,
    url: 'https://product.kyobobook.co.kr/detail/S000217068294',
  },
  {
    title: '돈, 뜨겁게 사랑하고 차갑게 다루어라',
    author: '앙드레 코스톨라니',
    cover: `${B}books/book7.jpg`,
    url: 'https://product.kyobobook.co.kr/detail/S000209182287',
  },
  {
    title: '주식투자를 잘한다는 것',
    author: '육과장',
    cover: `${B}books/book3.jpg`,
    url: 'https://ebook-product.kyobobook.co.kr/dig/epd/ebook/E000012908828',
  },
  {
    title: '진보를 위한 주식투자',
    author: '이광수',
    cover: `${B}books/book5.jpg`,
    url: 'https://ebook-product.kyobobook.co.kr/dig/epd/ebook/E000012437401',
  },
  {
    title: '투자 디톡스',
    author: '문홍철',
    cover: `${B}books/book1.jpg`,
    url: 'https://ebook-product.kyobobook.co.kr/dig/epd/ebook/E000013102387',
  },
  {
    title: '박곰희 연금 부자 수업',
    author: '박곰희',
    cover: `${B}books/book2.jpg`,
    url: 'https://ebook-product.kyobobook.co.kr/dig/epd/ebook/E000011833340',
  },
  {
    title: '누구나 투자로 부자가 될 수 있다',
    author: '배재규',
    cover: `${B}books/book4.jpg`,
    url: 'https://product.kyobobook.co.kr/detail/S000218358457',
  },
  {
    title: '위기의 역사',
    author: '오건영',
    cover: `${B}books/book8.jpg`,
    url: 'https://product.kyobobook.co.kr/detail/S000203074371',
  },
  {
    title: '한눈에 보는 AI 반도체 산업',
    author: 'MrTrigger',
    cover: `${B}books/book9.jpg`,
    url: 'https://product.kyobobook.co.kr/detail/S000219545154',
  },
  {
    title: '거인의 어깨 1',
    author: '홍진채',
    cover: `${B}books/book10.jpg`,
    url: 'https://product.kyobobook.co.kr/detail/S000200348347',
  },
  {
    title: '포즈랑의 투자 이야기',
    author: '포즈랑',
    cover: `${B}books/book11.jpg`,
    url: 'https://product.kyobobook.co.kr/detail/S000218171892',
  },
  {
    title: '전설로 떠나는 월가의 영웅',
    author: '피터 린치',
    cover: `${B}books/book12.jpg`,
    url: 'https://product.kyobobook.co.kr/detail/S000220340144',
  },
  {
    title: '세이노의 가르침',
    author: '세이노',
    cover: `${B}books/book13.jpg`,
    url: 'https://ebook-product.kyobobook.co.kr/dig/epd/ebook/E000005140391',
  },
  {
    title: '미국 주식으로 살아남기',
    author: '문남중',
    cover: `${B}books/book14.jpg`,
    url: 'https://ebook-product.kyobobook.co.kr/dig/epd/ebook/E000003086825',
  },
  {
    title: '윤제성의 월가의 투자',
    author: '윤제성·김현석',
    cover: `${B}books/book15.jpg`,
    url: 'https://ebook-product.kyobobook.co.kr/dig/epd/ebook/E000005494268',
  },
]
