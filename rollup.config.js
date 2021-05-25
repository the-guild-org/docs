import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import image from '@rollup/plugin-image';
import bundleSize from 'rollup-plugin-bundle-size';
import { join } from 'path';

import pkg from './packages/the-guild-components/package.json';

const external = Object.keys(pkg.dependencies)
  .concat(Object.keys(pkg.peerDependencies))
  .concat('algoliasearch/lite');

const config = {
  name: 'ComponentLibrary',
  extensions: ['.ts', '.tsx'],
};

export default {
  input: 'packages/the-guild-components/src/components/index.tsx',
  output: [
    {
      file: join(__dirname, 'packages/the-guild-components', pkg.module),
      format: 'es',
      sourcemap: true,
    },
  ],
  external,
  plugins: [
    resolve({ extensions: config.extensions }),
    commonjs({
      ignoreGlobal: true,
      include: /\/node_modules\//,
    }),
    typescript(),
    babel({
      extensions: config.extensions,
      include: ['packages/the-guild-components/src/**/*'],
      exclude: 'node_modules/**',
      configFile: join(__dirname, '.babelrc'),
    }),
    image(),
    bundleSize(),
  ],
};
