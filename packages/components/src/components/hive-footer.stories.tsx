import { Meta, StoryObj } from '@storybook/react';
import { hiveThemeDecorator } from '../../../../.storybook/hive-theme-decorator';
import { HiveFooter, HiveFooterProps } from './hive-footer';
import { CodegenIcon } from './icons';

export default {
  title: 'Hive/HiveFooter',
  component: HiveFooter,
  decorators: [hiveThemeDecorator],
  argTypes: {
    resources: {
      name: 'Resources Links',
      description: "Use this to add current site's links to the footer.",
    },
  },
} satisfies Meta<HiveFooterProps>;

export const Default: StoryObj<HiveFooterProps> = {
  name: 'HiveFooter',
  args: {
    resources: [
      {
        children: 'Privacy Policy',
        href: 'https://the-guild.dev/graphql/hive/privacy-policy.pdf',
      },
      {
        children: 'Terms of Use',
        href: 'https://the-guild.dev/graphql/hive/terms-of-use.pdf',
      },
    ],
  },
};

export const CodegenFooter: StoryObj<HiveFooterProps> = {
  ...Default,
  args: {
    logo: {
      href: '/',
      children: (
        <div className="flex items-center gap-3">
          <CodegenIcon className="size-8" />
          <span className="text-2xl/[1.2] font-medium tracking-[-0.16px]">Codegen</span>
        </div>
      ),
    },
    description: 'End-to-end type safety',
  },
};
