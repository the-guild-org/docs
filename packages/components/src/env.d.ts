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
  import type { FC, SVGProps } from 'react'
  export const ReactComponent: FC<SVGProps<SVGElement>>
}
declare module '*.png';
