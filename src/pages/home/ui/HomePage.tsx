import { site } from '@/shared/config/site'
import { IntroPlayer } from '@/widgets/intro-player'
import { PostList } from '@/widgets/post-list'
import { BookShelf } from '@/widgets/book-shelf'
import { DiaryGate } from '@/widgets/diary-gate'

export function HomePage() {
  return (
    <div className="screen">
      <h1 className="sr-only">{site.title}</h1>

      {/* 1. 히어로 — 인트로 영상 → 배너 */}
      <IntroPlayer />

      {/* 2. 매매일지 */}
      <DiaryGate>
        <PostList />
      </DiaryGate>

      {/* 3. 추천도서 */}
      <BookShelf />
    </div>
  )
}
