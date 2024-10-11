declare module '@next/bundle-analyzer' {
  import { NextConfig } from 'next';

  export default function nextBundleAnalyzer(config: {
    enabled: boolean;
  }): (nextConfig: NextConfig) => NextConfig;
}

declare module 'next-videos' {
  import { NextConfig } from 'next';

  export default function nextVideos(nextConfig: NextConfig): NextConfig;
}

declare module '*.svg' {
  // eslint-disable-next-line @typescript-eslint/no-restricted-imports
  import { FC, SVGProps } from 'react';
  export const ReactComponent: FC<SVGProps<SVGElement>>;
  const src: string;
  export default src;
}

declare module '*.png';

interface Window {
  $crisp?: {
    push(cmd: string[]): void;
  };
}
