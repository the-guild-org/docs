import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';
import {
  Footer,
  Header,
  GlobalStyles,
  Subheader,
  ThemeProvider,
} from '@theguild/components';

export default function App({
  router,
  pageProps,
  Component,
}: AppProps): ReactElement {
  return (
    <>
      <GlobalStyles />
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
              children: 'Github',
              title: 'View on Github',
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
