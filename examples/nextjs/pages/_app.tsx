import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';
import { Footer, Header, Subheader, ThemeProvider } from '@theguild/components';
import '@theguild/components/dist/index.css';
import '@theguild/components/dist/fonts.css';
import '@algolia/autocomplete-theme-classic';
import '../../../packages/components/src/static/css/SearchBarV2.css';

// Overwrite font example:
// 1. Remove import fonts.css
// 2. import '../public/styles.css'

export default function App({ router, pageProps, Component }: AppProps): ReactElement {
  return (
    <>
      <ThemeProvider>
        <Header accentColor="#1cc8ee" activeLink="" themeSwitch searchBarProps={{ version: 'v2' }} />
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
              rel: 'noreferrer',
            },
          ]}
          cta={{
            children: 'Get Started',
            title: 'Learn more about TGC',
            href: 'https://github.com/the-guild-org/the-guild-components',
            target: '_blank',
            rel: 'noreferrer',
          }}
        />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}
