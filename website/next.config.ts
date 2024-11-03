import { withGuildDocs } from '@theguild/components/next.config';

export default withGuildDocs({
  basePath: '',
  cleanDistDir: true,
  output: 'export',
  eslint: {
    // Fixes
    // ./src/pages/_meta.ts
    // website:build: Error: Parsing error: Cannot read file '/users/dmytro/desktop/guild/docs/website/tsconfig.eslint.json'.
    ignoreDuringBuilds: true,
  },
});
