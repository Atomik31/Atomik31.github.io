import { useEffect } from 'react'
import Icon from './Icons.jsx'

// Feuille : panneau latéral à droite sur grand écran, feuille qui monte du bas sur mobile.
// Se ferme par la croix, Échap ou un clic sur le voile.
export default function Sheet({ title, onClose, closeLabel, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="scrim" onClick={onClose}>
      <aside className="sheet" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grip" aria-hidden="true" />
        <button className="circle sm sheet-close" onClick={onClose} aria-label={closeLabel}>
          <Icon name="close" />
        </button>
        {children}
      </aside>
    </div>
  )
}
