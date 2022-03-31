export { CardsColorful } from './components/CardsColorful';
export { FeatureList } from './components/FeatureList';
export { Footer } from './components/Footer';
export { FooterExtended } from './components/FooterExtended';
export { Header } from './components/Header';
export { HeroGradient } from './components/HeroGradient';
export { HeroIllustration } from './components/HeroIllustration';
export { HeroMarketplace } from './components/HeroMarketplace';
export { HeroVideo } from './components/HeroVideo';
export { InfoList } from './components/InfoList';
export { MarketplaceSearch } from './components/MarketplaceSearch';
export { MarketplaceList } from './components/MarketplaceList';
export { Modal } from './components/Modal';
export { Newsletter } from './components/Newsletter';
export { SearchBar } from './components/SearchBar';
export { Subheader } from './components/Subheader';
export { Banner } from './components/Banner';
export { Instruction } from './components/Instruction';
export { ThemeProvider, useThemeContext } from './helpers/theme';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}

export const noFlashCode = `
try {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
} catch (_) {}`;
