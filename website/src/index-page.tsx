import { HeroGradient, HeroVideo, InfoList, NPMBadge, ProductUpdates } from '@theguild/components';

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
        version={<NPMBadge name="@theguild/components" />}
        colors={['#000', '#1cc8ee']}
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
      <ProductUpdates
        changelogs={[
          {
            title: 'New Feature',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis ante at ex interdum tincidunt vitae quis justo.',
            date: '2022-01-01',
            route: '/changelog',
          },
          {
            title: 'Bugfix',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis ante at ex interdum tincidunt vitae quis justo.',
            date: '2022-01-01',
            route: '/changelog',
          },
        ]}
      />
    </>
  );
}
