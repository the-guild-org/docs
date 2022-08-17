import React, { forwardRef, ReactElement } from 'react';
import NextLink from 'next/link';
import { ILink } from '../types/components';

export const Anchor = forwardRef<HTMLAnchorElement, ILink>(function (
  { href = '', children, newWindow, ...props },
  forwardedRef
): ReactElement {
  if (newWindow || /https?:\/\//.test(href)) {
    return (
      <a ref={forwardedRef} href={href} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <NextLink ref={forwardedRef} href={href} {...props}>
      {children}
    </NextLink>
  );
});
