import * as React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cn } from '../../cn';
import { Anchor } from '../anchor';
import { ArrowIcon } from '../icons';

const CONTAINER_ID = 'h-navmenu-container';
const VIEWPORT_ID = 'h-navmenu-viewport';

export interface NavigationMenuProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> {
  forceMount?: true;
}
export const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  NavigationMenuProps
>(({ className, children, forceMount, ...rest }, ref) => (
  <NavigationMenuPrimitive.Root
    id={CONTAINER_ID}
    ref={ref}
    className={cn('relative z-10 flex flex-1 items-center', className)}
    aria-label="Navigation Menu"
    {...rest}
  >
    {children}
    <NavigationMenuViewport forceMount={forceMount} />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

export const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...rest }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      'group flex flex-1 list-none items-center rounded-lg border border-beige-200 px-3',
      className,
    )}
    {...rest}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

export const NavigationMenuItem = NavigationMenuPrimitive.Item;

export const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...rest }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(
      'cursor-default p-3 font-medium leading-normal text-green-800 aria-expanded:text-green-1000',
      className,
    )}
    onPointerOver={event => {
      rest.onPointerOver?.(event);
      const viewport = document.getElementById(VIEWPORT_ID);
      if (!viewport || !(viewport instanceof HTMLElement)) return;
      let newX = getTransformX(event.currentTarget, viewport);
      if (!viewport.style.transition) {
        setTimeout(() => {
          // First transition will be immediate.
          // We start under the first hovered element.
          viewport.style.transition = 'transform 0.5s';
          // TODO: Clear this on close.
        }, 0);
      }
      viewport.style.transform = `translateX(${newX}px)`;
    }}
    {...rest}
  >
    {children}
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

export const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...rest }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 absolute left-0 top-0 w-auto !duration-500 [&>:first-child]:p-6',
      className,
    )}
    {...rest}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

export interface NavigationMenuLinkProps
  extends Omit<React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>, 'asChild'> {
  href: string;
}

export interface NavigationMenuLinkProps {
  arrow?: boolean;
}
export const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  NavigationMenuLinkProps
>(({ className, arrow, children, href, ...rest }, ref) => {
  const isActive = false; // TODO: Do we even discern this in the design?
  return (
    <NavigationMenuPrimitive.Link active={isActive} {...rest} asChild ref={ref}>
      <Anchor
        href={href}
        className={cn(
          '[data-active="true"]:text-green-1000 rounded-lg p-3 leading-normal text-green-800 transition-colors hover:text-green-1000 [&:hover>svg]:opacity-100',
          arrow && 'flex items-center',
          className,
        )}
      >
        {children}
        {arrow && <ArrowIcon className="ml-auto size-6 shrink-0 opacity-0 transition-all" />}
      </Anchor>
    </NavigationMenuPrimitive.Link>
  );
});

const useLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...rest }, ref) => {
  useLayoutEffect(() => {
    const viewport = document.getElementById(VIEWPORT_ID);
    const container = document.getElementById(CONTAINER_ID);
    if (
      !(
        container &&
        container instanceof HTMLElement &&
        viewport &&
        viewport instanceof HTMLElement
      )
    ) {
      return;
    }

    const firstCollectionItem = container.querySelector('[data-radix-collection-item]');
    if (firstCollectionItem && firstCollectionItem instanceof HTMLElement) {
      viewport.style.transform = `translateX(${getTransformX(firstCollectionItem, viewport)}px)`;
    }
  }, []);
  return (
    <div
      id={VIEWPORT_ID}
      className="absolute left-0 top-full flex"
      style={{
        perspective: '2000px',
      }}
    >
      <NavigationMenuPrimitive.Viewport
        className={cn(
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-[top_center] overflow-hidden rounded-xl border shadow-[0px_16px_32px_-12px_rgba(14,18,27,0.10)] ease-in-out',
          className,
        )}
        style={{
          transition: 'width 500ms, height 500ms, transform 250ms, opacity 250ms',
        }}
        ref={ref}
        {...rest}
      />
    </div>
  );
});
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

export const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...rest }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      'data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
      className,
    )}
    {...rest}
  >
    <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

function getTransformX(element: HTMLElement, viewport: HTMLElement) {
  const boundingBox = element.getBoundingClientRect();
  const offsetX = -32;
  let newX = boundingBox.left + offsetX;
  if (newX + viewport.offsetWidth > window.innerWidth) {
    newX = window.innerWidth - viewport.offsetWidth + offsetX;
  }
  return newX;
}
