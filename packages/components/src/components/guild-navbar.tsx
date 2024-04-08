import { DocsThemeConfig } from 'nextra-theme-docs'
import { GuildLogo, TheGuild } from '../logos'
import { Anchor } from './anchor'

export function GuildUnifiedLogo({ children, title, description }: {
  children: DocsThemeConfig['logo'];
  title: string;
  description: string;
}) {
  return (
    <>
      <Anchor
        title="View our website"
        className="flex items-center gap-x-1.5 hover:opacity-75 max-md:hidden transition-opacity"
        href="https://the-guild.dev"
      >
        <GuildLogo className="h-9 w-auto" />
        <TheGuild className="w-11" />
      </Anchor>
      <svg
        height="22"
        viewBox="0 0 10 22"
        stroke="currentColor"
        className="max-md:hidden mx-6 shrink-0"
      >
        <path d="M8.6001 0.833313L0.600097 20.8333" />
      </svg>
      {children && (
        <Anchor
          title={title}
          className="flex shrink-0 items-center gap-x-1.5 hover:opacity-75"
          href="/"
        >
          {typeof children === 'function' ? children({}) : children}
          <div>
            <h1 className="text-sm font-bold leading-tight">{title}</h1>
            <h2 className="hidden text-xs sm:block">{description}</h2>
          </div>
        </Anchor>
      )}
    </>
  )
}
