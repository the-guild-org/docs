import { Meta, StoryContext, StoryObj } from '@storybook/react';
import { hiveThemeDecorator } from '../../../../../.storybook/hive-theme-decorator';
import { PRODUCTS } from '../../products';
import { Anchor } from '../anchor';
import { CodegenIcon, GitHubIcon, PaperIcon, PencilIcon } from '../icons';
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
              <ProductsMenu productName={PRODUCTS.CODEGEN.name} />
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
        <ProductsMenu productName={PRODUCTS.YOGA.name} />
      </NavigationMenu>
    );
  },
};

export const Developer: StoryObj = {
  render() {
    return (
      <NavigationMenu>
        <DeveloperMenu isHive={false} developerMenu={undefined} />
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

export const CodegenNavmenu: StoryObj<HiveNavigationProps> = {
  ...Default,
  args: {
    navLinks: [
      {
        href: '/plugins',
        children: 'Plugins',
      },
    ],
    developerMenu: [
      {
        href: '/docs',
        icon: PaperIcon,
        children: 'Documentation',
      },
      {
        href: 'https://the-guild.dev/blog',
        icon: PencilIcon,
        children: 'Blog',
      },
      {
        href: 'https://github.com/dotansimha/graphql-code-generator',
        icon: GitHubIcon,
        children: 'GitHub',
      },
    ],
    productName: PRODUCTS.CODEGEN.name,
    logo: (
      <Anchor href="/" className="hive-focus -m-2 flex items-center gap-3 rounded-md p-2">
        <CodegenIcon className="size-8" />
        <span className="text-2xl font-medium tracking-[-0.16px]">Codegen</span>
      </Anchor>
    ),
  },
};

function nextraThemeDocsCtxDecorator(Story: () => React.ReactNode, _ctx: StoryContext) {
  return <Story />;
}