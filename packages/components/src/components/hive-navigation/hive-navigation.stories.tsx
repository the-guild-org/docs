import { Meta, StoryObj } from '@storybook/react';
import { hiveThemeDecorator } from '../../../../../.storybook/hive-theme-decorator';
import { HiveNavigation, ProductsMenu, DeveloperMenu } from './index';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './navigation-menu';

export default {
  title: 'Hive/HiveNavigation',
  component: HiveNavigation,
  decorators: [hiveThemeDecorator],
} as Meta;

export const Default = {
  name: 'HiveNavigation',
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
    )
  }
}
