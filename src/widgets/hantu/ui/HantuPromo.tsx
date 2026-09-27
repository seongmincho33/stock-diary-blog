import { Link } from 'react-router-dom'
import { hantu } from '../model/hantu'

/** 홈에 붙는 홍보 카드 — 자세한 내용은 /hantu 로 */
export function HantuPromo() {
  return (
    <section className="panel hantu-promo">
      <div className="panel__title">💾 {hantu.name}.exe — 직접 만든 주식 프로그램</div>
      <div className="panel__body hantu-promo__body">
        <span className="hantu-promo__ic" aria-hidden />
        <div className="hantu-promo__tx">
          <p className="hantu-promo__lead">
            증권사 HTS가 안 보여주는 걸 보고 싶어서 <b>직접 만들었습니다.</b> 보유 현황·관심종목·차트에
            팩터모델·매크로·레짐 플레이북까지.
          </p>
          <p className="hantu-promo__sub font-mono">
            {hantu.stack.slice(0, 4).join(' · ')} · 주문/자동매매 없음(시세 조회 전용)
          </p>
        </div>
        <Link className="btn-98 hantu-promo__btn" to="/hantu">
          자세히 보기 ▶
        </Link>
      </div>
    </section>
  )
}
