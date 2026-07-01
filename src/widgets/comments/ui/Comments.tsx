import { useEffect, useRef } from 'react'
import { giscus } from '../config'

/**
 * giscus 댓글 위젯.
 * - 스크립트를 useEffect 안에서만 주입 → 프리렌더(SSR)에는 영향 없음, 하이드레이션 후 클라이언트에서만 로드
 * - term(글 슬러그) 기준으로 글마다 개별 Discussion 에 매핑 (basename/트레일링슬래시 영향 없음)
 * - 글을 바꿔 이동하면 term 이 바뀌므로 위젯이 다시 로드됨
 */
export function Comments({ term }: { term: string }) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    // 재주입 방지: 기존 iframe/스크립트 초기화
    host.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'

    const attrs: Record<string, string> = {
      'data-repo': giscus.repo,
      'data-repo-id': giscus.repoId,
      'data-category': giscus.category,
      'data-category-id': giscus.categoryId,
      'data-mapping': 'specific',
      'data-term': term,
      'data-strict': '1',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'top',
      'data-theme': giscus.themeUrl,
      'data-lang': 'ko',
      'data-loading': 'lazy',
    }
    for (const [key, value] of Object.entries(attrs)) script.setAttribute(key, value)

    host.appendChild(script)

    return () => {
      host.innerHTML = ''
    }
  }, [term])

  return (
    <section className="comments" aria-label="댓글">
      <div className="comments__bar">
        <span className="comments__title">💬 방명록 · 댓글</span>
        <span className="comments__hint font-mono">GitHub 계정으로 한 줄 남겨주세요</span>
      </div>
      <div className="comments__body">
        <div ref={hostRef} className="comments__giscus" />
      </div>
    </section>
  )
}
