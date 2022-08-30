import { useEffect } from 'react';
import Router from 'next/router.js';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
const pageview = (url: string, trackingId: string) => {
  (window as any).gtag('config', trackingId, {
    page_path: url,
  });
};

/**
 * @example
 * function AppWrapper(appProps: AppProps) {
 *   const { Component, pageProps, router } = appProps;
 *   const analytics = useGoogleAnalytics({ router, trackingId:"UA-XXXXXX-X" });
 *
 *   return (
 *     <>
 *      <Script async src="https://the-guild.dev/static/crisp.js" />
 *      <Script {...analytics.loadScriptProps} />
 *      <Script {...analytics.configScriptProps} />
 *     </>
 *   )
 * }
 */
export function useGoogleAnalytics({ trackingId }: { trackingId: string }) {
  useEffect(() => {
    const handleRouteChange = (url: string): void => {
      pageview(url, trackingId);
    };
    Router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [trackingId]);

  // Why not a component? Next.js + CJS goes crazy when I use `next/router.js` and `next/script.js`.
  // I get: https://reactjs.org/docs/error-decoder.html/?invariant=130&args%5B%5D=object&args%5B%5D=
  // Probably because of two different versions of React or something. Not sure...
  return {
    loadScriptProps: {
      strategy: 'afterInteractive' as const,
      src: `https://www.googletagmanager.com/gtag/js?id=${trackingId}`,
    },
    configScriptProps: {
      id: 'gtag-init',
      strategy: 'afterInteractive' as const,
      dangerouslySetInnerHTML: {
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}', {
            page_path: window.location.pathname,
          });`,
      },
    },
  };
}
