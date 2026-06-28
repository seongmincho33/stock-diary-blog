import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import { HomePage } from '@/pages/home'
import { PostPage } from '@/pages/post'
import { AboutPage } from '@/pages/about'

// Vite base(/stock-diary-blog/)를 라우터 basename으로 사용
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

export function App() {
  return (
    <BrowserRouter basename={basename}>
      <Header />
      <main className="site-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:slug" element={<PostPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
