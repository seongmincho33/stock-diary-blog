---
layout: post
title: "구름 위 상회가 서고를 통째로 빌려준다기에 가봤다 (feat. Supabase CLI · psql)"
date: 2026-08-27 09:00:00 +0900
lang: ko
categories: [개발일지]
---

> *「전령은 서고를 옮겨주고, 사서는 서고 안을 뒤진다 — 둘은 다른 일이다」*

🗓️ 2026.08.27 (목) · 개발일지 7화 — 수파 상회 편 ①: Supabase CLI와 psql 사용법 정리

표지석 길드 조회 결과를 들고 달빛 상단으로 향하려는데, 공방장이 문 앞을 막았다.

> "그건 잠시 미뤄두시오. 상단 장부가 지금 나무 궤짝에 들어 있소."
>
> "구름 위 **수파 상회**가 서고를 통째로 빌려준다더군. 가서 계약하고, 장부를 옮기시오."

서고를 빌려준다. 지하 대서고 하나를, 문지기와 관문까지 세트로. 원래 세계에서 증권사가 계좌 하나 터주는 것과 비슷한 이야기처럼 들렸다. 다만 이번엔 **내가 넣은 게 그대로 남는다**는 점이 달랐다.

## 등장인물

- **수파 전령** — 수파 상회가 붙여주는 젊은 전령(`supabase` CLI). 부지런하고 말이 많다. 상회와 내 작업실 사이를 오가며 서고를 짓고 옮기고 복제한다. 다만 선은 긋는다. "서고 **안을** 직접 뒤지는 건 제 일이 아닙니다."
- **프시 사서** — 지하 대서고의 늙은 사서(`psql`). 백슬래시로 시작하는 짧은 주문만 알아듣고, 나머지는 서고의 모국어(SQL)로만 대답한다. 처음엔 이 왕국에 아예 없어서 따로 불러와야 했다.
- **셸리** — 여전히 검은 창의 셸 정령. 이번에도 전령과 사서를 부르는 건 셸리의 입을 통해서다.

## 수파 상회가 빌려주는 것

계약서를 읽어보니 서고 하나만 빌려주는 게 아니었다. 한 세트다.

| 상회의 물건 | 정체 | 비고 |
|---|---|---|
| 지하 대서고 | **PostgreSQL** | 본체는 그냥 정직한 Postgres다 (기본 설정 기준 **17**) |
| 관문 | 자동 생성 REST/GraphQL API | 서가를 만들면 관문이 알아서 열린다 |
| 문지기 | Auth | 손님 인장(JWT) 검사 |
| 창고 | Storage | 파일 |
| 파발 | Realtime | 장부가 바뀌면 알려준다 |

핵심은 첫 줄이다. **바닥이 평범한 Postgres**라서, 상회의 도구가 답답해지면 언제든 사서를 불러 서고로 직접 내려갈 수 있다. 이 글은 그 두 갈래 — **전령(CLI)** 과 **사서(psql)** — 를 정리한 것이다.

## 전령 부르기

#### 설치와 계약

```bash
brew install supabase/tap/supabase
supabase --version        # 이 글을 쓴 시점 기준 2.116.0
```

```bash
supabase login            # 브라우저가 열리고, 상회가 발급한 통행증이 저장된다
supabase projects list    # 내가 가진 서고 목록
```

`login`은 2화의 **마법 인장**과 같은 개념이다. 사람이 정문(대시보드)으로 들어갈 때 쓰는 ID/PW가 있고, 전령이 대신 드나들 때 쓰는 통행증이 따로 있다.

#### 작업실에 서고 자리 만들기

```bash
supabase init             # supabase/ 폴더 + config.toml 생성
supabase link --project-ref <프로젝트-ref>
```

`link`는 "이 작업실은 저 구름 위 서고와 짝이다"라고 못 박는 일이다. 이걸 해두면 이후 명령의 `--linked`가 그 서고를 가리킨다.

> `--project-ref`는 대시보드 URL의 그 문자열이다.
>
> 비밀번호를 매번 묻는 게 싫으면 `--password`로 넘길 수 있지만, 셸 히스토리에 남는다. 4화에서 배운 대로 **비밀은 공기(환경변수)에** 두는 편이 낫다.

## 작업실 지하에 거울 서고 짓기

구름 위 진짜 서고를 직접 뒤지며 연습하는 건 5화의 교훈("운영 표지석은 새벽에, 담당자와")을 정면으로 어기는 짓이다. 그래서 전령은 **똑같이 생긴 거울 서고**를 내 작업실 지하에 지어준다. Docker가 필요하다.

```bash
supabase start            # 첫 실행은 이미지 받느라 오래 걸린다
supabase status           # 주소와 열쇠 목록
supabase status -o env    # .env에 붙여넣기 좋은 형태
supabase stop             # 정리 (기본은 데이터 보존)
```

