import cp from 'node:child_process';
import path from 'node:path';
import semver from 'semver';
import { read as readConfig } from '@changesets/config';
import readChangesets from '@changesets/read';
import assembleReleasePlan from '@changesets/assemble-release-plan';
import applyReleasePlan from '@changesets/apply-release-plan';
import { getPackages } from '@manypkg/get-packages';

function getNewVersion(version, type) {
  const gitHash = cp.spawnSync('git', ['rev-parse', '--short', 'HEAD']).stdout.toString().trim();

  return semver.inc(version, `pre${type}`, true, `alpha-${gitHash}`);
}

function getRelevantChangesets(baseBranch) {
  const comparePoint = cp
    .spawnSync('git', ['merge-base', `origin/${baseBranch}`, 'HEAD'])
    .stdout.toString()
    .trim();
  const listModifiedFiles = cp
    .spawnSync('git', ['diff', '--name-only', comparePoint])
    .stdout.toString()
    .trim()
    .split('\n');

  return listModifiedFiles.filter(f => f.startsWith('.changeset')).map(f => path.basename(f, '.md'));
}

async function updateVersions() {
  const cwd = process.cwd();
  const packages = await getPackages(cwd);
  const config = await readConfig(cwd, packages);
  const modifiedChangesets = getRelevantChangesets(config.baseBranch);
  const changesets = (await readChangesets(cwd)).filter(change => modifiedChangesets.includes(change.id));

  if (changesets.length === 0) {
    console.warn(`Unable to find any relevant package for canary publishing. Please make sure changesets exists!`);
    process.exit(1);
  } else {
    const releasePlan = assembleReleasePlan(changesets, packages, config, [], false);

    if (releasePlan.releases.length === 0) {
      console.warn(`Unable to find any relevant package for canary releasing. Please make sure changesets exists!`);
      process.exit(1);
    } else {
      for (const release of releasePlan.releases) {
        if (release.type !== 'none') {
          release.newVersion = getNewVersion(release.oldVersion, release.type);
        }
      }

      await applyReleasePlan(
        releasePlan,
        packages,
        {
          ...config,
          commit: false,
        },
        false,
        true
      );
    }
  }
}

updateVersions()
  .then(() => {
    console.info(`Done!`);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
