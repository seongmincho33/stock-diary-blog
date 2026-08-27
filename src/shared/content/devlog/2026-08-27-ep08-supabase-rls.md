---
layout: post
title: "서고엔 장부가 분명히 있는데, 관문은 빈손으로 돌아왔다 (feat. RLS · supabase-js 쿼리 빌더)"
date: 2026-08-27 09:00:00 +0900
lang: ko
categories: [개발일지]
---

> *「결국 매일 쓰는 건 몇 개 안 된다. 그리고 그중 하나가 매번 발목을 잡는다」*

🗓️ 2026.08.27 (목) · 개발일지 8화 — 수파 상회 편 ②: 실제로 자주 쓰는 것들과 열람 규약(RLS)

장부는 무사히 옮겼다. 서고로 내려가 프시 사서에게 물으니 분명히 있었다.

```sql
select count(*) from public.ledger;   -- 1,204
```

그런데 관문(API)으로 같은 걸 요청하니 이렇게 돌아왔다.

```json
{ "data": [], "error": null }
```

없다는 것도 아니고, 오류도 아니다. **그냥 빈손.** 원래 세계에서 분명 체결됐는데 잔고에 안 보이던 그 아침이 떠올랐다. 그때는 내 착각이었지만, 이번엔 아니었다.

관문지기가 무표정하게 말했다.

> "저는 손님 자격으로만 서고에 들어갑니다."
>
> "그리고 이 서가엔 **누가 볼 수 있는지 적힌 규약이 한 줄도 없더군요.**"

## 등장인물

- **관문지기 포레** — 관문(PostgREST) 그 자체. 서가를 그대로 API로 열어주는 자. 유능하지만 융통성이 없다. **절대 관리인 열쇠를 쓰지 않고, 언제나 손님 자격으로만** 서고에 들어간다.
- **프시 사서** — 7화의 그 사서. 관리인 열쇠를 들고 있어서 뭐든 다 보인다. 그래서 이번 사건의 원인을 늦게 알아챘다.
- **셸리** — 여전히 검은 창의 셸 정령.

## 먼저, 결국 매일 쓰는 건 몇 개 안 된다

서고를 쓴 지 며칠 만에 알았다. 상회가 파는 물건은 많은데, **손이 가는 건 정해져 있다.** 견습 기준으로 정리하면 이렇다.

| 순위 | 기능 | 얼마나 | 정체 |
|---|---|---|---|
| 1 | `select` 로 장부 꺼내기 | 하루에도 수십 번 | 제일 많이 타이핑하는 것 |
| 2 | **열람 규약 (RLS)** | 서가 만들 때마다 | 제일 많이 넘어지는 것 |
| 3 | `insert` / `update` / `upsert` | 자주 | 쓰기 |
| 4 | 문지기 (Auth) | 프로젝트당 한 번, 그 뒤론 가끔 | 손님이 누구인지 |
| 5 | 관계 조회 (중첩 select) | 자주 | 조인 대신 쓰는 것 |
| 6 | RPC (서고 함수 호출) | 가끔 | 쿼리 빌더가 막힐 때 |
| 7 | 창고 (Storage) | 프로젝트에 따라 | 파일 |
| 8 | 파발 (Realtime) | 생각보다 드물게 | 실시간이 정말 필요할 때만 |

**1·2·3번이 전부의 8할**이다. 나머지는 필요할 때 문서를 보면 된다. 그래서 이 글은 위쪽 세 개에 집중하고, 그중에서도 오늘 나를 빈손으로 돌려보낸 **2번**에 제일 많은 자리를 준다.

> 아래 코드는 `@supabase/supabase-js` **2.112.0** 기준이다.

## 1. 장부 꺼내기 — `select`

```js
const { data, error } = await supabase
  .from('ledger')
  .select('id, title, amount, created_at')
  .eq('status', 'open')
  .order('created_at', { ascending: false })
  .limit(20)
```

외울 건 두 가지다. **첫째, 던지지 않는다.** 실패해도 예외가 아니라 `error`에 담겨 온다. 그래서 `try/catch`만 믿고 있으면 조용히 넘어간다.

```js
if (error) throw error        // 습관 들일 것
```

**둘째, 필요한 칸만 적는다.** `select('*')`는 편하지만 서가가 넓어지면 그대로 요금이 된다.

#### 자주 쓰는 필터

| 필터 | 뜻 |
|---|---|
| `.eq / .neq` | 같다 / 다르다 |
| `.gt / .gte / .lt / .lte` | 크다 / 작다 |
| `.like / .ilike` | 부분 일치 (`ilike`는 대소문자 무시) |
| `.is('col', null)` | **null 비교는 반드시 `is`** |
| `.in('col', [1,2,3])` | 목록 안에 |
| `.contains` / `.overlaps` | 배열·jsonb 포함 / 교집합 |
| `.or('a.eq.1,b.eq.2')` | OR 조건 |
| `.not('col', 'is', null)` | 부정 |
| `.textSearch` | 전문 검색 |