거울 서고의 방 번호는 `config.toml`에 적혀 있고, 기본값은 이렇다.

| 포트 | 방 |
|---|---|
| `54321` | 관문 (API) |
| `54322` | **지하 대서고 (Postgres)** ← 사서가 사는 곳 |
| `54323` | 열람실 (Studio) |
| `54324` | 우체통 (테스트 메일함) |
| `54320` | 그림자 서고 (마이그레이션 대조용) |
| `54327` | 기록실 (Analytics) |
| `54329` | 접수처 (Pooler, 기본 꺼짐) |

외울 건 하나다. **54322가 서고**다. 나머지는 필요할 때 `supabase status`가 알려준다.

## 개축 기록 — 서고 구조를 바꾸는 법

서가를 새로 짜는 일(스키마 변경)은 즉흥으로 하면 안 된다. **개축 기록(migration)** 으로 남겨야 같은 서고를 언제든 다시 지을 수 있다.

```bash
supabase migration new add_ledger      # 빈 공사 계획서 한 장
# → supabase/migrations/<타임스탬프>_add_ledger.sql 에 SQL을 적는다

supabase migration up                  # 거울 서고에 적용
supabase migration list                # 로컬 기록 vs 상회 기록 대조
```

거울 서고에서 손으로 만져 놓고 기록을 안 썼다면, 전령이 차이를 읽어 계획서를 만들어 준다.

```bash
supabase db diff -f add_ledger         # 달라진 부분을 마이그레이션 파일로
supabase db reset                      # 거울 서고를 갈아엎고 기록 전부 재실행 + seed
```

`db reset`이 이 편에서 제일 마음 편한 명령이다. **거울 서고는 언제든 부수고 다시 지을 수 있다.** 원래 세계에서 물린 계좌는 리셋이 안 됐는데, 여기는 된다.

구름 위 진짜 서고와 주고받는 건 이 둘이다.

```bash
supabase db pull            # 상회 서고의 현재 구조를 마이그레이션으로 받아온다
supabase db push            # 밀린 마이그레이션을 상회 서고에 적용
supabase db push --dry-run  # 뭐가 나갈지만 미리 본다  ← 습관 들일 것
```

`--dry-run`은 5화의 "새 표지석만 추가"와 같은 자리에 있는 안전장치다. 운영 서고에 뭘 밀어 넣기 전에 **한 번 읽어보는 30초**, 1화에서 배운 그 거래다.

자주 쓰는 나머지 플래그도 적어둔다.

| 명령 | 쓸모 |
|---|---|
| `supabase db push --include-seed` | 씨앗 데이터도 함께 |
| `supabase db push --include-roles` | `supabase/roles.sql`의 커스텀 역할까지 |
| `supabase db pull -s public,auth` | 특정 스키마만 |
| `supabase migration squash` | 기록이 너무 많아졌을 때 한 장으로 |
| `supabase migration repair` | 기록 대조표가 어긋났을 때 |
| `supabase gen types --local` | 서가 구조 → TypeScript 타입 |
| `supabase gen types --linked --lang go` | go / swift / python 도 된다 |

## 프시 사서를 부르다

여기까지가 전령의 일이다. 그런데 **장부를 직접 열어 보고 싶을 때**는 전령이 손사래를 친다. 그때 부르는 게 프시 사서다.

#### 이 왕국엔 사서가 없었다

```bash
psql --version
# zsh: command not found: psql
```

당황할 필요 없다. **Postgres를 안 깔았으면 psql도 없는 게 정상이다.** 서고(서버)는 상회 것이고, 나한테 필요한 건 사서(클라이언트) 하나뿐이다.

```bash
brew install libpq        # 클라이언트만. 서버는 안 딸려온다
```

그런데 `libpq`는 **keg-only**라 길이 안 뚫린다. 셸리에게 길을 알려줘야 한다 — 3화의 그 서약서다.

```bash
echo 'export PATH="/opt/homebrew/opt/libpq/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
psql --version
```

> 서버까지 통째로 원하면 `brew install postgresql@17`도 있다. 다만 서고는 이미 상회에서 빌렸으니, 대개는 `libpq` 하나면 충분하다.
>
> 클라이언트 버전이 서버보다 높은 건 괜찮다. 반대(낡은 사서 → 새 서고)가 문제다.

#### 서고로 내려가는 세 개의 계단

```bash
# 1. 거울 서고 (로컬) — 제일 자주 쓴다
psql "postgresql://postgres:postgres@127.0.0.1:54322/postgres"

# 2. 구름 위 서고 — 직통
psql "postgresql://postgres:<비밀번호>@db.<ref>.supabase.co:5432/postgres"

# 3. 구름 위 서고 — 접수처(Pooler) 경유
psql "postgresql://postgres.<ref>:<비밀번호>@<대시보드가-알려주는-호스트>:5432/postgres"
```

