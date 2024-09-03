import React, { forwardRef, Fragment, ReactNode } from 'react';
import { Navbar as NextraNavbar, useThemeConfig } from 'nextra-theme-docs';
import { cn } from '../../cn';
import { renderSlot } from '../../helpers/render-slot';
import { GraphQLFoundationLogo, GuildLogo, HiveCombinationMark, TheGuild } from '../../logos';
import { PRODUCTS, SIX_HIGHLIGHTED_PRODUCTS } from '../../products';
import { Anchor } from '../anchor';
import { CallToAction } from '../call-to-action';
import {
  AccountBox,
  AppsIcon,
  ArrowIcon,
  BardIcon,
  GitHubIcon,
  GroupIcon,
  HiveIcon,
  HonourIcon,
  ListIcon,
  PaperIcon,
  PencilIcon,
  RightCornerIcon,
  ShieldFlashIcon,
  TargetIcon,
} from '../icons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './navigation-menu';

export * from './graphql-conf-card';

const EXPLORE_HREF = 'https://github.com/the-guild-org';

const ENTERPRISE_MENU_HIDDEN = true;

type NextraNavbarProps = Parameters<typeof NextraNavbar>[0];

export interface HiveNavigationProps extends NextraNavbarProps {
  companyMenuChildren?: ReactNode;
  children?: ReactNode;
  className?: string;
  /**
   * We change links to relative based on what product we're in.
   */
  productName: string;
}
/**
 *
 * @example
 * ```tsx
 * <HiveNavigation
 *   companyMenuChildren={<GraphQLConfCard image={graphQLConfLocalImage} />}
 *   items={items}
 * >
 *   {extraContent}
 * </HiveNavigation>
 * ```
 */
