import { useState, type FormEvent } from 'react'
import { isOriginalUnlocked, tryUnlockOriginal } from '@/shared/lib/diary-gate'

/**
 * '원문보기' — 각색 전 원문을 비밀번호(사이트 내장, 소프트 게이트) 뒤에 숨겨 보여준다.
 * 매매일지를 이미 같은 비번으로 열었다면 재입력 없이 바로 펼쳐진다.
 */
export function OriginalReveal({ text }: { text: string }) {
  const [open, setOpen] = useState(false)
  const [asking, setAsking] = useState(false)
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)

  const handleOpen = () => {
    if (isOriginalUnlocked()) setOpen(true)
    else setAsking(true)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (tryUnlockOriginal(pw)) {
      setOpen(true)
      setAsking(false)
    } else {
      setErr(true)
      setPw('')
    }
  }

  return (
    <section className="panel original">
      <div className="panel__title">📄 이 글의 원문 (각색 전)</div>
      <div className="panel__body original__body">
        {open ? (
          <>
            <p className="original__note">단타마스터가 각색하기 전, 날것 그대로의 원문입니다.</p>
            <div className="original__text">{text}</div>
            <button type="button" className="btn-98 original__close" onClick={() => setOpen(false)}>
              접기
            </button>
          </>
        ) : asking ? (
          <form className="original__form" onSubmit={submit}>
            <p className="original__msg">🔒 원문을 보려면 비밀번호를 입력하세요.</p>
            <div className="original__form-row">
              <input
                type="password"
                className="w98-field original__input"
                value={pw}
                onChange={(e) => {
                  setPw(e.target.value)
                  setErr(false)
                }}
                placeholder="비밀번호"
                aria-label="원문 비밀번호"
                autoFocus
              />
              <button type="submit" className="btn-98">
                확인
              </button>
            </div>
            {err && <p className="original__err">비밀번호가 틀렸어요. 다시 한 번!</p>}
          </form>
        ) : (
          <div className="original__cta">
            <p className="original__teaser">각색 전, 날것 그대로의 원본 매매일지가 궁금하다면?</p>
            <button type="button" className="btn-98 original__btn" onClick={handleOpen}>
              🔒 원문 보기
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
