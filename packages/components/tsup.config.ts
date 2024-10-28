import fs from 'node:fs/promises';
import path from 'node:path';
import svgr from 'esbuild-plugin-svgr';
import { defineConfig, Options } from 'tsup';

const options: Options = {
  format: 'esm',
  target: 'es2021',
  dts: true,
  outExtension: () => ({ js: '.js' }),
};

const PATH_WITH_SVG = [
  'src/logos/index.tsx',
  'src/components/icons/index.ts',
  'src/components/decorations/index.tsx',
];

export default defineConfig([
  {
    ...options,
    name: 'components',
    entry: [
      'src/**/*.{ts,tsx}',
      'src/static/illustrations/*.png',
      '!**/*.stories.{ts,tsx}',
      '!src/helpers/dummy.ts',
      '!src/*.d.ts',
      ...PATH_WITH_SVG.map(filePath => `!${filePath}`),
    ],
    bundle: false,
    loader: {
      '.png': 'copy',
    },
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
  },
  // We need to bundle svg files separately, due required `bundle: true` option which is set by default
  {
    ...options,
    name: 'components/icons',
    entry: Object.fromEntries(
      PATH_WITH_SVG.map(filePath => [
        filePath.replace('src/', '').replace(/\.tsx?$/, ''),
        filePath,
      ]),
    ),
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
  },
]);
