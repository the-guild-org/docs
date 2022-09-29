import { forwardRef } from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import { themes } from '@storybook/theming';
import { ThemeProvider } from 'next-themes';
import NextImage, { ImageProps } from 'next/image';
import NextLink, { LinkProps } from 'next/link';
import './global.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Components', ['Headers'], 'Projects'],
    },
  },
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.normal, appBg: 'white' },
    // Override the default light theme
    light: { ...themes.normal, appBg: 'white' },
  },
  // Remove padding from storybook in mobile
  layout: 'fullscreen',
};

const OriginalNextImage = NextImage;
const OriginalNextLink = NextLink;

// https://storybook.js.org/blog/get-started-with-storybook-and-next-js/
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props: ImageProps) => <OriginalNextImage {...props} unoptimized />,
});

Object.defineProperty(NextLink, 'default', {
  configurable: true,
  // forwardedRef is needed in header
  value: forwardRef<HTMLAnchorElement, LinkProps>((props, forwardedRef) => (
    <OriginalNextLink {...props} legacyBehavior={false} ref={forwardedRef} />
  )),
});

export const decorators = [
  Story => (
    <ThemeProvider attribute="class" forcedTheme={useDarkMode() ? 'dark' : 'light'}>
      <Story />
    </ThemeProvider>
  ),
];
