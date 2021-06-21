import React from 'react';
import ReactPlayer from 'react-player/lazy';

import { Wrapper, Container, Info, Video } from './HeroVideo.styles';

import { IHeroVideoProps } from '../types/components';

export const HeroVideo: React.FC<IHeroVideoProps> = ({
  title,
  description,
  link,
  video,
  flipped,
  ...restProps
}) => (
  <Wrapper {...restProps.wrapperProps}>
    <Container flipped={flipped} {...restProps.containerProps}>
      <Info>
        <h2 {...restProps.titleProps}>{title}</h2>
        <p {...restProps.descriptionProps}>{description}</p>
        {link && <a {...link} {...restProps.linkProps}/>}
      </Info>
      <Video flipped={flipped}>
        <ReactPlayer
          url={video.src}
          light={video.placeholder}
          controls
          height="100%"
          width="100%"
          config={{
            youtube: {
              playerVars: {
                autoplay: 1,
              },
            },
          }}
          {...restProps.videoProps}
        />
      </Video>
    </Container>
  </Wrapper>
);
