import { useTheme } from 'nextra-theme-docs';
import { MoonIcon } from './icons';

export function ThemeSwitcherButton() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
      className="mr-1 self-center rounded-sm p-2 outline-none focus-visible:ring"
    >
      <MoonIcon className="fill-transparent stroke-gray-500 dark:fill-gray-100 dark:stroke-gray-100" />
    </button>
  );
}
