import { defineConfig, Options } from 'tsup';
import tsconfig from './tsconfig.json';

export default defineConfig({
  name: 'algolia',
  entry: ['src/index.ts', 'src/bin.ts'],
  format: 'esm',
  dts: true,
  target: tsconfig.compilerOptions.target as Options['target'],
});
