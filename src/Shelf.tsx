import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { Post } from './postData'

const palette = ['#c6d3c5', '#e4d5b7', '#ccd6df', '#d9beb3', '#d1c8da', '#d6d2bf']

// 用 slug 算出固定的高度與寬度，每次重新整理書櫃都長一樣
function hash(s: string) {
  let h = 0
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return h
}

function Spine({ book, index }: { book: Post; index: number }) {
  const h = hash(book.slug)
  const style = {
    '--h': `${250 + (h % 5) * 12}px`,
    '--w': `${60 + ((h >> 3) % 3) * 8}px`,
    '--c': book.color || palette[index % palette.length],
  } as CSSProperties

  return (
    <a className="spine" style={style} href={`#/books/${book.slug}`} title={book.title}>
      <span className="spine-title">{book.title}</span>
      <span className="spine-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
    </a>
  )
}

// 書櫃維持單列，支援箭頭、觸控與滑鼠拖曳
export default function Shelf({ books }: { books: Post[] }) {
  const viewport = useRef<HTMLDivElement>(null)
  const drag = useRef({ startX: 0, startScroll: 0, active: false, moved: false })
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    const el = viewport.current
    if (!el) return
    const update = () => {
      setCanLeft(el.scrollLeft > 1)
      setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(el)
    if (el.firstElementChild) observer.observe(el.firstElementChild)
    return () => {
      el.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [books])

  const scroll = (direction: number) => {
    const el = viewport.current
    if (el) el.scrollBy({ left: direction * el.clientWidth * 0.75, behavior: 'smooth' })
  }

  return (
    <div className="shelf">
      <div className="shelf-toolbar">
        <p className="shelf-hint">👇 挑一本抽出來看看</p>
        <div className="shelf-controls" aria-label="書櫃捲動">
          <button type="button" disabled={!canLeft} onClick={() => scroll(-1)} aria-label="書櫃往左" aria-controls="shelf-viewport">←</button>
          <button type="button" disabled={!canRight} onClick={() => scroll(1)} aria-label="書櫃往右" aria-controls="shelf-viewport">→</button>
        </div>
      </div>
      <div className="shelf-case">
        <div
          id="shelf-viewport"
          className={`shelf-viewport${dragging ? ' dragging' : ''}`}
          ref={viewport}
          role="region"
          aria-label="讀書筆記書櫃，可左右捲動"
          tabIndex={0}
          onDragStart={(event) => event.preventDefault()}
          onPointerDown={(event) => {
            if (event.pointerType !== 'mouse' || event.button !== 0) return
            drag.current = { startX: event.clientX, startScroll: event.currentTarget.scrollLeft, active: true, moved: false }
          }}
          onPointerMove={(event) => {
            const state = drag.current
            if (!state.active) return
            const delta = event.clientX - state.startX
            if (Math.abs(delta) > 5 && !state.moved) {
              state.moved = true
              event.currentTarget.setPointerCapture(event.pointerId)
              setDragging(true)
            }
            if (state.moved) event.currentTarget.scrollLeft = state.startScroll - delta
          }}
          onPointerLeave={() => { if (!drag.current.moved) drag.current.active = false }}
          onPointerUp={() => { drag.current.active = false; setDragging(false) }}
          onPointerCancel={() => { drag.current.active = false; drag.current.moved = false; setDragging(false) }}
          onLostPointerCapture={() => { drag.current.active = false; setDragging(false) }}
          onClickCapture={(event) => {
            if (drag.current.moved) { event.preventDefault(); event.stopPropagation(); drag.current.moved = false }
          }}
        >
          <div className="shelf-row">
            {books.map((book, index) => <Spine key={book.slug} book={book} index={index} />)}
          </div>
        </div>
        <div className="shelf-board" />
      </div>
    </div>
  )
}
