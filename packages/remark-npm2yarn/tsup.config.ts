import { defineConfig, Options } from 'tsup';
import tsconfig from './tsconfig.json';

export default defineConfig([
  {
    format: 'esm',
    entry: ['src/**/*.ts'],
    target: tsconfig.compilerOptions.target as Options['target'],
    bundle: false,
  },
  {
    name: 'dts',
    entry: ['src/**/*.ts'],
    dts: {
      only: true,
    },
  },
]);
