import { TranslationResponse, LanguageCode } from '../types'

export const fetchTranslation = async (
  sourceLang: LanguageCode,
  targetLang: LanguageCode,
  sourceText: string,
): Promise<TranslationResponse> => {
  const res = await fetch(
    `https://api.mymemory.translated.net/get?q=${sourceText}&langpair=${sourceLang}|${targetLang}`,
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch translation: ${res.statusText}`)
  }
  return res.json()
}
