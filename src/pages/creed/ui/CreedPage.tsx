import { Creed, creeds, type CreedSlug } from '@/widgets/creed'

export function CreedPage({ slug }: { slug: CreedSlug }) {
  return (
    <div className="screen">
      <Creed creed={creeds[slug]} />
    </div>
  )
}
