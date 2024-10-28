import tailwindConfig from '@theguild/tailwind-config';

export default {
  ...tailwindConfig,
  content: [...tailwindConfig.content, './app/**/*.{tsx,mdx}'],
};
