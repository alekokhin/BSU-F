import { createContext, ReactNode, useContext } from 'react'
import { useTranslation } from 'react-i18next'

type LocalesContextProps = {
  selectedLanguage: string
  toggleLocales: () => void
}
export let locales: string
const setLoc = (l: string | undefined) => {
  locales = l ? l.toLocaleLowerCase() : ''
}

// Fixed by providing the correct type for createContext
export const LocalesContext = createContext<LocalesContextProps>({
  selectedLanguage: '',
  toggleLocales: () => {},
})

export const useLocales = () => {
  const context = useContext(LocalesContext)
  if (!context) {
    throw new Error('useLocales must be used within a LocalesProvider')
  }
  return context
}

interface LocalesProviderProps {
  children: ReactNode
}

import { useEffect } from 'react'

export const LocalesProvider = ({ children }: LocalesProviderProps) => {
  const { i18n } = useTranslation()
  const selectedLanguage = i18n.language

  useEffect(() => {
    setLoc(selectedLanguage)
  }, [selectedLanguage])

  const toggleLocales = () => {
    i18n.changeLanguage(selectedLanguage === 'GE' ? 'EN' : 'GE')
    window.location.reload()
  }
  const value: LocalesContextProps = {
    selectedLanguage,
    toggleLocales,
  }

  return (
    <LocalesContext.Provider value={value}>{children}</LocalesContext.Provider>
  )
}
