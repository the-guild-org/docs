import { ReactElement, ReactNode, useCallback, useEffect, useState } from 'react';
import { Tabs as NextraTabs } from 'nextra-theme-docs';

export function Tabs({
  children,
  items,
  storageKey,
}: {
  children: ReactNode;
  items: string[];
  storageKey: string;
}): ReactElement {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    function fn(event: StorageEvent) {
      if (event.key === storageKey) {
        setSelectedIndex(items.indexOf(event.newValue!));
      }
    }

    const index = items.indexOf(localStorage.getItem(storageKey)!);
    setSelectedIndex(index === -1 ? 0 : index);

    window.addEventListener('storage', fn);
    return () => {
      window.removeEventListener('storage', fn);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on mount
  }, []);

  const handleChange = useCallback((index: number) => {
    const newValue = items[index];
    localStorage.setItem(storageKey, newValue);

    // the storage event only get picked up (by the listener) if the localStorage was changed in
    // another browser's tab/window (of the same app), but not within the context of the current tab.
    window.dispatchEvent(new StorageEvent('storage', { key: storageKey, newValue }));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on mount
  }, []);

  return (
    <NextraTabs selectedIndex={selectedIndex} onChange={handleChange} items={items}>
      {children}
    </NextraTabs>
  );
}
