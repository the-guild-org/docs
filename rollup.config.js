import babel from '@rollup/plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import autoExternal from 'rollup-plugin-auto-external';
import image from '@rollup/plugin-image';
import bundleSize from 'rollup-plugin-bundle-size';
import copy from 'rollup-plugin-copy'
import { join } from 'path';
import fs from 'fs';
import glob from 'glob';

const packageDirs = glob.sync('packages/*', {
  cwd: process.cwd(),
  absolute: false,
});

function bundle(
  packageDir
) {
  const tsxFile = `${packageDir}/src/index.tsx`;
  const tsFile = `${packageDir}/src/index.ts`
  const isTsx = fs.existsSync(join(__dirname, tsxFile));

  return {
    input: isTsx ? tsxFile : tsFile,
    output: [
      {
        file: join(__dirname, packageDir, 'dist/index.esm.js'),
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({ extensions: ['.ts', '.tsx'] }),
      autoExternal({
        packagePath: join(packageDir, 'package.json'),
        builtins: true,
        dependencies: true,
        peerDependencies: true,
      }),
      babel({
        extensions: ['.tsx', '.ts'],
        configFile: join(__dirname, '.babelrc'),
      }),
      image(),
      copy({
        targets: [
          {
            src: `${join(__dirname, 'dist', packageDir)}/src/**/*`,
            dest: join(__dirname, packageDir, 'dist') }
        ]
      }),
      bundleSize(),
    ]
  };
}


export default packageDirs.map(bundle)