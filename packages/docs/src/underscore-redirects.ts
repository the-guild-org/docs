import { writeFile } from 'fs/promises';
import { join } from 'path';

class RunPromiseWebpackPlugin {
  constructor(public asyncHook: () => Promise<void>) {}

  apply(compiler: any) {
    compiler.hooks.beforeCompile.tapPromise('RunPromiseWebpackPlugin', this.asyncHook);
  }
}

export function applyUnderscoreRedirects(config: any, meta: any) {
  config.plugins.push(
    new RunPromiseWebpackPlugin(async () => {
      const outDir = meta.dir;
      const outFile = join(outDir, './public/_redirects');

      try {
        const redirects: any[] = meta.config.redirects
          ? Array.isArray(meta.config.redirects)
            ? typeof meta.config.redirects
            : await meta.config.redirects()
          : [];

        if (redirects.length === 0) {
          console.warn(`No redirects defined, no "_redirect" file is created!`);
          return;
        }
        const redirectsTxt = redirects
          .map(r => `${r.source} ${r.destination} ${r.permanent ? '301' : '302'}`)
          .join('\n');
        await writeFile(outFile, redirectsTxt);
      } catch (e) {
        console.error('Error while generating redirects file:', e);
        throw new Error(`Failed to generate "_redirects" file during build: ${(e as Error).message}`);
      }
    })
  );
}
