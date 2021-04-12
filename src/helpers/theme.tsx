import React, { useEffect } from "react";

// Real DOM manipulation is needed for toggling
// Tailwind's dark theme, using the class mode
export const useDarkTheme = () => {
  const [darkTheme, setDarkTheme] = React.useState(false);

  const setDOMTheme = (isDarkTheme: boolean) => {
    const html = window.document.documentElement;
    html.classList.toggle('dark', isDarkTheme);

    //TODO: Used on Docusaurus. Remove when no longer needed & handle the logic needed for theme persistence
    if (html.dataset.theme) {
      html.dataset.theme = isDarkTheme ? 'dark' : 'light';
    }
  }

  useEffect(() => {
    setDOMTheme(darkTheme);
  }, [darkTheme]);

  return { darkTheme, setDarkTheme };
}