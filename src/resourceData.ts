import { translate, type Locale } from './i18n'
import { aiCategory } from './aiResourceData'
export type ResourceLink = { title: string; url?: string; desc: string; note?: string }

export type ResourceGroupData = { id: string; title: string; desc?: string; links: ResourceLink[] }

export type ResourceCategory = {
  id: string
  emoji: string
  title: string
  desc: string
  links: ResourceLink[]
  groups?: ResourceGroupData[]
  source?: { title: string; author: string; url: string; authorUrl: string }
  guide?: { title: string; desc: string }
}

const japaneseGroups: NonNullable<ResourceCategory['groups']> = [
  { id: "reading", title: "📖 閱讀", links: [
    {"title": "note", "desc": "可以把 note 想成日文版的 Medium，透過創作者分享的生活經驗與觀點，接觸自然的日文表達。", "url": "https://note.com/"},
    {"title": "日文電子書平台比較", "desc": "購書前可先比較平台特色，幫自己找到合適的原文書閱讀方式。", "url": "https://readerjenny.com/sharing/japanese-ebook-platforms-recommendation/", "note": "先把既有的書看完再說"},
  ] },
  { id: "listening", title: "🎧 聽力與會話", links: [
    {"title": "Jiro, just Japanese", "desc": "可把同一段日文反覆聆聽與跟讀，累積對自然語流的熟悉度。", "url": "https://www.youtube.com/@JiroJapanese"},
    {"title": "The Bite Size Japanese Podcast", "desc": "可挑一段內容反覆聆聽，讓零碎時間也能累積日文輸入。", "url": "https://www.youtube.com/watch?v=Iq267n91RYA", "note": "YouTube／Podcast"},
    {"title": "5分鐘情境日文馬上用｜MJ日語", "desc": "透過情境練習記住表達方式，適合逐句聽懂後再模仿說出口。", "url": "https://podcasts.apple.com/tw/podcast/5分鐘情境日文馬上用-mj日語-mj-japanese/id1577136767", "note": "精聽"},
    {"title": "okei", "desc": "可先抓話題和關鍵字，練習不逐字翻譯也能掌握大意。", "url": "https://www.youtube.com/watch?v=MmvaYPjogwQ", "note": "泛聽"},
    {"title": "YUYUの日本語Podcast", "desc": "多元話題與海外生活觀察，適合長期累積生活詞彙與聽力。", "url": "https://www.youtube.com/@yuyunihongopodcast", "note": "YouTube／Podcast；已合併重複收藏"},
    {"title": "MAIの日本語Podcast", "desc": "可用收藏片段做跟讀素材，練習日文的停頓、語調與句子節奏。", "url": "https://www.youtube.com/watch?v=iS9zfbTXC1k&t=915s"},
    {"title": "Eri’s Japanese Podcast", "desc": "可固定選一集練習摘要，用自己的話重述聽到的內容。", "url": "https://www.youtube.com/@ErisJapanesePodcast"},
    {"title": "HINA 日本語", "desc": "適合安排短時間聆聽，讓每天接觸日文更容易持續。", "url": "https://www.youtube.com/@HINAJapanese-e9d", "note": "短時間"},
    {"title": "Just Talk with Me", "desc": "適合先聽懂整體意思，再回頭挑出常出現的口語表達。", "url": "https://www.youtube.com/watch?v=dyp7doHnxU0", "note": "泛聽"},
    {"title": "日本旅遊 YouTube", "desc": "從旅行情境練習抓地名、交通與點餐資訊，讓聽力連結實際使用場景。"},
    {"title": "日本民間故事", "desc": "利用故事的情節線索理解內容，練習敘事句型與前後因果。", "url": "https://www.youtube.com/watch?v=GhX5Eu2ilkQ&list=PLJov1NnDE_N_92MtmRyQknjavXa1oLSuM"},
    {"title": "昔話法廷", "desc": "以熟悉的故事練習辨認立場與理由，適合進一步練習聽懂論述。", "url": "https://www.nhk.or.jp/school/sougou/houtei/"},
    {"title": "日文聽力練習", "desc": "可採取先聽、記下關鍵字、再重聽的方式，找出自己容易漏聽的地方。", "url": "https://www.youtube.com/watch?v=h7QxhsQMO0g"},
  ] },
  { id: "news", title: "📰 新聞", links: [
    {"title": "NHK NEWS WEB EASY", "desc": "可把一篇新聞當作精讀與精聽素材，整理事件重點和新聞常用詞。", "url": "https://www3.nhk.or.jp/news/easy/ne2025091811563/ne2025091811563.html", "note": "精聽；保留收藏的單篇新聞連結"},
    {"title": "NHK for School", "desc": "以學科與生活知識為主題學日文，讓語言輸入同時累積背景知識。", "url": "https://www.nhk.or.jp/school/"},
    {"title": "毎日小学生新聞", "desc": "從面向小學生的新聞切入，練習用日文理解時事與社會議題。", "url": "https://mainichi.jp/maisho/"},
    {"title": "毎日15歳のニュース", "desc": "可作為進階新聞閱讀素材，練習整理社會議題的背景與觀點。", "url": "https://mainichi.jp/maisho15", "note": "原收藏註記：付費"},
  ] },
  { id: "grammar", title: "✏️ 文法與學習工具", links: [
    {"title": "出口日語", "desc": "可搭配例句整理文法，再用自己的生活情境造句加深記憶。", "url": "https://www.youtube.com/@deguchi/videos"},
    {"title": "大家的日本語", "desc": "依教材順序練習句型，適合建立有次序的文法複習習慣。", "url": "https://www.youtube.com/watch?v=U8wniu_c_zc&list=PLynCeSdpMqxCW-AfMtmIlASAMUVq8wX6k&index=1"},
    {"title": "日文學習資源大補帖", "desc": "集中比較不同學習網站，方便依目前想練的能力挑選工具。", "url": "https://picks.goandup.jp/recommended-japanese-learning-site-where-you-can-learn-japanese-while-having-fun-b/"},
    {"title": "LISTEN", "desc": "可搭配節目的文字轉錄對照聆聽，找出沒聽懂的詞句。", "url": "https://listen.style/"},
    {"title": "NHK WORLD Easy Japanese", "desc": "以生活會話建立常用句型，適合打底後直接練習開口。", "url": "https://www3.nhk.or.jp/nhkworld/en/learnjapanese/"},
    {"title": "Jisho", "desc": "閱讀或聽力遇到生字時可集中查詢，整理成自己的複習詞庫。", "url": "https://jisho.org/"},
  ] },
  { id: "podcasts", title: "🎙️ Podcast", links: [
    {"title": "ニュースの学校", "desc": "話題多元而且篇幅短，適合用一段通勤時間練習理解一個主題。", "note": "短篇"},
    {"title": "みんなの円山動物園", "desc": "從動物飼育員的心得接觸具體故事，累積平常教材較少出現的詞彙。"},
    {"title": "Hapa英会話 Podcast", "desc": "結合英日語輸入，可隨日文能力提升逐步聽懂更多日文解說。"},
    {"title": "安住紳一郎の日曜天国", "desc": "長篇且話題廣，適合挑戰較難的自然口語與持續聆聽。", "note": "進階／長時間"},
    {"title": "日本語って", "desc": "較慢的語速適合初學者練習辨認詞句，建立聽懂完整句子的信心。", "note": "初學者／慢速"},
    {"title": "新聞1面じゃなくても大事なこと - SDGsを話そう-", "desc": "透過多元社會議題累積詞彙，並練習聽懂不同角度的討論。"},
    {"title": "となりの雑談", "desc": "兩位主持人的閒聊適合觀察接話、回應與自然對話的節奏。"},
    {"title": "10分本要約ラジオ", "desc": "透過簡短的書籍介紹掌握重點，練習聽完後用幾句話摘要。"},
    {"title": "日本語の会話のpodcast｜ことのは", "desc": "以會話素材練習理解上下文，累積能用在日常互動的表達。", "url": "https://podcasts.apple.com/tw/podcast/日本語の会話のpodcast-ことのは/id1656628405"},
    {"title": "Let’s Talk in Japanese", "desc": "可把節目納入固定聆聽清單，透過反覆接觸日文累積理解力。"},
    {"title": "ジェーン・スー 生活は踊る", "desc": "生活話題與自然對話適合學習日常用語，也能觀察主持人的回應方式。", "note": "喜歡《日曜天国》也可聽"},
    {"title": "オードリーのオールナイトニッポン", "desc": "口語化且語速較快，適合挑戰即時理解閒聊和笑點。", "note": "進階"},
    {"title": "佐久間宣行のオールナイトニッポン0", "desc": "從工作與人生故事累積敘事表達，適合對職場話題有興趣時聆聽。"},
    {"title": "COTEN RADIO", "desc": "藉由歷史故事累積知識，同時練習理解較完整的說明與因果關係。"},
  ] },
  { id: "speaking", title: "🗣️ 口說", links: [
    {"title": "JapaTalk", "desc": "透過一對一日語會話把學過的句型用出來，練習即時組織自己的想法。", "url": "https://www.japatalk.com/", "note": "已改為網站首頁"},
  ] },
  { id: "work", title: "📺 職場、商業與社會節目", links: [
    {"title": "ガイアの夜明け", "desc": "透過工作現場相關內容，練習理解職場情境與實際業務用語。"},
    {"title": "PIVOT", "desc": "可用商業與職場話題累積專業詞彙，練習說明工作上的想法。", "note": "YouTube"},
    {"title": "ABEMA Prime", "desc": "透過社會議題討論，練習辨認不同立場與即時回應。", "note": "YouTube"},
    {"title": "ReHacQ", "desc": "適合挑戰較高階的訪談聽力，練習跟上長段論述。", "note": "YouTube／進階"},
    {"title": "NHK", "desc": "可用新聞內容練習正式用語，整理較完整、清楚的表達方式。", "note": "YouTube"},
    {"title": "ひろゆき", "desc": "可觀察口語回應與辯論方式，練習辨認主張、理由與反問。", "note": "YouTube"},
  ] },
  { id: "dramas", title: "🎬 職場劇", links: [
    {"title": "ハケンの品格", "desc": "適合觀察職場互動與工作溝通，挑出能用在辦公室的表達。"},
    {"title": "働きマン", "desc": "可從工作情境留意任務、進度與同事互動的說法。"},
    {"title": "アグレッシブ烈子", "desc": "可從職場情緒與日常互動切入，練習表達感受和回應同事。"},
    {"title": "半沢直樹", "desc": "適合挑戰商務與組織情境的用語，練習理解立場與言外之意。"},
    {"title": "しょせん他人事ですから", "desc": "可練習從事件對話中掌握重點，留意較正式的說明方式。"},
  ] },
]

