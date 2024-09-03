import clsx from 'clsx';
import { Meta, StoryObj } from '@storybook/react';
import tailwindConfig from '@theguild/tailwind-config';
import { designSystemDocsDecorator } from '../../../../.storybook/design-system-docs-decorator';

export default {
  title: 'Design System/Color Palette',
  decorators: [designSystemDocsDecorator],
} satisfies Meta;

export const ColorPalette: StoryObj = {
  render() {
    const {colors} = tailwindConfig.theme.extend;

    return (
      <>
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
      </>
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
    <article className={clsx(className, '-mx-6 flex flex-col gap-4 px-6 pb-4 xl:gap-6 xl:pb-6')}>
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
        'rounded-2xl p-4 text-sm xl:p-6 dark:ring-1 dark:ring-white/5',
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
