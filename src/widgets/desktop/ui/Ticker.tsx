// 검정 HTS 티커 박스 — 실시간 시세 대신 브랜드/면책 마퀴 (가짜 시세 X)
const ITEMS = [
  { t: '★ 단타마스터', c: '#ffd54a' },
  { t: '예측하지 말고 대응하라', c: '#3fd07a' },
  { t: '물량을 지킬 것', c: '#ff6b5e' },
  { t: '현금도 포지션이다', c: '#3fd07a' },
  { t: '투자 권유 아님 · 모든 매매는 본인 책임', c: '#9a9a9a' },
  { t: '살아남는 자가 이긴다', c: '#3fd07a' },
  { t: '버블은 늘 마지막에 터진다', c: '#ff6b5e' },
]

function Row() {
  return (
    <span className="ticker__row" aria-hidden>
      {ITEMS.map((it, i) => (
        <span key={i} className="ticker__item" style={{ color: it.c }}>
          {it.t}
          <span className="ticker__sep">│</span>
        </span>
      ))}
    </span>
  )
}

export function Ticker() {
  return (
    <div className="ticker" role="marquee">
      <div className="ticker__track">
        <Row />
        <Row />
      </div>
    </div>
  )
}
