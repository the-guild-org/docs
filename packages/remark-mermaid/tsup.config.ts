import { defineConfig, Options } from 'tsup';
import tsconfig from './tsconfig.json';

export default defineConfig([
  {
    format: 'esm',
    entry: ['src/**/*.{ts,tsx}'],
    target: tsconfig.compilerOptions.target as Options['target'],
    bundle: false,
    dts: true,
  },
]);
