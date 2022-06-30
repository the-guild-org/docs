import { forwardRef } from 'react';
import { styled, keyframes } from '@stitches/react';
import { Root, List, Trigger, Link, Content, Indicator, Viewport, Item } from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { violet, mauve, blackA } from '@radix-ui/colors';

const enterFromRight = keyframes({
  from: { transform: 'translateX(200px)', opacity: 0 },
  to: { transform: 'translateX(0)', opacity: 1 },
});

const enterFromLeft = keyframes({
  from: { transform: 'translateX(-200px)', opacity: 0 },
  to: { transform: 'translateX(0)', opacity: 1 },
});

const exitToRight = keyframes({
  from: { transform: 'translateX(0)', opacity: 1 },
  to: { transform: 'translateX(200px)', opacity: 0 },
});

const exitToLeft = keyframes({
  from: { transform: 'translateX(0)', opacity: 1 },
  to: { transform: 'translateX(-200px)', opacity: 0 },
});

const scaleIn = keyframes({
  from: { transform: 'rotateX(-30deg) scale(0.9)', opacity: 0 },
  to: { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
});

const scaleOut = keyframes({
  from: { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
  to: { transform: 'rotateX(-10deg) scale(0.95)', opacity: 0 },
});

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const StyledMenu = styled(Root, {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  width: '100vw',
  zIndex: 1,
});

const NavigationMenuList = styled(List, {
  all: 'unset',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: 'white',
  padding: 4,
  borderRadius: 6,
  listStyle: 'none',
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
});

const itemStyles = {
  padding: '8px 12px',
  outline: 'none',
  userSelect: 'none',
  fontWeight: 500,
  lineHeight: 1,
  borderRadius: 4,
  fontSize: 15,
  color: violet.violet11,
  '&:focus': { position: 'relative', boxShadow: `0 0 0 2px ${violet.violet7}` },
  '&:hover': { backgroundColor: violet.violet3 },
};

const StyledTrigger = styled(Trigger, {
  all: 'unset',
  ...itemStyles,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 2,
});

const StyledCaret = styled(CaretDownIcon, {
  position: 'relative',
  color: violet.violet10,
  top: 1,
  '[data-state=open] &': { transform: 'rotate(-180deg)' },
  '@media (prefers-reduced-motion: no-preference)': {
    transition: 'transform 250ms ease',
  },
});

const NavigationMenuTrigger = forwardRef(({ children, ...props }, forwardedRef) => (
  <StyledTrigger {...props} ref={forwardedRef}>
    {children}
    <StyledCaret aria-hidden />
  </StyledTrigger>
));

const NavigationMenuLink = styled(Link, {
  ...itemStyles,
  display: 'block',
  textDecoration: 'none',
  fontSize: 15,
  lineHeight: 1,
});

const NavigationMenuContent = styled(Content, {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  '@media only screen and (min-width: 600px)': { width: 'auto' },
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '250ms',
    animationTimingFunction: 'ease',
    '&[data-motion="from-start"]': { animationName: enterFromLeft },
    '&[data-motion="from-end"]': { animationName: enterFromRight },
    '&[data-motion="to-start"]': { animationName: exitToLeft },
    '&[data-motion="to-end"]': { animationName: exitToRight },
  },
});

const StyledIndicator = styled(Indicator, {
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  height: 10,
  top: '100%',
  overflow: 'hidden',
  zIndex: 1,

  '@media (prefers-reduced-motion: no-preference)': {
    transition: 'width, transform 250ms ease',
    '&[data-state="visible"]': { animation: `${fadeIn} 200ms ease` },
    '&[data-state="hidden"]': { animation: `${fadeOut} 200ms ease` },
  },
});

const NavigationMenuViewport = styled(Viewport, {
  position: 'relative',
  transformOrigin: 'top center',
  marginTop: 10,
  width: '100%',
  backgroundColor: 'white',
  borderRadius: 6,
  overflow: 'hidden',
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  height: 'var(--radix-navigation-menu-viewport-height)',

  '@media only screen and (min-width: 600px)': {
    width: 'var(--radix-navigation-menu-viewport-width)',
  },
  '@media (prefers-reduced-motion: no-preference)': {
    transition: 'width, height, 300ms ease',
    '&[data-state="open"]': { animation: `${scaleIn} 200ms ease` },
    '&[data-state="closed"]': { animation: `${scaleOut} 200ms ease` },
  },
});

// Your app...
const ContentList = styled('ul', {
  display: 'grid',
  padding: 22,
  margin: 0,
  columnGap: 10,
  listStyle: 'none',

  variants: {
    layout: {
      one: {
        '@media only screen and (min-width: 600px)': {
          width: 500,
          gridTemplateColumns: '.75fr 1fr',
        },
      },
      two: {
        '@media only screen and (min-width: 600px)': {
          width: 600,
          gridAutoFlow: 'column',
          gridTemplateRows: 'repeat(3, 1fr)',
        },
      },
    },
  },
});

const LinkTitle = styled('div', {
  fontWeight: 500,
  lineHeight: 1.2,
  marginBottom: 5,
  color: violet.violet12,
});

const LinkText = styled('p', {
  all: 'unset',
  color: mauve.mauve11,
  lineHeight: 1.4,
  fontWeight: 'initial',
});

const ContentListItem = forwardRef(({ children, title, ...props }, forwardedRef) => (
  <li>
    <NavigationMenuLink
      {...props}
      ref={forwardedRef}
      css={{
        padding: 12,
        borderRadius: 6,
        '&:hover': { backgroundColor: mauve.mauve3 },
      }}
    >
      <LinkTitle>{title}</LinkTitle>
      <LinkText>{children}</LinkText>
    </NavigationMenuLink>
  </li>
));

const ViewportPosition = styled('div', {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  top: '100%',
  left: 0,
  perspective: '2000px',
});

export const NavigationMenu = () => {
  return (
    <StyledMenu>
      <NavigationMenuList>
        <Item>
          <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ContentList layout="one">
              <ContentListItem href="https://stitches.dev/" title="Stitches">
                CSS-in-JS with best-in-class developer experience.
              </ContentListItem>
              <ContentListItem href="/colors" title="Colors">
                Beautiful, thought-out palettes with auto dark mode.
              </ContentListItem>
              <ContentListItem href="https://icons.radix-ui.com/" title="Icons">
                A crisp set of 15x15 icons, balanced and consistent.
              </ContentListItem>
            </ContentList>
          </NavigationMenuContent>
        </Item>

        <Item>
          <NavigationMenuTrigger>Overview</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ContentList layout="two">
              <ContentListItem title="Introduction" href="/docs/primitives/overview/introduction">
                Build high-quality, accessible design systems and web apps.
              </ContentListItem>
              <ContentListItem title="Getting started" href="/docs/primitives/overview/getting-started">
                A quick tutorial to get you up and running with Radix Primitives.
              </ContentListItem>
              <ContentListItem title="Styling" href="/docs/primitives/overview/styling">
                Unstyled and compatible with any styling solution.
              </ContentListItem>
              <ContentListItem title="Animation" href="/docs/primitives/overview/animation">
                Use CSS keyframes or any animation library of your choice.
              </ContentListItem>
              <ContentListItem title="Accessibility" href="/docs/primitives/overview/accessibility">
                Tested in a range of browsers and assistive technologies.
              </ContentListItem>
              <ContentListItem title="Releases" href="/docs/primitives/overview/releases">
                Radix Primitives releases and their changelogs.
              </ContentListItem>
            </ContentList>
          </NavigationMenuContent>
        </Item>

        <Item>
          <NavigationMenuLink href="https://github.com/radix-ui">GitHub</NavigationMenuLink>
        </Item>

        <StyledIndicator>
          <div className='relative w-2.5 h-2.5 bg-white rotate-45 rounded-t-sm top-[70%]' />
        </StyledIndicator>
      </NavigationMenuList>

      <ViewportPosition>
        <NavigationMenuViewport />
      </ViewportPosition>
    </StyledMenu>
  );
};
