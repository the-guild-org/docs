declare module '@next/bundle-analyzer' {
  import { NextConfig } from 'next';
  export default function nextBundleAnalyzer(config: { enabled: boolean }): (nextConfig: NextConfig) => NextConfig;
}
