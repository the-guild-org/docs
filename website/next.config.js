import { withGuildDocs } from '@theguild/components/next.config';

export default withGuildDocs({
  basePath: '',
  cleanDistDir: true,
  output: 'export',
});
