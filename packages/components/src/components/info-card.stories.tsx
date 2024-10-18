import { Meta, StoryObj } from '@storybook/react';
import { hiveThemeDecorator } from '../../../../.storybook/hive-theme-decorator';
import { AccountBox } from './icons';
import { InfoCard, InfoCardProps } from './info-card';

export default {
  title: 'Components/InfoCard',
  component: InfoCard,
  decorators: [hiveThemeDecorator],
} satisfies Meta<InfoCardProps>;

export const Default: StoryObj<InfoCardProps> = {
  args: {
    icon: <AccountBox />,
    as: 'div',
    heading: 'Customizable User Roles and Permissions',
    children:
      'Control user access with detailed, role-based permissions for enhanced security and flexibility.',
  },
};