`null`을 `.eq('col', null)`로 쓰면 원하는 결과가 안 나온다. SQL에서 `= null`이 참이 아닌 것과 같은 이유다.

#### 한 건만 꺼낼 때

```js
.single()        // 정확히 1건이 아니면 error
.maybeSingle()   // 0건이면 data = null (error 아님)
```

`.single()`은 **0건이어도 오류**다. "있으면 주고 없으면 말고"가 필요한 자리엔 `.maybeSingle()`을 쓴다. 이걸 몰라서 정상 흐름에 빨간 로그를 찍고 다녔다.

#### 관계 조회 — 조인 대신

```js
const { data } = await supabase
  .from('ledger')
  .select(`
    id, title,
    author:profiles ( id, name ),
    tags ( name )
  `)
```

외래 키가 걸려 있으면 관문지기가 알아서 따라간다. `author:` 처럼 **이름을 붙여두면** 응답 모양이 안정적이라 나중에 덜 고생한다.

한 서가에서 같은 서가로 가는 외래 키가 **둘 이상**이면 어느 쪽인지 몰라서 오류가 난다. 그때는 관계를 콕 집어준다.

```js
.select('*, author:profiles!ledger_author_id_fkey ( name )')
```

#### 페이지네이션과 총 건수

```js
const { data, count } = await supabase
  .from('ledger')
  .select('*', { count: 'exact' })
  .range(0, 19)          // 0~19번째 = 20건 (끝 포함)
```

`.range()`는 **끝 번호를 포함**한다. 총 건수만 필요하면 본문 없이 머리만 받는다.

```js
const { count } = await supabase
  .from('ledger')
  .select('*', { count: 'exact', head: true })
```

장부가 수십만 장이면 `count: 'exact'`가 비싸진다. 그럴 땐 `'planned'`나 `'estimated'`로 바꾼다.

## 2. 장부 쓰기

```js
// 넣기 — 넣은 결과를 받으려면 .select() 를 붙여야 한다
const { data } = await supabase
  .from('ledger')
  .insert({ title: '8월 정산', amount: 1200 })
  .select()
  .single()

// 고치기 — .eq() 를 빠뜨리면 서가 전체가 바뀐다
await supabase.from('ledger').update({ status: 'closed' }).eq('id', 42)

// 지우기
await supabase.from('ledger').delete().eq('id', 42)

// 있으면 갱신, 없으면 삽입
await supabase
  .from('ledger')
  .upsert({ id: 42, title: '8월 정산' }, { onConflict: 'id' })
```

`insert`는 기본적으로 **넣은 행을 돌려주지 않는다.** `.select()`를 붙여야 온다.

`update`와 `delete`에서 조건을 빠뜨리는 건 이 바닥의 고전적인 사고다. 5화의 "표지석 하나 잘못 건드리면 매출 0원"과 같은 자리에 있다. 최신 서고(PostgREST v13+)에서는 안전핀도 하나 생겼다.

```js
await supabase.from('ledger').delete().eq('status','draft').maxAffected(10)
```

지정한 수보다 많이 건드리게 되면 아예 실패시킨다. 다만 서버 버전을 타니 되는지 확인하고 쓰자.

## 3. 열람 규약 (RLS) — 오늘 나를 빈손으로 돌려보낸 것

여기가 핵심이다.

#### 왜 빈손이었나

서고에는 **세 개의 열쇠**가 있다.

| 열쇠 | 누가 쓰나 | 규약 |
|---|---|---|
| `anon` | 로그인 안 한 손님 (브라우저) | 규약 **적용됨** |
| `authenticated` | 로그인한 손님 (브라우저) | 규약 **적용됨** |
| `service_role` | 서버·배치 | 규약 **무시** |

프시 사서에게 물었을 때 보였던 건, 사서가 **관리인 열쇠**를 들고 있었기 때문이다. 관문지기 포레는 그런 걸 절대 안 쓴다. 손님 열쇠로 들어가서, 서가에 붙은 규약을 읽고, **허락된 장부만** 들고 나온다.

그런데 규약이 한 줄도 없으면? **아무것도 허락되지 않은 것으로 친다.** 그래서 빈 배열이다.

> 규약을 안 켜면 다 보이고, 켜면 아무도 못 본다.
>
> 이 두 문장 사이에 Supabase를 처음 쓰는 사람 전부가 한 번씩 빠진다.

#### 규약 켜기

```sql
alter table public.ledger enable row level security;
```

이 한 줄을 켜는 순간 그 서가는 **기본 잠금**이 된다. 그리고 허락할 것들을 하나씩 적는다.

