import fs from 'node:fs/promises';
import svgrPlugin from 'esbuild-plugin-svgr';
import { defineConfig } from 'tsup';
import tsconfig from './tsconfig.json';

const options = defineConfig({
  format: 'esm',
  target: tsconfig.compilerOptions.target,
});

export default defineConfig([
  {
    name: 'components',
    entry: {
      index: 'src/index.ts',
      products: 'src/products.ts',
      logos: 'src/logos/index.ts',
    },
    loader: {
      '.png': 'copy',
    },
    outExtension: () => ({ js: '.js' }),
    external: ['semver'],
    esbuildPlugins: [svgrPlugin({ exportType: 'named' })],
    async onSuccess() {
      // tsup unable generate d.ts for .svg imports https://github.com/egoist/tsup/issues/570
      const logos = [
        'AngularLogo',
        'CodeGeneratorLogo',
        'ConductorLogo',
        'ConfigLogo',
        'ESLintLogo',
        'EnvelopLogo',
        'GuildLogo',
        'HelixLogo',
        'HiveLogo',
        'InspectorLogo',
        'KitQLLogo',
        'MeshLogo',
        'ModulesLogo',
        'ScalarsLogo',
        'ShieldLogo',
        'SofaLogo',
        'SwiftLogo',
        'TheGuild',
        'ToolsLogo',
        'WhatsAppLogo',
        'YogaLogo',
        'StitchingLogo',
      ];
      await fs.writeFile(
        './dist/logos.d.ts',
        [
          "import { ComponentProps, ReactElement } from 'react'",
          "type SvgComponent = (props: ComponentProps<'svg'>) => ReactElement",
          logos.map(name => `const ${name}: SvgComponent`).join('\n'),
          `export { ${logos.join(', ')} }`,
        ].join('\n\n'),
      );
    },
    ...options,
  },
  {
    name: 'next.config',
    entry: ['src/next.config.ts'],
    ...options,
  },
  {
    name: 'dts',
    entry: {
      index: 'src/index.ts',
      products: 'src/products.ts',
      'next.config': 'src/next.config.ts',
    },
    dts: {
      only: true,
    },
  },
]);
