import { defineConfig } from 'tsup';
import tsconfig from './tsconfig.json';

const options = defineConfig({
  format: 'esm',
  dts: true,
  target: tsconfig.compilerOptions.target,
});

export default defineConfig([
  {
    name: 'components',
    entryPoints: {
      index: 'src/index.ts',
      products: 'src/helpers/products.tsx'
    },
    loader: {
      '.png': 'copy',
    },
    outExtension: () => ({ js: '.js' }),
    external: ['semver', '@headlessui/react'],
    ...options,
  },
  {
    name: 'next.config',
    entry: ['src/next.config.ts'],
    ...options,
  },
]);
