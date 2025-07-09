import { ReactNode } from 'react';
import { cn } from '../../cn';
import { ReactComponent as CSAStarLevelOneIcon } from '../icons/csa-star-level-one.svg';

function SecurityBadge({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        'hive-focus h-fit w-fit rounded-full p-1 hover:bg-blue-200 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--nextra-bg))] dark:hover:bg-white/20 dark:hover:*:opacity-100',
        className,
      )}
    >
      {children}
    </a>
  );
}

export function SecurityBadges() {
  return (
    <div className="flex flex-wrap gap-4 max-lg:flex-col">
      <SecurityBadge href="https://cloudsecurityalliance.org/star/registry/software-products-guild-ltd-the-guild/services/graphql-hive">
        <CSAStarLevelOneIcon className="size-[88px] dark:opacity-95" />
      </SecurityBadge>
      <SecurityBadge href="https://security.graphql-hive.com/">
        <img
          src="https://static.vanta.com/static/soc2_badge.ac7ad1ad.webp"
          className="size-[88px] dark:opacity-95"
        />
      </SecurityBadge>
    </div>
  );
}
