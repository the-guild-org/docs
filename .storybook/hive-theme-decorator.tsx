import React from 'react';
// @ts-expect-error We have `next` because of `@theguild/components`.
import localFont from 'next/font/local';

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

console.log({ neueMontreal });

export const hiveThemeDecorator = (Story: () => React.ReactNode, _ctx: unknown) => {
  return (
    <div
      className={`${neueMontreal.variable}`}
      style={{
        fontFamily: 'var(--font-sans)',
      }}
    >
      <Story />
    </div>
  );
};
