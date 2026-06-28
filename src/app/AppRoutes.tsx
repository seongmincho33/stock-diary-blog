import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Desktop } from '@/widgets/desktop'
import { HomePage } from '@/pages/home'
import { PostPage } from '@/pages/post'
import { AboutPage } from '@/pages/about'
import { getMeta } from '@/shared/seo/meta'

/** 클라이언트 네비게이션 시 document.title 갱신 (SSR head는 프리렌더가 담당) */
function RouteHead() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = getMeta(pathname).title
  }, [pathname])
  return null
}

/** Router에 의존하지 않는 화면 트리 — 클라이언트(BrowserRouter)/서버(StaticRouter) 공용 */
export function AppRoutes() {
  return (
    <>
      <RouteHead />
      <Desktop>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:slug" element={<PostPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Desktop>
    </>
  )
}
