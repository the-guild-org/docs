import { defineConfig } from 'tsup';

export default defineConfig([
  {
    format: 'esm',
    entry: ['src/**/*.ts'],
    bundle: false,
    dts: true,
    clean: true,
  },
]);
