import { Meta, StoryObj } from '@storybook/react';
import { hiveThemeDecorator } from '../../../../.storybook/hive-theme-decorator';
import { GetYourAPIGameRightSection } from './get-your-api-game-right-section';

export default {
  title: 'Components/Hive/GetYourAPIGameRightSection',
  component: GetYourAPIGameRightSection,
  decorators: [hiveThemeDecorator],
  parameters: {
    padding: true,
  },
} as Meta;

export const Default: StoryObj<typeof GetYourAPIGameRightSection> = {
  name: 'GetYourAPIGameRightSection',
  render() {
    return <GetYourAPIGameRightSection />;
  },
};
