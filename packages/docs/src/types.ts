import type { DefaultSeoProps, OpenGraphMedia } from 'next-seo/lib/types';

export interface AppSeoProps extends DefaultSeoProps {
  title: string;
  description: string;
  logo: OpenGraphMedia;
}
