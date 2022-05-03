import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import tw, { styled } from 'twin.macro';
import React from 'react';

const StyledMenu = styled(NavigationMenu.Root)({
  position: 'relative',
  zIndex: 50,
});

interface IStyledTriggerProps {
  accentColor?: string;
  isActiveLink?: boolean;
  isModalOpen?: boolean;
  iconType?: 'close' | 'theme';
}

const StyledTrigger = styled(NavigationMenu.Trigger)(
  ({ accentColor }: IStyledTriggerProps) => ({
    display: 'flex',
    '&[data-state=open] a': {
      color: accentColor,
    },
  })
);

const StyledIndicator = styled(NavigationMenu.Indicator)({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  height: 10,
  top: '100%',
  overflow: 'hidden',
  zIndex: 50,
});

const StyledArrow = styled.div([
  tw`dark:bg-gray-800 bg-white`,
  {
    position: 'relative',
    top: '70%',
    backgroundColor: 'white',
    width: 12,
    height: 12,
    transform: 'rotate(45deg)',
    borderTopLeftRadius: 3,
  },
]);

// eslint-disable-next-line react/display-name
const StyledIndicatorWithArrow = React.forwardRef((props, forwardedRef) => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <StyledIndicator {...props} ref={forwardedRef as any}>
    <StyledArrow />
  </StyledIndicator>
));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StyledViewport = styled(NavigationMenu.Viewport as any)([
  {
    position: 'relative',
    transformOrigin: 'top center',
    marginTop: '-11px',
    height: 'var(--radix-navigation-menu-viewport-height)',
  },
]);
// Exports
export const NavigationMenuRoot = StyledMenu;
export const NavigationMenuList = NavigationMenu.List;
export const NavigationMenuItem = NavigationMenu.Item;
export const NavigationMenuTrigger = StyledTrigger;
export const NavigationMenuLink = NavigationMenu.Link;
export const NavigationMenuContent = NavigationMenu.Content;
export const NavigationMenuViewport = StyledViewport;
export const NavigationMenuIndicator = StyledIndicatorWithArrow;
export const ViewportPosition = styled.div({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  top: '100%',
  left: 0,
  perspective: '2000px',
});
