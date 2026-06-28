import { useParams, Link } from 'react-router-dom'
import { Markdown } from '@/shared/lib/Markdown'
import { getPost, formatDate } from '@/entities/post'

export function PostPage() {
  const { slug } = useParams()
  const post = slug ? getPost(slug) : undefined

  if (!post) {
    return (
      <div className="screen">
        <p className="notice">
          글을 찾을 수 없어요. <Link to="/">◀ 목록으로</Link>
        </p>
      </div>
    )
  }

  const category = post.categories[0] ?? '매매일지'

  return (
    <div className="screen">
      <article className="post">
        <Link className="btn-98 post__back" to="/">
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

        <div className="post__foot">
          <Link className="btn-98" to="/">
            ◀ 목록으로
          </Link>
        </div>
      </article>
    </div>
  )
}
