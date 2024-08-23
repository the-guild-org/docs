import { Meta, StoryObj } from '@storybook/react';
import { ToolsAndLibrariesCards } from './tools-and-libraries-cards';

export default {
  title: 'Components/Hive/ToolsAndLibrariesCards',
  component: ToolsAndLibrariesCards,
} as Meta;

export const Default: StoryObj<typeof ToolsAndLibrariesCards> = {
  name: 'ToolsAndLibrariesCards',
  render() {
    return <ToolsAndLibrariesCards />;
  },
};
