'use client';

import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from './dropdown';

export interface VersionDropdownProps {
  currentVersion: string;
  versions: {
    label?: string;
    value: string;
    href?: string;
    onClick?: () => void;
  }[];
}
export function VersionDropdown({ currentVersion, versions }: VersionDropdownProps) {
  return (
    <Dropdown type="hover" className="relative">
      <DropdownTrigger className="hive-focus cursor-default rounded p-3 font-medium leading-normal text-green-800 aria-expanded:text-green-1000 dark:text-neutral-300 dark:aria-expanded:text-neutral-100">
        {currentVersion}
      </DropdownTrigger>

      <DropdownContent className="absolute left-full min-w-16 -translate-x-full translate-y-2 rounded-xl border border-beige-200 bg-white p-1 shadow-[0px_16px_32px_-12px_rgba(14,18,27,0.10)] transition ease-in-out data-[state=closed]:translate-y-0 data-[state=closed]:scale-95 data-[state=closed]:opacity-0 data-[state=open]:fade-in-90 dark:border-neutral-800 dark:bg-neutral-900">
        {versions.map(version => (
          <DropdownItem
            key={version.value}
            href={version.href}
            onClick={version.onClick}
            className="block whitespace-nowrap rounded p-2 text-green-800 transition-colors hover:bg-beige-100 hover:text-green-1000 dark:text-neutral-300 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-100"
          >
            {version.label ?? version.value}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
}
