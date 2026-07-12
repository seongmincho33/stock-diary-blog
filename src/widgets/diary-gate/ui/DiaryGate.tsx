import { useEffect, useLayoutEffect, useState, type FormEvent, type ReactNode } from 'react'
import { isGateActive, isDiaryUnlocked, tryUnlockDiary } from '@/shared/lib/diary-gate'

// SSR에선 useEffect(no-op), 클라에선 useLayoutEffect로 페인트 전에 잠금 반영(콘텐츠 깜빡임 방지)
const useClientLayout = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * 매매일지 소프트 게이트. 잠겨 있으면 children 대신 Win98 다이얼로그 팝업으로 비밀번호를 요구한다.
 * ⚠️ 클라이언트 전용 "대충 막기" — 원문은 페이지 소스에 남는다.
 */
export function DiaryGate({ children }: { children: ReactNode }) {
  const [locked, setLocked] = useState(false)
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)

  useClientLayout(() => {
    if (isGateActive() && !isDiaryUnlocked()) setLocked(true)
  }, [])

  if (!locked) return <>{children}</>

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (tryUnlockDiary(pw)) {
      setLocked(false)
    } else {
      setErr(true)
      setPw('')
    }
  }

  return (
    <div className="gate-overlay">
      <section className="panel gate-dialog" role="dialog" aria-modal="true" aria-labelledby="gate-title">
        <div className="panel__title" id="gate-title">
          🔒 잠긴 매매일지
        </div>
        <div className="panel__body gate-dialog__body">
          <p className="gate-dialog__msg">매매일지를 보려면 비밀번호를 입력하세요.</p>
          <form className="gate-dialog__form" onSubmit={submit}>
            <input
              type="password"
              className="w98-field gate-dialog__input"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value)
                setErr(false)
              }}
              placeholder="비밀번호"
              aria-label="매매일지 비밀번호"
              autoFocus
            />
            <button type="submit" className="btn-98 gate-dialog__submit">
              확인
            </button>
          </form>
          {err && <p className="gate-dialog__err">비밀번호가 틀렸어요. 다시 한 번!</p>}
        </div>
      </section>
    </div>
  )
}
