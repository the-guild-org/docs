import { DocsThemeConfig, default as NextraLayout } from 'nextra-theme-docs';
import { Meta, StoryContext, StoryObj } from '@storybook/react';
import { hiveThemeDecorator } from '../../../../../.storybook/hive-theme-decorator';
import { GraphQLConfCard } from './graphql-conf-card';
import {
  CompanyMenu,
  DeveloperMenu,
  EnterpriseMenu,
  HiveNavigation,
  HiveNavigationProps,
  ProductsMenu,
} from './index';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './navigation-menu';
import graphQLConfLocalImage from './local-image-for-stories.png';

export default {
  title: 'Hive/HiveNavigation',
  component: HiveNavigation,
  decorators: [hiveThemeDecorator, nextraThemeDocsCtxDecorator],
  args: {
    items: [{ name: 'Mobile Item 1', title: 'Mobile Item 1', route: '/', items: {}, type: 'link' }],
  },
} as Meta<HiveNavigationProps>;

export const Default: StoryObj = {
  name: 'HiveNavigation',
  decorators: [
    // to test sticky header
    Story => (
      <div className="h-[120vh] bg-gradient-to-b from-beige-500/15 to-transparent">
        <Story />
      </div>
    ),
  ],
};

export const NarrowMaxWidth: StoryObj = {
  ...Default,
  args: {
    className: 'max-w-[75rem]',
  },
};

export const Viewport: StoryObj = {
  render() {
    return (
      <NavigationMenu forceMount>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu Item</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ProductsMenu />
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  },
  play(ctx) {
    ctx.canvasElement?.querySelector('button')?.click();
  },
};

export const Products: StoryObj = {
  render() {
    return (
      <NavigationMenu>
        <ProductsMenu />
      </NavigationMenu>
    );
  },
};

export const Developer: StoryObj = {
  render() {
    return (
      <NavigationMenu>
        <DeveloperMenu />
      </NavigationMenu>
    );
  },
};

export const Enterprise: StoryObj = {
  render() {
    return (
      <NavigationMenu>
        <EnterpriseMenu />
      </NavigationMenu>
    );
  },
};

export const Company: StoryObj = {
  render() {
    return (
      <NavigationMenu>
        <CompanyMenu>
          <GraphQLConfCard
            image={{
              height: 750,
              width: 1200,
              src: graphQLConfLocalImage,
            }}
          />
        </CompanyMenu>
      </NavigationMenu>
    );
  },
};

function nextraThemeDocsCtxDecorator(Story: () => React.ReactNode, _ctx: StoryContext) {
  return (
    <NextraLayout
      pageProps={{}}
      pageOpts={{ filePath: '', frontMatter: {}, pageMap: [], title: '' }}
      themeConfig={
        {
          logoLink: false,
          navbar: { component: () => null },
          footer: { component: () => null },
        } satisfies DocsThemeConfig
      }
    >
      <Story />
    </NextraLayout>
  );
}
