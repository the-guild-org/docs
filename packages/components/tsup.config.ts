import svgrPlugin from 'esbuild-plugin-svgr';
import { defineConfig } from 'tsup';
import tsconfig from './tsconfig.json';

const options = defineConfig({
  format: 'esm',
  // dts: true,
  target: tsconfig.compilerOptions.target,
});

export default defineConfig([
  {
    name: 'components',
    entry: {
      index: 'src/index.ts',
      products: 'src/products.ts',
      logos: 'src/components/logos/index.ts',
    },
    loader: {
      '.png': 'copy',
    },
    outExtension: () => ({ js: '.js' }),
    external: ['semver'],
    esbuildPlugins: [svgrPlugin({ exportType: 'named', jsxRuntime: 'automatic' })],
    ...options,
  },
  {
    name: 'next.config',
    entry: ['src/next.config.ts'],
    ...options,
  },
]);
