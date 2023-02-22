import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  test: {
    globals: true,
    setupFiles: `${__dirname}/setup-file.ts`,
  },
});
