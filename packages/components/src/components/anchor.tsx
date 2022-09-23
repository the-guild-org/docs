import { forwardRef, ReactElement } from 'react';
import NextLink from 'next/link';
import { ILink } from '../types/components';

export const Anchor = forwardRef<HTMLAnchorElement, ILink>(function Anchor(
  { href = '', children, newWindow, sameSite, ...props },
  forwardedRef
): ReactElement {
  if (sameSite) {
    const url = new URL(href);
    href = url.pathname + url.search + url.hash;
  }
  if (newWindow && /^https?:\/\//.test(href)) {
    return (
      <a ref={forwardedRef} href={href} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <NextLink ref={forwardedRef} href={href} {...props} legacyBehavior={false}>
      {/* Fragment needed to fix Error: React.Children.only expected to receive a single React element child */}
      <>{children}</>
    </NextLink>
  );
});
