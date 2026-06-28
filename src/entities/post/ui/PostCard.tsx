import { Link } from 'react-router-dom'
import type { Post } from '../model/types'
import { formatDate } from './PostMeta'

interface PostCardProps {
  post: Post
  no: string
}

/** HTS 종목 리스트의 한 행 */
export function PostCard({ post, no }: PostCardProps) {
  return (
    <Link className="hts-row hts-row--post" to={`/posts/${post.slug}`}>
      <div className="hts-cell hts-cell--no font-mono">{no}</div>
      <div className="hts-cell hts-cell--date font-mono">{formatDate(post.date)}</div>
      <div className="hts-cell hts-cell--title">
        <span className="row-title">{post.title}</span>
        {post.subtitle && <span className="row-sub">{post.subtitle}</span>}
      </div>
      <div className="hts-cell hts-cell--cat">
        {post.categories.map((c) => (
          <span key={c} className="tag tag--cat">
            {c}
          </span>
        ))}
      </div>
    </Link>
  )
}
