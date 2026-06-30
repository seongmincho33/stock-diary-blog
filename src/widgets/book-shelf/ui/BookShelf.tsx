import { books } from '../model/books'

export function BookShelf() {
  return (
    <section className="panel bookshelf">
      <div className="panel__title">📖 단타마스터의 책장 — 추천도서</div>
      <div className="panel__body bookshelf__body">
        <div className="bookshelf__grid">
          {books.map((b) => (
            <a key={b.url} className="book-card" href={b.url} target="_blank" rel="noreferrer">
              <span className="book-card__cover w98-field">
                <img src={b.cover} alt={`${b.title} 표지`} loading="lazy" />
              </span>
              <span className="book-card__title">{b.title}</span>
              <span className="book-card__author font-mono">{b.author}</span>
              <span className="book-card__buy">교보문고 ▶</span>
            </a>
          ))}
        </div>
        <p className="bookshelf__note">※ 표지를 누르면 교보문고 상세페이지로 이동합니다. (투자 권유 아님)</p>
      </div>
    </section>
  )
}
