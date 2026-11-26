import { useEffect, useRef, useState } from 'react'

// Fait « compter » un nombre jusqu'à sa valeur. Instantané si l'utilisateur demande moins de mouvement.
export function useCountUp(target, duration = 1100, delay = 0) {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const [value, setValue] = useState(reduce ? target : 0)
  const from = useRef(reduce ? target : 0)

  useEffect(() => {
    if (reduce || from.current === target) {
      setValue(target)
      return
    }
    let frame
    const t0 = performance.now() + delay
    const start = from.current
    const tick = (now) => {
      const p = Math.min(1, Math.max(0, (now - t0) / duration))
      const eased = 1 - Math.pow(1 - p, 3)
      from.current = start + (target - start) * eased
      setValue(from.current)
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration, delay, reduce])

  return value
}