const englishGroups: NonNullable<ResourceCategory['groups']> = [
  { id: "toeic", title: "📝 多益", links: [
    {"title": "巨匠｜英文線上測驗", "url": "https://www.soeasyedu.com.tw/english-exam", "desc": "可用線上測驗檢視目前程度，找出多益練習時需要加強的題型。"},
    {"title": "免費多益線上模擬測驗資源整理", "url": "https://cln-asia.com/【2025-持續更新】10-個免費多益線上模擬測驗網站資源/", "desc": "集中收藏模擬測驗網站，方便挑選題目練習並安排考前複習。"},
  ] },
  { id: "reading", title: "📖 Reading｜閱讀", links: [
    {"title": "常春藤／空中英語｜線上閱讀", "url": "https://tpml.ebook.hyread.com.tw/Template/RWD3.0/magazine_more.jsp?jid=213", "desc": "把英文雜誌納入固定閱讀習慣，從不同主題累積單字與句型。"},
    {"title": "DMM Daily News｜簡單有趣文章", "url": "https://eikaiwa.dmm.com/app/daily-news", "desc": "挑感興趣的短文閱讀，再練習用英文摘要或回答問題。"},
    {"title": "News for Kids", "url": "https://newsforkids.net/articles/2025/09/16/nepal-protests-bring-new-leader-brazils-bolsonaro-found-guilty/", "desc": "從較容易切入的新聞文章開始，練習掌握事件重點與新聞詞彙。"},
  ] },
  { id: "intensive-listening", title: "🎯 Listening｜精聽", links: [
    {"title": "VoiceTube", "url": "https://tw.voicetube.com/definition/baggage%20carousel/videos", "desc": "挑一小段反覆聽寫與跟讀，找出連音、發音和生字造成的理解落差。"},
  ] },
  { id: "extensive-listening", title: "🎧 Listening｜泛聽", links: [
    {"title": "The Indicator from Planet Money", "url": "https://podcasts.apple.com/tw/podcast/the-indicator-from-planet-money/id1320118593", "desc": "透過經濟現象與商業議題練習掌握大意，同時累積工作與財經相關詞彙。"},
    {"title": "Speak English With Class", "url": "https://www.youtube.com/watch?v=0Okxsszt624", "desc": "先聽懂整體內容，再挑幾句喜歡的表達練習模仿。"},
    {"title": "短時間故事", "url": "https://www.youtube.com/watch?v=7mGFveB9PCs", "desc": "利用故事情節推敲意思，讓短時間聆聽也能累積語感。"},
    {"title": "Learn English with Rebecca · engVid", "url": "https://www.youtube.com/watch?v=qv7mop1l7mw", "desc": "可邊聽英文講解邊整理實用說法，練習跟上完整的說明內容。"},
  ] },
]

