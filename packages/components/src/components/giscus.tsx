'use client';

import { FC } from 'react';
import { useTheme } from 'nextra-theme-docs';
import { default as _Giscus, GiscusProps } from '@giscus/react';

export const Giscus: FC<GiscusProps> = props => {
  const { resolvedTheme } = useTheme();
  return <_Giscus theme={resolvedTheme} {...props} />;
};
