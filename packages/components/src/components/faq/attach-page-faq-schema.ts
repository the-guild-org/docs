'use client';

import { FC, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const AttachPageFAQSchema: FC<{ faqPages: string[] }> = ({ faqPages }) => {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.querySelector('html')!;
    if (faqPages.includes(pathname) && !html.hasAttribute('itemscope')) {
      html.setAttribute('itemscope', '');
      html.setAttribute('itemtype', 'https://schema.org/FAQPage');

      return () => {
        html.removeAttribute('itemscope');
        html.removeAttribute('itemtype');
      };
    }
  }, []);

  return null;
};
