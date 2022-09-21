import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

class RunPromiseWebpackPlugin {
  constructor(public asyncHook: () => Promise<void>) {}

  apply(compiler: any) {
    compiler.hooks.beforeCompile.tapPromise('RunPromiseWebpackPlugin', this.asyncHook);
  }
}

let isWarningPrinted = false;

export function applyUnderscoreRedirects(config: any, meta: any) {
  config.plugins.push(
    new RunPromiseWebpackPlugin(async () => {
      const outDir = meta.dir;
      const outFile = join(outDir, './public/_redirects');

      try {
        const redirects: any[] = meta.config.redirects
          ? Array.isArray(meta.config.redirects)
            ? meta.config.redirects
            : await meta.config.redirects()
          : [];

        if (redirects.length === 0) {
          if (!isWarningPrinted) {
            console.warn('[guild-docs] No redirects defined, no "_redirect" file is created!');
            isWarningPrinted = true;
          }
          return;
        }
        const redirectsTxt = redirects.map(r => `${r.source} ${r.destination} ${r.permanent ? 301 : 302}`).join('\n');
        await writeFile(outFile, redirectsTxt);
      } catch (error) {
        console.error('Error while generating redirects file:', error);
        throw new Error(`Failed to generate "_redirects" file during build: ${(error as Error).message}`);
      }
    })
  );
}
