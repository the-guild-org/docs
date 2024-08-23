import { Meta, StoryObj } from '@storybook/react';
import {
  ArchDecoration,
  ArchDecorationGradientDefs,
  HighlightDecoration,
  LargeHiveIconDecoration,
} from './decorations';

export default {
  title: 'Components/Decorations',
  component: ArchDecoration,
  subcomponents: { ArchDecorationGradientDefs, HighlightDecoration, LargeHiveIconDecoration },
  decorators: [
    Story => (
      <div className="bg-green-1000">
        <Story />
      </div>
    ),
  ],
} as Meta;

export const ArchDecorationStory: StoryObj<typeof ArchDecoration> = {
  storyName: 'ArchDecoration',
  render(args) {
    return (
      <>
        <ArchDecorationGradientDefs />
        <ArchDecoration {...args} />
      </>
    );
  },
};

export const HighlightDecorationStory: StoryObj<typeof HighlightDecoration> = {
  storyName: 'HighlightDecoration',
  render(args) {
    return <HighlightDecoration {...args} />;
  },
};

export const LargeHiveIconDecorationStory: StoryObj<typeof LargeHiveIconDecoration> = {
  storyName: 'Large Hive Icon Decoration',
  render(args) {
    return <LargeHiveIconDecoration {...args} />;
  },
};
