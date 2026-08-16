// 관리자 페이지 진입 비밀번호 (클라이언트 소프트 게이트)
export const ADMIN_PASSWORD = '1373'

// 매매일지 게이트의 사이트 내장 기본 비밀번호.
// - 빈 문자열('')이면 게이트 비활성(누구나 열람). ← 현재 상태(게이트 꺼짐)
// - 다시 잠그려면 여기에 비밀번호를 넣고 재배포.
// - 관리자 페이지에서 바꾸면 그 브라우저(localStorage)에만 즉시 반영되고,
//   모든 방문자에게 적용하려면 이 값을 바꿔 재배포해야 함.
export const DIARY_PASSWORD_DEFAULT = ''

// 각 글의 '원문보기'(각색 전 원문) 비밀번호 — 사이트 내장(baked), 소프트 게이트.
// 매매일지 게이트(DIARY_PASSWORD_DEFAULT)와 독립. 다르면 원문보기 때 따로 입력해야 함.
export const ORIGINAL_PASSWORD = '22'
