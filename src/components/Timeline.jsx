// Frise verticale : expériences et formations.
const isCurrent = (p) => /aujourd|present|partir|from/i.test(p)

export default function Timeline({ entries, lang, t, kind }) {
  return (
    <ol className="timeline">
      {entries.map((e, i) => {
        const title = kind === 'education' ? e.degree[lang] : e.role[lang]
        const org = kind === 'education' ? e.school : e.company
        const current = isCurrent(e.period[lang])
        const planned = /visée|targeted/i.test(e.period[lang])
        return (
          <li key={e.id} className={`tl-item${current ? ' current' : ''}`} style={{ '--i': i }}>
            <span className="tl-dot" aria-hidden="true" />
            <article className="tl-card">
              <div className="tl-head">
                <h3>{title}</h3>
                <span className="period num">{e.period[lang]}</span>
              </div>
              <p className="tl-org">
                <strong>{org}</strong>
                <span className="muted"> · {e.location[lang]}</span>
                {current && <span className="badge">{t.current}</span>}
                {planned && <span className="badge">{t.planned}</span>}
              </p>
              <p className="tl-desc">{e.description[lang]}</p>
              {e.stack?.length > 0 && (
                <div className="tags">
                  {e.stack.map((s) => (
                    <span key={s} className="tag">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </article>
          </li>
        )
      })}
    </ol>
  )
}
