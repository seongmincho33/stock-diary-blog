# 개미의 웃픈 매매일지

코스피 반도체 랠리 한복판을 통과한 어느 개미의 웃프고 솔직한 매매 회고록.
[Jekyll](https://jekyllrb.com/) + GitHub Pages로 운영합니다.

## 새 글 올리기
1. `각색(위트)` 마크다운을 만든다 (제목 `# ...`, 부제목 `> *「...」*` 포함).
2. `_posts/YYYY-MM-DD-stock-diary.md` 형식으로 변환해 넣는다.
   - 맨 위 `# 제목` 줄은 front matter의 `title:`로 옮기고 본문에선 지운다.
3. `git push` → GitHub Pages가 자동 빌드/배포.

## 로컬 미리보기 (선택)
```bash
bundle install
bundle exec jekyll serve
# http://localhost:4000/stock-diary-blog/
```
