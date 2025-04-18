import { ReactElement, useMemo } from 'react';
import { Pre, Tabs } from 'nextra/components';

const PACKAGE_MANAGERS = ['yarn', 'npm', 'pnpm'];

type PackageMap = Record<(typeof PACKAGE_MANAGERS)[number], string>;

const Add: PackageMap = {
  yarn: 'yarn add',
  npm: 'npm install',
  pnpm: 'pnpm add',
};

const Run: PackageMap = {
  yarn: 'yarn',
  npm: 'npm run',
  pnpm: 'pnpm',
};

const Install: PackageMap = {
  yarn: 'yarn',
  npm: 'npm install',
  pnpm: 'pnpm install',
};

const Init: PackageMap = {
  yarn: 'yarn init --yes',
  npm: 'npm init --yes',
  pnpm: 'pnpm init',
};

const Global: PackageMap = {
  yarn: 'yarn global add',
  npm: 'npm install --global',
  pnpm: 'pnpm add --global',
};

type Command = {
  name: string;
  cmd: 'add' | 'run' | 'install' | 'init';
  isNpx?: boolean;
  isGlobal?: boolean;
};

export const LegacyPackageCmd = ({
  packages,
}: {
  packages: (string | Command)[];
}): ReactElement => {
  const commands = useMemo(
    () =>
      PACKAGE_MANAGERS.map(pkgManager =>
        packages
          .map(pkg => (typeof pkg === 'string' ? ({ name: pkg, cmd: 'add' } as Command) : pkg))
          .map(pkg => {
            switch (pkg.cmd) {
              case 'run':
                return `${pkgManager === 'npm' && pkg.isNpx ? 'npx' : Run[pkgManager]} ${pkg.name}`;
              case 'install':
                return `${Install[pkgManager]}${pkg.name ? ` ${pkg.name}` : ''}`;
              case 'init':
                return Init[pkgManager];
              default:
                return `${pkg.isGlobal ? Global[pkgManager] : Add[pkgManager]} ${pkg.name}`;
            }
          })
          .join('\n'),
      ),
    [packages],
  );

  return (
    <Tabs items={PACKAGE_MANAGERS}>
      {PACKAGE_MANAGERS.map((pkgManager, index) => (
        <Tabs.Tab key={pkgManager}>
          <Pre data-filename="Terminal" data-copy="" data-language="sh" data-theme="default">
            <code>
              {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
              <span className="line mx-4">{commands[index]}</span>
            </code>
          </Pre>
        </Tabs.Tab>
      ))}
    </Tabs>
  );
};
