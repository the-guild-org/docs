import NextDocument, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { noFlashCode } from '@theguild/components';

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/fav.ico" />
          <meta name="apple-mobile-web-app-title" content="The Guild Components Example" />
          <meta name="application-name" content="The Guild Components Example" />
          <script dangerouslySetInnerHTML={{ __html: noFlashCode }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
