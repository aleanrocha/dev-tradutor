export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt'

export interface Language {
  code: LanguageCode
  name: string
}

export interface TranslationResponse {
  responseData: {
    translatedText: string
  }
}