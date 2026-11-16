import { useCountUp } from '../lib/useCountUp.js'
import Icon from './Icons.jsx'

export default function Hero({ profile, lang, t, stats, onContact }) {
  const years = Math.round(useCountUp(14, 1200, 1500))
  const [title, ...rest] = profile.title[lang].split('|').map((x) => x.trim())

  return (
    <section className="hero" id="profile">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-body">
        <span className="brand-tag">
          <Icon name="code" /> Codaix · {t.role}
        </span>

        <div className="hero-id">
          <img className="avatar" src="./assets/profil.png" alt={profile.name} />
          <div>
            <h1>{profile.name}</h1>
            <p className="hero-role">{title}</p>
            <p className="hero-sub">{rest.join(' · ')}</p>
          </div>
        </div>

        <p className="tagline">{profile.tagline[lang]}</p>

        <div className="hero-cta">
          <button className="btn btn-accent" onClick={onContact}>
            <Icon name="mail" /> {t.contactCta}
          </button>
        </div>
      </div>

      <dl className="stats">
        <div>
          <dd className="num">
            {years}
            <span>+</span>
          </dd>
          <dt>{t.statYears}</dt>
        </div>
        {stats.map((s) => (
          <div key={s.label}>
            <dd className="num">{s.value}</dd>
            <dt>{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  )
}
