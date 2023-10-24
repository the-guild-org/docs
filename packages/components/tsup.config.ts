import svgr from 'esbuild-plugin-svgr';
import { defineConfig, Options } from 'tsup';
import tsconfig from './tsconfig.json';

const options = defineConfig({
  format: 'esm',
  target: tsconfig.compilerOptions.target as Options['target'],
  clean: true,
  dts: true,
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
    esbuildPlugins: [
      // @ts-expect-error fixme
      svgr({
        exportType: 'named',
        typescript: true,
      }),
    ],
    ...options,
  },
  {
    name: 'components-mjs',
    entry: {
      'next.config': 'src/next.config.ts',
      compile: 'src/compile.ts',
    },
    ...options,
  },
]);
