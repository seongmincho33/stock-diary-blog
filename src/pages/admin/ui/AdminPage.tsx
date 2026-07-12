import { useEffect, useLayoutEffect, useState, type FormEvent } from 'react'
import {
  adminLogin,
  adminLogout,
  isAdminAuthed,
  getDiaryPassword,
  setDiaryPassword,
  clearDiaryOverride,
  hasDiaryOverride,
} from '@/shared/lib/diary-gate'

const useClientLayout = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function AdminPage() {
  const [authed, setAuthed] = useState(false)

  // SSR=false → 프리렌더는 로그인 화면. 클라에서 인증돼 있으면 페인트 전에 대시보드로 전환.
  useClientLayout(() => {
    setAuthed(isAdminAuthed())
  }, [])

  return (
    <div className="screen">
      <div className="hts-list__head">
        <span className="hts-list__title">관리자</span>
        <span className="hts-list__count">{authed ? '설정' : '🔒 잠김'}</span>
      </div>
      {authed ? (
        <AdminDashboard onLogout={() => setAuthed(false)} />
      ) : (
        <AdminLogin onLogin={() => setAuthed(true)} />
      )}
    </div>
  )
}

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (adminLogin(pw)) {
      onLogin()
    } else {
      setErr(true)
      setPw('')
    }
  }

  return (
    <section className="panel admin-gate">
      <div className="panel__title">🔒 관리자 로그인</div>
      <div className="panel__body admin-gate__body">
        <p className="admin-gate__msg">관리자 비밀번호를 입력하세요.</p>
        <form className="admin-gate__form" onSubmit={submit}>
          <input
            type="password"
            className="w98-field admin-gate__input"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value)
              setErr(false)
            }}
            placeholder="비밀번호"
            aria-label="관리자 비밀번호"
            autoFocus
          />
          <button type="submit" className="btn-98">
            입장
          </button>
        </form>
        {err && <p className="admin-gate__err">비밀번호가 틀렸어요.</p>}
      </div>
    </section>
  )
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [current, setCurrent] = useState('')
  const [override, setOverride] = useState(false)
  const [input, setInput] = useState('')
  const [saved, setSaved] = useState(false)

  const refresh = () => {
    setCurrent(getDiaryPassword())
    setOverride(hasDiaryOverride())
  }

  useClientLayout(() => {
    refresh()
    setInput(getDiaryPassword())
  }, [])

  const save = (e: FormEvent) => {
    e.preventDefault()
    setDiaryPassword(input)
    refresh()
    setSaved(true)
  }

  const resetToDefault = () => {
    clearDiaryOverride()
    refresh()
    setInput(getDiaryPassword())
    setSaved(true)
  }

  return (
    <>
      <section className="panel">
        <div className="panel__title">📓 매매일지 비밀번호</div>
        <div className="panel__body admin__body">
          <p className="admin__status">
            현재 비밀번호:{' '}
            <strong>{current ? current : '(없음 — 게이트 꺼짐)'}</strong>
            <span className="admin__badge">{override ? '이 브라우저 설정' : '사이트 내장 기본값'}</span>
          </p>

          <form className="admin__form" onSubmit={save}>
            <input
              className="w98-field admin__input"
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                setSaved(false)
              }}
              placeholder="비밀번호 (비우면 게이트 끔)"
              aria-label="매매일지 비밀번호 설정"
            />
            <button type="submit" className="btn-98">
              저장
            </button>
            <button type="button" className="btn-98" onClick={resetToDefault}>
              내장 기본값으로
            </button>
          </form>

          {saved && <p className="admin__saved">✔ 저장됐어요. (이 브라우저에 적용)</p>}

          <p className="admin__note">
            ※ 백엔드 없는 정적 사이트라, 여기서 바꾼 값은 <strong>이 브라우저에서만</strong> 즉시 적용돼요. 모든
            방문자에게 반영하려면 이 비밀번호로 재배포가 필요합니다. 또한 매매일지 원문은 페이지 소스에 남아 있어
            진짜 보안이 아닌 ‘대충 막기’ 게이트입니다.
          </p>
        </div>
      </section>

      <button type="button" className="btn-98 admin__logout" onClick={() => { adminLogout(); onLogout() }}>
        로그아웃
      </button>
    </>
  )
}
