import type { ResourceCategory, ResourceGroupData } from './resourceData';

const aiGroups: ResourceGroupData[] = [
  {
    id: 'foundations',
    title: '🌱 共同基礎',
    desc: '先理解生成式 AI 的能力與限制、練習提示詞、熟悉通用工具，再用一個日常任務驗證學到的東西；選一門適合自己的課開始即可。',
    links: [
      {
        title: 'Google AI Essentials',
        url: 'https://www.grow.google/intl/zh-TW_tw/ai-essentials/',
        desc: '從日常工作情境練習使用生成式 AI，適合還沒有經驗、想先建立基本使用能力的人。',
      },
      {
        title: 'Google Prompting Essentials',
        url: 'https://www.grow.google/intl/zh-TW_tw/prompting-essentials/',
        desc: '用有步驟的提示詞練習，學習如何描述需求、補足背景並改善輸出。',
      },
      {
        title: 'Google AI Professional Certificate',
        url: 'https://www.grow.google/intl/zh-TW_tw/ai-professional/',
        desc: '透過工作導向的實作活動，把 AI 用在規劃、研究、內容與資料等不同任務。',
      },
      {
        title: 'Generative AI for Everyone',
        url: 'https://www.deeplearning.ai/courses/generative-ai-for-everyone/',
        desc: '先建立生成式 AI 的通用觀念，再判斷哪些工作適合交給 AI 協助。',
      },
      {
        title: 'DeepLearning.AI｜Prompting & Courses',
        url: 'https://www.deeplearning.ai/courses/',
        desc: '依想練的能力挑選提示詞或應用課程，補上實作時遇到的知識缺口。',
      },
      {
        title: 'Elements of AI',
        url: 'https://www.elementsofai.com/',
        desc: '用互動式文字教材與練習理解 AI 基本概念，適合偏好閱讀的人。',
      },
      {
        title: 'Anthropic Courses',
        url: 'https://anthropic.skilljar.com/',
        desc: '從官方教材認識 Claude 與 AI 素養，了解工具的用法、能力與限制。',
      },
      {
        title: 'OpenAI Academy',
        url: 'https://academy.openai.com/',
        desc: '從 AI 基礎到工作流程，練習提供背景、檢查結果，讓日常任務變得可重複執行。',
      },
      {
        title: 'Kaggle Learn',
        url: 'https://www.kaggle.com/learn',
        desc: '從 AI 與資料科學的練習入手，適合喜歡邊寫邊學的人。',
        note: '影片提到的五天生成式 AI 密集課程，可從平台另查教材與錄影。',
      },
      {
        title: 'Microsoft Learn',
        url: 'https://learn.microsoft.com/training/',
        desc: '依 Microsoft 技術生態系探索學習路徑，適合工作中已使用相關產品的人。',
      },
      {
        title: 'LinkedIn Learning',
        url: 'https://www.linkedin.com/learning/',
        desc: '以職場應用為方向搜尋生成式 AI 課程，挑選能直接用在工作上的主題。',
      },
    ],
  },
  {
    id: 'strategist',
    title: '🧭 Strategist｜AI 策略家',
    desc: '適合主管、產品／專案經理與顧問；重點是供應商選擇、導入順序、人機分工、成本與風險。',
    links: [
      {
        title: 'OpenAI Academy｜AI Leadership',
        url: 'https://academy.openai.com/',
        desc: '以領導與導入的角度找學習資源，思考團隊該在哪裡使用 AI、如何檢查成效。',
        note: '課程平台入口',
      },
      {
        title: 'AI for Everyone',
        url: 'https://www.deeplearning.ai/courses/ai-for-everyone/',
        desc: '建立 AI 與企業應用的共通語言，方便和技術團隊討論可行的導入方向。',
      },
      {
        title: 'Co-Intelligence｜One Useful Thing',
        url: 'https://www.oneusefulthing.org/',
        desc: '透過作者對人機協作的觀察，思考 AI 如何改變自己的工作方式。',
        note: '作者網站與文章',
      },
      {
        title: 'AI Snake Oil',
        url: 'https://www.aisnakeoil.com/',
        desc: '練習分辨 AI 能力與誇大宣傳，避免只因熱門就導入不合適的工具。',
      },
    ],
  },
  {
    id: 'rogue',
    title: '🧪 Rogue｜Agent 實驗者',
    desc: '適合喜歡串工具、做自動化或打造個人助手的人；從一個小任務開始，邊做邊理解委派、工具、記憶與權限。',
    links: [
      {
        title: 'Claude｜Official Courses',
        url: 'https://anthropic.skilljar.com/',
        desc: '先熟悉工具本身，再把常做的任務拆開，實驗哪些步驟能交給 AI。',
      },
      {
        title: 'OpenAI Academy｜Agents & Workflows',
        url: 'https://academy.openai.com/',
        desc: '用明確的背景、輸出要求與檢查點，練習把單次對話變成可重複的工作流程。',
      },
      {
        title: 'Microsoft Learn｜AI & Automation',
        url: 'https://learn.microsoft.com/training/',
        desc: '依自己使用的工具探索 AI 與自動化教材，從能解決一件小事的串接開始。',
      },
    ],
  },
  {
    id: 'alchemist',
    title: '⚗️ Alchemist｜Agent 系統建構者',
    desc: '適合想把 Agent 部署到實際流程的開發者；無程式碼與程式碼路線都要檢查可靠性、評估、監控與成本。',
    links: [
      {
        title: 'Google Skills｜Agent Fundamentals',
        url: 'https://www.skills.google/',
        desc: '從課程平台尋找 Agent 基礎，建立架構、工具使用與任務流程的概念。',
        note: '課程平台入口',
      },
      {
        title: 'Agentic AI and AI Agents',
        url: 'https://www.coursera.org/learn/agentic-ai',
        desc: '認識 Agentic AI 的運作方式，幫助自己從使用工具進一步理解系統設計。',
      },
      {
        title: 'LangChain Academy',
        url: 'https://academy.langchain.com/',
        desc: '透過開發、評估與部署相關課程，練習把 Agent 做成能持續運作的應用。',
      },
      {
        title: 'AI Engineering｜O’Reilly',
        url: 'https://www.oreilly.com/',
        desc: '以系統建構的角度補足 AI 應用設計觀念，不只追求展示時成功一次。',
        note: '書籍／出版平台入口，可搜尋 AI Engineering',
      },
    ],
  },
  {
    id: 'crafter',
    title: '🛠️ Crafter｜AI 輔助開發',
    desc: '適合工程師與想做網站、App 或產品原型的人；選一種工具完成小專案，再補上程式理解、測試、安全性與部署。',
    links: [
      {
        title: 'Beyond Vibe Coding',
        url: 'https://www.oreilly.com/library/view/beyond-vibe-coding/9798341634749/',
        desc: '從生成程式碼往前一步，理解如何用工程方法檢查品質並維護產品。',
      },
      {
        title: 'AI-native SDLC Playbook',
        url: 'https://academy.claude.com/courses/ai-native-sdlc-playbook',
        desc: '從軟體生命週期看 AI 的位置，思考規劃、開發、驗證與交付如何串在一起。',
      },
      {
        title: 'Codex',
        url: 'https://openai.com/codex/',
        desc: '用實際開發任務練習描述需求、檢視修改與驗證結果，而不是只接受生成的程式碼。',
        note: '開發工具',
      },
      {
        title: 'Cursor',
        url: 'https://cursor.com/',
        desc: '在編輯器裡結合閱讀與修改程式碼，適合以既有專案練習 AI 輔助開發。',
        note: '開發工具',
      },
      {
        title: 'GitHub Copilot',
        url: 'https://github.com/features/copilot',
        desc: '在日常寫程式的流程中試用 AI 協助，並維持自己對程式碼的理解與檢查。',
        note: '開發工具',
      },
    ],
  },
  {
    id: 'sage',
    title: '📚 Sage｜AI 模型研究',
    desc: '適合想理解神經網路、Transformer、訓練與微調的人；先從小模型實作，再依需求補上數學與運算知識。',
    links: [
      {
        title: 'Neural Networks: Zero to Hero',
        url: 'https://karpathy.ai/zero-to-hero.html',
        desc: '跟著 Andrej Karpathy 從程式實作理解神經網路與 GPT 類模型的組成。',
      },
      {
        title: 'Stanford CS231n',
        url: 'https://cs231n.stanford.edu/',
        desc: '用完整課程深入深度學習與電腦視覺，補足只用工具時不會碰到的原理。',
      },
      {
        title: '3Blue1Brown',
        url: 'https://www.youtube.com/@3blue1brown',
        desc: '透過動畫建立數學與神經網路的直覺，幫助自己理解公式背後在做什麼。',
      },
    ],
  },
  {
    id: 'machinist',
    title: '⚙️ Machinist｜硬體與基礎設施',
    desc: '適合對本地部署、邊緣運算與機器人有興趣的人；從裝置限制、記憶體、頻寬與量化開始理解效能。',
    links: [
      {
        title: 'Machine Learning Systems',
        url: 'https://mlsysbook.ai/',
        desc: '從系統角度理解機器學習，把模型、效能最佳化與部署放在一起思考。',
      },
      {
        title: 'MIT TinyML & Efficient AI Computing',
        url: 'https://hanlab.mit.edu/course',
        desc: '了解如何讓 AI 在資源有限的裝置上執行，連結模型效率與硬體限制。',
      },
      {
        title: 'NVIDIA Documentation',
        url: 'https://docs.nvidia.com/',
        desc: '從官方技術文件查找 AI 運算與部署細節，適合實作遇到底層問題時回查。',
      },
      {
        title: 'Hugging Face Robotics Course',
        url: 'https://huggingface.co/robotics-course',
        desc: '從機器人學習資源探索 AI 與實體設備如何結合，把模型能力帶到真實環境。',
      },
    ],
  },
];

export const aiCategory: ResourceCategory = {
  id: 'ai',
  emoji: '🤖',
  title: 'AI 學習',
  desc: '先完成共同基礎，再依興趣與工作目標選一條路線，做出一個能用的成果。',
  source: {
    title: "Learning AI Isn't a Straight Path Anymore",
    author: 'Tina Huang',
    url: 'https://www.youtube.com/watch?v=mn0agTT8lG8',
    authorUrl: 'https://www.youtube.com/@TinaHuang1',
  },
  guide: {
    title: '先選一條路，不用一次全學',
    desc: 'AI 學習像角色扮演遊戲：先完成新手教學，再選專精方向。先選一門基礎課，接著用一個小專案驗證',
  },
  groups: aiGroups,
  links: aiGroups.flatMap((group) => group.links),
};
