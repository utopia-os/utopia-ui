import { useEffect } from 'react'

export const useTheme = (defaultTheme = 'default') => {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const initialTheme = savedTheme ? (JSON.parse(savedTheme) as string) : defaultTheme
    if (initialTheme !== 'default') {
      document.documentElement.setAttribute('data-theme', defaultTheme)
      localStorage.setItem('theme', JSON.stringify(initialTheme))
    }
  }, [defaultTheme])
}
