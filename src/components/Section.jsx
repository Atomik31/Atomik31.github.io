export default function Section({ id, title, count, children, aside }) {
  return (
    <section className="section" id={id}>
      <div className="sec">
        <h2>{title}</h2>
        {count != null && <span className="count num">{count}</span>}
        {aside}
      </div>
      {children}
    </section>
  )
}
