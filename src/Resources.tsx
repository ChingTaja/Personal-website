import { categories } from './resourceData'

export default function Resources({ categoryId }: { categoryId?: string }) {
  const category = categories.find((c) => c.id === categoryId)

  if (categoryId && !category) {
    return (
      <>
        <p>找不到這個分類 🙈</p>
        <a className="btn" href="#/resources">回學習小書櫃</a>
      </>
    )
  }

  if (category) {
    return (
      <>
        <a className="back" href="#/resources">← 回學習小書櫃</a>
        <h1 className="page-title">{category.emoji} {category.title}</h1>
        <p className="page-desc">{category.desc}</p>
        <ul className="links">
          {category.links.map((l) => (
            <li key={l.title}>
              <a className="card" href={l.url} target="_blank" rel="noreferrer">
                <h3>{l.title} ↗</h3>
                <p>{l.desc}</p>
              </a>
            </li>
          ))}
        </ul>
      </>
    )
  }

  return (
    <>
      <h1 className="page-title">📚 學習小書櫃</h1>
      <p className="page-desc">我收藏的學習好物都放在這，挑一個分類逛逛吧。</p>
      <div className="cards">
        {categories.map((c) => (
          <a className="card" key={c.id} href={`#/resources/${c.id}`}>
            <div className="emoji">{c.emoji}</div>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
            <p className="count">{c.links.length} 個好物 →</p>
          </a>
        ))}
      </div>
    </>
  )
}
