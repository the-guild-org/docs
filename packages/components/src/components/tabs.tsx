import { ReactElement, ReactNode, useCallback, useEffect, useState } from 'react';
import { Tabs as NextraTabs } from 'nextra/components';

export function Tabs({
  children,
  items,
  storageKey,
  defaultIndex,
  onChange,
}: {
  children: ReactNode;
  items: string[];
  storageKey: string;
  defaultIndex?: number;
  onChange?: (index: number) => void;
}): ReactElement {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (defaultIndex !== undefined) {
      setSelectedIndex(defaultIndex);
    }
  }, [defaultIndex]);

  useEffect(() => {
    if (!storageKey) {
      // Do not listen storage events if there is no storage key
      return;
    }

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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- only on mount

  const handleChange = useCallback((index: number) => {
    if (storageKey) {
      const newValue = items[index];
      localStorage.setItem(storageKey, newValue);

      // the storage event only get picked up (by the listener) if the localStorage was changed in
      // another browser's tab/window (of the same app), but not within the context of the current tab.
      window.dispatchEvent(new StorageEvent('storage', { key: storageKey, newValue }));
      return;
    }

    setSelectedIndex(index);
    onChange?.(index);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- only on mount

  return (
    <NextraTabs selectedIndex={selectedIndex} onChange={handleChange} items={items}>
      {children}
    </NextraTabs>
  );
}
