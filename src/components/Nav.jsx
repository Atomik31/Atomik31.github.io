import Icon from './Icons.jsx'
import LogoMark from './LogoMark.jsx'

// Navigation par sections : barre en haut sur bureau, barre d'onglets en bas sur mobile (comme une app).
export default function Nav({ items, active, onGo, lang, onLang }) {
  return (
    <>
      <header className="topbar">
        <div className="topbar-in">
          <button className="logo" onClick={() => onGo('profile')} aria-label="Codaix">
            <span className="logo-mark">
              <LogoMark />
            </span>
            <span className="wordmark">cod<em>ai</em>x</span>
          </button>

          <nav className="nav-top" aria-label="Sections">
            {items.map((it) => (
              <button key={it.id} className={active === it.id ? 'on' : ''} onClick={() => onGo(it.id)}>
                {it.label}
              </button>
            ))}
          </nav>

          <div className="topbar-actions">
            <div className="lang" role="group" aria-label="Langue / Language">
              {['fr', 'en'].map((l) => (
                <button key={l} className={lang === l ? 'on' : ''} onClick={() => onLang(l)} aria-pressed={lang === l}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <nav className="nav-bottom" aria-label="Sections">
        {items.map((it) => (
          <button key={it.id} className={active === it.id ? 'on' : ''} onClick={() => onGo(it.id)} aria-label={it.label}>
            <Icon name={it.icon} />
            <span>{it.label}</span>
          </button>
        ))}
      </nav>
    </>
  )
}
