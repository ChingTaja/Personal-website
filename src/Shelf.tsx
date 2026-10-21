import type { CSSProperties } from 'react'
import type { Post } from './postData'

const palette = ['#ffb4a2', '#ffe08a', '#b8e0d2', '#b7d4f0', '#d9c2f0', '#f6c28b']
const ROW = 8

// 用 slug 算出固定的高度與寬度，每次重新整理書櫃都長一樣
function hash(s: string) {
  let h = 0
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return h
}

function Spine({ book, index }: { book: Post; index: number }) {
  const h = hash(book.slug)
  const style = {
    '--h': `${Math.max(200 + (h % 6) * 16, 56 + [...book.title].length * 17)}px`,
    '--w': `${Math.min(76, 54 + ((h >> 3) % 4) * 8)}px`,
    '--c': book.color || palette[index % palette.length],
  } as CSSProperties

  return (
    <a className="spine" style={style} href={`#/books/${book.slug}`} title={book.title}>
      <span>{book.title}</span>
    </a>
  )
}

// 一個書櫃，書太多就在櫃子裡多一層隔板
export default function Shelf({ books }: { books: Post[] }) {
  const rows: Post[][] = []
  for (let i = 0; i < books.length; i += ROW) rows.push(books.slice(i, i + ROW))
  if (rows.length === 0) rows.push([])

  return (
    <div className="shelf">
      <div className="shelf-case">
        {rows.map((row, r) => (
          <div key={r}>
            <div className="shelf-row">
              {row.map((b, i) => (
                <Spine key={b.slug} book={b} index={r * ROW + i} />
              ))}
            </div>
            <div className="shelf-board" />
          </div>
        ))}
      </div>
      <p className="shelf-hint">👆 挑一本抽出來看看</p>
    </div>
  )
}
