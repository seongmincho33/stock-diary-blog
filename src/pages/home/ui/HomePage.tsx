import { site } from '@/shared/config/site'
import { IntroPlayer } from '@/widgets/intro-player'
import { PostList } from '@/widgets/post-list'
import { BookShelf } from '@/widgets/book-shelf'
import { HantuPromo } from '@/widgets/hantu'
import { DiaryGate } from '@/widgets/diary-gate'

export function HomePage() {
  return (
    <div className="screen">
      <h1 className="sr-only">{site.title}</h1>

      {/* 1. 히어로 — 인트로 영상 → 배너 */}
      <IntroPlayer />

      {/* 2. 직접 만든 프로그램 홍보 */}
      <HantuPromo />

      {/* 3. 매매일지 */}
      <DiaryGate>
        <PostList />
      </DiaryGate>

      {/* 3. 추천도서 */}
      <BookShelf />
    </div>
  )
}
