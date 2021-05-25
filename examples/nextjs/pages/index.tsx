import { ThemeProvider, Header } from '@theguild/components';

export default function Index() {
  return (
    <ThemeProvider>
      <Header themeSwitch accentColor="#153" activeLink="/" />
    </ThemeProvider>
  );
}
