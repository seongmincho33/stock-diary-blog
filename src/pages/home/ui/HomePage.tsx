import { Container } from '@/shared/ui/Container'
import { site } from '@/shared/config/site'
import { posts, PostCard } from '@/entities/post'

export function HomePage() {
  return (
    <Container>
      <section className="home-hero">
        <img
          className="home-hero__banner"
          src={`${import.meta.env.BASE_URL}banner.png`}
          alt="단타마스터 — 야구 단타 치듯 치고 빠지려는 개미의 매매일지 배너"
          width={1247}
          height={759}
        />
        <h1 className="home-hero__title sr-only">{site.title}</h1>
        <p className="home-hero__tagline">{site.tagline}</p>
        <p className="home-hero__desc">
          같은 처지의 개미들이 읽으며 위로받고, 피식 웃으라고 적습니다. ⚾📈📉
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
