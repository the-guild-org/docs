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
    productName: 'Hive',
  },
} satisfies Meta<HiveNavigationProps>;

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

export const ForcedLightMode: StoryObj = {
  ...Default,
  decorators: [
    Story => (
      <div className="light" style={{ '--nextra-bg': '255 255 255' }}>
        <Story />
      </div>
    ),
  ],
};

export const BackgroundFromCSSProperty: StoryObj = {
  ...Default,
  decorators: [
    Story => (
      // eslint-disable-next-line tailwindcss/no-custom-classname
      <div className="background-vars">
        <style>{`
          .background-vars {
            --nextra-bg: 250 250 250;
          }
          .dark .background-vars {
            --nextra-bg: 30 30 30;
          }
        `}</style>
        <Story />
      </div>
    ),
  ],
};

export const Viewport: StoryObj = {
  render() {
    return (
      <NavigationMenu forceMount>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu Item</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ProductsMenu isHive={false} />
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
        <ProductsMenu isHive={false} />
      </NavigationMenu>
    );
  },
};

export const Developer: StoryObj = {
  render() {
    return (
      <NavigationMenu>
        <DeveloperMenu isHive={false} />
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
