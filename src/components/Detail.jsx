import Icon from './Icons.jsx'
import { groupOf, GROUPS } from '../lib/groups.js'
import Plate from './Plate.jsx'

export default function Detail({ project: p, lang, t }) {
  const g = GROUPS.find((x) => x.id === groupOf(p))
  return (
    <div className="detail">
      <Plate project={p} icon={g.icon} alt={p.title[lang]} className="plate-lg" />
      <span className={`kicker tone-${g.id}`}>{g.label[lang]}</span>
      <h2>{p.title[lang]}</h2>
      <p>{p.summary[lang]}</p>
      {p.context && (
        <div className="note">
          <strong>{t.context}</strong>
          <p>{p.context[lang]}</p>
        </div>
      )}
      <div className="tags">
        {p.stack.map((s) => (
          <span key={s} className="tag">
            {s}
          </span>
        ))}
      </div>
      <div className="actions">
        {p.demo_url && (
          <a className="btn btn-accent" href={p.demo_url} target="_blank" rel="noreferrer">
            <Icon name="globe" /> {t.demo}
          </a>
        )}
        {p.repo_url && (
          <a className="btn btn-dark" href={p.repo_url} target="_blank" rel="noreferrer">
            <Icon name="github" /> {t.repo}
          </a>
        )}
      </div>
    </div>
  )
}
