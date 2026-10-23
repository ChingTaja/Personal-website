import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import messages from './locales/en/ui.json'
import resourceMessages from './locales/en/resources.json'

export type Locale = 'zh-TW' | 'en'
const english: Record<string, string> = { ...messages, ...resourceMessages }
export function translate(text: string, locale: Locale): string {
  return locale === 'en' ? english[text] ?? text : text
}
const LanguageContext = createContext({ locale: 'zh-TW' as Locale, setLocale: (_locale: Locale) => {}, t: (text: string) => text })
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    try { return localStorage.getItem('taja-locale') === 'en' ? 'en' : 'zh-TW' } catch { return 'zh-TW' }
  })
  useEffect(() => {
    document.documentElement.lang = locale
    document.title = locale === 'en' ? 'Taja — Notes & Learning' : 'Taja — 隨手記與學習'
    try { localStorage.setItem('taja-locale', locale) } catch { /* Storage may be unavailable. */ }
  }, [locale])
  return <LanguageContext.Provider value={{ locale, setLocale, t: (text) => translate(text, locale) }}>{children}</LanguageContext.Provider>
}
export function useLanguage() { return useContext(LanguageContext) }
