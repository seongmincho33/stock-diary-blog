import { ADMIN_PASSWORD, DIARY_PASSWORD_DEFAULT, ORIGINAL_PASSWORD } from '@/shared/config/admin'

/**
 * 매매일지 클라이언트 소프트 게이트 상태 헬퍼.
 * ⚠️ 정적 사이트용 "대충 막기" 게이트 — 원문은 페이지 소스/번들에 남아 진짜 보안은 아님.
 */

const LS_DIARY_PW = 'dm.diaryPw' // 관리자가 이 브라우저에 설정한 override
const SS_DIARY_UNLOCK = 'dm.diaryUnlocked' // 이번 세션 잠금 해제 여부
const SS_ADMIN_AUTH = 'dm.adminAuth' // 관리자 인증 여부(세션)
const SS_ORIGINAL_UNLOCK = 'dm.originalUnlocked' // 원문보기 잠금 해제 여부(세션)

const hasWindow = (): boolean => typeof window !== 'undefined'

/** 현재 유효한 매매일지 비밀번호 (localStorage override → 없으면 내장 기본값) */
export function getDiaryPassword(): string {
  if (!hasWindow()) return DIARY_PASSWORD_DEFAULT
  const override = window.localStorage.getItem(LS_DIARY_PW)
  return override !== null ? override : DIARY_PASSWORD_DEFAULT
}

/** 게이트가 켜져 있는가 (비밀번호가 설정돼 있는가) */
export function isGateActive(): boolean {
  return getDiaryPassword().length > 0
}

export function isDiaryUnlocked(): boolean {
  return hasWindow() && window.sessionStorage.getItem(SS_DIARY_UNLOCK) === '1'
}

export function unlockDiary(): void {
  if (hasWindow()) window.sessionStorage.setItem(SS_DIARY_UNLOCK, '1')
}

/** 입력값이 맞으면 잠금 해제하고 true */
export function tryUnlockDiary(input: string): boolean {
  if (input === getDiaryPassword()) {
    unlockDiary()
    return true
  }
  return false
}

// ── 관리자용 ──
export function setDiaryPassword(pw: string): void {
  if (hasWindow()) window.localStorage.setItem(LS_DIARY_PW, pw)
}

export function clearDiaryOverride(): void {
  if (hasWindow()) window.localStorage.removeItem(LS_DIARY_PW)
}

/** 이 브라우저에 관리자 override가 설정돼 있는가 (내장 기본값과 구분용) */
export function hasDiaryOverride(): boolean {
  return hasWindow() && window.localStorage.getItem(LS_DIARY_PW) !== null
}

export function isAdminAuthed(): boolean {
  return hasWindow() && window.sessionStorage.getItem(SS_ADMIN_AUTH) === '1'
}

export function adminLogin(pw: string): boolean {
  if (pw === ADMIN_PASSWORD) {
    if (hasWindow()) window.sessionStorage.setItem(SS_ADMIN_AUTH, '1')
    return true
  }
  return false
}

export function adminLogout(): void {
  if (hasWindow()) window.sessionStorage.removeItem(SS_ADMIN_AUTH)
}

// ── 원문보기(각색 전 원문) 게이트 ──
export function isOriginalUnlocked(): boolean {
  if (!hasWindow()) return false
  if (window.sessionStorage.getItem(SS_ORIGINAL_UNLOCK) === '1') return true
  // 매매일지를 이미 열었고 그 비번이 원문 비번과 같으면, 원문도 열린 것으로 본다(이중 입력 방지).
  if (isDiaryUnlocked() && getDiaryPassword() === ORIGINAL_PASSWORD) return true
  return false
}

export function tryUnlockOriginal(input: string): boolean {
  if (input === ORIGINAL_PASSWORD) {
    if (hasWindow()) window.sessionStorage.setItem(SS_ORIGINAL_UNLOCK, '1')
    return true
  }
  return false
}