const additionalCategories: ResourceCategory[] = [
  {
    id: 'growth-and-business',
    emoji: '🌿',
    title: '自我成長與創業',
    desc: '從個人觀點、內容創作到網路事業，探索適合自己的生活與工作方式。',
    links: [],
    groups: [{
      id: 'creators-and-solo-business',
      title: '✍️ 內容創作與一人事業',
      links: [{
        title: 'Dan Koe',
        url: 'https://thedankoe.com/',
        desc: '從自我成長、寫作與一人事業的文章出發，思考如何把自己的興趣與觀點轉化成內容和工作方向。',
      }],
    }],
  },
  {
    id: 'software',
    emoji: '💻',
    title: '軟體開發',
    desc: '整理程式設計與軟體架構資源，從理解問題到選擇適合的設計方法。',
    links: [],
    groups: [{
      id: 'design-patterns',
      title: '🧩 設計模式',
      links: [{
        title: 'Refactoring.Guru｜Design Patterns',
        url: 'https://refactoring.guru/design-patterns',
        desc: '把常見的軟體設計問題與模式集中整理，方便對照自己遇到的情境，理解何時適合使用哪一種解法。',
      }],
    }, {
      id: 'asking-and-communication',
      title: '💬 提問與溝通',
      links: [{
        title: 'How-To-Ask-Questions-The-Smart-Way｜提問的智慧',
        url: 'https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way',
        desc: '學習在提問前整理背景、描述問題與列出已嘗試的方法，讓技術討論更清楚，也更容易獲得有用的回答。',
      }],
    }],
  },
  {
    id: 'interesting-websites',
    emoji: '🎲',
    title: '有趣的網站',
    desc: '收藏讓人想點開玩玩、順便發現新知識的網站。',
    links: [],
    groups: [{
      id: 'everyday-and-fun',
      title: '🎮 生活與趣味',
      links: [{
        title: 'iTaigi 愛台語｜寶可夢',
        url: 'https://itaigi.tw/tsu-te/pho-khi-bong',
        desc: '從寶可夢這個熟悉的題材查台語說法，讓學詞彙多一點趣味，也順便探索其他生活用語。',
      }],
    }],
  },
  {
    id: 'thinking',
    emoji: '🧠',
    title: '思考工具',
    desc: '認識思考習慣與判斷盲點，練習從不同角度理解自己做出的選擇。',
    links: [],
    groups: [{
      id: 'cognitive-biases',
      title: '🔍 認知偏誤',
      links: [{
        title: 'Cognitive Bias Explorer',
        url: 'https://thebiasmap.com/',
        desc: '用互動地圖探索 188 項偏誤與相關效應，搭配短動畫、實驗與測驗，練習辨認日常判斷中容易忽略的盲點。',
      }],
    }],
  },
].map((category) => ({ ...category, links: category.groups.flatMap((group) => group.links) }))

