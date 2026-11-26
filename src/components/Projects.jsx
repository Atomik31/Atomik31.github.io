import Icon from './Icons.jsx'
import { GROUPS, groupOf } from '../lib/groups.js'
import Plate from './Plate.jsx'

export default function Projects({ projects, filter, onFilter, lang, t, onOpen }) {
  const all = projects
  const shown = filter ? all.filter((p) => groupOf(p) === filter) : all
  return (
    <>
      <div className="filters" role="group" aria-label={t.filterLabel}>
        <button className={`fchip${!filter ? ' on' : ''}`} onClick={() => onFilter(null)} aria-pressed={!filter}>
          {t.all} <span className="num">{all.length}</span>
        </button>
        {GROUPS.map((g) => (
          <button
            key={g.id}
            className={`fchip tone-${g.id}${filter === g.id ? ' on' : ''}`}
            onClick={() => onFilter(filter === g.id ? null : g.id)}
            aria-pressed={filter === g.id}
          >
            <Icon name={g.icon} /> {g.label[lang]} <span className="num">{all.filter((p) => groupOf(p) === g.id).length}</span>
          </button>
        ))}
      </div>

      <ul key={`${filter}-${lang}`} className="proj-grid">
        {shown.map((p, i) => {
          const g = GROUPS.find((x) => x.id === groupOf(p))
          return (
            <li key={p.id} style={{ '--i': i }}>
              <button className={`proj tone-${g.id}`} onClick={() => onOpen(p)}>
                <span className="proj-top">
                  <Plate project={p} icon={g.icon} alt="" />
                </span>
                <strong>{p.title[lang]}</strong>
                <span className="proj-sum muted">{p.summary[lang]}</span>
                <span className="tags">
                  {p.featured && <span className="badge">{t.featured}</span>}
                  {p.stack.slice(0, 4).map((s) => (
                    <span key={s} className="tag">
                      {s}
                    </span>
                  ))}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}
