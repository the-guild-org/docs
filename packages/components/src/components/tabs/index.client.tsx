'use client';

import { FC, Fragment, ReactElement, ReactNode, useEffect, useId, useRef, useState } from 'react';
import cn from 'clsx';
import {
  Tab as HeadlessTab,
  TabProps as HeadlessTabProps,
  TabGroup,
  TabGroupProps,
  TabList,
  TabListProps,
  TabPanel,
  TabPanelProps,
  TabPanels,
  // this component is almost verbatim copied from Nextra, so keep @headlessui/react to guarantee it works the same
} from '@headlessui/react';
import { useHash } from '../use-hash';

type TabItem = string | ReactElement;

type TabObjectItem = {
  key?: string;
  label: TabItem;
  disabled: boolean;
};

function isTabObjectItem(item: unknown): item is TabObjectItem {
  return !!item && typeof item === 'object' && 'label' in item;
}

export interface TabsProps
  extends Pick<TabGroupProps, 'defaultIndex' | 'selectedIndex' | 'onChange'> {
  items: (TabItem | TabObjectItem)[];
  children: ReactNode;
  /**
   * URLSearchParams key for persisting the selected tab.
   * @default "tab"
   */
  searchParamKey?: string;
  /** LocalStorage key for persisting the selected tab. */
  storageKey?: string;
  /** Tabs CSS class name. */
  className?: TabListProps['className'];
  /** Tab CSS class name. */
  tabClassName?: HeadlessTabProps['className'];
}

export const Tabs = ({
  items,
  children,
  searchParamKey = 'tab',
  storageKey,
  defaultIndex = 0,
  selectedIndex: _selectedIndex,
  onChange,
  className,
  tabClassName,
}: TabsProps) => {
  let [selectedIndex, setSelectedIndex] = useState<number>(defaultIndex);
  if (_selectedIndex !== undefined) {
    selectedIndex = _selectedIndex;
  }

  const setSelectedTab = (key: TabKey) => {
    const index = items.findIndex((_, i) => getTabKey(items, i) === key);
    setSelectedIndex(index);
  };

  const tabPanelsRef = useRef<HTMLDivElement>(null!);

  useActiveTabFromURL(tabPanelsRef, searchParamKey, setSelectedIndex);
  const id = useId();
  useActiveTabFromStorage(storageKey ?? id, setSelectedTab);

  const handleChange = (index: number) => {
    if (storageKey) {
      const newValue = String(index);
      localStorage.setItem(storageKey, newValue);

      // the storage event only get picked up (by the listener) if the localStorage was changed in
      // another browser's tab/window (of the same app), but not within the context of the current tab.
      window.dispatchEvent(new StorageEvent('storage', { key: storageKey, newValue }));
      return;
    }
    setSelectedIndex(index);
    onChange?.(index);
  };

  return (
    <TabGroup
      selectedIndex={selectedIndex}
      defaultIndex={defaultIndex}
      onChange={handleChange}
      as={Fragment}
    >
      <TabList
        className={args =>
          cn(
            'nextra-scrollbar overflow-x-auto overflow-y-hidden overscroll-x-contain',
            'mt-4 flex w-full gap-2 border-b border-beige-200 pb-px dark:border-neutral-800',
            'focus-visible:hive-focus',
            typeof className === 'function' ? className(args) : className,
          )
        }
      >
        {items.map((item, index) => (
          <HeadlessTab
            key={index}
            disabled={isTabObjectItem(item) && item.disabled}
            className={args => {
              const { selected, disabled, hover, focus } = args;
              return cn(
                focus && 'hive-focus ring-inset',
                'cursor-pointer whitespace-nowrap',
                'rounded-t p-2 font-medium leading-5 transition-colors',
                '-mb-0.5 select-none border-b-2',
                selected
                  ? 'border-current outline-none'
                  : hover
                    ? 'border-beige-200 dark:border-neutral-800'
                    : 'border-transparent',
                selected
                  ? 'text-green-900 dark:text-primary'
                  : disabled
                    ? 'pointer-events-none text-beige-400 dark:text-neutral-600'
                    : hover
                      ? 'text-black dark:text-white'
                      : 'text-beige-600 dark:text-beige-200',
                typeof tabClassName === 'function' ? tabClassName(args) : tabClassName,
              );
            }}
          >
            {isTabObjectItem(item) ? item.label : item}
          </HeadlessTab>
        ))}
      </TabList>
      <TabPanels ref={tabPanelsRef}>{children}</TabPanels>
    </TabGroup>
  );
};

export const Tab: FC<TabPanelProps> = ({
  children,
  // For SEO display all the Panel in the DOM and set `display: none;` for those that are not selected
  unmount = false,
  className,
  ...props
}) => {
  return (
    <TabPanel
      {...props}
      unmount={unmount}
      className={args =>
        cn(
          'mt-[1.25em] rounded',
          args.focus && 'hive-focus',
          typeof className === 'function' ? className(args) : className,
        )
      }
    >
      {children}
    </TabPanel>
  );
};

function useActiveTabFromURL(
  tabPanelsRef: React.RefObject<HTMLDivElement>,
  setSelectedIndex: (index: number) => void,
) {
  const hash = useHash();

  useEffect(() => {
    if (!hash) return;
    const tabPanel = tabPanelsRef.current?.querySelector(`[role=tabpanel]:has([id="${hash}"])`);
    if (!tabPanel) return;

    for (const [index, el] of Object.entries(tabPanel)) {
      if (el === tabPanel) {
        setSelectedIndex(Number(index));
        // Note for posterity:
        //   This is not an infinite loop. Clearing and restoring the hash is necessary
        //   for the browser to scroll to the element. The intermediate empty hash triggers
        //   a hashchange event, but React bails out when restoring the same hash value,
        //   preventing an infinite loop.

        // Clear hash first, otherwise page isn't scrolled
        location.hash = '';
        // Execute on next tick after `selectedIndex` update
        requestAnimationFrame(() => {
          location.hash = `#${hash}`;
        });
      }
    }
    // tabPanelsRef is a ref, so it's not a dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);
}

function useActiveTabFromStorage(storageKey: string, setSelectedTab: (key: TabKey) => void) {
  useEffect(() => {
    if (!storageKey) {
      // Do not listen storage events if there is no storage key
      return;
    }

    function fn(event: StorageEvent) {
      if (event.key === storageKey) {
        const value = event.newValue as TabKey;
        if (value) {
          setSelectedTab(value);
        }
      }
    }

    const value = localStorage.getItem(storageKey);
    if (value) {
      setSelectedTab(value as TabKey);
    }

    window.addEventListener('storage', fn);
    return () => {
      window.removeEventListener('storage', fn);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);
}

type TabKey = string & { __brand: 'TabKey' };

function getTabKey(items: (TabItem | TabObjectItem)[], index: number): TabKey {
  const item = items[index];
  const isObject = isTabObjectItem(item);
  // if the key is defined by user, we use it
  if (isObject && item.key) {
    return item.key as TabKey;
  }
  const label = isObject ? item.label : item;
  // otherwise we use the slugified label prefixed by the tab group id, if the label is a string
  // or the index of the item in the items array prefixed by the tab group id if the label is a ReactElement
  const key = typeof label === 'string' ? slugify(label) : index.toString();
  return key as TabKey;
}

function slugify(label: string) {
  return label
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
