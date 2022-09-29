import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useTheme } from 'nextra-theme-docs';
import { useMounted } from 'nextra/hooks';

export interface GiscusProps {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
}

export const Giscus = ({ category, categoryId, repo, repoId }: GiscusProps): ReactElement | null => {
  const { asPath } = useRouter();
  const [loaded, setLoaded] = useState(false);
  const mounted = useMounted();

  useEffect(() => {
    if (!loaded) return;

    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    iframe?.contentWindow?.postMessage(
      {
        giscus: {
          setConfig: {
            term: asPath.split('?')[0],
          },
        },
      },
      window.location.origin
    );
  }, [asPath, loaded]);

  const { theme, systemTheme } = useTheme();
  const renderedTheme = theme === 'system' ? systemTheme : theme;

  if (!mounted) return null;

  return (
    <>
      <Script
        src={`https://giscus.app/client.js?key=${renderedTheme}${asPath.replace(/\//g, '_')}`}
        data-repo={repo}
        data-repo-id={repoId}
        data-category={category}
        data-category-id={categoryId}
        data-mapping="pathname"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme={theme}
        data-lang="en"
        crossOrigin="anonymous"
        async
        strategy="lazyOnload"
        onLoad={() => {
          setLoaded(true);
        }}
      />
      <div className="giscus" />
    </>
  );
};
