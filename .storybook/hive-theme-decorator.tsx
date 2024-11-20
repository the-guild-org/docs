import React from 'react';
// @ts-expect-error We have `next` because of `@theguild/components`.
import localFont from 'next/font/local';
import { StoryContext } from '@storybook/react';
import { cn } from '../packages/components/src/cn';

const neueMontreal = localFont({
  src: [
    { path: '../fonts/PPNeueMontreal-Regular.woff2', weight: '400' },
    { path: '../fonts/PPNeueMontreal-Medium.woff2', weight: '500' },
    { path: '../fonts/NeueMontreal-Bold.otf', weight: '700' },
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
          ctx.parameters.forcedLightMode ? 'light' : 'dark:text-white',
        )}
        style={{
          fontFamily: 'var(--font-sans)',
          padding: ctx.parameters.padding === true ? '2rem' : ctx.parameters.padding,
          backgroundColor: ctx.parameters.forcedLightMode ? 'white' : '',
        }}
      >
        <Story />
        <style>{`
        :root, .light {
          --nextra-bg: 255, 255, 255;
          --nextra-primary-hue: 191deg;
          --nextra-primary-saturation: 40%;
        }
        .dark {
          --nextra-primary-hue: 67.1deg;
    --nextra-primary-saturation: 100%;
          --nextra-bg: 17, 17, 17;
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
