import { posts, PostCard } from '@/entities/post'

/** HTS 종목 리스트 (홈 섹션 / 매매일지 페이지 공용) */
export function PostList() {
  return (
    <section className="hts-list">
      <div className="hts-list__head">
        <span className="hts-list__title">매매일지</span>
        <span className="hts-list__count">총 {posts.length}건 · 공포와 욕심 사이의 기록</span>
      </div>

      <div className="hts-row hts-row--head">
        <div className="hts-cell hts-cell--no">번호</div>
        <div className="hts-cell hts-cell--date">날짜</div>
        <div className="hts-cell">제목</div>
        <div className="hts-cell hts-cell--cat">분류</div>
      </div>

      {posts.map((p, i) => (
        <PostCard key={p.slug} post={p} no={String(posts.length - i).padStart(2, '0')} />
      ))}

      <div className="pager">
        <span className="pager__btn">◀</span>
        <span className="pager__btn pager__btn--on">1</span>
        <span className="pager__btn">▶</span>
      </div>
    </section>
  )
}
