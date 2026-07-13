import { useParams, Link } from 'react-router-dom'
import { Markdown } from '@/shared/lib/Markdown'
import { getResearchNote, researchNotes } from '@/entities/research'

/** 연구 노트 상세 */
export function ResearchNotePage() {
  const { num } = useParams()
  const note = num ? getResearchNote(parseInt(num, 10)) : undefined

  if (!note) {
    return (
      <div className="screen">
        <p className="notice">
          연구 노트를 찾을 수 없어요. <Link to="/research">◀ 연구 목록으로</Link>
        </p>
      </div>
    )
  }

  const older = researchNotes.find((n) => n.num === note.num - 1)
  const newer = researchNotes.find((n) => n.num === note.num + 1)

  return (
    <div className="screen">
      <article className="post">
        <Link className="btn-98 post__back" to="/research">
          ◀ 연구 목록으로
        </Link>

        <div className="post__tagline">
          <span className="tag tag--cat">연구</span>
          <span className="post__date font-mono">No.{String(note.num).padStart(2, '0')}</span>
        </div>

        <h1 className="post__title">{note.title}</h1>

        <div className="post__byline font-mono">
          <span>글쓴이 단타마스터</span>
          <span>·</span>
          <span>분류 연구</span>
        </div>

        <Markdown content={note.body} />

        <nav className="post__nav">
          <div className="post__nav-side post__nav-side--prev">
            {older && (
              <Link className="btn-98 post__nav-btn" to={`/research/${older.num}`}>
                <span className="post__nav-dir">◀ 이전 연구</span>
                <span className="post__nav-ttl">
                  {String(older.num).padStart(2, '0')} · {older.title}
                </span>
              </Link>
            )}
          </div>

          <Link className="btn-98 post__nav-list" to="/research">
            목록
          </Link>

          <div className="post__nav-side post__nav-side--next">
            {newer && (
              <Link className="btn-98 post__nav-btn post__nav-btn--next" to={`/research/${newer.num}`}>
                <span className="post__nav-dir">다음 연구 ▶</span>
                <span className="post__nav-ttl">
                  {String(newer.num).padStart(2, '0')} · {newer.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      </article>
    </div>
  )
}
