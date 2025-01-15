import { forwardRef } from 'react';
import { cn } from '../../cn';
import { Anchor } from '../anchor';

export interface MDXLinkProps
  extends Omit<React.ComponentProps<typeof Anchor>, 'href' | 'children'> {
  href?: string;
  children?: React.ReactNode;
}

export const MDXLink = forwardRef<HTMLAnchorElement, MDXLinkProps>(
  ({ className, href, children, ...rest }, ref) => {
    return (
      <Anchor
        ref={ref}
        // we remove `text-underline-position` from default Nextra link styles, because Neue Montreal font
        // has a different underline position than system fonts, and it looks bad in Safari.
        className={cn(
          'hive-focus -mx-1 -my-0.5 rounded px-1 py-0.5 font-medium text-blue-700 underline underline-offset-2 hover:no-underline focus-visible:no-underline focus-visible:ring-current focus-visible:ring-offset-blue-200 dark:text-primary/90 dark:focus-visible:ring-primary/50',
          className,
        )}
        href={href || ''}
        {...rest}
      >
        {children}
      </Anchor>
    );
  },
);

MDXLink.displayName = 'MDXLink';
