export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  if (!y || !m || !d) return iso
  return `${y}.${m}.${d}`
}

interface PostMetaProps {
  date: string
  categories?: string[]
}

export function PostMeta({ date, categories }: PostMetaProps) {
  return (
    <div className="post-meta">
      {categories?.map((c) => (
        <span key={c} className="tag tag--cat">
          {c}
        </span>
      ))}
      <time className="font-mono" dateTime={date}>
        {formatDate(date)}
      </time>
    </div>
  )
}