export const categories: ResourceCategory[] = [
  {
    id: 'english',
    emoji: '🔤',
    title: '英文學習',
    desc: '從多益準備、閱讀到精聽與泛聽，依照今天想練習的方向挑一個資源。',
    links: englishGroups.flatMap((group) => group.links),
    groups: englishGroups,
  },
  {
    id: 'japanese',
    emoji: '🎌',
    title: '日文學習',
    desc: '從閱讀、聽力到職場日文，依照今天想練習的方向挑一個資源。',
    links: japaneseGroups.flatMap((group) => group.links),
    groups: japaneseGroups,
  },
  aiCategory,
  ...additionalCategories,
]

export function getResourceCategories(locale: Locale): ResourceCategory[] {
  const localizeLink = (link: ResourceLink): ResourceLink => ({
    ...link,
    title: translate(link.title, locale),
    desc: translate(link.desc, locale),
    note: link.note ? translate(link.note, locale) : undefined,
  });
  return categories.map((category) => ({
    ...category,
    title: translate(category.title, locale),
    desc: translate(category.desc, locale),
    links: category.links.map(localizeLink),
    guide: category.guide ? { title: translate(category.guide.title, locale), desc: translate(category.guide.desc, locale) } : undefined,
    groups: category.groups?.map((group) => ({ ...group, title: translate(group.title, locale), desc: group.desc ? translate(group.desc, locale) : undefined, links: group.links.map(localizeLink) })),
  }));
}
