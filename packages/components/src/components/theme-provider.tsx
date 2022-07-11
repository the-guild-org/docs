import { ReactElement } from 'react';
import { ThemeProvider as Provider, useTheme } from 'next-themes';

const ThemeProvider: typeof Provider = ({ children, ...props }): ReactElement => {
  return (
    <Provider attribute="class" {...props}>
      {children}
    </Provider>
  );
};

export { ThemeProvider, useTheme }
