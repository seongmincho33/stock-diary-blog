// 빌드된 SSR 번들로 각 라우트를 정적 HTML(본문+메타 포함)로 프리렌더
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const { render, getStaticPaths } = await import(join(root, 'dist-server', 'entry-server.js'))

const template = readFileSync(join(dist, 'index.html'), 'utf-8')

function inject(path) {
  const { html, head } = render(path)
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html)
}

for (const path of getStaticPaths()) {
  const page = inject(path)
  const outPath = path === '/' ? join(dist, 'index.html') : join(dist, path, 'index.html')
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, page, 'utf-8')
  console.log('prerendered', path)
}

// SPA 딥링크 폴백 (GitHub Pages 404 → 홈 렌더)
writeFileSync(join(dist, '404.html'), inject('/'), 'utf-8')
console.log('wrote 404.html')
