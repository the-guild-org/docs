'use client';

import {
  FC,
  Fragment,
  ReactElement,
  ReactNode,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useSearchParams } from 'next/navigation';
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
  // this component is almost verbatim copied from Nextra, so we keep @headlessui/react to guarantee it works the same
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
  /**
   * LocalStorage key for persisting the selected tab.
   * Set to `true` to use the default key `tabs-${id}`.
   * Leave empty or set to `null` to disable localStorage persistence.
   * Set to a string to use a custom key.
   */
  storageKey?: string | true | null;
  /** Tabs CSS class name. */
  className?: TabListProps['className'];
  /** Tab CSS class name. */
  tabClassName?: HeadlessTabProps['className'];
}

export const Tabs = ({
  items,
  children,
  searchParamKey = 'tab',
  storageKey = null,
  defaultIndex = 0,
  selectedIndex: _selectedIndex,
  onChange,
  className,
  tabClassName,
}: TabsProps) => {
  const id = useId();

  if (storageKey === true) {
    storageKey = `tabs-${id}`;
  }

  let [selectedIndex, setSelectedIndex] = useState<number>(defaultIndex);
  if (_selectedIndex !== undefined) {
    selectedIndex = _selectedIndex;
  }

  const tabPanelsRef = useRef<HTMLDivElement>(null!);

  const tabIndexFromSearchParams = useActiveTabFromURL(
    tabPanelsRef,
    items,
    searchParamKey,
    setSelectedIndex,
    id,
  );

  useActiveTabFromStorage(storageKey, items, setSelectedIndex, tabIndexFromSearchParams !== -1, id);

  const handleChange = (index: number) => {
    onChange?.(index);

    if (storageKey) {
      const newValue = getTabKey(items, index, id);
      localStorage.setItem(storageKey, newValue);

      // the storage event only get picked up (by the listener) if the localStorage was changed in
      // another browser's tab/window (of the same app), but not within the context of the current tab.
      window.dispatchEvent(new StorageEvent('storage', { key: storageKey, newValue }));
    } else {
      setSelectedIndex(index);
    }

    if (searchParamKey) {
      const searchParams = new URLSearchParams(window.location.search);
      const tabKeys = new Set(searchParams.getAll(searchParamKey));

      // we remove only tabs from this list from search params
      for (let i = 0; i < items.length; i++) {
        const key = getTabKey(items, i, id);
        tabKeys.delete(key);
      }

      // we add tabs from outside of this list back
      searchParams.delete(searchParamKey);
      for (const key of tabKeys) {
        searchParams.append(searchParamKey, key);
      }

      // and finally, we add the clicked tab
      searchParams.append(searchParamKey, getTabKey(items, index, id));

      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}?${searchParams.toString()}`,
      );
    }
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
  items: (TabItem | TabObjectItem)[],
  searchParamKey: string,
  setSelectedIndex: (index: number) => void,
  id: string,
) {
  const hash = useHash();
  const searchParams = useSearchParams();
  const tabsInSearchParams = searchParams.getAll(searchParamKey).sort();

  const tabIndexFromSearchParams = items.findIndex((_, index) =>
    tabsInSearchParams.includes(getTabKey(items, index, id)),
  );

  useIsomorphicLayoutEffect(() => {
    const tabPanel = hash
      ? tabPanelsRef.current?.querySelector(`[role=tabpanel]:has([id="${hash}"])`)
      : null;

    if (tabPanel) {
      let index = 0;
      for (const el of tabPanelsRef.current!.children) {
        if (el === tabPanel) {
          setSelectedIndex(Number(index));
          // Note for posterity:
          //   This is not an infinite loop. Clearing and restoring the hash is necessary
          //   for the browser to scroll to the element. The intermediate empty hash triggers
          //   a hashchange event, but we don't look for a tab panel if there is no hash.

          // Clear hash first, otherwise page isn't scrolled
          location.hash = '';
          // Execute on next tick after `selectedIndex` update
          requestAnimationFrame(() => (location.hash = `#${hash}`));
        }
        index++;
      }
    } else if (tabIndexFromSearchParams !== -1) {
      // if we don't have content to scroll to, we look at the search params
      setSelectedIndex(tabIndexFromSearchParams);
    }

    return function cleanUpTabFromSearchParams() {
      const newSearchParams = new URLSearchParams(window.location.search);
      newSearchParams.delete(searchParamKey);
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}?${newSearchParams.toString()}`,
      );
    };
    // tabPanelsRef is a ref, so it's not a dependency
  }, [hash, tabsInSearchParams.join(',')]);

  return tabIndexFromSearchParams;
}

function useActiveTabFromStorage(
  storageKey: string | null,
  items: (TabItem | TabObjectItem)[],
  setSelectedIndex: (index: number) => void,
  ignoreLocalStorage: boolean,
  id: string,
) {
  useIsomorphicLayoutEffect(() => {
    if (!storageKey || ignoreLocalStorage) {
      // Do not listen storage events if there is no storage key
      return;
    }

    const setSelectedTab = (key: string) => {
      const index = items.findIndex((_, i) => getTabKey(items, i, id) === key);
      if (index !== -1) {
        setSelectedIndex(index);
      }
    };

    function onStorageChange(event: StorageEvent) {
      if (event.key === storageKey) {
        const value = event.newValue;
        if (value) {
          setSelectedTab(value);
        }
      }
    }

    const value = localStorage.getItem(storageKey);
    if (value) {
      setSelectedTab(value);
    }

    window.addEventListener('storage', onStorageChange);
    return () => {
      window.removeEventListener('storage', onStorageChange);
    };
  }, [storageKey]);
}

type TabKey = string & { __brand: 'TabKey' };

function getTabKey(items: (TabItem | TabObjectItem)[], index: number, prefix: string): TabKey {
  const item = items[index];
  const isObject = isTabObjectItem(item);
  // if the key is defined by user, we use it
  if (isObject && item.key) {
    return item.key as TabKey;
  }
  const label = isObject ? item.label : item;
  // otherwise we use the slugified label prefixed by the tab group id, if the label is a string
  // or the index of the item in the items array prefixed by the tab group id if the label is a ReactElement
  const key = typeof label === 'string' ? slugify(label) : `${prefix}-${index.toString()}`;
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

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;
