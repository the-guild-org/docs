import {
  Root,
  Trigger,
  Indicator,
  Viewport,
  List,
  Item,
  Link,
  Content,
} from '@radix-ui/react-navigation-menu';
import tw, { styled, css } from 'twin.macro';
import React, { ReactElement, ReactNode } from 'react';

const StyledMenu = styled(Root)(tw`relative z-50`);

interface IStyledTriggerProps {
  accentColor?: string;
  isActiveLink?: boolean;
  isModalOpen?: boolean;
  iconType?: 'close' | 'theme';
  children: ReactNode;
}

const StyledTrigger = ({
  accentColor,
  children,
}: IStyledTriggerProps): ReactElement => {
  return (
    <Trigger
      css={css({
        display: 'flex',
        '&[data-state=open] a': {
          color: accentColor,
        },
      })}
    >
      {children}
    </Trigger>
  );
};

const StyledIndicator = styled(Indicator)(tw`flex justify-center h-2.5`);

const StyledArrow = tw.div`dark:bg-gray-800 bg-white relative w-3 h-3 top-2/3 rotate-45`;

// eslint-disable-next-line react/display-name
const StyledIndicatorWithArrow = React.forwardRef((props, forwardedRef) => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <StyledIndicator {...props} ref={forwardedRef as any}>
    <StyledArrow />
  </StyledIndicator>
));

const StyledViewport = styled(Viewport)([
  {
    position: 'relative',
    transformOrigin: 'top center',
    marginTop: '-11px',
    height: 'var(--radix-navigation-menu-viewport-height)',
  },
]);

// Exports
export const NavigationMenuRoot = StyledMenu;
export const NavigationMenuList = List;
export const NavigationMenuItem = Item;
export const NavigationMenuTrigger = StyledTrigger;
export const NavigationMenuLink = Link;
export const NavigationMenuContent = Content;
export const NavigationMenuViewport = StyledViewport;
export const NavigationMenuIndicator = StyledIndicatorWithArrow;
export const ViewportPosition = tw.div`absolute top-full w-full flex justify-center`;