export function HiveNavigation({
  companyMenuChildren,
  children,
  className,
  productName,
  ...nextraNavbarProps
}: HiveNavigationProps) {
  // `useThemeConfig` doesn't return anything outside of Nextra, and the provider isn't exported
  const themeConfig = useThemeConfig() as ReturnType<typeof useThemeConfig> | undefined;
  const Search = themeConfig?.search?.component;

  const isHive = productName === 'Hive';

  return (
    <>
      <div className="md:hidden">
        <NextraNavbar {...nextraNavbarProps} />
      </div>
      <div
        className={cn(
          'sticky top-0 z-20 my-2 bg-white px-6 py-4 text-green-1000 dark:bg-[rgb(var(--nextra-bg))] dark:text-neutral-200 [&.light]:bg-white [&.light]:text-green-1000',
          className?.includes('light') && 'light',
        )}
      >
        <NavigationMenu className={cn('mx-auto hidden w-screen md:flex', className)}>
          <Anchor href="/" className="flex items-center">
            <HiveCombinationMark className="text-green-1000 dark:text-neutral-200" />
          </Anchor>
          <NavigationMenuList className="lg:ml-16">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ProductsMenu />
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Developer</NavigationMenuTrigger>
              <NavigationMenuContent>
                <DeveloperMenu isHive={isHive} />
              </NavigationMenuContent>
            </NavigationMenuItem>
            {!ENTERPRISE_MENU_HIDDEN && (
              <NavigationMenuItem>
                <NavigationMenuTrigger>Enterprise</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <EnterpriseMenu />
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Company</NavigationMenuTrigger>
              <NavigationMenuContent>
                <CompanyMenu>{companyMenuChildren}</CompanyMenu>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href={isHive ? '/#pricing' : 'https://the-guild.dev/graphql/hive#pricing'}
                className="font-medium"
              >
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
          <div className="flex-1" />

          {children}

          {renderSlot(Search, {
            // The && and :is(x) selector bump the specificity to 0-2-2 to override Nextra styles.
            className: cn(
              'relative ml-4 [&&_input:is(input)]:h-[48px] [&&_input:is(input)]:rounded-lg [&&_input:is(input)]:border-green-200 [&&_input:is(input)]:bg-inherit [&&_input:is(input)]:pl-4 [&&_input:is(input)]:pr-8 [&&_kbd:is(kbd)]:absolute [&&_kbd:is(kbd)]:right-4 [&&_kbd:is(kbd)]:top-1/2 [&&_kbd:is(kbd)]:translate-y-[-50%] [&&_kbd:is(kbd)]:border-none [&&_kbd:is(kbd)]:bg-green-200 [&&_input:is(input)]:border dark:[&&_input:is(input)]:border-neutral-800 dark:[&&_kbd:is(kbd)]:bg-neutral-700 [&&_:is(input,kbd):is(input,kbd)]:text-green-700 dark:[&&_:is(input,kbd):is(input,kbd)]:text-neutral-300 [&&_kbd:is(kbd)]:my-0',
            ),
          })}

          <CallToAction
            className="ml-4 max-lg:hidden"
            variant="tertiary"
            href="https://the-guild.dev/contact"
            target="_blank"
            rel="noopener noreferrer"
            onClick={event => {
              if (typeof window !== 'undefined' && '$crisp' in window) {
                (window.$crisp as { push(cmd: string[]): void }).push(['do', 'chat:open']);
                event.preventDefault();
              }
            }}
          >
            Contact <span className="hidden xl:contents">us</span>
          </CallToAction>
          <CallToAction variant="primary" href="https://app.graphql-hive.com/" className="ml-4">
            Get started <span className="hidden lg:contents">for free</span>
          </CallToAction>
        </NavigationMenu>
      </div>
    </>
  );
}

/**
 * @internal
 */
export const ProductsMenu = React.forwardRef<HTMLDivElement, {}>((props, ref) => {
  return (
    <MenuContentColumns ref={ref} {...props}>
      <div className="w-[220px]">
        <ColumnLabel>Platform</ColumnLabel>
        <NavigationMenuLink href={PRODUCTS.HIVE.href} className="p-4">
          <div className="w-fit rounded-lg bg-green-800 p-3 dark:bg-white/10">
            <HiveIcon className="size-10 text-white" />
          </div>
          <p className="mt-4 text-base font-medium leading-normal text-green-1000 dark:text-neutral-200">
            Hive
          </p>
          <p className="mt-1 text-sm leading-5 text-green-800 dark:text-neutral-400">
            GraphQL Management Platform & Decision-making Engine
          </p>
        </NavigationMenuLink>
        <Anchor
          href="https://app.graphql-hive.com/"
          className="-my-2 ml-2 flex items-center gap-2 rounded-lg p-2 font-medium text-green-800 transition-colors hover:text-green-1000 dark:text-neutral-400 dark:hover:text-neutral-200"
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
                    <p className="text-base font-medium leading-normal text-green-1000 dark:text-neutral-200">
                      Mesh
                    </p>
                    <p className="col-start-2 mt-1 text-sm leading-5 text-green-800 dark:text-neutral-300">
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
          {SIX_HIGHLIGHTED_PRODUCTS.map(product => {
            const Logo = product.logo;
            return (
              <li key={product.name}>
                <NavigationMenuLink
                  href={product.href}
                  className="flex flex-row items-center gap-3 px-4 py-2"
                  arrow
                >
                  <div className="flex size-8 items-center justify-center rounded bg-beige-200 dark:bg-white/5">
                    <Logo className="size-8 text-green-1000 dark:text-neutral-300" />
                  </div>
                  <div>
                    <p className="text-base font-medium leading-normal text-green-1000 dark:text-neutral-200">
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
          className="-my-2 ml-2 flex items-center gap-2 rounded-lg p-2 font-medium text-green-800 transition-colors hover:text-green-1000 dark:text-neutral-400 dark:hover:text-neutral-200"
        >
          <span>Explore all libraries</span> <ArrowIcon />
        </Anchor>
      </div>
    </MenuContentColumns>
  );
});
ProductsMenu.displayName = 'ProductsMenu';

const MenuContentColumns = forwardRef(
  (props: React.HTMLAttributes<HTMLDivElement>, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <div className="flex gap-x-6 [&>*]:flex [&>*]:flex-col [&>*]:gap-4" ref={ref} {...props}>
        {React.Children.toArray(props.children)
          .filter(Boolean)
          .map((child, index, array) => {
            return (
              <Fragment key={index}>
                {child}
                {index < array.length - 1 && (
                  <div className="w-px bg-beige-200 dark:bg-neutral-800" />
                )}
              </Fragment>
            );
          })}
      </div>
    );
  },
);
MenuContentColumns.displayName = 'MenuContentColumns';

interface DeveloperMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isHive: boolean;
}
/**
 * @internal
 */
export const DeveloperMenu = React.forwardRef<HTMLDivElement, DeveloperMenuProps>(
  ({ isHive, ...rest }, ref) => {
    return (
      <MenuContentColumns {...rest} ref={ref}>
        <div className="w-[188px]">
          <ColumnLabel>Developer</ColumnLabel>
          <ul>
            {(
              [
                [
                  'Documentation',
                  PaperIcon,
                  isHive ? '/docs' : 'https://the-guild.dev/graphql/hive/docs',
                ],
                ['Changelog', ListIcon, 'https://github.com/kamilkisiela/graphql-hive/releases'],
                ['Status', TargetIcon, 'https://status.graphql-hive.com/'],
                [
                  'Product Updates',
                  RightCornerIcon,
                  isHive
                    ? '/product-updates'
                    : 'https://the-guild.dev/graphql/hive/product-updates',
                ],
                ['Blog', PencilIcon, 'https://the-guild.dev/blog'],
                ['GitHub', GitHubIcon, 'https://github.com/kamilkisiela/graphql-hive'],
              ] as const
            ).map(([text, Icon, href], i) => (
              <MenuColumnListItem key={i} href={href} icon={Icon}>
                {text}
              </MenuColumnListItem>
            ))}
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
                ['X', TwitterIcon, 'https://x.com/theguilddev'],
                ['LinkedIn', LinkedInIcon, 'https://www.linkedin.com/company/the-guild-software/'],
                ['Discord', DiscordIcon, 'https://discord.com/invite/xud7bH9'],
              ] as const
            ).map(([text, Icon, href], i) => (
              <MenuColumnListItem key={i} href={href} icon={Icon}>
                {text}
              </MenuColumnListItem>
            ))}
          </ul>
        </div>
      </MenuContentColumns>
    );
  },
);
DeveloperMenu.displayName = 'DeveloperMenu';

function MenuColumnListItem({
  children,
  href,
  icon: Icon,
}: {
  children: ReactNode;
  href: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
}) {
  return (
    <li>
      <NavigationMenuLink
        href={href}
        className="flex flex-row items-center gap-3 text-nowrap px-4 py-2"
        arrow
      >
        <Icon className="size-6 shrink-0" />
        <p className="text-base font-medium leading-normal text-green-1000 dark:text-neutral-200">
          {children}
        </p>
      </NavigationMenuLink>
    </li>
  );
}

function ColumnLabel({ children }: { children: React.ReactNode }) {
  return <p className="px-4 text-sm leading-5 text-green-700 dark:text-neutral-300">{children}</p>;
}

// These icons are _different_ than the ones used elsewhere.
// e.g. Discord is a "chat" bubble with the Discord logo in the center.

function YouTubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.5887 7.04819C21 8.65199 21 12 21 12C21 12 21 15.348 20.5887 16.9518C20.3601 17.8383 19.6914 18.5358 18.8445 18.7716C17.3064 19.2 12 19.2 12 19.2C12 19.2 6.6963 19.2 5.1555 18.7716C4.305 18.5322 3.6372 17.8356 3.4113 16.9518C3 15.348 3 12 3 12C3 12 3 8.65199 3.4113 7.04819C3.6399 6.16169 4.3086 5.46419 5.1555 5.22839C6.6963 4.79999 12 4.79999 12 4.79999C12 4.79999 17.3064 4.79999 18.8445 5.22839C19.695 5.46779 20.3628 6.16439 20.5887 7.04819ZM10.2 15.15L15.6 12L10.2 8.84999V15.15Z" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.6536 4.6875H19.1346L13.7144 10.8825L20.0909 19.3125H15.0981L11.1876 14.1997L6.71313 19.3125H4.23063L10.0281 12.6862L3.91113 4.6875H9.03063L12.5654 9.36075L16.6536 4.6875ZM15.7829 17.8275H17.1576L8.28363 6.0945H6.80838L15.7829 17.8275Z" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.7015 17.7051H15.303V13.9458C15.303 13.0494 15.285 11.8956 14.052 11.8956C12.8019 11.8956 12.6111 12.8712 12.6111 13.8801V17.7051H10.2117V9.97499H12.5157V11.028H12.5472C12.8694 10.4214 13.6524 9.77969 14.8224 9.77969C17.2524 9.77969 17.7024 11.3799 17.7024 13.4616V17.7051H17.7015ZM7.50272 8.91749C7.31962 8.91773 7.13828 8.88183 6.96908 8.81184C6.79988 8.74185 6.64617 8.63916 6.51674 8.50965C6.38731 8.38013 6.28471 8.22635 6.21483 8.05711C6.14496 7.88786 6.10917 7.70649 6.10952 7.52339C6.1097 7.24785 6.19159 6.97854 6.34482 6.74953C6.49806 6.52051 6.71576 6.34208 6.9704 6.2368C7.22504 6.13152 7.50519 6.10411 7.77541 6.15804C8.04563 6.21197 8.29378 6.34482 8.4885 6.53979C8.68322 6.73476 8.81575 6.98309 8.86933 7.25338C8.92291 7.52367 8.89514 7.80377 8.78953 8.05828C8.68392 8.31279 8.50521 8.53026 8.276 8.6832C8.04679 8.83614 7.77737 8.91767 7.50182 8.91749H7.50272ZM8.70512 17.7051H6.29942V9.97499H8.70602V17.7051H8.70512ZM18.903 3.89999H5.09612C4.43372 3.89999 3.90002 4.42199 3.90002 5.06729V18.9327C3.90002 19.578 4.43462 20.1 5.09522 20.1H18.8994C19.56 20.1 20.1 19.578 20.1 18.9327V5.06729C20.1 4.42199 19.56 3.89999 18.8994 3.89999H18.9021H18.903Z" />
    </svg>
  );
}

