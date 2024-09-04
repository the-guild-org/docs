import { useCallback, useState } from 'react';
import { cn } from '../cn';
import { CallToAction } from './call-to-action';

export interface CookiesConsentProps extends React.HTMLAttributes<HTMLElement> {}
export function CookiesConsent(props: CookiesConsentProps) {
  const [show, setShow] = useState(() => localStorage.getItem('cookies') !== 'true');

  const accept = useCallback(() => {
    setShow(false);
    localStorage.setItem('cookies', 'true');
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div
      {...props}
      className={cn(
        'fixed bottom-0 z-100 flex w-full flex-wrap items-center justify-center gap-4 bg-gray-100 px-5 py-7 text-center text-black lg:flex-nowrap lg:justify-between lg:text-left',
        props.className,
      )}
    >
      <div className="w-full text-sm">
        <p>This website uses cookies to analyze site usage and improve your experience.</p>
        <p>If you continue to use our services, you are agreeing to the use of such cookies.</p>
      </div>
      <div className="flex shrink-0 items-center gap-4 lg:pr-24">
        <a
          href="https://the-guild.dev/graphql/hive/privacy-policy.pdf"
          className="whitespace-nowrap text-yellow-600 hover:underline"
        >
          Privacy Policy
        </a>
        <CallToAction variant="tertiary" onClick={accept}>
          Allow Cookies
        </CallToAction>
      </div>
    </div>
  );
}
