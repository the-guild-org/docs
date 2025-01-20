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
  lightOnlyPages: string[];
  bodyProps?: DetailedHTMLProps<HtmlHTMLAttributes<HTMLBodyElement>, HTMLBodyElement>;
}

/**
 * Alternative to `GuildLayout` for Hive-branded websites.
 *
 * Accepts navbar and footer as slots/children props, because they're highly customizable,
 * and their defaults belong to HiveNavigation and HiveFooter component default props.
 *
 * ## Configuration
 *
 * Pages can differ by widths and supported color schemes:
 *
 * - The footer in docs has 90rem width, in landing pages it has 75rem.
 * - The navbar in docs has 90rem width, in landing pages it has 1392px.
 * - Landing pages only support light mode for _business and prioritization reasons_.
 *
 * TODO: Consider unifying this in design phase.
 *
 * For now, a page or a layout can configue these as follows:
 *
 * ### Light-only pages
 *
 * @example
 * ```tsx
 * <HiveLayout bodyProps={{ lightOnlyPages: ['/', '/friends'] }} />
 * ```
 *
 * This will force light theme to the pages with paths `/` and `/friends`,
 * by adding `.light` class to the <body /> element.
 *
 * ### Landing page widths
 *
 * @example
 * ```tsx
 * import { HiveLayoutConfig } from '@theguild/components'
 *
 * <HiveLayoutConfig widths="landing-narrow" />
 * ```
 */
export const HiveLayout = async ({
  children,
  head,
  navbar,
  footer,
  className,
  fontFamily,
  lightOnlyPages,
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
          :root.light, :root.dark:has(body.light) {
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
      <Body lightOnlyPages={lightOnlyPages} {...bodyProps}>
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
