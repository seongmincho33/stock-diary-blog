export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return `${y}년 ${m}월 ${d}일`
}

interface PostMetaProps {
  date: string
  categories?: string[]
}

export function PostMeta({ date, categories }: PostMetaProps) {
  return (
    <div className="post-meta">
      <time dateTime={date}>{formatDate(date)}</time>
      {categories && categories.length > 0 && (
        <span className="post-meta__tags">
          {categories.map((c) => (
            <span key={c} className="tag">
              {c}
            </span>
          ))}
        </span>
      )}
    </div>
  )
}
