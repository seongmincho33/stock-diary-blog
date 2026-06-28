import { Link, NavLink } from 'react-router-dom'
import { site } from '@/shared/config/site'

export function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand">
          <span className="site-header__emoji" aria-hidden>
            ⚾
          </span>
          <span>{site.title}</span>
        </Link>
        <nav className="site-nav">
          <NavLink to="/" end>
            홈
          </NavLink>
          <NavLink to="/about">소개</NavLink>
        </nav>
      </div>
    </header>
  )
}
