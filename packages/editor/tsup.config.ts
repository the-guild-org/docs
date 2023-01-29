import { defineConfig } from 'tsup';
import tsconfig from './tsconfig.json';

export default defineConfig({
  name: 'editor',
  entry: ['src/index.ts'],
  format: 'esm',
  dts: true,
  target: tsconfig.compilerOptions.target,
  outExtension: () => ({ js: '.js' }),
});
