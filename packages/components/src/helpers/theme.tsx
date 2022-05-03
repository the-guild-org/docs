import React, { createContext, useContext, useEffect, useState } from 'react';

const getDarkTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPref = localStorage.getItem('theme');
    if (typeof storedPref === 'string') {
      return storedPref === 'dark';
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      return true;
    }

    const html = window.document.documentElement;
    return html.dataset.theme === 'dark' || html.classList.contains('dark');
  } else {
    return false;
  }
};
interface IContextProps {
  isDarkTheme: boolean;
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IProviderProps {
  children: React.ReactNode;
  isDarkTheme?: boolean;
  setDarkTheme?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeContext = createContext<Partial<IContextProps>>({});

const setDOMTheme = (isDark: boolean, defaultThemeLogic?: boolean) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const html = window.document.documentElement;
    html.classList.toggle('dark', isDark);
    // Algolia Autocomplete theming support
    const body = window.document.body;
    body.classList.toggle('dark', isDark);

    if (defaultThemeLogic) {
      //TODO: Used on Docusaurus. Remove when no longer needed & handle the logic needed for theme persistence
      if (html.dataset.theme) {
        html.dataset.theme = isDark ? 'dark' : 'light';
      }

      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }
};

const ThemeProvider: React.FC<IProviderProps> = ({
  children,
  isDarkTheme,
  setDarkTheme,
}) => {
  const [isDarkThemeState, setDarkThemeState] = useState(false);

  useEffect(() => {
    if (isDarkTheme === undefined) {
      setDarkThemeState(getDarkTheme());
    }
  }, [isDarkTheme]);

  useEffect(() => {
    setDOMTheme(isDarkTheme ?? isDarkThemeState, isDarkTheme === undefined);
  }, [isDarkTheme, isDarkThemeState]);

  return (
    <ThemeContext.Provider
      value={{
        isDarkTheme: isDarkTheme ?? isDarkThemeState,
        setDarkTheme: setDarkTheme ?? setDarkThemeState,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeContext = (): Partial<IContextProps> => {
  const context = useContext(ThemeContext);
  if (context == null) {
    throw new Error('"useThemeContext" could not be used.');
  }
  return context;
};

export { ThemeContext, ThemeProvider, useThemeContext };
