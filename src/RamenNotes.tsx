import { marked } from 'marked'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './i18n'

const reviews = Object.entries(
  import.meta.glob('./ramen/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>,
).sort(([a], [b]) => b.localeCompare(a)).map(([path, markdown]) => {
  const document = new DOMParser().parseFromString(marked.parse(markdown, { async: false }), 'text/html')
  const title = document.querySelector('h1, h2, h3')
  const photo = document.querySelector('img')
  const image = photo?.getAttribute('src') ?? ''
  const alt = photo?.getAttribute('alt') ?? ''
  const name = title?.textContent ?? path.split('/').pop()?.replace(/\.md$/, '') ?? ''
  title?.remove()
  photo?.remove()
  return { path, name, image, alt, html: document.body.innerHTML }
})

export default function RamenNotes() {
  const { locale } = useLanguage()
  const english = locale === 'en'
  const [selected, setSelected] = useState<(typeof reviews)[number] | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (!selected) return
    dialog.current?.showModal()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [selected])

  return (
    <details className="ramen-notes" id="ramen">
      <summary>
        <span>{english ? '🍜 Ramen Notes' : '🍜 拉麵食記'}</span>
        <span className="ramen-count">{english ? `${reviews.length} visits` : `${reviews.length} 篇`}</span>
      </summary>
      <div className="ramen-gallery">
        {reviews.map(review => (
          <button type="button" className="ramen-tile" key={review.path} onClick={() => setSelected(review)} aria-label={english ? `Read ${review.name}` : `查看 ${review.name} 食記`}>
            {review.image ? <img src={review.image} alt={review.alt} loading="lazy" /> : <span className="ramen-no-photo" aria-hidden="true">🍜</span>}
            <span className="ramen-tile-caption">{review.name}</span>
          </button>
        ))}
        {!reviews.length && <div className="ramen-gallery-empty"><span aria-hidden="true">🍜</span><p>{english ? 'The first bowl, coming soon.' : '第一碗，準備上桌。'}</p><small>{english ? 'Photos and a few words for each visit.' : '用照片和幾句話，記住每一碗。'}</small></div>}
      </div>
      <dialog ref={dialog} className="ramen-dialog" aria-labelledby="ramen-dialog-title" onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}>
        {selected && <div className="ramen-post">
          <button type="button" className="ramen-close" onClick={() => dialog.current?.close()} aria-label={english ? 'Close' : '關閉'}>×</button>
          {selected.image && <img className="ramen-post-photo" src={selected.image} alt={selected.alt} />}
          <div className="ramen-post-caption"><h2 id="ramen-dialog-title">{selected.name}</h2><div className="prose" dangerouslySetInnerHTML={{ __html: selected.html }} /></div>
        </div>}
      </dialog>
    </details>
  )
}
