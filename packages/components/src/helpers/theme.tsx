import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

const getDarkTheme = (): boolean => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return false;
  }
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
};

interface IContextProps {
  isDarkTheme: boolean;
  setDarkTheme: Dispatch<SetStateAction<boolean>>;
}

const ThemeContext = createContext<IContextProps>({
  isDarkTheme: false,
  setDarkTheme: () => undefined,
});

const setDOMTheme = (isDark: boolean): void => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const html = window.document.documentElement;
    html.classList.toggle('dark', isDark);
    // Algolia Autocomplete theming support
    const { body } = window.document;
    body.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
};

export const ThemeProvider = ({
  children,
  isDarkTheme,
  setDarkTheme,
}: Partial<IContextProps> & { children: ReactNode }): ReactElement => {
  const [isDark, setDark] = useState(false);

  useEffect(() => {
    setDark(isDarkTheme ?? getDarkTheme());
  }, [isDarkTheme]);

  useEffect(() => {
    setDOMTheme(isDark);
  }, [isDark]);

  return (
    <ThemeContext.Provider
      value={{
        isDarkTheme: isDarkTheme ?? isDark,
        setDarkTheme: setDarkTheme ?? setDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
