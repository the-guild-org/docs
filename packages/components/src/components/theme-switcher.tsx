'use client';

import { FC, ReactNode } from 'react';
import { useTheme } from 'nextra-theme-docs';

export const ThemeSwitcherButton: FC<{ children: ReactNode }> = ({ children }) => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
      className="self-center rounded-sm p-2 outline-none focus-visible:ring"
    >
      {children}
    </button>
  );
};
