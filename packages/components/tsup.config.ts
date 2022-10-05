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
      mermaid: 'src/mermaid.tsx',
    },
    splitting: false,
    loader: {
      '.png': 'copy',
    },
    outExtension: () => ({ js: '.js' }),
    ...options,
  },
  {
    name: 'next.config',
    entry: ['src/next.config.ts'],
    ...options,
  },
]);
