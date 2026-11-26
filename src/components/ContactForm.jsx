import { useState } from 'react'
import Icon from './Icons.jsx'

// Les demandes partent vers un workflow n8n (« Codaix - Formulaire de contact du site ») qui les envoie à contact@codaix.fr.
const ENDPOINT = 'https://n8n-cwqb.srv1518554.hstgr.cloud/webhook/codaix-contact'

const TEXT = {
  fr: {
    intro: 'Un projet, une question ? Décrivez votre besoin, je reviens vers vous.',
    name: 'Nom',
    email: 'E-mail',
    message: 'Message',
    namePh: 'Votre nom',
    emailPh: 'vous@exemple.fr',
    messagePh: 'Décrivez votre besoin en quelques lignes',
    send: 'Envoyer',
    sending: 'Envoi…',
    sent: 'Merci, votre message est bien parti. Je reviens vers vous rapidement.',
    error: "L'envoi a échoué. Réessayez ou écrivez directement à",
  },
  en: {
    intro: 'A project, a question? Tell me what you need and I will get back to you.',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    namePh: 'Your name',
    emailPh: 'you@example.com',
    messagePh: 'Describe what you need in a few lines',
    send: 'Send',
    sending: 'Sending…',
    sent: 'Thank you, your message has been sent. I will get back to you soon.',
    error: 'Sending failed. Try again or write directly to',
  },
}

export default function ContactForm({ lang, email }) {
  const tx = TEXT[lang]
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          message: fd.get('message'),
          website: fd.get('website'),
          lang,
        }),
      })
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
          <span>{tx.name}</span>
          <input name="name" required maxLength={100} autoComplete="name" placeholder={tx.namePh} />
        </label>
        <label>
          <span>{tx.email}</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" placeholder={tx.emailPh} />
        </label>
      </div>
      <label>
        <span>{tx.message}</span>
        <textarea name="message" required maxLength={5000} rows={6} placeholder={tx.messagePh} />
      </label>
      {/* Champ piège pour les robots : invisible pour les visiteurs. */}
      <input className="cform-trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {status === 'error' && (
        <p className="cform-err" role="alert">
          {tx.error} <a href={`mailto:${email}`}>{email}</a>.
        </p>
      )}
      <button className="btn btn-accent" type="submit" disabled={status === 'sending'}>
        <Icon name="mail" /> {status === 'sending' ? tx.sending : tx.send}
      </button>
    </form>
  )
}
