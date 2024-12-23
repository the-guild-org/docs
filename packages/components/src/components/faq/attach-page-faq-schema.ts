'use client';

import { FC, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const AttachPageFAQSchema: FC<{ faqPages: string[] }> = ({ faqPages }) => {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.querySelector('html')!;
    const path = pathname.replace('/graphql/hive', '/');

    if (faqPages.includes(path) && !html.hasAttribute('itemscope')) {
      html.setAttribute('itemscope', '');
      html.setAttribute('itemtype', 'https://schema.org/FAQPage');

      return () => {
        html.removeAttribute('itemscope');
        html.removeAttribute('itemtype');
      };
    }
  }, [pathname]);

  return null;
};