#### 정책 네 장

```sql
-- 읽기: 내 장부만
create policy "read own ledger"
on public.ledger for select
to authenticated
using ( (select auth.uid()) = user_id );

-- 쓰기: 남의 이름으로 못 쓰게
create policy "insert own ledger"
on public.ledger for insert
to authenticated
with check ( (select auth.uid()) = user_id );

-- 수정: 내 것만, 수정 후에도 여전히 내 것이어야
create policy "update own ledger"
on public.ledger for update
to authenticated
using      ( (select auth.uid()) = user_id )
with check ( (select auth.uid()) = user_id );

-- 삭제: 내 것만
create policy "delete own ledger"
on public.ledger for delete
to authenticated
using ( (select auth.uid()) = user_id );
```

`using`과 `with check`의 차이가 헷갈리는데, 이렇게 외우면 된다.

- **`using`** = *꺼낼 수 있는가* (이미 있는 행을 볼/고칠/지울 자격)
- **`with check`** = *넣어도 되는가* (새로 쓰이는 값이 규약을 지키는가)

`update`에 둘 다 쓰는 이유가 여기 있다. `using`만 있으면 내 장부를 꺼내서 **남의 것으로 바꿔 넣는** 게 통과된다.

#### `auth.uid()`를 괄호로 감싸는 이유

```sql
using ( (select auth.uid()) = user_id )   -- ✅
using ( auth.uid() = user_id )            -- 느림
```

그냥 쓰면 **행마다** 호출된다. `(select ...)`로 감싸면 한 번 구해서 재사용한다. 장부가 많아질수록 차이가 커진다. Supabase가 공식적으로 권하는 형태다.

그리고 규약이 걸리는 칸에는 **인덱스**를 준다. 규약은 결국 매 행마다 도는 `where`다.

```sql
create index on public.ledger (user_id);
```

#### 공개 읽기 서가

전부가 로그인 전용은 아니다. 누구나 읽되 아무나 못 쓰는 서가는 이렇게 된다.

```sql
create policy "public read"
on public.notice for select
to anon, authenticated
using ( true );
```

#### 규약이 진짜 도는지 확인하기

7화에서 배운 손님 흉내가 여기서 쓰인다.

```sql
begin;

select set_config('request.jwt.claims',
  '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
set local role authenticated;

select * from public.ledger;   -- 관문지기가 보는 것과 같은 결과

rollback;
```

**psql에서 잘 보인다고 앱에서도 보이는 게 아니다.** 7화의 교훈이 오늘 그대로 청구서로 돌아왔다.

#### 잊으면 안 되는 것

- `service_role` 열쇠는 규약을 **무시**한다. 브라우저에 절대 두지 않는다. 서버에서만.
- 브라우저에 나가는 `anon` 열쇠는 **공개돼도 되는 물건**이다. 그걸 숨기는 게 보안이 아니라, **규약이 보안**이다.
- 공개 서가에 규약을 안 켜두면 `supabase db advisors`가 잡아준다. 7화의 검진 도구를 여기서 쓴다.

## 4. 문지기 (Auth)

규약이 `auth.uid()`를 물어보니, 손님이 누구인지 정해주는 쪽도 있어야 한다.

```js
// 로그인
await supabase.auth.signInWithPassword({ email, password })
await supabase.auth.signInWithOAuth({ provider: 'github' })

// 지금 누구인가
const { data: { user } } = await supabase.auth.getUser()

// 상태가 바뀔 때마다
supabase.auth.onAuthStateChange((event, session) => { /* … */ })

await supabase.auth.signOut()
```

여기서 딱 하나만 기억하면 된다.

| 함수 | 무엇 | 어디서 |
|---|---|---|
| `getSession()` | 저장소에 있는 걸 **그냥 읽음** (빠름, 검증 안 함) | 브라우저 |
| `getUser()` | 문지기에게 **물어봐서 확인** | **서버에서는 이쪽** |

서버에서 `getSession()`으로 신원을 판단하면 안 된다. 저장소 값은 손님이 만질 수 있으니까. 서버 코드에서는 `getUser()`다.

## 5. 쿼리 빌더가 막히면 — RPC

여러 서가를 한 번에 고치거나, 집계가 복잡하거나, 트랜잭션이 필요하면 쿼리 빌더로는 안 된다. 그럴 땐 서고 안에 함수를 만들어 두고 부른다.

```sql
create or replace function public.close_month(p_month date)
returns int
language plpgsql
security invoker          -- 부른 사람 자격으로 실행 (규약 적용됨)
as $$
declare n int;
begin
  update public.ledger set status = 'closed'
   where date_trunc('month', created_at) = p_month
     and user_id = (select auth.uid());
  get diagnostics n = row_count;
  return n;
end $$;
```

