import { Meta, StoryObj } from '@storybook/react';
import { hiveThemeDecorator } from '../../../../.storybook/hive-theme-decorator';
import { CallToAction, CallToActionProps } from './call-to-action';

export default {
  title: 'Components/CallToAction',
  component: CallToAction,
  decorators: [hiveThemeDecorator],
  args: {
    children: 'Click me',
    onClick: () => alert('Clicked!'),
  },
  parameters: {
    padding: true,
  },
} as Meta<CallToActionProps>;

export const Primary: StoryObj<CallToActionProps> = {
  args: {
    variant: 'primary',
  },
};

export const PrimaryInverted: StoryObj<CallToActionProps> = {
  args: {
    variant: 'primary-inverted',
  },
};

export const Secondary: StoryObj<CallToActionProps> = {
  args: {
    variant: 'secondary',
  },
};

export const SecondaryInverted: StoryObj<CallToActionProps> = {
  args: {
    variant: 'secondary-inverted',
  },
};

export const Tertiary: StoryObj<CallToActionProps> = {
  args: {
    variant: 'tertiary',
  },
};
