import { studies, studyHref } from '../model/studies'
import { formatDate } from '@/entities/post'

/** 개발공부 — 테마별 문서 묶음 목록 */
export function StudyList() {
  return (
    <div className="study-list">
      <div className="hts-list__head">
        <span className="hts-list__title">개발공부</span>
        <span className="hts-list__count">총 {studies.length}묶음 · 테마별로 정리한 학습 문서</span>
      </div>

      {studies.map((s) => (
        <section key={s.slug} className="panel study">
          <div className="panel__title">📗 {s.title}</div>
          <div className="panel__body study__body">
            <div className="study__head">
              <span className="study__sub">{s.subtitle}</span>
              <span className="study__date font-mono">{formatDate(s.date)}</span>
            </div>

            <p className="study__desc">{s.description}</p>

            <div className="study__tags">
              {s.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>

            {s.toc && s.toc.length > 0 && (
              <div className="study__toc">
                <span className="study__toc-lb">목차</span>
                {s.toc.map((l) => (
                  <a key={l.file} href={studyHref(s, l.file)}>
                    {l.label}
                  </a>
                ))}
              </div>
            )}

            <div className="study__foot">
              <a className="btn-98 study__open" href={studyHref(s)}>
                문서 열기 ▶
              </a>
              {s.pages && <span className="study__n font-mono">{s.pages} pages</span>}
              {s.source && (
                <a className="study__src" href={s.source.url} target="_blank" rel="noreferrer">
                  원본 저장소: {s.source.label} ↗
                </a>
              )}
            </div>
          </div>
        </section>
      ))}

      <p className="study__note">※ 문서는 블로그와 별도 스타일(자체 다크모드 지원)로 열립니다. 돌아올 땐 브라우저 뒤로가기.</p>
    </div>
  )
}
