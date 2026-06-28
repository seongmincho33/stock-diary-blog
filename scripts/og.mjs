// 글마다 카카오톡/X 공유용 OG 카드(1200x630 PNG) 생성
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const ogDir = join(root, 'dist', 'og')
mkdirSync(ogDir, { recursive: true })

const fontBold = readFileSync(join(root, 'assets/fonts/Pretendard-Bold.ttf'))
const fontRegular = readFileSync(join(root, 'assets/fonts/Pretendard-Regular.ttf'))

const { getOgCards } = await import(join(root, 'dist-server', 'entry-server.js'))

const SITE = '단타마스터'
const URLTEXT = 'seongmincho33.github.io/stock-diary-blog'
const ACCENT = '#d23b2e'
const INK = '#1d1b18'
const MUTED = '#79736b'
const BG = '#fbfaf8'

const div = (style, children) => ({ type: 'div', props: { style, children } })

function card({ title, subtitle, footer }) {
  return div(
    {
      display: 'flex',
      flexDirection: 'column',
      width: '1200px',
      height: '630px',
      padding: '72px 80px',
      background: BG,
      position: 'relative',
      fontFamily: 'Pretendard',
    },
    [
      div({ position: 'absolute', left: 0, top: 0, bottom: 0, width: '18px', background: ACCENT }),
      div({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '28px', color: MUTED }, [
        div({ display: 'flex' }, SITE),
        div({ display: 'flex' }, footer || ''),
      ]),
      div({ display: 'flex', flexGrow: 1, alignItems: 'center' }, [
        div({ display: 'flex', flexDirection: 'column' }, [
          div({ display: 'flex', fontSize: '66px', fontWeight: 700, color: INK, lineHeight: 1.25 }, title),
          ...(subtitle
            ? [div({ display: 'flex', marginTop: '28px', fontSize: '32px', color: ACCENT, lineHeight: 1.4 }, subtitle)]
            : []),
        ]),
      ]),
      div({ display: 'flex', fontSize: '26px', color: MUTED }, URLTEXT),
    ],
  )
}

async function renderCard(node, outFile) {
  const svg = await satori(node, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Pretendard', data: fontRegular, weight: 400, style: 'normal' },
      { name: 'Pretendard', data: fontBold, weight: 700, style: 'normal' },
    ],
  })
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng()
  writeFileSync(outFile, png)
  console.log('og ->', outFile.replace(root + '/', ''))
}

for (const c of getOgCards()) {
  await renderCard(card({ title: c.title, subtitle: c.subtitle, footer: c.date }), join(ogDir, `${c.slug}.png`))
}
await renderCard(
  card({ title: SITE, subtitle: '치고 빠지려다 풀스윙 헛스윙 — 어느 개미의 웃픈 매매일지' }),
  join(ogDir, 'default.png'),
)
console.log('OG 카드 생성 완료')
