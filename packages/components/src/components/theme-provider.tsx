import { ThemeProvider as Provider, useTheme } from 'next-themes';

const ThemeProvider: typeof Provider = ({ children, ...props }) => {
  return (
    <Provider attribute="class" {...props}>
      {children}
    </Provider>
  );
};

export { ThemeProvider, useTheme };
