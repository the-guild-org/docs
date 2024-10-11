import { Meta, StoryObj } from '@storybook/react';
import { hiveThemeDecorator } from '../../../../.storybook/hive-theme-decorator';
import { ToolsAndLibrariesCards } from './tools-and-libraries-cards';

export default {
  title: 'Hive/ToolsAndLibrariesCards',
  component: ToolsAndLibrariesCards,
  decorators: [hiveThemeDecorator],
  parameters: {
    forcedLightMode: true,
  },
} satisfies Meta;

export const Default: StoryObj<typeof ToolsAndLibrariesCards> = {
  name: 'ToolsAndLibrariesCards',
  render: ToolsAndLibrariesCards,
};
