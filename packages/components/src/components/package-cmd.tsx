import { ReactElement } from 'react';
import { Tab, Tabs } from 'nextra-theme-docs';
import { Pre } from 'nextra/components';

const PACKAGE_MANAGERS = ['yarn', 'npm', 'pnpm'] as const;

type PackageMap = Record<typeof PACKAGE_MANAGERS[number], string>;

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

export const PackageCmd = ({ packages }: { packages: (string | Command)[] }): ReactElement => {
  const pkgs = packages.map(pkg =>
    typeof pkg === 'string'
      ? ({
          name: pkg,
          cmd: 'add',
        } as Command)
      : pkg
  );

  return (
    <Tabs items={PACKAGE_MANAGERS}>
      {PACKAGE_MANAGERS.map(pkgManager => (
        <Tab key={pkgManager}>
          <div data-rehype-pretty-code-fragment>
            <Pre data-nextra-copy="">
              <code data-language="sh" data-theme="default">
                <span className="line" style={{ color: 'var(--shiki-color-text)' }}>
                  {pkgs
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
                    .join('\n')}
                </span>
              </code>
            </Pre>
          </div>
        </Tab>
      ))}
    </Tabs>
  );
};
