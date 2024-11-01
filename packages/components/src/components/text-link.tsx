import React from 'react';
import { cn } from '../cn';
import { Anchor, AnchorProps } from './anchor';
import { ArrowIcon } from './icons';

export interface TextLinkProps extends AnchorProps {}

export function TextLink({ className, children, ...rest }: TextLinkProps) {
  const hasArrow =
    children &&
    flattenFragments(children).some(
      child => typeof child === 'object' && child && 'type' in child && child.type === ArrowIcon,
    );

  return (
    <Anchor
      className={cn(
        'hive-focus -mx-1 -my-0.5 rounded px-1 py-0.5 hover:text-blue-700',
        hasArrow ? 'inline-flex items-center gap-2' : 'underline',
        className,
      )}
      {...rest}
    >
      {children}
    </Anchor>
  );
}

function flattenFragments(children: React.ReactNode): React.ReactNode[] {
  return React.Children.toArray(children).flatMap(child =>
    typeof child === 'object' && 'type' in child && child.type === React.Fragment
      ? (child.props.children as React.ReactNode[])
      : child,
  );
}
