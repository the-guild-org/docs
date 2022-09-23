import { defineConfig } from 'tsup';
import tsconfig from './tsconfig.json';

export default defineConfig({
  name: 'algolia',
  entry: ['src/index.ts'],
  format: 'esm',
  dts: true,
  target: tsconfig.compilerOptions.target,
});
