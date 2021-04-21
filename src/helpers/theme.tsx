import React, { createContext, useEffect, useState } from "react";

const getDarkTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPref = localStorage.getItem('theme');
    if (typeof storedPref === 'string') {
      return (storedPref === 'dark');
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)")
    if (userMedia.matches) {
      return true;
    }

    const html = window.document.documentElement;
    return html.dataset.theme === 'dark' || html.classList.contains('dark');
  } else {
    return false;
  }
}
interface IContextProps {
  isDarkTheme: boolean
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>
}

interface IProviderProps {
  children: React.ReactNode
}

const ThemeContext = createContext<Partial<IContextProps>>({});

const ThemeProvider: React.FC<IProviderProps> = ({ children }) => {
  const [isDarkTheme, setDarkTheme] = useState(getDarkTheme);

  const setDOMTheme = (isDark: boolean) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const html = window.document.documentElement;
      html.classList.toggle('dark', isDark);

      //TODO: Used on Docusaurus. Remove when no longer needed & handle the logic needed for theme persistence
      if (html.dataset.theme) {
        html.dataset.theme = isDark ? 'dark' : 'light';
      }

      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }

  useEffect(() => {
    setDOMTheme(isDarkTheme);
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider }