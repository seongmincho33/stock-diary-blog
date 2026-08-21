import { useParams, Link } from 'react-router-dom'
import { Markdown } from '@/shared/lib/Markdown'
import { getPost, getAdjacent, formatDate } from '@/entities/post'
import { Comments } from '@/widgets/comments'

/** 개발일지 개별 글. 매매일지와 달리 게이트/원문보기가 없다. */
export function DevPostPage() {
  const { slug } = useParams()
  const post = slug ? getPost(slug, 'dev') : undefined

  if (!post) {
    return (
      <div className="screen">
        <p className="notice">
          글을 찾을 수 없어요. <Link to="/dev">◀ 목록으로</Link>
        </p>
      </div>
    )
  }

  const category = post.categories[0] ?? '개발일지'
  const { older, newer } = getAdjacent(post.slug, 'dev')

  return (
    <div className="screen">
      <article className="post">
        <Link className="btn-98 post__back" to="/dev">
          ◀ 목록으로
        </Link>

        <div className="post__tagline">
          <span className="tag tag--cat">{category}</span>
          <span className="post__date font-mono">{formatDate(post.date)}</span>
        </div>

        <h1 className="post__title">{post.title}</h1>

        <div className="post__byline font-mono">
          <span>글쓴이 단타마스터</span>
          <span>·</span>
          <span>분류 {category}</span>
        </div>

        <Markdown content={post.body} />

        <nav className="post__nav">
          <div className="post__nav-side post__nav-side--prev">
            {older && (
              <Link className="btn-98 post__nav-btn" to={`/dev/${older.slug}`}>
                <span className="post__nav-dir">◀ 이전 개발일지</span>
                <span className="post__nav-ttl">
                  {formatDate(older.date)} · {older.title}
                </span>
              </Link>
            )}
          </div>

          <Link className="btn-98 post__nav-list" to="/dev">
            목록
          </Link>

          <div className="post__nav-side post__nav-side--next">
            {newer && (
              <Link className="btn-98 post__nav-btn post__nav-btn--next" to={`/dev/${newer.slug}`}>
                <span className="post__nav-dir">다음 개발일지 ▶</span>
                <span className="post__nav-ttl">
                  {formatDate(newer.date)} · {newer.title}
                </span>
              </Link>
            )}
          </div>
        </nav>

        <Comments term={`dev/${post.slug}`} />
      </article>
    </div>
  )
}