```js
const { data } = await supabase.rpc('close_month', { p_month: '2026-08-01' })
```

`security invoker`와 `security definer`의 차이가 중요하다. **`invoker`는 부른 손님 자격**이라 규약이 그대로 적용되고, **`definer`는 만든 사람 자격**이라 규약을 넘어선다. 편하다고 `definer`를 남발하면 규약을 열심히 써둔 의미가 사라진다.

## 6. 창고와 파발 — 솔직히 덜 쓴다

```js
// 창고 (Storage)
await supabase.storage.from('avatars').upload(`${user.id}/me.png`, file)
const { data } = supabase.storage.from('avatars').getPublicUrl(`${user.id}/me.png`)
const { data: signed } = await supabase.storage
  .from('private-docs').createSignedUrl('a.pdf', 60)   // 60초짜리 임시 통행증
```

창고에도 **규약이 따로 붙는다.** 서가의 RLS를 아무리 잘 짜도 창고는 별개다. 비공개 버킷은 `getPublicUrl` 대신 `createSignedUrl`을 쓴다.

```js
// 파발 (Realtime)
supabase.channel('ledger-watch')
  .on('postgres_changes',
      { event: '*', schema: 'public', table: 'ledger' },
      (payload) => console.log(payload))
  .subscribe()
```

파발은 **정말 실시간이 필요할 때만** 쓴다. 대시보드 숫자가 몇 초 늦게 바뀌어도 되는 곳에 붙였다가, 연결만 늘고 얻는 게 없었다. 예측하지 말고 대응하라던 원칙은 여기서도 통했다 — **필요해진 다음에** 붙이면 된다.

## 자주 밟는 함정

| 증상 | 진짜 원인 |
|---|---|
| `data: []`, `error: null` | 규약이 없거나, 손님이 규약을 못 통과 |
| psql에선 보이는데 앱에선 안 보임 | 사서는 관리인 열쇠, 관문지기는 손님 열쇠 |
| 오류인데 조용히 지나감 | `error`를 안 봤다. 예외로 안 던진다 |
| `.single()`이 자꾸 터짐 | 0건도 오류다. `.maybeSingle()` |
| `insert` 후 `data`가 비어 있음 | `.select()`를 안 붙였다 |
| 관계 조회가 "모호하다"며 실패 | 같은 서가로 가는 외래 키가 둘 이상 → 이름 지정 |
| 서가 전체가 바뀜 | `update`/`delete`에 `.eq()` 누락 |
| 장부 늘수록 급격히 느려짐 | `auth.uid()` 미포장 + 규약 칸에 인덱스 없음 |

## 캐릭터 시트

```
이름: 단타마스터
직업: 이방인 견습 (Lv. 8)
현재 퀘스트: 달빛 상단 장부 서고 이관 — 관문 개통
현재 단계: 열람 규약 작성 완료, 관문 정상 응답

획득한 지식:
- 📜 매일 쓰는 건 select · RLS · 쓰기(insert/update/upsert) 세 개가 8할
- 📜 규약 없는 서가 = 잠긴 서가 (빈 배열의 정체)
- 📜 using = 꺼낼 자격 / with check = 넣어도 되는 값
- 📜 (select auth.uid()) 로 감싸고, 규약 칸엔 인덱스
- 📜 anon 열쇠는 공개돼도 된다. 지키는 건 규약이다
- 📜 service_role 은 규약을 무시한다 → 브라우저 금지
- 📜 서버에서 신원 확인은 getSession 아니고 getUser
- 📜 RPC는 security invoker 가 기본값이어야 한다

새로 배운 마법:
- 🪄 .select().eq().order().range() / .single() vs .maybeSingle()
- 🪄 select('*, author:profiles(*)') 관계 조회
- 🪄 { count: 'exact', head: true }
- 🪄 alter table … enable row level security
- 🪄 create policy … for select to authenticated using (…)
- 🪄 supabase.rpc() / storage createSignedUrl / channel().on('postgres_changes')
```

### 오늘의 교훈

빈 배열은 **버그가 아니라 대답이었다.** "너는 이걸 볼 자격이 없다"는 대답. 그런데 나는 사서가 보여준 화면을 믿고 코드부터 뒤졌다.

원래 세계에서도 그랬다. 내 계좌를 내가 보는 화면과, 시장이 나를 보는 화면은 달랐다. **내가 보는 것이 곧 남이 보는 것은 아니다** — 서고에서 다시 배웠다.

규약을 다 쓰고 관문을 두드리니 장부가 1,204장 그대로 돌아왔다. 그런데 목록 한 번 부르는 데 2초가 걸린다. 사서를 불러 `explain`을 물어볼 차례다. 다음 화는 **인덱스와 느린 질의**다.
