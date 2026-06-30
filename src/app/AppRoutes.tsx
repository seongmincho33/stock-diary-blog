import { useEffect, useLayoutEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Desktop } from '@/widgets/desktop'
import { HomePage } from '@/pages/home'
import { PostListPage } from '@/pages/post-list'
import { PostPage } from '@/pages/post'
import { AboutPage } from '@/pages/about'
import { BooksPage } from '@/pages/books'
import { getMeta } from '@/shared/seo/meta'

// 서버엔 useLayoutEffect 경고가 나므로 클라에서만 레이아웃 이펙트 사용
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/** 클라이언트 네비게이션 시 document.title 갱신 (SSR head는 프리렌더가 담당) */
function RouteHead() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = getMeta(pathname).title
  }, [pathname])
  return null
}

/** 경로가 바뀌면 새 글 맨 위로 스크롤 (이전/다음 글 이동·뒤로가기 포함) */
function ScrollToTop() {
  const { pathname } = useLocation()
  useIsoLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/** Router에 의존하지 않는 화면 트리 — 클라이언트(BrowserRouter)/서버(StaticRouter) 공용 */
export function AppRoutes() {
  return (
    <>
      <RouteHead />
      <ScrollToTop />
      <Desktop>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostListPage />} />
          <Route path="/posts/:slug" element={<PostPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Desktop>
    </>
  )
}
