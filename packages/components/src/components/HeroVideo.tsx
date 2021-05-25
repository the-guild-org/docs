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
}) => (
  <Wrapper>
    <Container flipped={flipped}>
      <Info>
        <h2>{title}</h2>
        <p>{description}</p>
        {link && (
          <a href={link.href} title={link.title}>
            {link.label}
          </a>
        )}
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
        />
      </Video>
    </Container>
  </Wrapper>
);
