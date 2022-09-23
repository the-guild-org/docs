import { defineConfig } from 'tsup';
import tsconfig from './tsconfig.json';

const options = defineConfig({
  format: 'esm',
  dts: true,
  target: tsconfig.compilerOptions.target,
  outExtension: () => ({ js: '.mjs' }),
});

export default defineConfig([
  {
    name: 'components',
    entry: ['src/index.ts'],
    ...options,
    outExtension: () => ({ js: '.js' }),
  },
  {
    name: 'components/next.config',
    entry: ['src/next.config.ts'],
    ...options,
  },
  {
    name: 'components/mermaid',
    entry: ['src/mermaid.tsx'],
    ...options,
  },
  {
    name: 'components/npm',
    entry: ['src/npm.ts'],
    ...options,
  },
]);
