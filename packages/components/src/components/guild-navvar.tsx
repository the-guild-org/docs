import { DocsThemeConfig, useTheme } from 'nextra-theme-docs';
import { GuildLogo, TheGuild } from '../logos';
import { Anchor } from './anchor';

export function GuildUnifiedLogo(props: {
  children: DocsThemeConfig['logo'];
  title: string;
  description: string;
}) {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex items-center justify-center py-2">
      <Anchor
        title="View our website"
        className="flex items-center gap-x-1.5 text-black hover:opacity-75 dark:text-gray-100"
        href="https://the-guild.dev"
        target="_blank"
        sameSite={false}
      >
        <GuildLogo className="hidden size-9 md:block" />
        <TheGuild className="hidden w-11 md:block" />
      </Anchor>
      <div className="hidden cursor-default select-none p-6 md:block">
        <svg
          width="10"
          height="22"
          viewBox="0 0 10 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.6001 0.833313L0.600097 20.8333"
            stroke={resolvedTheme === 'light' ? '#0B0D11' : 'white'}
          />
        </svg>
      </div>
      {props.children ? (
        <Anchor
          title={props.title}
          className="flex items-center gap-x-1.5 text-black hover:opacity-75 dark:text-gray-100"
          href="/"
        >
          {typeof props.children === 'function' ? props.children({}) : props.children}
          <div>
            <h1 className="text-sm font-bold leading-tight">{props.title}</h1>
            <h2 className="hidden text-xs sm:block">{props.description}</h2>
          </div>
        </Anchor>
      ) : null}
    </div>
  );
}
