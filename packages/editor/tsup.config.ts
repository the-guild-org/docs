import { defineConfig, Options } from 'tsup';
import tsconfig from './tsconfig.json';

export default defineConfig({
  name: 'editor',
  entry: ['src/index.ts'],
  format: 'esm',
  dts: true,
  target: tsconfig.compilerOptions.target as Options['target'],
  outExtension: () => ({ js: '.js' }),
});