2번과 3번 문자열은 **외우지 말고 대시보드의 `Connect` 버튼에서 복사**하는 게 맞다. 상회가 호스트 형식을 바꾼 적이 있어서, 어느 블로그에 적힌 걸 그대로 믿으면 6화의 "여행자 수첩" 꼴이 난다.

셋의 차이는 이렇다.

| 계단 | 성질 | 언제 |
|---|---|---|
| 직통 (5432) | 세션 그대로. 다만 **IPv6 전용**이라 집 회선에서 막히는 경우가 있다 | 서버·CI에서 |
| 접수처 · session (5432) | IPv4로도 들어간다. 세션 기능 대부분 유지 | **사람이 psql로 붙을 때** |
| 접수처 · transaction (6543) | 연결을 잘게 돌려 쓴다. `SET`·준비된 구문·임시 테이블이 제한된다 | 서버리스 함수처럼 짧게 치고 빠질 때 |

psql로 앉아서 뭔가 뒤질 거면 **6543은 피한다.** 세션이 유지되지 않아 `\timing`도 `set`도 기대대로 안 먹는다.

## 프시의 언어 — 백슬래시 주문

사서는 두 가지 말을 알아듣는다. **SQL**과, 백슬래시로 시작하는 **짧은 주문**이다. 후자가 이 사서를 쓰는 진짜 이유다.

| 주문 | 하는 일 |
|---|---|
| `\?` | 주문 목록 (제일 먼저 외울 것) |
| `\h SELECT` | SQL 문법 도움말 |
| `\l` | 서고(데이터베이스) 목록 |
| `\dn` | 서가 구역(스키마) 목록 |
| `\dt` | 테이블 목록 — **`public` 구역만** |
| `\dt auth.*` / `\dt *.*` | 특정 구역 / 전 구역 |
| `\d 테이블` | 서가 구조 (컬럼·인덱스·제약) |
| `\d+ 테이블` | 여기에 크기·설명까지 |
| `\df` `\dv` `\di` `\du` | 함수 · 뷰 · 인덱스 · 역할 |
| `\x auto` | 결과가 옆으로 길면 세로로 눕혀서 |
| `\timing on` | 질의 시간 측정 |
| `\e` | 에디터를 열어 긴 SQL 작성 |
| `\i 파일.sql` | 파일 실행 |
| `\copy (SELECT …) TO 'out.csv' CSV HEADER` | **내 컴퓨터로** 내려받기 |
| `\watch 5` | 방금 질의를 5초마다 반복 |
| `\q` | 나가기 |

`\x auto`와 `\dt *.*` 둘만 알아도 체감이 확 달라진다. Supabase 서고는 `auth`·`storage`·`realtime` 같은 구역이 따로 있어서, `\dt`만 치면 "내 테이블이 없어졌다"고 착각하기 쉽다. **없어진 게 아니라 다른 구역에 있다.**

셸에서 한 방에 쓰는 법도 있다.

```bash
psql "$DB_URL" -c "select count(*) from public.ledger;"
psql "$DB_URL" -f seed.sql -v ON_ERROR_STOP=1 -1
psql "$DB_URL" -At -c "select id from public.ledger" > ids.txt
```

`-v ON_ERROR_STOP=1 -1`은 **"중간에 하나라도 틀리면 전부 없던 일로"** 라는 뜻이다. 스크립트를 운영 서고에 흘려 넣을 때는 이게 안전벨트다.

## 사서를 못 불렀다면 — 전령의 우회로

psql을 아직 못 깔았거나, CI처럼 클라이언트를 넣기 곤란한 곳이라면 전령이 대신 심부름을 해준다.

```bash
supabase db query --local  "select count(*) from public.ledger;"
supabase db query --linked "select now();"
supabase db query -f check.sql --linked
```

간단한 조회엔 충분하다. 다만 `\d`·`\x`·`\copy` 같은 사서의 주문은 없다. 서고를 **탐색**할 거면 결국 사서를 부르는 게 맞다.

## 서고의 함정 네 가지

#### 하나. 관리인 열쇠는 열람 규약을 무시한다

이게 제일 많이 당하는 함정이다. psql에 `postgres`로 붙으면 **모든 장부가 다 보인다.** 그런데 앱은 `anon`·`authenticated` 손님 자격으로 들어가니까, 서가에 붙은 **열람 규약(RLS)** 이 걸려서 아무것도 못 볼 수 있다.

> "psql에선 잘 보이는데 앱에선 빈 배열이 옵니다."
>
> 사서: "당연하지요. 손님은 관리인 열쇠가 없으니까."

