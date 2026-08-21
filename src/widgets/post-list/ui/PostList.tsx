import { postsOf, PostCard, type PostKind } from '@/entities/post'

const HEAD: Record<PostKind, { title: string; note: string; empty: string }> = {
  stock: {
    title: '매매일지',
    note: '공포와 욕심 사이의 기록',
    empty: '아직 올라온 매매일지가 없습니다.',
  },
  dev: {
    title: '개발일지',
    note: '삽질과 배포 사이의 기록',
    empty: '아직 올라온 개발일지가 없습니다. 첫 글을 준비 중입니다.',
  },
}

/** HTS 종목 리스트 (홈 섹션 / 매매일지·개발일지 페이지 공용) */
export function PostList({ kind = 'stock' }: { kind?: PostKind }) {
  const list = postsOf(kind)
  const head = HEAD[kind]

  return (
    <section className="hts-list">
      <div className="hts-list__head">
        <span className="hts-list__title">{head.title}</span>
        <span className="hts-list__count">
          총 {list.length}건 · {head.note}
        </span>
      </div>

      <div className="hts-row hts-row--head">
        <div className="hts-cell hts-cell--no">번호</div>
        <div className="hts-cell hts-cell--date">날짜</div>
        <div className="hts-cell">제목</div>
        <div className="hts-cell hts-cell--cat">분류</div>
      </div>

      {list.length === 0 ? (
        <p className="hts-empty">{head.empty}</p>
      ) : (
        list.map((p, i) => (
          <PostCard key={p.slug} post={p} no={String(list.length - i).padStart(2, '0')} />
        ))
      )}

      {list.length > 0 && (
        <div className="pager">
          <span className="pager__btn">◀</span>
          <span className="pager__btn pager__btn--on">1</span>
          <span className="pager__btn">▶</span>
        </div>
      )}
    </section>
  )
}
