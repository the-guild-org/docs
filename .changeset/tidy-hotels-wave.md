---
'@theguild/components': minor
---

Add hiveMdxComponents for use in Hive-rebranding themed websites

## Usage

```js file=mdx-components.js
export { useHiveMDXComponents } from '@theguild/components/server';
import { WebsiteSpecificComponent } from './components/WebsiteSpecificComponent';

export const useMDXComponents = components => {
  return useHiveMDXComponents({
    ...components,
    WebsiteSpecificComponent,
  });
};
```
