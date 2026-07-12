import type { ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site } from '@/shared/config/site'
import { Ticker } from './Ticker'
import { Taskbar } from './Taskbar'

const MENUS = [
  ['파', '일'],
  ['편', '집'],
  ['보', '기'],
  ['종', '목'],
  ['차', '트'],
  ['도', '움말'],
]

function MiniCandle() {
  return (
    <span className="mini-candle" aria-hidden>
      <i className="mini-candle__b mini-candle__b--d" />
      <i className="mini-candle__b mini-candle__b--u" />
      <i className="mini-candle__b mini-candle__b--d" />
    </span>
  )
}

function screenLabel(pathname: string): string {
  if (/^\/posts\/.+/.test(pathname)) return '글 보기' // /posts/<슬러그> (개별 글)
  if (pathname.startsWith('/posts')) return '매매일지' // /posts, /posts/ (목록)
  if (pathname.startsWith('/about')) return '소개'
  if (pathname.startsWith('/books')) return '추천도서'
  if (pathname.startsWith('/prayer')) return '기도문'
  if (pathname.startsWith('/principles')) return '원칙'
  if (pathname.startsWith('/mindset')) return '심법'
  if (pathname.startsWith('/truths')) return '진리'
  if (pathname.startsWith('/admin')) return '관리자'
  return '홈'
}

export function Desktop({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const label = screenLabel(pathname)
  const isPosts = pathname.startsWith('/posts')
  const isAbout = pathname.startsWith('/about')
  const isBooks = pathname.startsWith('/books')
  const isPrayer = pathname.startsWith('/prayer')
  const isPrinciples = pathname.startsWith('/principles')
  const isMindset = pathname.startsWith('/mindset')
  const isTruths = pathname.startsWith('/truths')
  const isAdmin = pathname.startsWith('/admin')
  const isHome =
    !isPosts && !isAbout && !isBooks && !isPrayer && !isPrinciples && !isMindset && !isTruths && !isAdmin

  return (
    <div className="desktop">
      {/* 바탕화면 아이콘 (데스크톱 전용) */}
      <div className="desktop__icons" aria-hidden>
        <Link to="/" className="dicon">
          <span className="dicon__img dicon__img--home" />
          <span className="dicon__label">홈</span>
        </Link>
        <Link to="/posts" className="dicon">
          <span className="dicon__img dicon__img--folder" />
          <span className="dicon__label">내 일지</span>
        </Link>
        <Link to="/books" className="dicon">
          <span className="dicon__img dicon__img--book" />
          <span className="dicon__label">추천도서</span>
        </Link>
        <Link to="/prayer" className="dicon">
          <span className="dicon__img dicon__img--prayer" />
          <span className="dicon__label">기도문</span>
        </Link>
        <Link to="/principles" className="dicon">
          <span className="dicon__img dicon__img--principles" />
          <span className="dicon__label">원칙</span>
        </Link>
        <Link to="/mindset" className="dicon">
          <span className="dicon__img dicon__img--mindset" />
          <span className="dicon__label">심법</span>
        </Link>
        <Link to="/truths" className="dicon">
          <span className="dicon__img dicon__img--truths" />
          <span className="dicon__label">진리</span>
        </Link>
        <Link to="/about" className="dicon">
          <span className="dicon__img dicon__img--chart">
            <i className="mini-candle__b mini-candle__b--d" />
            <i className="mini-candle__b mini-candle__b--u" />
            <i className="mini-candle__b mini-candle__b--d" />
          </span>
          <span className="dicon__label">소개</span>
        </Link>
      </div>

      <div className="window">
        {/* 타이틀바 */}
        <div className="titlebar">
          <MiniCandle />
          <span className="titlebar__text">
            {site.title} 98 &nbsp;—&nbsp; [{label}]
          </span>
          <div className="titlebar__btns" aria-hidden>
            <span className="titlebar__btn">_</span>
            <span className="titlebar__btn titlebar__btn--max" />
            <span className="titlebar__btn">×</span>
          </div>
        </div>

        {/* 메뉴바 (장식 + 관리자 진입) */}
        <div className="menubar">
          {MENUS.map(([k, r]) => (
            <span key={k} className="menubar__item" aria-hidden>
              <u>{k}</u>
              {r}
            </span>
          ))}
          <NavLink to="/admin" className="menubar__item menubar__item--admin">
            <u>관</u>리자
          </NavLink>
        </div>

        {/* 탭(네비) + 티커 */}
        <div className="tabbar">
          <nav className="tabbar__tabs">
            <NavLink to="/" className={() => `tab${isHome ? ' is-active' : ''}`}>
              홈
            </NavLink>
            <NavLink to="/posts" className={() => `tab${isPosts ? ' is-active' : ''}`}>
              매매일지
            </NavLink>
            <NavLink to="/books" className={() => `tab${isBooks ? ' is-active' : ''}`}>
              추천도서
            </NavLink>
            <NavLink to="/prayer" className={() => `tab${isPrayer ? ' is-active' : ''}`}>
              기도문
            </NavLink>
            <NavLink to="/principles" className={() => `tab${isPrinciples ? ' is-active' : ''}`}>
              원칙
            </NavLink>
            <NavLink to="/mindset" className={() => `tab${isMindset ? ' is-active' : ''}`}>
              심법
            </NavLink>
            <NavLink to="/truths" className={() => `tab${isTruths ? ' is-active' : ''}`}>
              진리
            </NavLink>
            <NavLink to="/about" className={() => `tab${isAbout ? ' is-active' : ''}`}>
              소개
            </NavLink>
          </nav>
          <Ticker />
        </div>

        {/* 본문 */}
        <main className="window__content">{children}</main>

        {/* 상태바 */}
        <div className="statusbar">
          <span className="statusbar__cell statusbar__cell--grow">준비 — {label}</span>
          <span className="statusbar__cell font-mono">단타마스터.exe</span>
        </div>
      </div>

      <Taskbar />
    </div>
  )
}
