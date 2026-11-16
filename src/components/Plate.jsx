import Icon from './Icons.jsx'
import { logoOf } from '../lib/logos.js'

// Plaque en tête d'un projet : logo sur fond blanc, ou icône de la famille si le projet n'a pas de logo.
export default function Plate({ project, icon, alt, className = '' }) {
  const logo = logoOf(project)
  return (
    <span className={`plate${logo ? ' has-logo' : ''} ${className}`}>
      {logo ? <img src={logo} alt={alt} loading="lazy" /> : <Icon name={icon} />}
    </span>
  )
}
