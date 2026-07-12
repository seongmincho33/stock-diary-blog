import { PostList } from '@/widgets/post-list'
import { DiaryGate } from '@/widgets/diary-gate'

export function PostListPage() {
  return (
    <div className="screen">
      <DiaryGate>
        <PostList />
      </DiaryGate>
    </div>
  )
}
