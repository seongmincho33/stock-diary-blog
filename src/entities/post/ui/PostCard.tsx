import { Link } from 'react-router-dom'
import type { Post } from '../model/types'
import { PostMeta } from './PostMeta'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="post-card">
      <PostMeta date={post.date} categories={post.categories} />
      <h2 className="post-card__title">
        <Link to={`/posts/${post.slug}`}>{post.title}</Link>
      </h2>
      {post.subtitle && <p className="post-card__subtitle">{post.subtitle}</p>}
      <p className="post-card__excerpt">{post.excerpt}</p>
      <Link className="post-card__more" to={`/posts/${post.slug}`}>
        읽기 →
      </Link>
    </article>
  )
}
