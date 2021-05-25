import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import image from '@rollup/plugin-image';
import bundleSize from 'rollup-plugin-bundle-size';

import pkg from './packages/the-guild-components/package.json';

const external = Object.keys(pkg.dependencies)
  .concat(Object.keys(pkg.peerDependencies))
  .concat(['algoliasearch/lite', 'react-player/lazy', 'object-assign']);

const config = {
  name: 'ComponentLibrary',
  extensions: ['.ts', '.tsx'],
};

export default {
  input: './packages/the-guild-components/src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: 'inline',
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: 'inline',
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
      include: ['./packages/the-guild-components/src/**/*'],
      exclude: 'node_modules/**',
      configFile: './.babelrc',
    }),

    image(),
    bundleSize(),
  ],
};
