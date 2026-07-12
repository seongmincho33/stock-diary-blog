import type { CreedData } from '../model/creeds'

export function Creed({ creed }: { creed: CreedData }) {
  return (
    <section className="panel creed">
      <div className="panel__title">
        {creed.emoji} {creed.panelTitle}
      </div>
      <div className="panel__body creed__body">
        <article className="creed__sheet">
          <h1 className="creed__heading">{creed.heading}</h1>
          <ol className="creed__list">
            {creed.items.map((item) => (
              <li key={item} className="creed__item">
                {item}
              </li>
            ))}
          </ol>
        </article>
        <p className="creed__caption">{creed.caption}</p>
      </div>
    </section>
  )
}
