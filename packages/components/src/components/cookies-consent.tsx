'use client';

import { useState } from 'react';
import { cn } from '../cn';
import { CallToAction } from './call-to-action';

export interface CookiesConsentProps extends React.HTMLAttributes<HTMLElement> {}

export function CookiesConsent(props: CookiesConsentProps) {
  const [consented, setConsented] = useState(() => localStorage.getItem('cookies') === 'true');

  const onAccept = () => {
    setConsented(true);
    localStorage.setItem('cookies', 'true');
  };

  if (consented) {
    return null;
  }

  return (
    <div
      {...props}
      className={cn(
        'fixed bottom-0 z-50 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 rounded-lg border border-beige-200 bg-beige-100 p-4 text-sm text-green-800 shadow-xl lg:flex-nowrap lg:justify-between lg:text-left dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200',
        props.className,
      )}
    >
      <div>
        <p className="max-sm:inline">
          This site uses cookies for analytics and improving your experience.
        </p>{' '}
        <p className="max-sm:inline">By using our services, you consent to cookies.</p>
      </div>
      <div className="ml-auto flex w-auto items-center justify-end gap-4">
        <a
          href="https://the-guild.dev/graphql/hive/privacy-policy.pdf"
          className="hive-focus whitespace-nowrap rounded p-1 hover:text-blue-700 hover:underline dark:hover:text-blue-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
        <CallToAction variant="tertiary" onClick={onAccept} className="px-4 py-2">
          Allow
        </CallToAction>
      </div>
    </div>
  );
}
