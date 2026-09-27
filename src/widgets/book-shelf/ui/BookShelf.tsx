import { bookSections, type BookCategory } from '../model/books'

/** only 를 주면 그 갈래만 (예: 개발 탭의 /books/dev) */
export function BookShelf({ only }: { only?: BookCategory } = {}) {
  const sections = only ? bookSections.filter((s) => s.key === only) : bookSections
  const title = only === 'dev' ? '개발 추천도서' : only === 'stock' ? '주식·투자 추천도서' : '추천도서'

  return (
    <section className="panel bookshelf">
      <div className="panel__title">📖 단타마스터의 책장 — {title}</div>
      <div className="panel__body bookshelf__body">
        {sections.map((sec) => (
          <div key={sec.key} className="bookshelf__section">
            <h2 className="bookshelf__cat">
              <span className={`bookshelf__cat-ic bookshelf__cat-ic--${sec.key}`} aria-hidden />
              <span className="bookshelf__cat-tx">{sec.label}</span>
              <span className="bookshelf__cat-note">{sec.note}</span>
              <span className="bookshelf__cat-rule" aria-hidden />
              <span className="bookshelf__cat-n font-mono">{sec.books.length}권</span>
            </h2>
            <div className="bookshelf__grid">
              {sec.books.map((b) => (
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
          </div>
        ))}
        <p className="bookshelf__note">
          ※ 표지를 누르면 교보문고 상세페이지로 이동합니다.{only === 'dev' ? '' : ' (투자 권유 아님)'}
        </p>
      </div>
    </section>
  )
}
