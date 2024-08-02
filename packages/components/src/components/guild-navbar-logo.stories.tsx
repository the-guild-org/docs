import { Meta, StoryObj } from '@storybook/react';
import { HivePlatformLogo, MeshLogo } from '../logos';
import { getNavbarLogo, GuildUnifiedLogo } from './guild-navbar-logo';

export default {
  title: 'Components/GuildNavbarLogo',
  component: GuildUnifiedLogo,
} satisfies Meta<typeof GuildUnifiedLogo>;

export const Default: StoryObj<typeof GuildUnifiedLogo> = {
  args: {
    title: 'GraphQL Mesh',
    description: 'GraphQL Gateway Framework and anything-to-GraphQL',
    children: <MeshLogo className="w-8" />,
  },
  render: props => (
    <div className="flex items-center">
      <GuildUnifiedLogo {...props} />
    </div>
  ),
};

export const Hive: StoryObj = {
  render: () => getNavbarLogo(HivePlatformLogo, 'Hive', ''),
};
