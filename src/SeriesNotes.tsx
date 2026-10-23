import { useEffect, useState } from 'react'
import { useLanguage } from './i18n'
import { getSeriesEpisodes, type Post } from './postData'

export default function SeriesNotes({ post }: { post: Post }) {
  const { t, locale } = useLanguage()
  const episodes = getSeriesEpisodes(post.seriesId, locale)
  const [expanded, setExpanded] = useState<string[]>(() => episodes[0] ? [episodes[0].slug] : [])
  const [query, setQuery] = useState('')
  const [anchor, setAnchor] = useState<string | null>(null)
  const shown = episodes.filter((episode) => `${episode.title} ${episode.originalTitle}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()))
  useEffect(() => {
    if (!anchor) return
    const target = document.getElementById(`topic-${anchor}`)
    if (target) {
      target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
      target.querySelector<HTMLButtonElement>('button')?.focus({ preventScroll: true })
    }
    setAnchor(null)
  }, [anchor])

  return (
    <div className="series-notes">
      <nav className="series-topics" aria-label={t('主題目錄')}>
        <h2>{t('主題')}</h2>
        <div className="series-topic-links">
          {episodes.map((episode, index) => (
            <a key={episode.slug} href={`#topic-${episode.slug}`} onClick={(event) => {
              event.preventDefault()
              setQuery('')
              setExpanded((current) => current.includes(episode.slug) ? current : [...current, episode.slug])
              setAnchor(episode.slug)
            }}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {episode.title}
              <span aria-hidden="true">↓</span>
            </a>
          ))}
        </div>
      </nav>
      <div className="series-toolbar">
        <h2>{t('逐集筆記')}</h2>
        <label className="book-search series-search">
          <span aria-hidden="true">⌕</span>
          <input type="search" aria-label={t('搜尋集數')} placeholder={t('找一集筆記…')} value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
      </div>
      <div className="series-episodes">
        {shown.map((episode) => {
          const number = episodes.indexOf(episode) + 1
          const isOpen = expanded.includes(episode.slug)
          const panelId = `episode-${episode.slug}`
          return (
            <section id={`topic-${episode.slug}`} className={`series-episode${isOpen ? ' is-open' : ''}`} key={episode.slug}>
              <h3 className="series-episode-heading">
                <button type="button" className="series-episode-toggle" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setExpanded((current) => isOpen ? current.filter((slug) => slug !== episode.slug) : [...current, episode.slug])}>
                  <span className="series-episode-number">{String(number).padStart(2, '0')}</span>
                  <span className="series-episode-name">{episode.title}{episode.status === 'complete' && <span className="series-episode-status">{t('心得已整理')}</span>}</span>
                  <span className="series-chevron" aria-hidden="true">⌄</span>
                </button>
              </h3>
              <div id={panelId} hidden={!isOpen} className="series-episode-panel">
                {episode.sourceUrl && <a className="series-watch" href={episode.sourceUrl} target="_blank" rel="noopener noreferrer">{t('觀看這集 ↗')}</a>}
                <div className="prose series-prose" dangerouslySetInnerHTML={{ __html: episode.html }} />
              </div>
            </section>
          )
        })}
        {shown.length === 0 && <p role="status">{t('找不到符合的集數')}</p>}
      </div>
    </div>
  )
}
