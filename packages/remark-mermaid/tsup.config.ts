import { defineConfig } from 'tsup';

export default defineConfig([
  {
    format: 'esm',
    entry: ['src/**/*.{ts,tsx}', '!**/*.test.{ts,tsx}'],
    bundle: false,
    dts: true,
    clean: true,
  },
]);
