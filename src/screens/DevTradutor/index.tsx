import { ChangeEvent, useEffect, useState } from 'react'

import { Language, LanguageCode } from '../../types'
import { fetchTranslation } from '../../services/api'

const languages: Language[] = [
  { code: 'en', name: 'Inglẽs' },
  { code: 'es', name: 'Espanhol' },
  { code: 'fr', name: 'Françes' },
  { code: 'de', name: 'Alemão' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Portuguẽs' },
]

export const DevTradutor = () => {
  const [sourceLang, setSourceLang] = useState<LanguageCode>('pt')
  const [targetLang, setTargetLang] = useState<LanguageCode>('en')
  const [sourceText, setSourceText] = useState<string>('Olá, como você está?')
  const [translatedText, setTranslatedText] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (sourceText) {
      const delay = setTimeout(() => {
        handleTranslate()
      }, 300)
      return () => clearTimeout(delay)
    }
    setTranslatedText('')
  }, [sourceText, sourceLang, targetLang])

  const handleTranslate = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const data = await fetchTranslation(sourceLang, targetLang, sourceText)
      setTranslatedText(data.responseData.translatedText)
    } catch (error) {
      setError(
        `Ocorreu um problema inseperado! ${error instanceof Error ? error.message : 'Erro desconhecido.'} tente novamente mais tarde.`,
      )
    } finally {
      setIsLoading(false)
    }
  }

  const swapTranslate = (): void => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    setTranslatedText(sourceText)
    setSourceText(translatedText)
  }

  const handleSourceLangChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setSourceLang(e.target.value as LanguageCode)

  const handleTargetLangChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setTargetLang(e.target.value as LanguageCode)

  return (
    <div className="w-full min-h-screen bg-zinc-800 pb-4">
      <header className="w-full bg-zinc-900 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl text-zinc-50 font-extrabold">Dev-Tradutor</h1>
        </div>
      </header>
      <main className="w-11/12 max-w-3xl mx-auto my-8 p-6 border-2 border-zinc-700 rounded">
        <section>
          <div className="flex justify-between items-center gap-4 text-zinc-300">
            <div className="bg-zinc-700 rounded-lg px-4 h-12 w-full border-none focus:outline-none">
              <select
                value={sourceLang}
                onChange={handleSourceLangChange}
                className="w-full h-full bg-transparent"
              >
                {languages.map((language) => (
                  <option key={language.code} value={language.code}>
                    {language.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => swapTranslate()}
              type="button"
              className="p-2 cursor-pointer hover:bg-zinc-700 transition rounded-full"
            >
              <svg
                className="w-5 h-5 text-headerColor"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </button>
            <div className="bg-zinc-700 rounded-lg px-4 h-12 w-full border-none focus:outline-none">
              <select
                value={targetLang}
                onChange={handleTargetLangChange}
                className="w-full h-full bg-transparent"
              >
                {languages.map((language) => (
                  <option key={language.code} value={language.code}>
                    {language.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 md:gap-14">
          <div className="mt-4 h-36">
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Digite seu texto..."
              className="bg-transparent p-4 outline-none resize-none text-zinc-300 text-lg h-full w-full"
            ></textarea>
          </div>
          <div className="mt-4 h-36 p-4 bg-zinc-700 md:ml-2 rounded-lg overflow-auto relative">
            {isLoading ? (
              <div className="absolute inset-0 flex justify-center items-center">
                <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-300"></span>
              </div>
            ) : (
              <p className=" text-white ">{translatedText}</p>
            )}
          </div>
        </section>
      </main>
      {error && (
        <div className=" max-w-3xl m-4 bg-red-200 text-red-800 p-4 mt-4 text-center rounded-sm lg:m-auto">
          {error}
        </div>
      )}
    </div>
  )
}
