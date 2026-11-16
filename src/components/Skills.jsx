export default function Skills({ skills, lang }) {
  return (
    <ul className="skills">
      {skills.map((s, i) => (
        <li key={s.category.en} className="skill-card" style={{ '--i': i }}>
          <h3>{s.category[lang]}</h3>
          <div className="tags">
            {s.items.map((it) => (
              <span key={it} className="tag">
                {it}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  )
}
