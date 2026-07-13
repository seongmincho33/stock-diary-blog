import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '@/shared/config/site'

function Clock() {
  const [t, setT] = useState('')
  useEffect(() => {
    const upd = () =>
      setT(new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true }))
    upd()
    const id = setInterval(upd, 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="taskbar__clock font-mono">{t || ' '}</span>
}

const START_ITEMS = [
  { label: '홈', to: '/', ic: '#1186d6' },
  { label: '매매일지', to: '/posts', ic: '#ffd54a' },
  { label: '추천도서', to: '/books', ic: '#b58900' },
  { label: '기도문', to: '/prayer', ic: '#d98a2b' },
  { label: '원칙', to: '/principles', ic: '#1a3ea8' },
  { label: '심법', to: '/mindset', ic: '#6a3fb5' },
  { label: '진리', to: '/truths', ic: '#b0392f' },
  { label: '연구', to: '/research', ic: '#0a7d2c' },
  { label: '소개', to: '/about', ic: '#1186d6' },
]

export function Taskbar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="taskbar">
      <button
        type="button"
        className={`taskbar__start${open ? ' is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="taskbar__start-ic" aria-hidden />
        <span className="taskbar__start-tx">시작</span>
      </button>

      <span className="taskbar__sep" aria-hidden />

      <div className="taskbar__win">
        <span className="mini-candle" aria-hidden>
          <i className="mini-candle__b mini-candle__b--d" />
          <i className="mini-candle__b mini-candle__b--u" />
          <i className="mini-candle__b mini-candle__b--d" />
        </span>
        {site.title} 98
      </div>

      <div className="taskbar__tray">
        <Clock />
      </div>

      {open && (
        <>
          <div className="startmenu__scrim" onClick={() => setOpen(false)} aria-hidden />
          <div className="startmenu" role="menu">
            <div className="startmenu__rail">
              <span className="startmenu__brand">{site.title} 98</span>
            </div>
            <div className="startmenu__items">
              {START_ITEMS.map((it) => (
                <Link key={it.to} to={it.to} className="startmenu__item" role="menuitem" onClick={() => setOpen(false)}>
                  <span className="startmenu__ic" style={{ background: it.ic }} aria-hidden />
                  {it.label}
                </Link>
              ))}
              <a
                href={site.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="startmenu__item"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                <span className="startmenu__ic" style={{ background: '#1655d6' }} aria-hidden />
                소스 보기
              </a>
              <div className="startmenu__div" aria-hidden />
              <div className="startmenu__item startmenu__item--dim">
                <span className="startmenu__ic" style={{ background: '#a00000' }} aria-hidden />
                종료
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
