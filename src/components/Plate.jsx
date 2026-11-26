import Icon from './Icons.jsx'
import { logoOf } from '../lib/logos.js'

// Plaque en tête d'un projet : capture d'écran (champ image), sinon logo sur fond blanc, sinon icône de la famille.
export default function Plate({ project, icon, alt, className = '' }) {
  if (project.image) {
    return (
      <span className={`plate has-shot ${className}`}>
        <img src={project.image} alt={alt} loading="lazy" />
      </span>
    )
  }
  const logo = logoOf(project)
  return (
    <span className={`plate${logo ? ' has-logo' : ''} ${className}`}>
      {logo ? <img src={logo} alt={alt} loading="lazy" /> : <Icon name={icon} />}
    </span>
  )
}
