import { ThemeProvider as Provider } from 'next-themes';

export const ThemeProvider: typeof Provider = ({ children, ...props }) => {
  return (
    <Provider attribute="class" {...props}>
      {children}
    </Provider>
  );
};
