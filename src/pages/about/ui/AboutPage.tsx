const RULES = [
  '주도주만 산다! 잡주는 물려도 탈출구가 없다.',
  '한 종목에 영혼까지 태우지 않는다. 비중관리가 곧 생존이다.',
  '예측하지 말고 대응한다. 라인을 미리 정해두고 기계처럼 움직인다.',
  '현금도 포지션이다. 떨어질 때 살 실탄을 늘 남겨둔다.',
  '오르는 주식은 함부로 팔지 않는다. (※ 매번 까먹음)',
]

export function AboutPage() {
  return (
    <div className="screen">
      <div className="hts-list__head">
        <span className="hts-list__title">프로필</span>
        <span className="hts-list__count">투자자 카드</span>
      </div>

      <div className="profile">
        <div className="profile__avatar w98-field">
          <span>단</span>
        </div>
        <div className="profile__info">
          <div className="profile__name-row">
            <span className="profile__name">단타마스터</span>
            <span className="tag tag--up">LV.7 중수</span>
          </div>
          <p className="profile__quote">
            “ 치고 빠지려다 풀스윙 헛스윙. 그래도 살아남았으니 기록한다. ”
          </p>
        </div>
      </div>

      <div className="panel">
        <div className="panel__title">나의 투자 원칙</div>
        <div className="panel__body prose">
          {RULES.map((r, i) => (
            <div className="rule" key={i}>
              <span className="rule__n">{i + 1}.</span>
              <span>{r}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="panel__title">이 블로그는</div>
        <div className="panel__body prose">
          <p>
            2026년 5~6월, 코스피 반도체 랠리 한복판에서 삼성전자·SK하이닉스(삼닉)에 1억 넘게 넣고 공포와 욕심
            사이를 자이로드롭처럼 오간 어느 개미의 매매 회고록입니다.
          </p>
          <p>
            수익 자랑도, 종목 추천도 아닙니다. 그저 <strong>“나만 이런 거 아니구나”</strong> 하고 같이 웃자고
            적는 기록이에요. 투자 권유 아님, 모든 매매는 본인 책임. ⚾
          </p>
        </div>
      </div>
    </div>
  )
}
