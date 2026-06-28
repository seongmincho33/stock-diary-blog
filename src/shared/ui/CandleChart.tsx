// 분위기용 가상 캔들 차트 (결정론적 시드 → SSR/CSR 동일, 하이드레이션 안전)
function genCandles(n: number) {
  let x = 7
  const r = () => {
    x = (x * 1103515245 + 12345) & 0x7fffffff
    return x / 0x7fffffff
  }
  let p = 64000
  const a: { o: number; h: number; l: number; c: number }[] = []
  for (let i = 0; i < n; i++) {
    const o = p
    const c = o + (r() - 0.44) * 2700
    const h = Math.max(o, c) + r() * 1300
    const l = Math.min(o, c) - r() * 1300
    a.push({ o, h, l, c })
    p = c
  }
  return a
}

const DATA = genCandles(44)

interface CandleChartProps {
  height?: number
}

export function CandleChart({ height = 170 }: CandleChartProps) {
  const W = 760
  const H = 300
  const pT = 14
  const pB = 8
  const pL = 6
  const pR = 52
  const lo = Math.min(...DATA.map((d) => d.l))
  const hi = Math.max(...DATA.map((d) => d.h))
  const iw = (W - pL - pR) / DATA.length
  const X = (i: number) => pL + i * iw + iw / 2
  const Y = (v: number) => pT + ((hi - v) / (hi - lo)) * (H - pT - pB)

  const grid = []
  for (let g = 0; g <= 4; g++) {
    const gv = lo + ((hi - lo) * g) / 4
    const gy = Y(gv)
    grid.push(<line key={`g${g}`} x1={pL} x2={W - pR} y1={gy} y2={gy} stroke="#ededed" />)
    grid.push(
      <text key={`gt${g}`} x={W - pR + 5} y={gy + 3} fontSize={9} fontFamily="GalmuriMono9, monospace" fill="#9a9a9a">
        {Math.round(gv / 1000)}k
      </text>,
    )
  }

  const candles = DATA.map((d, i) => {
    const up = d.c >= d.o
    const col = up ? '#e8202a' : '#1655d6'
    const cx = X(i)
    const yt = Y(Math.max(d.o, d.c))
    const yb = Y(Math.min(d.o, d.c))
    return (
      <g key={`c${i}`}>
        <line x1={cx} x2={cx} y1={Y(d.h)} y2={Y(d.l)} stroke={col} />
        <rect x={pL + i * iw + 1} y={yt} width={Math.max(iw - 2, 1)} height={Math.max(yb - yt, 1)} fill={col} />
      </g>
    )
  })

  const maPts: string[] = []
  for (let i = 4; i < DATA.length; i++) {
    let s = 0
    for (let k = 0; k < 5; k++) s += DATA[i - k].c
    maPts.push(`${X(i)},${Y(s / 5)}`)
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: '100%', height, display: 'block' }}>
      {grid}
      {candles}
      <polyline points={maPts.join(' ')} fill="none" stroke="#ff8a00" strokeWidth={1.4} />
    </svg>
  )
}
