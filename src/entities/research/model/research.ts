export interface ResearchNote {
  /** 연구 번호 (1~) — URL 슬러그로도 사용 */
  num: number
  title: string
  /** 부제목 (볼트 파일명의 <...> 부분) */
  subtitle: string
  body: string
}

// 제목/부제 메타 — 볼트(5.연구/) 파일명과 동일하게 유지한다.
const META: Record<number, { title: string; subtitle: string }> = {
  1: { title: '좋은 종목을 찾는것', subtitle: '시간을 가장 오래 투자해야하는곳' },
  2: { title: '이격도', subtitle: '심리와 심법의 세계' },
  3: { title: '비중 조절', subtitle: '연약한 나의 마음을 야수로 만드는 방법' },
  4: { title: '매크로', subtitle: '누울 자리를 보고 눕는법' },
  5: { title: '전쟁', subtitle: '어리석은 인간들 때문에 나까지 심법이 흔들림' },
  6: { title: '거래대금', subtitle: '세력을 조질것이냐 내가 뒤질것이냐' },
  7: { title: '실적', subtitle: '빨리먹고싶은자의 생각보다 무리한 선택' },
  8: { title: '기간 조정', subtitle: '오랫동안 외면받은 슬픈 주식들... 내가 품어라' },
  9: { title: '매물대', subtitle: '개미들의 치열했던 전투상흔' },
  10: { title: '외국인', subtitle: '바닥에 사서 할머니들에게 팔고나감' },
  11: { title: '8부능선', subtitle: '등산의 대가' },
  12: { title: 'RSI 지표', subtitle: '레드존에서도 잘 달리는 차가 있다' },
}

// 빌드 타임에 원문 인라인 (eager)
const raws = import.meta.glob('/src/shared/content/research/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

/** Obsidian 위키링크([[이름]]·[[이름|별칭]])를 블로그용 일반 텍스트로 변환 */
function stripWikiLinks(md: string): string {
  return md.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, name: string, alias?: string) => alias ?? name)
}

export const researchNotes: ResearchNote[] = Object.entries(raws)
  .map(([path, raw]) => {
    const num = parseInt((path.split('/').pop() ?? '').replace(/\.md$/, ''), 10)
    const meta = META[num] ?? { title: `연구 ${num}`, subtitle: '' }
    return { num, ...meta, body: stripWikiLinks(raw.replace(/\s+$/, '')) }
  })
  .sort((a, b) => a.num - b.num)

export function getResearchNote(num: number): ResearchNote | undefined {
  return researchNotes.find((n) => n.num === num)
}
