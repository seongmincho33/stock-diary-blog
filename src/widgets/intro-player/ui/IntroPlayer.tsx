import { useEffect, useRef, useState, type MouseEvent } from 'react'

const BASE = import.meta.env.BASE_URL
const VIDEO = `${BASE}intro.mp4`
const BANNER = `${BASE}banner.png`

function fmt(t: number): string {
  if (!isFinite(t) || t < 0) return '0:00'
  const s = Math.floor(t % 60)
  const m = Math.floor(t / 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

/** 윈98 미디어 재생기: 세로 영상 재생 → 종료 시 단타마스터 배너로 크로스페이드 */
export function IntroPlayer() {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [ended, setEnded] = useState(false)
  const [muted, setMuted] = useState(true)
  const [cur, setCur] = useState(0)
  const [dur, setDur] = useState(0)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const onTime = () => setCur(v.currentTime)
    const onMeta = () => setDur(v.duration)
    const onPlay = () => {
      setPlaying(true)
      setEnded(false)
    }
    const onPause = () => setPlaying(false)
    const onEnded = () => {
      setPlaying(false)
      setEnded(true)
    }
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('loadedmetadata', onMeta)
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    v.addEventListener('ended', onEnded)

    // 음소거 자동재생 (모션 최소화 설정 시엔 배너 포스터만 노출)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduce) {
      v.muted = true
      void v.play().catch(() => {})
    }
    return () => {
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('loadedmetadata', onMeta)
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
      v.removeEventListener('ended', onEnded)
    }
  }, [])

  const playPause = () => {
    const v = ref.current
    if (!v) return
    if (ended) {
      v.currentTime = 0
      setEnded(false)
      void v.play()
      return
    }
    if (v.paused) void v.play()
    else v.pause()
  }

  const replay = () => {
    const v = ref.current
    if (!v) return
    v.currentTime = 0
    setEnded(false)
    void v.play()
  }

  const toggleMute = () => {
    const v = ref.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  const seek = (e: MouseEvent<HTMLDivElement>) => {
    const v = ref.current
    if (!v || !dur) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    v.currentTime = ratio * dur
    setEnded(false)
  }

  const pct = dur ? (cur / dur) * 100 : 0

  return (
    <section className="panel mediaplayer">
      <div className="panel__title mediaplayer__title">
        <span>♪ 단타마스터.avi — 미디어 재생기</span>
        <span className={`mediaplayer__led${playing ? ' is-on' : ''}`} aria-hidden />
      </div>

      <div className="mediaplayer__screen">
        <video
          ref={ref}
          className="mediaplayer__video"
          src={VIDEO}
          poster={BANNER}
          muted={muted}
          playsInline
          preload="auto"
          onClick={playPause}
        />
        <img
          className={`mediaplayer__still${ended ? ' is-shown' : ''}`}
          src={BANNER}
          alt="단타마스터 배너"
          draggable={false}
        />
        {!playing && !ended && (
          <button type="button" className="mediaplayer__bigplay" onClick={playPause} aria-label="재생">
            ▶
          </button>
        )}
      </div>

      <div className="mediaplayer__controls">
        <button type="button" className="btn-98 mediaplayer__btn" onClick={ended ? replay : playPause} aria-label={ended ? '다시 재생' : playing ? '일시정지' : '재생'}>
          {ended ? '↻' : playing ? '❙❙' : '▶'}
        </button>
        <div className="mediaplayer__bar" onClick={seek} role="progressbar" aria-valuenow={Math.round(pct)}>
          <div className="mediaplayer__bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="mediaplayer__time font-mono">
          {fmt(cur)} / {fmt(dur)}
        </span>
        <button type="button" className="btn-98 mediaplayer__btn" onClick={toggleMute} aria-label={muted ? '소리 켜기' : '음소거'}>
          {muted ? '🔇' : '🔊'}
        </button>
      </div>
    </section>
  )
}
