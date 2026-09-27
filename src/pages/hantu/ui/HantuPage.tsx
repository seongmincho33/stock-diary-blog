import { hantu, RELEASED } from '@/widgets/hantu'

export function HantuPage() {
  return (
    <div className="screen hantu">
      {/* 소개 */}
      <section className="panel">
        <div className="panel__title">💾 {hantu.repoName} — 프로그램 정보</div>
        <div className="panel__body hantu__head">
          <span className="hantu__ic" aria-hidden />
          <div className="hantu__id">
            <h1 className="hantu__name">{hantu.name}</h1>
            <p className="hantu__tagline">{hantu.tagline}</p>
            <p className="hantu__ver font-mono">
              버전 {hantu.version} · macOS · 개인 프로젝트
            </p>
          </div>
        </div>
      </section>

      {/* 왜 만들었나 */}
      <section className="panel">
        <div className="panel__title">📄 소개</div>
        <div className="panel__body">
          <p className="hantu__summary">{hantu.summary}</p>
          <div className="hantu__badges">
            {hantu.stack.map((s) => (
              <span key={s} className="tag">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 기능 */}
      <section className="panel">
        <div className="panel__title">🧰 메뉴 {hantu.menus.length}개</div>
        <div className="panel__body">
          <div className="hantu__menus">
            {hantu.menus.map((m) => (
              <div key={m.label} className="hantu__menu">
                <span className="hantu__menu-lb">{m.label}</span>
                <span className="hantu__menu-ds">{m.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 다운로드 */}
      <section className="panel hantu__dl">
        <div className="panel__title">⬇ 다운로드</div>
        <div className="panel__body">
          {RELEASED ? (
            <>
              <div className="hantu__dl-row">
                <a className="btn-98 hantu__dl-btn" href={hantu.releaseUrl} target="_blank" rel="noreferrer">
                  ⬇ 최신 버전 받기 (GitHub Releases)
                </a>
                <a className="btn-98" href={hantu.repoUrl} target="_blank" rel="noreferrer">
                  소스 보기
                </a>
              </div>
              <p className="hantu__req">
                요구사항: {hantu.requirements.join(' · ')}
              </p>
              <p className="hantu__note">
                ※ 앱을 켜기 전에 백엔드를 먼저 올립니다. 저장소의 <code>DDALLKKAK.command</code>를 더블클릭하면
                한 번에 처리됩니다. 한국투자증권 앱키는 앱의 ⚙ 설정 화면에서 넣습니다.
              </p>
            </>
          ) : (
            <>
              <div className="hantu__dl-row">
                <span className="btn-98 hantu__dl-btn is-disabled" aria-disabled="true">
                  ⬇ 다운로드 — 준비 중
                </span>
              </div>
              <p className="hantu__req">
                아직 공개 준비 중입니다. 저장소를 공개하고 릴리스를 올리면 여기에서 바로 받을 수 있습니다.
              </p>
            </>
          )}
        </div>
      </section>

      {/* 면책 */}
      <section className="panel">
        <div className="panel__title">⚠️ 읽어주세요</div>
        <div className="panel__body">
          <ul className="hantu__disc">
            <li>
              개인 학습·참고용 프로젝트입니다. <b>주문·자동매매 기능은 없습니다</b> — 시세 조회 전용입니다.
            </li>
            <li>앱의 어떤 화면·수치도 투자 판단의 근거가 아닙니다. 모든 매매는 본인 책임입니다.</li>
            <li>한국투자증권 앱키·시크릿은 본인 계정으로 발급받아 본인 기기에만 저장됩니다.</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
