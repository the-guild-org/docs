import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';
import {
  Footer,
  Header,
  GlobalStyles,
  Subheader,
  ThemeProvider,
} from '@theguild/components';

// Overwrite font example:
// 1. Import the font
// 2. Remove `includeFonts` from `<GlobalStyles />`
// import '../public/styles.css';

export default function App({
  router,
  pageProps,
  Component,
}: AppProps): ReactElement {
  return (
    <>
      <GlobalStyles includeBase includeFonts/>
      <ThemeProvider>
        <Header accentColor="#1cc8ee" activeLink="/open-source" themeSwitch />
        <Subheader
          product={{
            title: 'Components',
            description: 'by The Guild',
            image: {
              src: '/subheader-logo.svg',
              alt: 'TGC',
            },
          }}
          activeLink={router.asPath}
          links={[
            {
              children: 'Home',
              title: 'Go to Home',
              href: '/',
            },
            {
              children: 'GitHub',
              title: 'View on GitHub',
              href: 'https://github.com/the-guild-org/the-guild-components',
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          ]}
          cta={{
            children: 'Get Started',
            title: 'Learn more about TGC',
            href: 'https://github.com/the-guild-org/the-guild-components',
            target: '_blank',
            rel: 'noopener noreferrer',
          }}
        />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}
