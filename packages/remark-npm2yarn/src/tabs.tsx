import { Children, ReactElement, ReactNode, useCallback, useEffect, useState } from 'react';
import { Tabs as NextraTabs, Tab } from 'nextra-theme-docs';
import { PackageManager } from './constants';

const STORAGE_KEY = 'packageManager';

export function Tabs({
  children,
  packageManagers,
}: {
  children: ReactNode;
  packageManagers: PackageManager[];
}): ReactElement {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    function fn(event: StorageEvent) {
      if (event.key === STORAGE_KEY) {
        setSelectedIndex(packageManagers.indexOf(event.newValue as PackageManager));
      }
    }

    const index = packageManagers.indexOf(localStorage.getItem(STORAGE_KEY) as PackageManager);
    setSelectedIndex(index === -1 ? 0 : index);

    window.addEventListener('storage', fn);
    return () => {
      window.removeEventListener('storage', fn);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on mount
  }, []);

  const handleChange = useCallback((index: number) => {
    localStorage.setItem(STORAGE_KEY, packageManagers[index]);
    // the storage event only get picked up (by the listener) if the localStorage was changed in
    // another browser's tab/window (of the same app), but not within the context of the current tab.
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: STORAGE_KEY,
        newValue: packageManagers[index],
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on mount
  }, []);

  return (
    <NextraTabs selectedIndex={selectedIndex} onChange={handleChange} items={packageManagers}>
      {Children.map(children, (child, index) => (
        <Tab key={packageManagers[index]}>{child}</Tab>
      ))}
    </NextraTabs>
  );
}
