import { Link } from 'react-router-dom'
import { researchNotes } from '@/entities/research'

/** 연구 목록 — HTS 리스트 스타일 */
export function ResearchListPage() {
  return (
    <div className="screen">
      <section className="hts-list">
        <div className="hts-list__head">
          <span className="hts-list__title">연구</span>
          <span className="hts-list__count">총 {researchNotes.length}건 · 물리고 배운 것들의 정리</span>
        </div>

        <div className="hts-row hts-row--research hts-row--head">
          <div className="hts-cell hts-cell--no">번호</div>
          <div className="hts-cell">주제</div>
        </div>

        {researchNotes.map((n) => (
          <Link key={n.num} className="hts-row hts-row--research hts-row--post" to={`/research/${n.num}`}>
            <div className="hts-cell hts-cell--no font-mono">{String(n.num).padStart(2, '0')}</div>
            <div className="hts-cell hts-cell--title">
              <span className="row-title">{n.title}</span>
              <span className="row-sub">「{n.subtitle}」</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  )
}
