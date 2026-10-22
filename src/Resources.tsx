import { useEffect, useRef, useState } from 'react'
import { categories, type ResourceLink } from './resourceData'

function ResourceCard({ resource }: { resource: ResourceLink }) {
  const content = (
    <>
      <h3>{resource.title}{resource.url ? ' ↗' : ''}</h3>
      <p>{resource.desc}</p>
      {resource.note && <p className="resource-note">{resource.note}</p>}
    </>
  )
  return resource.url ? (
    <a className="card" href={resource.url} target="_blank" rel="noreferrer">{content}</a>
  ) : <article className="card">{content}</article>
}

function ResourceGroup({ group }: { group: { id: string; title: string; links: ResourceLink[] } }) {
  const [expanded, setExpanded] = useState(false)
  const [columns, setColumns] = useState(1)
  const gridRef = useRef<HTMLUListElement>(null)
  const gridId = `grid-${group.id}`

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const measure = () => {
      const tracks = getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean)
      setColumns(Math.max(1, tracks.length))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(grid)
    return () => observer.disconnect()
  }, [])

  const limit = columns * 2
  const hasMore = group.links.length > limit
  const visible = expanded ? group.links : group.links.slice(0, limit)

  return (
    <section className="resource-group" id={`resource-${group.id}`} aria-labelledby={`heading-${group.id}`}>
      <h2 className="resource-heading" id={`heading-${group.id}`}>{group.title} <span className="resource-total">{group.links.length} 個收藏</span></h2>
      <ul className="links resource-grid" id={gridId} ref={gridRef}>
        {visible.map((resource) => <li key={resource.title}><ResourceCard resource={resource} /></li>)}
      </ul>
      {hasMore && (
        <button className="btn resource-toggle" type="button" aria-expanded={expanded} aria-controls={gridId} onClick={() => {
          if (expanded) document.getElementById(`resource-${group.id}`)?.scrollIntoView({ block: 'start' })
          setExpanded(!expanded)
        }}>
          {expanded ? '收合 ↑' : `展開更多（還有 ${group.links.length - limit} 個）↓`}
        </button>
      )}
    </section>
  )
}

export default function Resources({ categoryId }: { categoryId?: string }) {
  const category = categories.find((c) => c.id === categoryId)

  if (categoryId && !category) {
    return (
      <>
        <p>找不到這個分類 🙈</p>
        <a className="btn" href="#/resources">回學習資源收藏</a>
      </>
    )
  }

  if (category) {
    const groups = category.groups ?? [{ id: 'all', title: '收藏資源', links: category.links }]
    return (
      <>
        <a className="back" href="#/resources">← 回學習資源收藏</a>
        <h1 className="page-title">{category.emoji} {category.title}</h1>
        <p className="page-desc">{category.desc}</p>
        {category.groups && (
          <nav className="resource-index" aria-label={`${category.title}小類別`}>
            {groups.map((group) => (
              <a className="filter" key={group.id} href={`#resource-${group.id}`} onClick={(event) => {
                event.preventDefault()
                document.getElementById(`resource-${group.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}>{group.title} <span className="resource-total">{group.links.length}</span></a>
            ))}
          </nav>
        )}
        {groups.map((group) => <ResourceGroup key={`${category.id}-${group.id}`} group={group} />)}
      </>
    )
  }

  return (
    <>
      <h1 className="page-title">📚 學習資源收藏</h1>
      <p className="page-desc">把值得反覆使用的學習資源放在這裡，依語言與練習方向慢慢收藏。</p>
      <div className="cards">
        {categories.map((c) => (
          <a className="card" key={c.id} href={`#/resources/${c.id}`}>
            <div className="emoji">{c.emoji}</div>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
            <p className="count">{c.groups ? `${c.groups.length} 個分類 · ` : ''}{c.links.length} 個收藏 →</p>
          </a>
        ))}
      </div>
    </>
  )
}
