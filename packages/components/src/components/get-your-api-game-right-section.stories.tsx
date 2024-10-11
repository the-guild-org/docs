import { Meta, StoryObj } from '@storybook/react';
import { hiveThemeDecorator } from '../../../../.storybook/hive-theme-decorator';
import { GetYourAPIGameRightSection } from './get-your-api-game-right-section';

export default {
  title: 'Hive/GetYourAPIGameRightSection',
  component: GetYourAPIGameRightSection,
  decorators: [hiveThemeDecorator],
  parameters: {
    padding: true,
    forcedLightMode: true,
  },
} satisfies Meta;

export { GetYourAPIGameRightSection };
