import fs from 'node:fs/promises';
import path from 'node:path';
import svgr from 'esbuild-plugin-svgr';
import { defineConfig } from 'tsup';

export default defineConfig({
  name: 'components',
  entry: [
    'src/**/*.{ts,tsx}',
    '!**/*.stories.{ts,tsx}',
    '!src/helpers/*',
    '!src/*.d.ts',
    '!src/types/*',
  ],
  loader: {
    '.png': 'copy',
  },
  esbuildPlugins: [
    svgr({
      exportType: 'named',
      typescript: true,
      jsx: {
        // svgo's removeXMLNS plugin doesn't work for some reason...
        babelConfig: {
          plugins: [
            [
              '@svgr/babel-plugin-remove-jsx-attribute',
              { elements: ['svg'], attributes: ['xmlns'] },
            ],
          ],
        },
      },
    }),
  ],
  async onSuccess() {
    const serverPackageJSON = path.join(process.cwd(), 'dist', 'server', 'package.json');
    await fs.writeFile(serverPackageJSON, '{"type":"module","sideEffects":false}');
  },
  plugins: [
    {
      // Strip `node:` prefix from imports because
      // Next.js only polyfills `path` and not `node:path` for browser
      name: 'strip-node-colon',
      renderChunk(code) {
        const replaced = code.replaceAll(/ from "node:(?<moduleName>.*?)";/g, matched =>
          matched.replace('node:', ''),
        );
        return { code: replaced };
      },
    },
  ],
  format: 'esm',
  target: 'es2021',
  dts: true,
  bundle: false,
  outExtension: () => ({ js: '.js' }),
});
