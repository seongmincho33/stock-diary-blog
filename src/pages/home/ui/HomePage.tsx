import { Container } from '@/shared/ui/Container'
import { site } from '@/shared/config/site'
import { posts, PostCard } from '@/entities/post'

export function HomePage() {
  return (
    <Container>
      <section className="home-hero">
        <h1 className="home-hero__title">{site.title}</h1>
        <p className="home-hero__tagline">{site.tagline}</p>
        <p className="home-hero__desc">
          같은 처지의 개미들이 읽으며 위로받고, 피식 웃으라고 적습니다. 🐜📈📉
        </p>
      </section>

      <section className="post-list">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </Container>
  )
}
