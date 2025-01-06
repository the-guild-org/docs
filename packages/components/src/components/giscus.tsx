'use client';

import { FC } from 'react';
import { useTheme } from 'nextra-theme-docs';
import { default as Giscus_, GiscusProps } from '@giscus/react';

export const Giscus: FC<
  Omit<GiscusProps, 'mapping'> & {
    mapping?: GiscusProps['mapping'];
  }
> = props => {
  const { resolvedTheme } = useTheme();
  return <Giscus_ theme={resolvedTheme} mapping="pathname" {...props} />;
};