function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M10.2684 11.1C10.8084 11.1 11.2458 11.505 11.2359 12C11.2359 12.495 10.8093 12.9 10.2684 12.9C9.73742 12.9 9.30002 12.495 9.30002 12C9.30002 11.505 9.72752 11.1 10.2684 11.1ZM13.7316 11.1C14.2725 11.1 14.7 11.505 14.7 12C14.7 12.495 14.2725 12.9 13.7316 12.9C13.2006 12.9 12.7641 12.495 12.7641 12C12.7641 11.505 13.1907 11.1 13.7316 11.1ZM18.2019 3C19.2486 3 20.1 3.8694 20.1 4.9467V21.9L18.1101 20.1045L16.9896 19.0461L15.8043 17.9211L16.2957 19.6698H5.79812C4.75142 19.6698 3.90002 18.8004 3.90002 17.7231V4.9467C3.90002 3.8694 4.75142 3 5.79812 3H18.201H18.2019ZM14.6289 15.3417C16.6746 15.276 17.4621 13.9053 17.4621 13.9053C17.4621 10.8624 16.1283 8.3955 16.1283 8.3955C14.7963 7.3758 13.5273 7.4037 13.5273 7.4037L13.3977 7.5549C14.9718 8.0463 15.7026 8.7555 15.7026 8.7555C14.8432 8.27129 13.896 7.9629 12.9162 7.8483C12.2947 7.7781 11.667 7.78415 11.0469 7.8663C10.9911 7.8663 10.9443 7.8762 10.8894 7.8852C10.5654 7.914 9.77792 8.0364 8.78792 8.481C8.44592 8.6412 8.24162 8.7555 8.24162 8.7555C8.24162 8.7555 9.01022 8.0085 10.6761 7.5171L10.5834 7.4037C10.5834 7.4037 9.31532 7.3758 7.98242 8.3964C7.98242 8.3964 6.64952 10.8624 6.64952 13.9053C6.64952 13.9053 7.42712 15.2751 9.47283 15.3417C9.47283 15.3417 9.81482 14.9169 10.0938 14.5578C8.91752 14.1978 8.47382 13.4418 8.47382 13.4418C8.47382 13.4418 8.56563 13.5084 8.73212 13.6029C8.74113 13.6119 8.75012 13.6218 8.76902 13.6308C8.79692 13.6506 8.82482 13.6596 8.85273 13.6785C9.08402 13.8108 9.31532 13.9143 9.52772 13.9998C9.90753 14.151 10.3611 14.3022 10.8894 14.4066C11.6808 14.5617 12.4945 14.5648 13.287 14.4156C13.7487 14.3332 14.199 14.197 14.6289 14.0097C14.9529 13.8864 15.3138 13.7064 15.6936 13.4517C15.6936 13.4517 15.231 14.2266 14.0178 14.5767C14.2959 14.9358 14.6298 15.3417 14.6298 15.3417H14.6289Z" />
    </svg>
  );
}

