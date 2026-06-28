import { site } from '@/shared/config/site'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p className="site-footer__tagline">{site.tagline}</p>
        <p className="site-footer__meta">
          투자 권유 아님 · 모든 매매는 본인 책임 ·{' '}
          <a href={site.repoUrl} target="_blank" rel="noreferrer">
            source
          </a>
        </p>
      </div>
    </footer>
  )
}
