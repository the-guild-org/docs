import { ReactElement } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Footer, Header, Subheader, ThemeProvider } from '@theguild/components';
import logo from '../public/subheader-logo.svg';

import '@algolia/autocomplete-theme-classic';
import '@theguild/components/dist/style.css';
import '@theguild/components/dist/search-bar-v2.css';

export default function App({ router, pageProps, Component }: AppProps): ReactElement {
  return (
    <ThemeProvider>
      <Head>
        <link rel="shortcut icon" href="/fav.ico" />
        <meta name="apple-mobile-web-app-title" content="The Guild Components Example" />
        <meta name="application-name" content="The Guild Components Example" />
      </Head>
      <Header accentColor="#1cc8ee" themeSwitch searchBarProps={{ version: 'v2' }} />
      <Subheader
        product={{
          title: 'Components',
          description: 'by The Guild',
          image: {
            ...logo,
            placeholder: 'none',
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
          },
        ]}
        cta={{
          children: 'Get Started',
          title: 'Learn more about TGC',
          href: 'https://github.com/the-guild-org/the-guild-components',
        }}
      />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}
