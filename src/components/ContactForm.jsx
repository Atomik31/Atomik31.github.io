import { useRef, useState } from 'react'
import Icon from './Icons.jsx'

// Les demandes partent vers un workflow n8n (« Codaix - Formulaire de contact du site ») qui les envoie à contact@codaix.fr.
// Anti-spam : champ piège invisible, délai minimum avant envoi, puis contrôles et limite d'envois par adresse IP côté n8n.
const ENDPOINT = 'https://n8n-cwqb.srv1518554.hstgr.cloud/webhook/codaix-contact'
const PHONE_RE = /^\+?[0-9 ().-]{6,25}$/

const TEXT = {
  fr: {
    intro: 'Un projet, une question ? Décrivez votre besoin, je reviens vers vous.',
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'E-mail',
    phone: 'Téléphone',
    optional: 'facultatif',
    message: 'Message',
    firstNamePh: 'Votre prénom',
    lastNamePh: 'Votre nom',
    emailPh: 'vous@exemple.fr',
    phonePh: '06 12 34 56 78',
    messagePh: 'Décrivez votre besoin en quelques lignes',
    send: 'Envoyer',
    sending: 'Envoi…',
    sent: 'Merci, votre message est bien parti. Je reviens vers vous rapidement.',
    badPhone: 'Ce numéro de téléphone ne semble pas valide.',
    tooMany: 'Trop de messages envoyés depuis votre connexion. Réessayez un peu plus tard ou écrivez directement à',
    error: "L'envoi a échoué. Réessayez ou écrivez directement à",
  },
  en: {
    intro: 'A project, a question? Tell me what you need and I will get back to you.',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    phone: 'Phone',
    optional: 'optional',
    message: 'Message',
    firstNamePh: 'Your first name',
    lastNamePh: 'Your last name',
    emailPh: 'you@example.com',
    phonePh: '+33 6 12 34 56 78',
    messagePh: 'Describe what you need in a few lines',
    send: 'Send',
    sending: 'Sending…',
    sent: 'Thank you, your message has been sent. I will get back to you soon.',
    badPhone: 'This phone number does not look valid.',
    tooMany: 'Too many messages sent from your connection. Try again later or write directly to',
    error: 'Sending failed. Try again or write directly to',
  },
}

export default function ContactForm({ lang, email }) {
  const tx = TEXT[lang]
  const [status, setStatus] = useState('idle') // idle | sending | sent | error | limited
  const [phoneError, setPhoneError] = useState(false)
  const openedAt = useRef(Date.now()) // un robot remplit le formulaire en quelques millisecondes

  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const phone = String(fd.get('phone') || '').trim()
    if (phone && !PHONE_RE.test(phone)) {
      setPhoneError(true)
      form.elements.phone.focus()
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: fd.get('firstName'),
          lastName: fd.get('lastName'),
          email: fd.get('email'),
          phone,
          message: fd.get('message'),
          website: fd.get('website'),
          elapsed: Date.now() - openedAt.current,
          lang,
        }),
      })
      if (res.status === 429) {
        setStatus('limited')
        return
      }
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="cform-done" role="status">
        <Icon name="check" /> {tx.sent}
      </div>
    )
  }

  return (
    <form className="cform" onSubmit={submit}>
      <p className="muted">{tx.intro}</p>
      <div className="cform-row">
        <label>
          <span>{tx.firstName}</span>
          <input name="firstName" required maxLength={60} autoComplete="given-name" placeholder={tx.firstNamePh} />
        </label>
        <label>
          <span>{tx.lastName}</span>
          <input name="lastName" required maxLength={60} autoComplete="family-name" placeholder={tx.lastNamePh} />
        </label>
      </div>
      <div className="cform-row">
        <label>
          <span>{tx.email}</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" placeholder={tx.emailPh} />
        </label>
        <label>
          <span>
            {tx.phone} <small className="muted">({tx.optional})</small>
          </span>
          <input
            name="phone"
            type="tel"
            maxLength={25}
            autoComplete="tel"
            placeholder={tx.phonePh}
            aria-invalid={phoneError}
            onChange={() => phoneError && setPhoneError(false)}
          />
          {phoneError && <small className="cform-err">{tx.badPhone}</small>}
        </label>
      </div>
      <label>
        <span>{tx.message}</span>
        <textarea name="message" required minLength={10} maxLength={5000} rows={6} placeholder={tx.messagePh} />
      </label>
      {/* Champ piège pour les robots : invisible pour les visiteurs. */}
      <input className="cform-trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {(status === 'error' || status === 'limited') && (
        <p className="cform-err" role="alert">
          {status === 'limited' ? tx.tooMany : tx.error} <a href={`mailto:${email}`}>{email}</a>.
        </p>
      )}
      <button className="btn btn-accent" type="submit" disabled={status === 'sending'}>
        <Icon name="mail" /> {status === 'sending' ? tx.sending : tx.send}
      </button>
    </form>
  )
}
