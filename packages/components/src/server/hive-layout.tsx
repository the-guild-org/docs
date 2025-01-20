import { DetailedHTMLProps, HtmlHTMLAttributes, ReactElement, ReactNode } from 'react';
import { Layout } from 'nextra-theme-docs';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { cn } from '../cn';
import { Body, BodyProps } from './body.client';

export interface HiveLayoutProps
  extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement> {
  children: ReactNode;
  head: ReactNode;
  navbar: ReactElement;
  footer: ReactElement;
  fontFamily: string;
  bodyProps: BodyProps;
}

/**
 * Alternative to `GuildLayout` for Hive-branded websites.
 *
 * Accepts navbar and footer as slots/children props, because they're highly customizable,
 * and their defaults belong to HiveNavigation and HiveFooter component default props.
 */
export const HiveLayout = async ({
  children,
  head,
  navbar,
  footer,
  className,
  fontFamily,
  bodyProps,
  ...rest
}: HiveLayoutProps) => {
  const pageMap = await getPageMap();
  return (
    <html
      lang="en"
      // Required to be set for `nextra-theme-docs` styles
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
      className={cn('font-sans', className)}
      {...rest}
    >
      <Head>
        <style>{
          /* css */ `
          :root {
            --font-sans: ${fontFamily};
          }
          :root.dark {
            --nextra-primary-hue: 67.1deg;
            --nextra-primary-saturation: 100%;
            --nextra-primary-lightness: 55%;
            --nextra-bg: 17, 17, 17;
          }
          :root.dark *::selection {
            background-color: hsl(191deg 95% 72% / 0.25)
          }
          :root.light, body.light {
            --nextra-primary-hue: 191deg;
            --nextra-primary-saturation: 40%;
            --nextra-bg: 255, 255, 255;
          }
          
          .x\\:tracking-tight,
          .nextra-steps :is(h2, h3, h4) {
            letter-spacing: normal;
          }

          html:has(body.light) {
            scroll-behavior: smooth;
            background: #fff;
            color-scheme: light !important;
          }
          
          html:has(body.light) .nextra-search-results mark {
            background: oklch(0.611752 0.07807 214.47 / 0.8);
          }
          
          html:has(body.light) .nextra-sidebar-footer {
            display: none;
          }
          
          #crisp-chatbox { z-index: 40 !important; }
        `
        }</style>
        {head}
      </Head>
      <Body {...bodyProps}>
        <Layout
          editLink="Edit this page on GitHub"
          docsRepositoryBase="https://github.com/graphql-hive/platform/tree/main/packages/web/docs"
          pageMap={pageMap}
          feedback={{
            labels: 'kind/docs',
          }}
          sidebar={{
            defaultMenuCollapseLevel: 1,
          }}
          navbar={navbar}
          footer={footer}
        >
          {children}
        </Layout>
      </Body>
    </html>
  );
};
