'use client';

import { FC, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export const Body: FC<{
  lightOnlyPages: string[];
  children: ReactNode;
}> = ({ lightOnlyPages, children }) => {
  const pathname = usePathname();

  const isLightOnlyPage = lightOnlyPages.includes(pathname);

  return <body className={isLightOnlyPage ? 'light text-green-1000' : undefined}>{children}</body>;
};
