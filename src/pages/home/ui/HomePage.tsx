import { site } from '@/shared/config/site'
import { posts, PostCard } from '@/entities/post'
import { CandleChart } from '@/shared/ui/CandleChart'

export function HomePage() {
  return (
    <div className="screen">
      <h1 className="sr-only">{site.title}</h1>

      {/* 손수 만든 배너 */}
      <section className="panel">
        <div className="panel__title">■ 단타마스터.bmp</div>
        <div className="panel__body panel__body--flush">
          <img
            className="hero-banner"
            src={`${import.meta.env.BASE_URL}banner.png`}
            alt="단타마스터 — 야구 단타 치듯 치고 빠지려는 개미의 매매일지 배너"
            width={1247}
            height={759}
          />
        </div>
      </section>

      {/* 분위기용 캔들차트 */}
      <section className="panel">
        <div className="panel__title">
          관심종목 · 일봉 <span className="panel__note">(분위기용 · 가상 차트)</span>
        </div>
        <div className="panel__chart">
          <CandleChart height={150} />
        </div>
        <div className="panel__legend font-mono">
          <span style={{ color: '#ff8a00' }}>━ 이평선(5)</span>
          <span style={{ color: '#e8202a' }}>■ 양봉</span>
          <span style={{ color: '#1655d6' }}>■ 음봉</span>
        </div>
      </section>

      {/* 매매일지 리스트 */}
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
    </div>
  )
}
