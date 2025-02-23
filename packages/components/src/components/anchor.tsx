import { forwardRef, ReactElement } from 'react';
import NextLink from 'next/link';
import { cn } from '../cn';
import { ILink } from '../types/components';

export type AnchorProps = ILink;
export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(function Anchor(
  { href = '', children, newWindow, className, ...props },
  forwardedRef,
): ReactElement {
  const classes = cn('outline-none focus-visible:ring', className);

  if (typeof href === 'string') {
    if (href.startsWith('#')) {
      return (
        <a ref={forwardedRef} href={href} className={classes} {...props}>
          {children}
        </a>
      );
    }

    if (newWindow && /^https?:\/\//.test(href)) {
      return (
        <a
          ref={forwardedRef}
          href={href}
          target="_blank"
          rel="noreferrer"
          className={classes}
          {...props}
        >
          {children}
        </a>
      );
    }
  }

  return (
    <NextLink ref={forwardedRef} href={href} {...props} className={classes} legacyBehavior={false}>
      {/* eslint-disable-next-line react/jsx-no-useless-fragment -- Fragment needed to fix Error: React.Children.only expected to receive a single React element child */}
      <>{children}</>
    </NextLink>
  );
});
