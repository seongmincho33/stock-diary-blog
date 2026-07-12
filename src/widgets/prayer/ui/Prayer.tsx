import { prayer } from '../model/prayer'

export function Prayer() {
  return (
    <section className="panel prayer">
      <div className="panel__title">🕯️ 단타마스터의 기도문</div>
      <div className="panel__body prayer__body">
        <article className="prayer__sheet">
          <h1 className="prayer__heading">초보투자자들을 위한 기도</h1>

          <p className="prayer__intro">{prayer.intro}</p>

          <hr className="prayer__rule" aria-hidden />

          <ol className="prayer__list">
            {prayer.petitions.map((pet) => (
              <li key={pet.title} className="prayer__pet">
                <h2 className="prayer__pet-title">{pet.title}</h2>
                <ul className="prayer__detail">
                  {pet.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <hr className="prayer__rule" aria-hidden />

          <p className="prayer__closing">{prayer.closing}</p>
          <span className="prayer__sign" aria-hidden />
          <p className="prayer__amen">{prayer.amen}</p>
        </article>

        <p className="prayer__caption">※ 매일 장 시작 전, 마음을 고르며 한 번 읽는 기도입니다.</p>
      </div>
    </section>
  )
}
