# 개미의 웃픈 매매일지

코스피 반도체 랠리 한복판을 통과한 어느 개미의 웃프고 솔직한 매매 회고록.
**Vite + React + TypeScript**, 폴더구조는 **FSD(Feature-Sliced Design)**.
GitHub Pages에 GitHub Actions로 자동 배포됩니다.

## 개발
```bash
npm install
npm run dev      # http://localhost:5173/stock-diary-blog/
npm run build    # 타입체크 + 빌드 + 404 폴백 생성
npm run preview
```

## 폴더구조 (FSD)
```
src/
  app/        # 앱 초기화: 라우터, 프로바이더, 전역 스타일(디자인 토큰)
  pages/      # 라우트 단위 화면: home, post, about
  widgets/    # 독립 UI 블록: header, footer
  features/   # 사용자 상호작용 단위 (예: 추후 theme-toggle)
  entities/   # 도메인 모델: post (타입/로더/카드 UI)
  shared/     # 최하위 공용: ui, lib, config, content(마크다운 글)
```
의존성은 **위 → 아래 단방향**(app → pages → widgets → features → entities → shared).

## 새 글 올리기
1. `src/shared/content/posts/YYYY-MM-DD-stock-diary.md` 추가.
   - front matter: `title`, `date`, `categories`. 맨 위 `# 제목`은 넣지 말고 `title:`로.
   - 본문 첫 줄 `> *「부제목」*` → 카드 부제목으로 자동 추출.
2. `git push` → Actions가 빌드/배포.

## 디자인
지금은 **중립 플레이스홀더**입니다. 디자인 토큰은 `src/app/styles/global.css` 상단 `:root`에 모여 있어,
나중에 별도 디자인 레퍼런스가 오면 토큰/클래스만 교체하면 됩니다.
