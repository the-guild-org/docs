# `@theguild/remark-mermaid`

> Created by Dimitri POSTOLOV https://twitter.com/B2o5T.
>
> Maintained by The Guild https://twitter.com/TheGuildDev.

Remark plugin for transforming npm bash commands to yarn/pnpm with tabs.

## Install

```sh
npm i @theguild/remark-npm2yarn
```

## Usage

```jsx
import { remark } from 'remark'
import { remarkNpm2Yarn } from 'remark-npm2yarn'

remark.use(remarkNpm2Yarn, {
  packageName: '<string>', // nextra/components
  tabNamesProp: '<string>' // items
})
```

````mdx
```sh npm2yarn
npm i -D @graphql-eslint/eslint-plugin
```
````
