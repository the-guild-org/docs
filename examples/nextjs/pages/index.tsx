import React, { ReactElement } from 'react';
import { InfoList, HeroGradient, HeroVideo } from '@theguild/components';

export default function Index(): ReactElement {
  return (
    <>
      <HeroGradient
        title="Easy Hero"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis ante at ex interdum tincidunt vitae quis justo."
        version="1.1.0"
        colors={['#FF34AE', '#1CC8EE']}
      />
      <InfoList
        {...{
          title: 'Short List',
          items: [
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
          ],
        }}
      />
      <HeroVideo
        flipped
        title="Simple Video"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis ante at ex interdum tincidunt vitae quis justo."
        video={{
          src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          placeholder: '/video-placeholder.webp',
        }}
      />
      <InfoList
        {...{
          title: 'Short List',
          items: [
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
          ],
        }}
      />
    </>
  );
}
