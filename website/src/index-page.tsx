import { HeroGradient, InfoList, NPMBadge } from '@theguild/components';

// @ts-expect-error -- fixes Hydration failed because the initial UI does not match what was rendered on the server
const HeroVideo = dynamic(() => import('@theguild/components').then(mod => mod.HeroVideo), { ssr: false }) as any;

export function IndexPage() {
  return (
    <>
      <HeroGradient
        title="The Guild Docs"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at gravida lacus"
        link={{
          href: '/docs',
          children: 'Get Started',
          title: 'Get started with The Guild Docs',
        }}
        version={<NPMBadge name="guild-docs" />}
        colors={['#000', '#1cc8ee']}
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
