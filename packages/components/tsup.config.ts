import fs from 'node:fs/promises';
import svgrPlugin from 'esbuild-plugin-svgr';
import { defineConfig, Options } from 'tsup';
import tsconfig from './tsconfig.json';

const options = defineConfig({
  format: 'esm',
  target: tsconfig.compilerOptions.target as Options['target'],
  clean: true,
});

export default defineConfig([
  {
    name: 'components',
    entry: {
      index: 'src/index.ts',
      products: 'src/products.ts',
      logos: 'src/logos/index.ts',
      compile: 'src/compile.ts',
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
        'EnvelopLogo',
        'ESLintLogo',
        'FetsLogo',
        'GuildLogo',
        'HiveLogo',
        'InspectorLogo',
        'KitQLLogo',
        'MeshLogo',
        'ModulesLogo',
        'ScalarsLogo',
        'ShieldLogo',
        'SofaLogo',
        'SSELogo',
        'StitchingLogo',
        'TheGuild',
        'ToolsLogo',
        'WhatsAppLogo',
        'WSLogo',
        'YogaLogo',
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
    entry: {
      'next.config': 'src/next.config.ts',
      compile: 'src/compile.ts',
    },
    ...options,
  },
  {
    name: 'dts',
    entry: {
      index: 'src/index.ts',
      products: 'src/products.ts',
      'next.config': 'src/next.config.ts',
      compile: 'src/compile.ts',
    },
    dts: {
      only: true,
    },
  },
]);
