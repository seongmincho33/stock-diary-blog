// 단타마스터 프로필 아바타 생성 (satori + resvg) — public/avatar.png
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const fontBold = readFileSync(join(root, 'assets/fonts/Pretendard-Bold.ttf'))

const div = (style, children) => ({ type: 'div', props: { style, children } })

// 하단 캔들 밴드 (빨강=양봉/파랑=음봉)
const candles = [
  { h: 30, up: false },
  { h: 48, up: true },
  { h: 36, up: false },
  { h: 66, up: true },
  { h: 52, up: true },
  { h: 40, up: false },
  { h: 72, up: true },
]
const candleEls = candles.map((c) =>
  div({ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '86px' }, [
    div({ width: '3px', height: `${Math.round(c.h * 0.4)}px`, background: c.up ? '#ff6b5e' : '#6f9bff' }),
    div({ width: '14px', height: `${c.h}px`, background: c.up ? '#e8202a' : '#1655d6' }),
  ]),
)

const node = div(
  {
    width: '256px',
    height: '256px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    background: '#00007a',
    fontFamily: 'Pretendard',
    overflow: 'hidden',
  },
  [
    // 캔들 밴드
    div(
      {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: '12px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: '9px',
        opacity: 0.95,
      },
      candleEls,
    ),
    // 빨강 베이스라인
    div({ position: 'absolute', left: 0, right: 0, bottom: 0, height: '9px', background: '#d23b2e' }),
    // 모노그램 "단"
    div(
      { display: 'flex', fontSize: '150px', fontWeight: 700, color: '#ffffff', marginTop: '-16px' },
      '단',
    ),
  ],
)

const svg = await satori(node, {
  width: 256,
  height: 256,
  fonts: [{ name: 'Pretendard', data: fontBold, weight: 700, style: 'normal' }],
})
const png = new Resvg(svg, { fitTo: { mode: 'width', value: 256 } }).render().asPng()
writeFileSync(join(root, 'public', 'avatar.png'), png)
console.log('avatar.png 생성 완료')
