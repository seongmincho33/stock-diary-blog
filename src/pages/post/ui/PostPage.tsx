import { useParams, Link } from 'react-router-dom'
import { Container } from '@/shared/ui/Container'
import { Markdown } from '@/shared/lib/Markdown'
import { getPost, PostMeta } from '@/entities/post'

export function PostPage() {
  const { slug } = useParams()
  const post = slug ? getPost(slug) : undefined

  if (!post) {
    return (
      <Container>
        <p className="notice">
          글을 찾을 수 없어요. <Link to="/">← 홈으로</Link>
        </p>
      </Container>
    )
  }

  return (
    <Container className="post-page">
      <Link className="post-page__back" to="/">
        ← 목록
      </Link>
      <article>
        <header className="post-page__header">
          <PostMeta date={post.date} categories={post.categories} />
          <h1 className="post-page__title">{post.title}</h1>
        </header>
        <Markdown content={post.body} />
      </article>
    </Container>
  )
}