손님인 척 해보는 방법이 있다.

```sql
begin;

-- 손님 인장을 흉내낸다
select set_config('request.jwt.claims',
  '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
set local role authenticated;

select * from public.ledger;   -- 이제 규약이 적용된 결과만 보인다

rollback;                      -- 흉내낸 인장은 여기서 사라진다
```

`begin` … `rollback`으로 감싸는 게 핵심이다. 흉내가 그 트랜잭션 안에서만 살아 있으니, 실수로 관리인 열쇠를 내려놓은 채 다음 작업을 하는 사고가 안 난다.

#### 둘. 손으로 고친 서고는 기록에 안 남는다

psql로 운영 서고를 직접 뜯어고치면 그 순간엔 편하다. 문제는 **개축 기록에 안 남는다**는 것. 나중에 거울 서고를 다시 지으면 그 변경만 사라져 있다. 6화의 표지석과 같은 이야기다 — 손댄 곳과 기록하는 곳이 어긋나면 언젠가 반드시 값을 치른다.

이미 저질렀다면 `supabase db pull`로 현재 구조를 기록으로 걷어 올린 다음 진행하면 된다.

#### 셋. `\dt`는 `public`만 보여준다

위에서 말한 그거다. `\dn`으로 구역부터 확인하자.

#### 넷. 6543으로 앉지 말 것

접수처의 transaction 모드는 연결을 잘게 돌려 쓴다. psql로 오래 앉아 뭘 하려면 세션이 유지되는 5432로 붙는다.

## 서고가 아플 때

전령에게는 서고 검진 도구도 딸려 있다. psql로 `pg_stat_*`을 직접 뒤지기 전에 이쪽이 빠르다.

```bash
supabase inspect db outliers              # 시간을 제일 많이 먹는 질의
supabase inspect db long-running-queries  # 지금 오래 도는 것
supabase inspect db blocking              # 서로 막고 있는 질의
supabase inspect db locks                 # 잠금
supabase inspect db table-stats           # 테이블 통계
supabase inspect db index-stats           # 인덱스 통계
supabase inspect db bloat                 # 부풀어 오른 곳
supabase inspect report                   # 전부 CSV로
```

여기에 더해 `supabase db lint`(타입 오류)와 `supabase db advisors`(보안·성능 권고)도 있다. RLS를 안 걸어둔 서가가 있으면 `advisors`가 잡아준다. **공개 서고에 규약 없는 서가를 두는 건, 잠금장치 없는 금고를 길가에 두는 것과 같다.**

## 캐릭터 시트

```
이름: 단타마스터
직업: 이방인 견습 (Lv. 7)
현재 퀘스트: 달빛 상단 장부를 수파 상회 서고로 이관
현재 단계: 거울 서고 구축 + 사서 영입 완료

획득한 지식:
- 📜 Supabase 바닥은 그냥 Postgres — 답답하면 psql로 내려가면 된다
- 📜 전령(CLI) = 서고를 짓고 옮기고 복제 / 사서(psql) = 서고 안을 뒤짐
- 📜 로컬 거울 서고 = 54322, 언제든 db reset 으로 갈아엎기
- 📜 스키마 변경은 반드시 마이그레이션으로 (손으로 고치면 기록에 안 남음)
- 📜 postgres 역할은 RLS를 무시한다 → set local role 로 손님 흉내
- 📜 psql은 libpq만 깔면 된다 (keg-only → PATH 한 줄)

새로 배운 마법:
- 🪄 supabase link / start / status / db reset
- 🪄 supabase migration new · up · list, db diff · pull · push --dry-run
- 🪄 supabase db query --local|--linked, gen types, inspect db
- 🪄 psql \? \dn \dt *.* \d+ \x auto \timing \copy
- 🪄 psql -c / -f / -At / -v ON_ERROR_STOP=1 -1
```

### 오늘의 교훈

전령과 사서를 한 사람에게 시키려 하면 둘 다 어설퍼진다. **구조를 바꾸는 일은 기록으로 남기고(전령), 안을 들여다보는 일은 직접 내려가서 한다(사서).** 그리고 psql에서 잘 보인다고 앱에서도 보이는 게 아니다 — 나는 관리인 열쇠를 들고 있고, 손님은 아니니까.

원래 세계에서 나는 차트가 잘 보인다고 내 계좌도 잘 보이는 줄 알았다. 같은 착각이었다.

장부는 무사히 옮겨졌다. 그런데 이관을 끝내고 관문(API)으로 장부 하나를 꺼내려는 순간, 빈 배열이 돌아왔다. 서고엔 분명히 있는데. 열람 규약을 아직 한 줄도 안 써놨기 때문이다 — 다음 화는 **RLS**다.
