import React, { useContext, createContext, useState, useEffect } from "react"

export const AppThemeContext = createContext()

export function ProvideAppTheme({ children }) {
  const appTheme = useProvideAppTheme()
  return (
    <AppThemeContext.Provider value={appTheme}>
      {children}
    </AppThemeContext.Provider>
  )
}

export function useAppTheme() {
  return useContext(AppThemeContext)
}

function useProvideAppTheme() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("dark-mode"))

  useEffect(() => {
    localStorage.setItem("dark-mode", darkMode)
  }, [darkMode])

  return {
    darkMode,
    setDarkMode,
  }
}
