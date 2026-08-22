/**
 * 개발공부 — 테마별 문서 묶음 레지스트리.
 *
 * 새 묶음 올리는 법:
 *   1) 문서 폴더(자체 HTML/CSS/JS, 링크는 상대경로)를 public/study/<slug>/ 에 통째로 복사
 *   2) 아래 배열에 항목 하나 추가 (최신이 위)
 *   → 목록 페이지·sitemap은 자동. 문서 자체는 정적 파일로 그대로 서빙된다(React 바깥).
 */
export interface StudyLink {
  label: string
  /** public/study/<slug>/ 기준 상대 파일명 */
  file: string
}

export interface Study {
  slug: string
  title: string
  subtitle: string
  description: string
  /** YYYY-MM-DD — 문서를 올린 날 */
  date: string
  tags: string[]
  /** 진입 파일 (기본 index.html) */
  entry?: string
  /** 목차 바로가기 (선택) */
  toc?: StudyLink[]
  /** 원본/참고 저장소 (선택) */
  source?: { label: string; url: string }
  /** 문서 페이지 수 (표시용, 선택) */
  pages?: number
}

const B = import.meta.env.BASE_URL

/** public/study/<slug>/<file> 의 절대 경로(basename 포함) */
export function studyHref(study: Study, file?: string): string {
  return `${B}study/${study.slug}/${file ?? study.entry ?? 'index.html'}`
}

export const studies: Study[] = [
  {
    slug: 'jeongcheogi-lab',
    title: '정보처리기사 실전 랩',
    subtitle: '포인터 · C · 자바 · 디자인 패턴 · 파이썬 + 실기 기출 194문항',
    description:
      '정보처리기사 실기를 준비하며 만든 인터랙티브 랩 6편. 포인터 메모리 랩(15문제)에서 주소를 한 줄씩 따라가며 스택·힙·정적 영역을 눈으로 익히고, C 심화(13) → 자바 참조와 객체(13) → GoF 디자인 패턴(13 + 드릴 23) → 파이썬(14 + 드릴)으로 같은 메모리 지도를 언어만 바꿔 가며 다시 그린다. 마지막 기출 실전 랩은 2021–2026 실기 기출을 코드 91 + 이론 103 = 194문항으로 복원해 단답형으로 훈련하는 곳. 코드 문제 출력은 실제 컴파일러·인터프리터로 검증했다. 1편부터 순서대로 보는 걸 추천.',
    date: '2026-08-23',
    tags: ['정처기 실기', 'C', '포인터', 'Java', 'Python', '디자인 패턴', '메모리 구조', '기출 2021–2026'],
    pages: 6,
    entry: 'clang.html',
    toc: [
      { label: '1편 포인터 메모리', file: 'clang.html' },
      { label: '2편 C 마스터', file: 'clang2.html' },
      { label: '자바', file: 'java.html' },
      { label: '디자인 패턴', file: 'patterns.html' },
      { label: '파이썬', file: 'python.html' },
      { label: '📝 기출 실전 194문항', file: 'quiz.html' },
    ],
  },
  {
    slug: 'spring-msa',
    title: '스프링 마이크로서비스',
    subtitle: 'Spring Microservices in Action 2판 · 예제 코드 해설',
    description:
      '가상 회사 O-stock의 라이선싱 서비스와 조직 서비스를 1장 Hello World에서 12장 AWS EKS 배포까지 한 장씩 키워 나가는 manning-smia2 저장소를 장별로 뜯어본 문서. 각 장은 이전 장 코드를 이어받아 기능을 하나씩 얹는 구조라, "이 장에서 새로 생긴 것"만 따라가면 된다. 애니메이션 다이어그램으로 흐름을 보여주는 인터랙티브 투어부터 시작하는 걸 추천.',
    date: '2026-08-23',
    tags: ['Java 11', 'Spring Boot 2.2', 'Spring Cloud', 'Docker Compose', 'PostgreSQL', 'Kafka', 'Keycloak', 'Resilience4j'],
    pages: 15,
    toc: [
      { label: '🎬 투어', file: 'tour.html' },
      { label: '1장', file: 'chapter01.html' },
      { label: '2장', file: 'chapter02.html' },
      { label: '3장', file: 'chapter03.html' },
      { label: '4장', file: 'chapter04.html' },
      { label: '5장', file: 'chapter05.html' },
      { label: '6장', file: 'chapter06.html' },
      { label: '7장', file: 'chapter07.html' },
      { label: '8장', file: 'chapter08.html' },
      { label: '9장', file: 'chapter09.html' },
      { label: '10장', file: 'chapter10.html' },
      { label: '11장', file: 'chapter11.html' },
      { label: '12장', file: 'chapter12.html' },
      { label: 'Monitoring', file: 'monitoring.html' },
    ],
    source: { label: 'klimtever/manning-smia2', url: 'https://github.com/klimtever/manning-smia2' },
  },
]