/**
 * @internal
 */
export function EnterpriseMenu() {
  return (
    <ul>
      {(
        [
          // TODO: Enable these when the pages are created.
          [AccountBox, 'Customer Stories', ''],
          [BardIcon, 'Why GraphQL', ''],
          [HonourIcon, 'Professional Services', ''],
          [ShieldFlashIcon, 'Commitment to Security', ''],
        ] as const
      ).map(([Icon, text, href], i) => {
        return (
          <MenuColumnListItem key={i} href={href} icon={Icon}>
            {text}
          </MenuColumnListItem>
        );
      })}
    </ul>
  );
}

/**
 * @internal
 */
export function CompanyMenu({ children }: { children: React.ReactNode }) {
  return (
    <MenuContentColumns>
      <div>
        <ColumnLabel>Company</ColumnLabel>
        <ul>
          <MenuColumnListItem icon={GroupIcon} href="https://the-guild.dev/about-us">
            About Us
          </MenuColumnListItem>
          <MenuColumnListItem icon={AppsIcon} href="https://the-guild.dev/logos">
            Brand Assets
          </MenuColumnListItem>
        </ul>
        <ColumnLabel>Proudly made by</ColumnLabel>
        <NavigationMenuLink href="https://the-guild.dev" className="px-4 py-2" arrow>
          <GuildLogo className="-my-2 size-10" />
          <TheGuild className="h-8" />
        </NavigationMenuLink>
        <ColumnLabel>Part of</ColumnLabel>
        <NavigationMenuLink
          href="https://graphql.org/community/foundation/"
          className="px-4 py-2 text-blue-800 hover:text-blue-1000"
          arrow
        >
          <GraphQLFoundationLogo className="" />
        </NavigationMenuLink>
      </div>
      {children && <div>{children}</div>}
    </MenuContentColumns>
  );
}
