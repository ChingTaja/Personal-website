import { useLanguage } from './i18n'
import { useEffect, useState } from 'react'
import './App.css'
import Nav from './Nav'
import Posts, { PostList } from './Posts'
import Resources from './Resources'
import RamenNotes from './RamenNotes'
import { getResourceCategories } from './resourceData'

const projects = [
  { emoji: '🛠️', title: '專案一', desc: '一句話介紹你做了什麼、解決了什麼問題。' },
  { emoji: '🎨', title: '專案二', desc: '一句話介紹你做了什麼、解決了什麼問題。' },
  { emoji: '🚀', title: '專案三', desc: '一句話介紹你做了什麼、解決了什麼問題。' },
];

function Home() {
  const { t, locale } = useLanguage();
  const categories = getResourceCategories(locale);
  return (
    <>
      <header className="hero" id="about">
        <div>
          <div className="hello-row">
            <p className="hello">{t("自由を買うため 今日も働いて")}</p>
            <img className="hello-icon" src="/office.png" alt="" />
          </div>
          <h1>
            {t("我是 ")}<span className="mark">Taja</span>{t("，")}
            <br />
            {t("喜歡把事情做得簡單又好玩。")}
          </h1>
          <div className="intro">
            <p>{t("這是一個可以慢慢寫、慢慢累積的小角落")}</p>
            <p>{t("在文字可以輕易被生成的時代，即使有工具能夠代替我完成文字，我仍然想親自經歷思考、整理和書寫的過程。")}</p>
            <p>{t("有些想法可能還不完整，有些句子也不一定寫得很好，但我想試著把腦海中零散的思緒，慢慢整理成自己的文字。")}</p>
            <p>{t("不為了寫得多好，只是想保留書寫的習慣，記錄生活、整理想法，也為未來的自己留下一些值得回味的片段。")}</p>
          </div>
          <a className="btn" href="#/notes">
            {t("看看隨手記 ✍️")}
          </a>
          <a className="btn ghost" href="#/resources">
            {t("逛逛學習資源收藏 📚")}
          </a>
          <a className="btn ghost" href="#contact">
            {t("跟我聊聊")}
          </a>
        </div>
        <div className="avatar" aria-hidden="true">
          <span className="tape" />
          😎
        </div>
      </header>

      <h2 className="section-title" id="posts">
            {t("📝 日誌")}
      </h2>
      <PostList kind="posts" />

      <h2 className="section-title" id="books">
            {t("📖 讀書筆記")}
      </h2>
      <PostList kind="books" />
      <p>
        <a className="btn" href="#/books">
            {t("看全部筆記 📖")}
        </a>
      </p>

      <h2 className="section-title" id="collections">
            {t("📚 學習資源收藏")}
      </h2>
      <div className="cards">
        {categories.map((c) => (
          <a className="card" key={c.id} href={`#/resources/${c.id}`}>
            <div className="emoji">{c.emoji}</div>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
            <p className="count">{locale === 'en' ? `${c.links.length} resources →` : `${c.links.length} 個好物 →`}</p>
          </a>
        ))}
      </div>
      <p>
        <a className="btn" href="#/resources">
            {t("看全部收藏 📚")}
        </a>
      </p>

      <RamenNotes />

      <h2 className="section-title" id="projects">
            {t("作品")}
      </h2>
      <div className="cards">
        {projects.map((p) => (
          <article className="card" key={t(p.title)}>
            <div className="emoji">{p.emoji}</div>
            <h3>{t(p.title)}</h3>
            <p>{t(p.desc)}</p>
          </article>
        ))}
      </div>

      <h2 className="section-title" id="contact">
            {t("聯絡")}
      </h2>
      <a className="btn" href="mailto:tsungwu@johnsonfitness.com">
            {t("寄信給我 ✉️")}
      </a>
    </>
  );
}

// 以 hash 做簡易路由：#/resources、#/resources/english，其他都是首頁
function useRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onChange = () => {
      setHash(window.location.hash);
      if (window.location.hash.startsWith('#/')) window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash.startsWith('#/') ? hash.slice(2).split('/') : [];
}

function App() {
  const { t } = useLanguage();
  const [page, id] = useRoute();

  return (
    <div className="page">
      <Nav page={page} />
      {page === 'resources' ? (
        <Resources categoryId={id} />
      ) : page === 'posts' || page === 'books' || page === 'notes' ? (
        <Posts kind={page} slug={id} />
      ) : (
        <Home />
      )}
      <footer>{t("© 2026 Taja · 用格子紙和一點點幽默做成")}</footer>
    </div>
  );
}

export default App;
