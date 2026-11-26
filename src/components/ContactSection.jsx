import Icon from './Icons.jsx'
import ContactForm from './ContactForm.jsx'

export default function ContactSection({ profile, t, lang }) {
  const rows = [
    { icon: 'linkedin', label: 'LinkedIn', value: t.linkedinProfile, href: profile.linkedin },
    { icon: 'github', label: 'GitHub', value: 'Atomik31', href: profile.github },
  ]
  return (
    <>
      <ContactForm lang={lang} email={profile.email} />
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
