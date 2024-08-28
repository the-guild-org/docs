import React, { forwardRef, Fragment } from 'react';
import { XIcon } from 'nextra/icons';
import { HiveCombinationMark } from '../../logos';
import { PRODUCTS, sixHighlightedProducts } from '../../products';
import { Anchor } from '../anchor';
import { ArrowIcon, DiscordIcon, GitHubIcon, HiveIcon, LinkedInIcon, YouTubeIcon } from '../icons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './navigation-menu';

const PRICING_HREF = 'https://the-guild.dev/graphql/hive#pricing';
const EXPLORE_HREF = 'https://github.com/the-guild-org';

export function HiveNavigation() {
  return (
    <NavigationMenu className="w-screen p-6">
      <Anchor href="/" className="flex items-center">
        <HiveCombinationMark className="text-green-1000" />
      </Anchor>
      <NavigationMenuList className="ml-16">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ProductsMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Developer</NavigationMenuTrigger>
          <NavigationMenuContent>
            <DeveloperMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Enterprise</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ProductsMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Company</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ProductsMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href={PRICING_HREF} className="font-medium">
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export const ProductsMenu = React.forwardRef<HTMLDivElement, {}>((props, ref) => {
  return (
    <MenuContentColumns ref={ref} {...props}>
      <div className="w-[220px]">
        <ColumnLabel>Platform</ColumnLabel>
        <NavigationMenuLink href={PRODUCTS.HIVE.href} className="p-4">
          <div className="w-fit rounded-lg bg-green-800 p-3">
            <HiveIcon className="size-10 text-white" />
          </div>
          <p className="mt-4 text-base font-medium leading-normal text-green-1000">Hive</p>
          <p className="mt-1 text-sm leading-5 text-green-800">
            GraphQL Management Platform & Decision-making Engine
          </p>
        </NavigationMenuLink>
        <Anchor
          href="https://app.graphql-hive.com/"
          className="-my-2 ml-2 flex items-center gap-2 rounded-lg p-2 font-medium text-green-800 transition-colors hover:text-green-1000"
        >
          <span>Get started</span> <ArrowIcon />
        </Anchor>
      </div>
      <div className="w-[257px]">
        <ColumnLabel>The GraphQL Stack</ColumnLabel>
        <ul>
          {(
            [
              [PRODUCTS.MESH, 'Gateway GraphQL API'],
              [PRODUCTS.YOGA, 'GraphQL Subgraph'],
              [PRODUCTS.CODEGEN, 'GraphQL Code Generation'],
            ] as const
          ).map(([product, description]) => {
            const Logo = product.logo;
            return (
              <li key={product.name}>
                <NavigationMenuLink
                  href={product.href}
                  className="flex flex-row items-center gap-4 p-4"
                >
                  <div className="size-12 rounded-lg bg-blue-400 p-2.5">
                    <Logo className="size-7 text-green-1000" />
                  </div>
                  <div>
                    <p className="text-base font-medium leading-normal text-green-1000">Mesh</p>
                    <p className="col-start-2 mt-1 text-sm leading-5 text-green-800">
                      {description}
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-[364px]">
        <ColumnLabel>Libraries</ColumnLabel>
        <ul className="grid grid-cols-2 gap-x-4">
          {sixHighlightedProducts.map(product => {
            const Logo = product.logo;
            return (
              <li key={product.name}>
                <NavigationMenuLink
                  href={product.href}
                  className="flex flex-row items-center gap-3 px-4 py-2"
                  arrow
                >
                  <div className="flex size-8 items-center justify-center rounded bg-beige-200">
                    <Logo className="size-8 text-green-1000" />
                  </div>
                  <div>
                    <p className="text-base font-medium leading-normal text-green-1000">
                      {product.name}
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
            );
          })}
        </ul>
        <Anchor
          href={EXPLORE_HREF}
          className="-my-2 ml-2 flex items-center gap-2 rounded-lg p-2 font-medium text-green-800 transition-colors hover:text-green-1000"
        >
          <span>Explore all libraries</span> <ArrowIcon />
        </Anchor>
      </div>
    </MenuContentColumns>
  );
});

const MenuContentColumns = forwardRef(
  (props: React.HTMLAttributes<HTMLDivElement>, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <div className="flex gap-x-6 [&>*]:flex [&>*]:flex-col [&>*]:gap-4" ref={ref} {...props}>
        {React.Children.map(props.children, (child, index) => {
          return (
            <Fragment key={index}>
              {child}
              {index < React.Children.count(props.children) - 1 && (
                <div className="w-px bg-beige-200" />
              )}
            </Fragment>
          );
        })}
      </div>
    );
  },
);

export const DeveloperMenu = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(
  (props, ref) => {
    return (
      <MenuContentColumns {...props} ref={ref}>
        <div className="w-[188px]">
          <ColumnLabel>Developer</ColumnLabel>
          <ul>
            {(
              [
                ['Documentation', DocumentationIcon, ''],
                ['Changelog', ChangelogIcon, ''],
                ['Status', StatusIcon, ''],
                ['Product Updates', ProductUpdatesIcon, ''],
                ['Blog', BlogIcon, 'https://the-guild.dev/blog'],
                ['GitHub', GitHubIcon, 'https://github.com/kamilkisiela/graphql-hive'],
              ] as const
            ).map(([name, Icon, href]) => {
              return (
                <li key={name}>
                  <NavigationMenuLink
                    href={href}
                    className="flex flex-row items-center gap-3 text-nowrap px-4 py-2"
                    arrow
                  >
                    <Icon className="size-6" />
                    <p className="text-base font-medium leading-normal text-green-1000">{name}</p>
                  </NavigationMenuLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-[188px]">
          <ColumnLabel>Community</ColumnLabel>
          <ul>
            {(
              [
                [
                  'YouTube',
                  YouTubeIcon,
                  'https://www.youtube.com/watch?v=d_GBgH-L5c4&list=PLhCf3AUOg4PgQoY_A6xWDQ70yaNtPYtZd',
                ],
                ['X', XIcon, 'https://x.com/theguilddev'],
                ['LinkedIn', LinkedInIcon, 'https://www.linkedin.com/company/the-guild-software/'],
                ['Discord', DiscordIcon, 'https://discord.com/invite/xud7bH9'],
              ] as const
            ).map(([name, Icon, href]) => {
              return (
                <li key={name}>
                  <NavigationMenuLink
                    href={href}
                    className="flex flex-row items-center gap-3 px-4 py-2"
                    arrow
                  >
                    <Icon className="size-6" />
                    <p className="text-base font-medium leading-normal text-green-1000">{name}</p>
                  </NavigationMenuLink>
                </li>
              );
            })}
          </ul>
        </div>
      </MenuContentColumns>
    );
  },
);

function DocumentationIcon(props: React.SVGProps<SVGSVGElement>) {
  return null;
}

function ChangelogIcon(props: React.SVGProps<SVGSVGElement>) {
  return null;
}

function StatusIcon(props: React.SVGProps<SVGSVGElement>) {
  return null;
}

function ProductUpdatesIcon(props: React.SVGProps<SVGSVGElement>) {
  return null;
}

function BlogIcon(props: React.SVGProps<SVGSVGElement>) {
  return null;
}

function ColumnLabel({ children }: { children: React.ReactNode }) {
  return <p className="px-4 text-sm leading-5 text-green-700">{children}</p>;
}
