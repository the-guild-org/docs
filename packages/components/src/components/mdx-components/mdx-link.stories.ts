import { Meta, StoryObj } from '@storybook/react';
import { hiveThemeDecorator } from '../../../../../.storybook/hive-theme-decorator';
import { MDXLink, MDXLinkProps } from './mdx-link';

export default {
  title: 'Components/MDXLink',
  component: MDXLink,
  decorators: [hiveThemeDecorator],
} satisfies Meta<MDXLinkProps>;

export const Default: StoryObj<MDXLinkProps> = {
  args: {
    href: 'https://the-guild.dev/graphql/stitching',
    children: 'Schema stitching',
  },
};
