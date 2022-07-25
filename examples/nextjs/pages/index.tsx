import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import { InfoList, HeroGradient } from '@theguild/components';

// @ts-ignore -- fixes Hydration failed because the initial UI does not match what was rendered on the server
const HeroVideo = dynamic(() => import('@theguild/components').then(mod => mod.HeroVideo), { ssr: false }) as any;

export default function IndexPage(): ReactElement {
  return (
    <>
      <HeroGradient
        title="Easy Hero"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis ante at ex interdum tincidunt vitae quis justo."
        version="1.1.0"
        colors={['#ff34ae', '#1cc8ee']}
      />
      <InfoList
        title="Short List"
        items={[
          {
            title: 'Install',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis ante at ex interdum tincidunt vitae quis justo.',
          },
          {
            title: 'Integrate',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis ante at ex interdum tincidunt vitae quis justo.',
          },
          {
            title: 'Profit',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis ante at ex interdum tincidunt vitae quis justo.',
          },
        ]}
      />
      <HeroVideo
        flipped
        title="Simple Video"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis ante at ex interdum tincidunt vitae quis justo."
        video={{
          src: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
          placeholder: '/video-placeholder.webp',
        }}
      />
      <InfoList
        title="Short List"
        items={[
          {
            title: 'Install',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis ante at ex interdum tincidunt vitae quis justo.',
          },
          {
            title: 'Integrate',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis ante at ex interdum tincidunt vitae quis justo.',
          },
          {
            title: 'Profit',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis ante at ex interdum tincidunt vitae quis justo.',
          },
        ]}
      />
    </>
  );
}
