import clsx from 'clsx';
import { Meta, StoryObj } from '@storybook/react';
import tailwindConfig from '@theguild/tailwind-config';
import { hiveThemeDecorator } from '../../../../.storybook/hive-theme-decorator';

export default {
  title: 'Design System/Color Palette',
  decorators: [hiveThemeDecorator],
} satisfies Meta;

export const ColorPalette: StoryObj = {
  render() {
    const colors = tailwindConfig.theme.extend.colors;

    return (
      <div className="h-screen overflow-auto bg-white p-8 text-green-1000 dark:bg-green-1000 dark:text-white xl:p-16">
        <header className="flex flex-row items-center text-5xl tracking-[-0.288px]">
          <HiveIconMark className="mr-6" />
          <p>Core Elements</p>
          <ArrowRightIcon className="mx-4 font-medium" />
          <h1>Color Palette</h1>
          <p className="ml-auto text-sm leading-6 tracking-[-0.084px]">Hive</p>
        </header>
        <hr className="my-6 border-t border-t-beige-200" />
        <section className="flex flex-col xl:px-6">
          <ColorRow name="Yellow (Primary)">
            <ColorSwatch
              name="Yellow"
              contrast="AAA"
              value={colors['hive-yellow']}
              className="col-span-full"
            />
          </ColorRow>
          <ColorRow name="Blue">
            <ColorSwatch name="Blue 100" contrast="AAA" value={colors.blue[100]} />
            <ColorSwatch name="Blue 200" contrast="AAA" value={colors.blue[200]} />
            <ColorSwatch name="Blue 300" contrast="AAA" value={colors.blue[300]} />
            <ColorSwatch name="Blue 400" contrast="AAA" value={colors.blue[400]} />
            <ColorSwatch name="Blue 500" contrast="AA" value={colors.blue[500]} />
            <ColorSwatch name="Blue 600" contrast="AA" value={colors.blue[600]} />
            <ColorSwatch name="Blue 700" contrast="🚫 Text" value={colors.blue[700]} />
            <ColorSwatch name="Blue 800" contrast="AA" value={colors.blue[800]} dark />
            <ColorSwatch name="Blue 900" contrast="AA" value={colors.blue[900]} dark />
            <ColorSwatch name="Blue 1000" contrast="AAA" value={colors.blue[1000]} dark />
          </ColorRow>
          <ColorRow name="Green">
            <ColorSwatch name="Green 100" contrast="AAA" value={colors.green[100]} />
            <ColorSwatch name="Green 200" contrast="AAA" value={colors.green[200]} />
            <ColorSwatch name="Green 300" contrast="AAA" value={colors.green[300]} />
            <ColorSwatch name="Green 400" contrast="AA" value={colors.green[400]} />
            <ColorSwatch name="Green 500" contrast="AA" value={colors.green[500]} />
            <ColorSwatch name="Green 600" contrast="🚫 Text" value={colors.green[600]} />
            <ColorSwatch name="Green 700" contrast="AA" value={colors.green[700]} dark />
            <ColorSwatch name="Green 800" contrast="AAA" value={colors.green[800]} dark />
            <ColorSwatch name="Green 900" contrast="AAA" value={colors.green[900]} dark />
            <ColorSwatch name="Green 1000" contrast="AAA" value={colors.green[1000]} dark />
          </ColorRow>
          <ColorRow name="Beige">
            <ColorSwatch name="Beige 100" contrast="AAA" value={colors.beige[100]} />
            <ColorSwatch name="Beige 200" contrast="AAA" value={colors.beige[200]} />
            <ColorSwatch name="Beige 300" contrast="AAA" value={colors.beige[300]} />
            <ColorSwatch name="Beige 400" contrast="AAA" value={colors.beige[400]} />
            <ColorSwatch name="Beige 500" contrast="AAA" value={colors.beige[500]} />
            <ColorSwatch name="Beige 600" contrast="AA" value={colors.beige[600]} />
            <ColorSwatch name="Beige 700" contrast="AA" value={colors.beige[700]} />
            <ColorSwatch name="Beige 800" contrast="🚫 Text" value={colors.beige[800]} dark />
            <ColorSwatch name="Beige 900" contrast="AA" value={colors.beige[900]} dark />
            <ColorSwatch name="Beige 1000" contrast="AAA" value={colors.beige[1000]} dark />
          </ColorRow>
          <ColorRow name="White (Alpha)" className="bg-green-1000 text-white">
            <ColorSwatch name="White/10" contrast="AAA" value="#FFFFFF1A" dark />
            <ColorSwatch name="White/20" contrast="AAA" value="#FFFFFF33" dark />
            <ColorSwatch name="White/30" contrast="AA" value="#FFFFFF4D" dark />
            <ColorSwatch name="White/40" contrast="🚫 Text" value="#FFFFFF66" dark />
            <ColorSwatch name="White/50" contrast="AA" value="#FFFFFF80" />
            <ColorSwatch name="White/60" contrast="AA" value="#FFFFFF99" />
            <ColorSwatch name="White/70" contrast="AAA" value="#FFFFFFB3" />
            <ColorSwatch name="White/80" contrast="AAA" value="#FFFFFFCC" />
            <ColorSwatch name="White/90" contrast="AAA" value="#FFFFFFE6" />
            <ColorSwatch name="White/100" contrast="AAA" value="#FFFFFFFF" />
          </ColorRow>
        </section>
      </div>
    );
  },
};

function ColorRow({
  name,
  children,
  className,
}: {
  name: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={clsx(className, '-mx-6 flex flex-col gap-4 px-6 pb-4 xl:mx-0 xl:gap-6 xl:pb-6')}
    >
      <h2 className="my-4 xl:my-6">{name}</h2>
      <div className="grid grid-cols-10 gap-4 xl:gap-6">{children}</div>
    </article>
  );
}

function ColorSwatch({
  name,
  value,
  contrast,
  className,
  dark,
}: {
  contrast: 'AAA' | 'AA' | '🚫 Text';
  name: string;
  level?: string;
  value: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={clsx(
        'rounded-2xl p-4 text-sm xl:p-6',
        className,
        dark ? 'text-white' : 'text-green-1000',
      )}
      style={{
        backgroundColor: value,
      }}
    >
      <p>{contrast}</p>
      <p className="mt-4 text-nowrap font-medium xl:mt-9">{name}</p>
      <p className="text-xs xl:mt-1 xl:text-sm">{value}</p>
    </div>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6 12H18.5M18.5 12L12.5 6M18.5 12L12.5 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HiveIconMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" {...props}>
      <rect width="80" height="80" rx="16" fill="url(#paint0_linear_630_754)" />
      <path
        d="M48.4021 19H31.5979L19 31.5979V48.4021L31.5979 61H48.4021L61 48.4021V31.5979L48.4021 19ZM58.3178 42.291L42.2894 58.3194C41.0244 59.5844 38.9739 59.5844 37.709 58.3194L21.6822 42.291C20.4172 41.0261 20.4172 38.9755 21.6822 37.7106L37.709 21.6822C38.9739 20.4172 41.0244 20.4172 42.2894 21.6822L58.3178 37.7106C59.5828 38.9755 59.5828 41.0261 58.3178 42.291Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_630_754"
          x1="40"
          y1="0"
          x2="40"
          y2="80"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#217164" />
          <stop offset="1" stopColor="#08594E" />
        </linearGradient>
      </defs>
    </svg>
  );
}
