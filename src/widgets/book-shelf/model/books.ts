export interface Book {
  title: string
  author: string
  cover: string
  url: string
}

const B = import.meta.env.BASE_URL

export const books: Book[] = [
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
]
