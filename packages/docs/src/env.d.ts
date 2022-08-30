declare module '@next/bundle-analyzer' {
  import type { NextConfig } from 'next';
  export default function nextBundleAnalyzer(config: { enabled: boolean }): (nextConfig: NextConfig) => NextConfig;
}
