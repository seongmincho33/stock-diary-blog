import { BookShelf, type BookCategory } from '@/widgets/book-shelf'

export function BooksPage({ only }: { only?: BookCategory } = {}) {
  return (
    <div className="screen">
      <BookShelf only={only} />
    </div>
  )
}
