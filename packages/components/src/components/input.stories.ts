import { Meta, StoryObj } from '@storybook/react';
import { hiveThemeDecorator } from '../../../../.storybook/hive-theme-decorator';
import { Input, InputProps } from './input';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    severity: {
      control: 'select',
      options: ['critical', 'warning', 'positive', undefined],
    },
    message: {
      control: 'text',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
  parameters: {
    padding: true,
  },
  decorators: [hiveThemeDecorator],
} satisfies Meta<InputProps>;

export const Default: StoryObj<InputProps> = {
  args: {
    placeholder: 'Email',
    type: 'text',
  },
};

export const Critical: StoryObj<InputProps> = {
  args: {
    severity: 'critical',
    message: 'Please enter a valid email address',
    type: 'email',
    value: '+48 222 500 151',
  },
};

export const Warning: StoryObj<InputProps> = {
  args: {
    severity: 'warning',
    message: 'Weak password',
    type: 'password',
    value: '1234',
  },
};

export const Positive: StoryObj<InputProps> = {
  args: {
    severity: 'positive',
    message: 'Very strong password',
    type: 'password',
    value: 'Wednesday, 2 April 2025, GraphQL will prevail!',
  },
};

export const Disabled: StoryObj<InputProps> = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
};

export const Required: StoryObj<InputProps> = {
  args: {
    required: true,
    placeholder: 'This should not be empty',
  },
};
