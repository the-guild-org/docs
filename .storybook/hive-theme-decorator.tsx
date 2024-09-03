import React from 'react';
// @ts-expect-error We have `next` because of `@theguild/components`.
import localFont from 'next/font/local';
import { StoryContext } from '@storybook/react';
import { cn } from '../packages/components/src/cn';

const neueMontreal = localFont({
  // TODO: Swap to variable version.
  // TODO: We only use 400 and 500 weights, right?
  src: [
    { path: '../fonts/NeueMontreal-Light.otf', weight: '300' },
    { path: '../fonts/NeueMontreal-Light.otf', style: 'italic' },
    { path: '../fonts/NeueMontreal-Regular.otf', weight: '400' },
    { path: '../fonts/NeueMontreal-Italic.otf', weight: '400', style: 'italic' },
    { path: '../fonts/NeueMontreal-Medium.otf', weight: '500' },
    { path: '../fonts/NeueMontreal-MediumItalic.otf', weight: '500', style: 'italic' },
    { path: '../fonts/NeueMontreal-Bold.otf', weight: '700' },
    { path: '../fonts/NeueMontreal-BoldItalic.otf', weight: '700', style: 'italic' },
  ],
  variable: '--font-sans',
});

export const hiveThemeDecorator = (Story: () => React.ReactNode, ctx: StoryContext) => {
  return (
    <>
      <div
        data-hive-theme-decorator
        className={cn(
          'text-green-1000',
          neueMontreal.variable,
          ctx.parameters.forcedLightMode ? 'light' : '',
        )}
        style={{
          fontFamily: 'var(--font-sans)',
          padding: ctx.parameters.padding === true ? '2rem' : ctx.parameters.padding,
          backgroundColor: ctx.parameters.forcedLightMode ? 'white' : '',
        }}
      >
        <Story />
        <style>{`
        :root {
          --nextra-bg: 255, 255, 255;
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --nextra-bg: 20, 20, 20;
          }
        }
        .dark {
          --nextra-bg: 20, 20, 20;
        }
      `}</style>
      </div>
      {ctx.parameters.forcedLightMode && (
        <small className="absolute right-2 top-2 hidden text-[10px] text-black dark:block">
          forced light mode
        </small>
      )}
    </>
  );
};
