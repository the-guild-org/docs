import { ReactElement } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Header, Footer, ThemeProvider } from '@theguild/components';
import 'guild-docs/style.css';

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <ThemeProvider>
      <Head>
        <link rel="shortcut icon" href="/fav.ico" />
        <meta name="apple-mobile-web-app-title" content="The Guild Docs Example" />
        <meta name="application-name" content="The Guild Docs Example" />
      </Head>
      <Header accentColor="#1cc8ee" themeSwitch searchBarProps={{ version: 'v2' }} />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}

// const defaultSeo: AppSeoProps = {
//   title: 'Guild Docs',
//   description: 'Guild Docs Example',
//   logo: {
//     url: 'https://the-guild-docs.vercel.app/assets/subheader-logo.png',
//     width: 50,
//     height: 54,
//   },
// };
