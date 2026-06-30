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
  if (pathname.startsWith('/posts/')) return '글 보기'
  if (pathname.startsWith('/about')) return '소개'
  if (pathname.startsWith('/books')) return '추천도서'
  return '매매일지'
}

export function Desktop({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const label = screenLabel(pathname)
  const isAbout = pathname.startsWith('/about')
  const isBooks = pathname.startsWith('/books')
  const isList = !isAbout && !isBooks

  return (
    <div className="desktop">
      {/* 바탕화면 아이콘 (데스크톱 전용) */}
      <div className="desktop__icons" aria-hidden>
        <Link to="/" className="dicon">
          <span className="dicon__img dicon__img--folder" />
          <span className="dicon__label">내 일지</span>
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

        {/* 메뉴바 (장식) */}
        <div className="menubar" aria-hidden>
          {MENUS.map(([k, r]) => (
            <span key={k} className="menubar__item">
              <u>{k}</u>
              {r}
            </span>
          ))}
        </div>

        {/* 탭(네비) + 티커 */}
        <div className="tabbar">
          <nav className="tabbar__tabs">
            <NavLink to="/" className={() => `tab${isList ? ' is-active' : ''}`}>
              매매일지
            </NavLink>
            <NavLink to="/about" className={() => `tab${isAbout ? ' is-active' : ''}`}>
              소개
            </NavLink>
            <NavLink to="/books" className={() => `tab${isBooks ? ' is-active' : ''}`}>
              추천도서
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
