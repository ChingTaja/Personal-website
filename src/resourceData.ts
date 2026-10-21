export type ResourceLink = { title: string; url: string; desc: string }

export type ResourceCategory = {
  id: string
  emoji: string
  title: string
  desc: string
  links: ResourceLink[]
}

export const categories: ResourceCategory[] = [
  {
    id: 'english',
    emoji: '🔤',
    title: '英文學習',
    desc: '單字、聽力、文法與練習工具。',
    links: [
      { title: 'BBC Learning English', url: 'https://www.bbc.co.uk/learningenglish', desc: '免費的聽力與文法課程。' },
      { title: 'Cambridge Dictionary', url: 'https://dictionary.cambridge.org/', desc: '查單字、例句與發音。' },
      { title: '在這裡新增你的資源', url: '#', desc: '一句話說明這個資源好在哪。' },
    ],
  },
  {
    id: 'japanese',
    emoji: '🎌',
    title: '日文學習',
    desc: '五十音、單字、文法與教材。',
    links: [
      { title: 'NHK WORLD Easy Japanese', url: 'https://www3.nhk.or.jp/nhkworld/en/learnjapanese/', desc: '生活會話入門課程。' },
      { title: 'Jisho', url: 'https://jisho.org/', desc: '線上日英辭典。' },
      { title: '在這裡新增你的資源', url: '#', desc: '一句話說明這個資源好在哪。' },
    ],
  },
]
