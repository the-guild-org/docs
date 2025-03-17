# @theguild/remark-mermaid

## 0.3.0

### Minor Changes

- [#2039](https://github.com/the-guild-org/docs/pull/2039)
  [`a4cf7fe`](https://github.com/the-guild-org/docs/commit/a4cf7fe3c8d4fcf6411d487d13af471f2b83deec)
  Thanks [@amorey](https://github.com/amorey)! - Update React peer dependency to include React 19

## 0.2.0

### Minor Changes

- [#1762](https://github.com/the-guild-org/docs/pull/1762)
  [`b16cee8`](https://github.com/the-guild-org/docs/commit/b16cee85a4e82165ee91c19abba8989cfa210c3f)
  Thanks [@dimaMachina](https://github.com/dimaMachina)! - `"typesVersions"` field is removed from
  `package.json`, use `"moduleResolution": "bundler"` in your `tsconfig.json`

## 0.1.3

### Patch Changes

- [#1691](https://github.com/the-guild-org/docs/pull/1691)
  [`cb506c0`](https://github.com/the-guild-org/docs/commit/cb506c0246f373f1668c6881ec0f71b111f188aa)
  Thanks [@dimaMachina](https://github.com/dimaMachina)! - fix mermaid issues
  https://github.com/shuding/nextra/issues/3291 and https://github.com/shuding/nextra/issues/3236

## 0.1.2

### Patch Changes

- [#1645](https://github.com/the-guild-org/docs/pull/1645)
  [`e380c22`](https://github.com/the-guild-org/docs/commit/e380c22d103bfbb6d0479615de12a13b5a42b409)
  Thanks [@dimaMachina](https://github.com/dimaMachina)! - add `types` field in `exports` object in
  `package.json`

## 0.1.1

### Patch Changes

- [#1642](https://github.com/the-guild-org/docs/pull/1642)
  [`70bbc88`](https://github.com/the-guild-org/docs/commit/70bbc88bde6fdf7520cd3278268bd25fcb75e72d)
  Thanks [@dimaMachina](https://github.com/dimaMachina)! - should correctly escape ` and \ in
  mermaid blocks

## 0.1.0

### Minor Changes

- [#1640](https://github.com/the-guild-org/docs/pull/1640)
  [`12aee5b`](https://github.com/the-guild-org/docs/commit/12aee5bc570b611a36d192c2bc3cd8936e52778c)
  Thanks [@dimaMachina](https://github.com/dimaMachina)! - replace
  `require.resolve('@theguild/remark-mermaid/mermaid')` by `'@theguild/remark-mermaid/mermaid'` to
  make it possible compile mermaid code blocks in browser

### Patch Changes

- [#1627](https://github.com/the-guild-org/docs/pull/1627)
  [`1233d55`](https://github.com/the-guild-org/docs/commit/1233d55cc1c1a0cd442447b8db7aef4606222304)
  Thanks [@renovate](https://github.com/apps/renovate)! - dependencies updates:
  - Updated dependency [`mermaid@^11.0.0` ↗︎](https://www.npmjs.com/package/mermaid/v/11.0.0) (from
    `^10.2.2`, in `dependencies`)

## 0.0.7

### Patch Changes

- [#1365](https://github.com/the-guild-org/docs/pull/1365)
  [`bf9cb56`](https://github.com/the-guild-org/docs/commit/bf9cb5662dff5ec340f51d32154703bb195da9a8)
  Thanks [@dimaMachina](https://github.com/dimaMachina)! - use dynamic import for loading `mermaid`

## 0.0.6

### Patch Changes

- [#1348](https://github.com/the-guild-org/docs/pull/1348)
  [`c736e8c`](https://github.com/the-guild-org/docs/commit/c736e8c2a6c0ed56a03da7f923a4933dee229908)
  Thanks [@tomasreimers](https://github.com/tomasreimers)! - Pass the container ref to mermaid
  render, add 'use client' directive for mermaid component

## 0.0.5

### Patch Changes

- [#1246](https://github.com/the-guild-org/docs/pull/1246)
  [`4e1885a`](https://github.com/the-guild-org/docs/commit/4e1885ac85392847c912aa55eb411f6aa8dff258)
  Thanks [@sanyuan0704](https://github.com/sanyuan0704)! - fix: hmr not work in Mermaid component

## 0.0.4

### Patch Changes

- [#1151](https://github.com/the-guild-org/docs/pull/1151)
  [`ded0217`](https://github.com/the-guild-org/docs/commit/ded0217953ea3d430a87db4349a4f199ad6de63a)
  Thanks [@renovate](https://github.com/apps/renovate)! - dependencies updates:
  - Updated dependency
    [`unist-util-visit@^5.0.0` ↗︎](https://www.npmjs.com/package/unist-util-visit/v/5.0.0) (from
    `^4.1.2`, in `dependencies`)

## 0.0.3

### Patch Changes

- [#1112](https://github.com/the-guild-org/docs/pull/1112)
  [`2f99481`](https://github.com/the-guild-org/docs/commit/2f99481e490dac65e36664076d9816cd7fa570da)
  Thanks [@B2o5T](https://github.com/B2o5T)! - support `data-theme="dark"` on htmlElement

- [#1105](https://github.com/the-guild-org/docs/pull/1105)
  [`35f249a`](https://github.com/the-guild-org/docs/commit/35f249a4dd0803596afd34cd450a682b5f625557)
  Thanks [@B2o5T](https://github.com/B2o5T)! - remove unneeded AST properties

## 0.0.2

### Patch Changes

- [#1097](https://github.com/the-guild-org/docs/pull/1097)
  [`ef33af3`](https://github.com/the-guild-org/docs/commit/ef33af3e62ccf2431f165527d6acb5b92be095a0)
  Thanks [@B2o5T](https://github.com/B2o5T)! - dependencies updates:

  - Updated dependency [`mermaid@^10.2.2` ↗︎](https://www.npmjs.com/package/mermaid/v/10.2.2) (from
    `10.2.1`, in `dependencies`)
  - Updated dependency
    [`unist-util-visit@^4.1.2` ↗︎](https://www.npmjs.com/package/unist-util-visit/v/4.1.2) (from
    `4.1.2`, in `dependencies`)

- [#1097](https://github.com/the-guild-org/docs/pull/1097)
  [`ef33af3`](https://github.com/the-guild-org/docs/commit/ef33af3e62ccf2431f165527d6acb5b92be095a0)
  Thanks [@B2o5T](https://github.com/B2o5T)! - do not pin dependencies

- [#1100](https://github.com/the-guild-org/docs/pull/1100)
  [`689e633`](https://github.com/the-guild-org/docs/commit/689e6337a33e2f614c2652d558c02822f1bee083)
  Thanks [@B2o5T](https://github.com/B2o5T)! - use `mutationObserver.disconnect()` for unmount

## 0.0.1

### Patch Changes

- [#1094](https://github.com/the-guild-org/docs/pull/1094)
  [`93ce024`](https://github.com/the-guild-org/docs/commit/93ce0245253a0ef225fb2dd95dd6cc4c7c239dc9)
  Thanks [@B2o5T](https://github.com/B2o5T)! - mermaid diagram was not showing while navigating from
  another page

- [#1092](https://github.com/the-guild-org/docs/pull/1092)
  [`048632e`](https://github.com/the-guild-org/docs/commit/048632e8be651a4c5f4a2d6ec0d32e4b6942aa35)
  Thanks [@B2o5T](https://github.com/B2o5T)! - release `@theguild/remark-mermaid`
