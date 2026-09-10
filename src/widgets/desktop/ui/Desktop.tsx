import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site } from '@/shared/config/site'
import { Ticker } from './Ticker'
import { Taskbar } from './Taskbar'

/** 상단 탭 하나 */
interface Tab {
  key: string
  label: string
  to: string
}

const TABS: Record<string, Tab> = {
  home: { key: 'home', label: '홈', to: '/' },
  posts: { key: 'posts', label: '매매일지', to: '/posts' },
  dev: { key: 'dev', label: '개발일지', to: '/dev' },
  study: { key: 'study', label: '개발공부', to: '/study' },
  books: { key: 'books', label: '추천도서', to: '/books' },
  prayer: { key: 'prayer', label: '기도문', to: '/prayer' },
  principles: { key: 'principles', label: '원칙', to: '/principles' },
  mindset: { key: 'mindset', label: '심법', to: '/mindset' },
  truths: { key: 'truths', label: '진리', to: '/truths' },
  research: { key: 'research', label: '연구', to: '/research' },
  about: { key: 'about', label: '소개', to: '/about' },
}

type GroupKey = 'stock' | 'dev' | 'company'

/** 메뉴바 그룹 — 클릭하면 아래 탭 묶음이 바뀐다. hot = Win98식 단축키 밑줄 글자 */
interface Group {
  key: GroupKey
  hot: string
  rest: string
  tabs: string[]
}

const GROUPS: Group[] = [
  {
    key: 'stock',
    hot: '주',
    rest: '식',
    tabs: ['home', 'posts', 'study', 'books', 'prayer', 'principles', 'mindset', 'truths', 'research', 'about'],
  },
  { key: 'dev', hot: '개', rest: '발', tabs: ['dev', 'study'] },
  { key: 'company', hot: '회', rest: '사', tabs: [] },
]

/** 현재 경로가 켜는 탭. /admin 처럼 탭이 없는 경로는 null, 그 외 미매칭은 홈 */
function activeTabKey(pathname: string): string | null {
  const hit = Object.values(TABS).find((t) => t.to !== '/' && pathname.startsWith(t.to))
  if (hit) return hit.key
  if (pathname.startsWith('/admin')) return null
  return 'home'
}

function groupHas(group: GroupKey, pathname: string): boolean {
  const key = activeTabKey(pathname)
  return key !== null && (GROUPS.find((g) => g.key === group)?.tabs.includes(key) ?? false)
}

/** 경로만으로 정한 기본 그룹 — 여러 그룹에 속한 탭(개발공부)은 앞선 그룹(주식) */
function groupOf(pathname: string): GroupKey {
  return GROUPS.find((g) => groupHas(g.key, pathname))?.key ?? 'stock'
}

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
  if (/^\/dev\/.+/.test(pathname)) return '글 보기' // /dev/<슬러그> (개별 글)
  if (pathname.startsWith('/dev')) return '개발일지' // /dev, /dev/ (목록)
  if (pathname.startsWith('/study')) return '개발공부'
  if (pathname.startsWith('/about')) return '소개'
  if (pathname.startsWith('/books')) return '추천도서'
  if (pathname.startsWith('/prayer')) return '기도문'
  if (pathname.startsWith('/principles')) return '원칙'
  if (pathname.startsWith('/mindset')) return '심법'
  if (pathname.startsWith('/truths')) return '진리'
  if (pathname.startsWith('/research')) return '연구'
  if (pathname.startsWith('/admin')) return '관리자'
  return '홈'
}

export function Desktop({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const label = screenLabel(pathname)
  // 메뉴바에서 고른 그룹. null 이면 경로가 정한다. 경로가 바뀌어 고른 그룹 밖으로 나가면 자동 전환.
  const [picked, setPicked] = useState<GroupKey | null>(null)
  useEffect(() => {
    setPicked((p) => (p && groupHas(p, pathname) ? p : null))
  }, [pathname])
  const group = picked ?? groupOf(pathname)
  const tabKey = activeTabKey(pathname)
  const tabs = (GROUPS.find((g) => g.key === group)?.tabs ?? []).map((k) => TABS[k])

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
        <Link to="/dev" className="dicon">
          <span className="dicon__img dicon__img--dev" />
          <span className="dicon__label">개발일지</span>
        </Link>
        <Link to="/study" className="dicon">
          <span className="dicon__img dicon__img--study" />
          <span className="dicon__label">개발공부</span>
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
        <Link to="/research" className="dicon">
          <span className="dicon__img dicon__img--research" />
          <span className="dicon__label">연구</span>
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

        {/* 메뉴바 — 탭 그룹 전환(주식/개발/회사) + 관리자 진입 */}
        <div className="menubar">
          {GROUPS.map((g) => (
            <button
              key={g.key}
              type="button"
              className={`menubar__item menubar__item--group${group === g.key ? ' is-active' : ''}`}
              aria-pressed={group === g.key}
              onClick={() => setPicked(g.key)}
            >
              <u>{g.hot}</u>
              {g.rest}
            </button>
          ))}
          <NavLink to="/admin" className="menubar__item menubar__item--admin">
            <u>관</u>리자
          </NavLink>
        </div>

        {/* 탭(네비) + 티커 */}
        <div className="tabbar">
          <nav className="tabbar__tabs">
            {tabs.length === 0 ? (
              <span className="tab tab--dim">준비 중</span>
            ) : (
              tabs.map((t) => (
                <NavLink key={t.key} to={t.to} className={() => `tab${tabKey === t.key ? ' is-active' : ''}`}>
                  {t.label}
                </NavLink>
              ))
            )}
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
