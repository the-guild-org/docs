import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import { join } from 'path';

import pkg from './packages/the-guild-components/package.json';

const config = {
  name: 'ComponentLibrary',
  extensions: ['.ts', '.tsx'],
};

export default {
  input: 'packages/the-guild-components/src/components/index.tsx',
  output: [
    {
      // ES Modules: Modern browser imports

      // Browser usage:
      // <script type="module">
      //   import { func } from 'my-lib';
      //   func();
      // </script>

      // js/tsx file usage:
      // import { func } from 'my-lib';
      // func();
      file: join(__dirname, 'packages/the-guild-components', pkg.module),
      format: 'es',
      sourcemap: true,
    },
  ],
  external: ['algoliasearch/lite', 'react-instantsearch-dom'],
  plugins: [
    // Automatically add peerDependencies to the `external` config
    // https://rollupjs.org/guide/en/#external
    peerDepsExternal(),

    // External modules not to include in your bundle (eg: 'lodash', 'moment' etc.)
    // https://rollupjs.org/guide/en/#external
    // external: []

    resolve({ extensions: config.extensions }),

    commonjs({
      ignoreGlobal: true,
      include: /\/node_modules\//,
      namedExports: {
        react: Object.keys(require('react')),
        'react-is': Object.keys(require('react-is')),
      },
    }),

    typescript(),

    babel({
      extensions: config.extensions,
      include: ['packages/the-guild-components/src/**/*'],
      exclude: 'node_modules/**',
      configFile: join(__dirname, '.babelrc'),
    }),

    image(),
    json(),
  ],
};
