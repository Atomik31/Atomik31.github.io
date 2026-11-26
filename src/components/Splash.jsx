import { useEffect, useState } from 'react'
import LogoMark from './LogoMark.jsx'

// Intro jouée une seule fois par chargement de page, ignorée en mouvement réduit.
let introPlayed = false
const SHOW_MS = 1500
const LEAVE_MS = 450

export default function Splash() {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const [phase, setPhase] = useState(introPlayed || reduce ? 'gone' : 'show')

  useEffect(() => {
    if (phase === 'gone') return
    introPlayed = true
    const t1 = setTimeout(() => setPhase('leave'), SHOW_MS)
    const t2 = setTimeout(() => setPhase('gone'), SHOW_MS + LEAVE_MS)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [phase === 'gone']) // eslint-disable-line react-hooks/exhaustive-deps

  if (phase === 'gone') return null
  return (
    <div className={`splash${phase === 'leave' ? ' leave' : ''}`} aria-hidden="true">
      <div className="splash-in">
        <span className="splash-mark">
          <i />
          <LogoMark />
        </span>
        <span className="splash-word wordmark">cod<em>ai</em>x</span>
        <b className="splash-bar" />
      </div>
    </div>
  )
}
