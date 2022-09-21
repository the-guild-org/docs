import { promises } from 'fs';
import { request } from 'undici';
import { lru } from 'tiny-lru';
import { withoutStartingSlash, withoutTrailingSlash, withStartingSlash } from './utils.js';

export interface PackageInfo {
  name: string;
  version: string;
  description?: string;
  repository?:
    | string
    | {
        type?: string;
        url?: string;
        directory?: string;
      };
  repositoryLink?: string;
  repositoryDirectory?: string;
  readme?: string;
  license?: string;
  createdDate: string;
  modifiedDate: string;
  weeklyNPMDownloads?: number;
}

export interface Package<Tags extends string = string> {
  identifier: string;
  title: string;
  npmPackage: string;
  tags: Tags[];
  readme?: string;
  iconUrl?: string;
  githubReadme?: {
    repo: string;
    path: string;
  };
  devFilePath?: string;
}

export interface PackageWithStats<Tags extends string = string> extends Package<Tags> {
  stats: PackageInfo | undefined | null;
}

const cache = lru(100, 3.6e6); // 1h

export const cleanGitRepoLink = (repo: string) => repo.replace(/^git\+/, '').replace(/\.git$/, '');

export async function getPackageStats(name: string): Promise<PackageInfo | null> {
  try {
    const encodedName = encodeURIComponent(name);
    const [
      {
        readme,
        time: { created, modified },
        repository,
      },
      latestVersion,
      { downloads: weeklyNPMDownloads },
    ] = await Promise.all([
      request(`https://registry.npmjs.org/${encodedName}`).then(
        v =>
          v.body.json() as Promise<{
            repository?:
              | string
              | {
                  type?: string;
                  url?: string;
                  directory?: string;
                };
            readme?: string;
            time: { created: string; modified: string };
          }>
      ),
      request(`https://registry.npmjs.org/${encodedName}/latest`).then(
        v =>
          v.body.json() as Promise<{
            name: string;
            version: string;
            description?: string;
            repository?:
              | string
              | {
                  type?: string;
                  url?: string;
                  directory?: string;
                };
            license?: string;
          }>
      ),
      request(`https://api.npmjs.org/downloads/point/last-week/${encodedName}`)
        .then(
          v =>
            v.body.json() as Promise<
              | {
                  downloads: number;
                  start: string;
                  end: string;
                  package: string;
                }
              | { error: string; downloads?: undefined }
            >
        )
        .catch((err): { downloads?: undefined } => {
          console.error(err);
          return {};
        }),
    ]);

    const repoString = repository ? (typeof repository === 'string' ? repository : repository?.url) : undefined;

    const repositoryLink = repoString ? cleanGitRepoLink(repoString) : undefined;
    const repositoryDirectory = typeof repository === 'string' ? undefined : repository?.directory;

    return removeUndefineds({
      ...latestVersion,
      readme,
      createdDate: created,
      modifiedDate: modified,
      repositoryLink,
      repositoryDirectory,
      weeklyNPMDownloads,
    });
  } catch (e) {
    console.error(e);
    return null;
  }
}

export interface GetPackagesOptions<Tags extends string = string> {
  idSpecific?: string | null;
  packageList: Package<Tags>[];
}

export async function getPackagesData<Tags extends string = string>({
  idSpecific,
  packageList,
}: GetPackagesOptions<Tags>): Promise<PackageWithStats<Tags>[]> {
  let packages = packageList;

  if (idSpecific) {
    const rawData = packageList.find(t => t.identifier === idSpecific);

    if (!rawData) return [];

    packages = [rawData];
  }

  const allPackages = await Promise.all(
    packages.map(async (rawData): Promise<PackageWithStats<Tags>> => {
      const statsPromise = cache.get(rawData.title) || getPackageStats(rawData.npmPackage);

      const readmePromise = (async () => {
        if (rawData.readme) {
          return rawData.readme;
        }
        if (rawData.devFilePath && process.env.NODE_ENV === 'development') {
          return promises.readFile(rawData.devFilePath, {
            encoding: 'utf-8',
          });
        }
        if (rawData.githubReadme) {
          const fetchPath = `https://raw.githubusercontent.com/${withoutStartingSlash(
            withoutTrailingSlash(rawData.githubReadme.repo)
          )}/HEAD${withStartingSlash(rawData.githubReadme.path)}`;
          try {
            const response = await request(fetchPath, {
              method: 'GET',
            });

            if (response.statusCode === 404) {
              console.error(`[GUILD-DOCS] ERROR | ${fetchPath} Not Found`);
              return;
            }

            const text = await response.body.text();

            return text;
          } catch (err) {
            console.error(`[GUILD-DOCS] ERROR | Error while trying to get README from GitHub ${fetchPath}`);
            console.error(err);
          }
        }
        const stats = await statsPromise;

        if (stats?.repositoryDirectory && stats.repositoryLink) {
          const path = withoutTrailingSlash(withStartingSlash(stats.repositoryDirectory));

          const fetchPath = `${withoutTrailingSlash(
            stats.repositoryLink.replace('https://github.com', 'https://raw.githubusercontent.com')
          )}/HEAD${path}/README.md`;

          try {
            const response = await request(fetchPath, { method: 'GET' });

            if (response.statusCode === 404) {
              console.error(`[GUILD-DOCS] ERROR | ${fetchPath} Not Found`);
              return;
            }

            return await response.body.text();
          } catch (err) {
            console.error(`[GUILD-DOCS] ERROR | Error while trying to get README from GitHub ${fetchPath}`);
            console.error(err);
          }
        }

        if (stats?.readme) return stats.readme;

        return;
      })();

      const [stats, readme] = await Promise.all([statsPromise, readmePromise]);

      if (!readme) {
        console.warn(`[GUILD-DOCS] WARNING | README could not be found for ${rawData.identifier}`);
      }

      if (stats && !cache.has(rawData.title)) {
        cache.set(rawData.title, stats);
      }

      const data = {
        ...rawData,
        readme,
        stats,
      };

      return removeUndefineds(data);
    })
  );

  return allPackages;
}

export const removeUndefineds = <T extends object>(v: T): T => {
  for (const key in v) {
    if (v[key] === undefined) {
      delete v[key];
    }
  }
  return v;
};
