import Icon from './Icons.jsx'

export default function ContactSection({ profile, t }) {
  const rows = [
    { icon: 'mail', label: t.email, value: profile.email, href: `mailto:${profile.email}` },
    { icon: 'linkedin', label: 'LinkedIn', value: t.linkedinProfile, href: profile.linkedin },
    { icon: 'github', label: 'GitHub', value: 'Atomik31', href: profile.github },
  ]
  return (
    <>
      <p className="contact-text">{t.contactText}</p>
      <ul className="contact-grid">
        {rows.map((r, i) => (
          <li key={r.label} style={{ '--i': i }}>
            <a className="contact-card" href={r.href} target="_blank" rel="noreferrer">
              <span className="tile-ico">
                <Icon name={r.icon} />
              </span>
              <span>
                <strong>{r.label}</strong>
                <small className="muted">{r.value}</small>
              </span>
              <Icon name="external" className="go" />
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}
