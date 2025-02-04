'use client';

import React, { ReactElement, ReactNode } from 'react';
import { cn } from '@theguild/components';
import { useTweenPlaybackRate } from './use-tween-playback-rate';

const PresetSpeedToMs = {
  fast: 20_000,
  normal: 40_000,
  slow: 60_000,
};

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'left' | 'right';
  speed?: keyof typeof PresetSpeedToMs | number;
  pauseOnHover?: boolean;
  /**
   * Seconds to stop the animation
   */
  pauseDurationSeconds?: number;
  children: ReactNode;
}

export function Marquee({
  direction = 'left',
  speed = 'normal',
  pauseOnHover = false,
  className,
  children,
  pauseDurationSeconds = 1,
  ...rest
}: MarqueeProps) {
  const animationDuration =
    typeof speed === 'number' ? speed : PresetSpeedToMs[speed as keyof typeof PresetSpeedToMs];

  const tweenPlaybackRate = useTweenPlaybackRate();

  const STEP = 1 / (pauseDurationSeconds * 1000);

  return (
    <div
      className={cn(
        '[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className,
      )}
      {...rest}
    >
      <div
        className={cn(
          'flex w-max animate-[marquee_var(--animation-duration)_var(--animation-direction)_linear_infinite] gap-1 py-0.5 sm:gap-2 sm:py-1',
        )}
        style={
          {
            '--animation-duration': `${animationDuration}ms`,
            '--animation-direction': direction === 'left' ? 'forwards' : 'reverse',
            // eslint-disable-next-line @typescript-eslint/no-empty-object-type
          } as {}
        }
        onMouseEnter={
          pauseOnHover
            ? event => {
                const animation = event.currentTarget.getAnimations()[0];
                if (animation) tweenPlaybackRate(animation, -STEP);
              }
            : undefined
        }
        onMouseLeave={
          pauseOnHover
            ? event => {
                const animation = event.currentTarget.getAnimations()[0];
                if (animation) tweenPlaybackRate(animation, STEP);
              }
            : undefined
        }
      >
        {children}
        {children}
      </div>
      <style href="Marquee-keyframes">
        {
          /* css */ `
          @keyframes marquee {
            to {
              translate: calc(-50% - .5rem);
            }
          }
        `
        }
      </style>
    </div>
  );
}

export interface MarqueeRowsProps
  extends React.HTMLAttributes<HTMLElement>,
    Pick<MarqueeProps, 'pauseOnHover' | 'speed'> {
  rows: number;
  children: ReactElement[];
}

export function MarqueeRows({
  children,
  rows,
  pauseOnHover,
  speed,
  className,
  ...rest
}: MarqueeRowsProps) {
  const chunkSize = Math.ceil(children.length / rows);
  const chunks: ReactElement[][] = [];

  for (let i = 0; i < rows; i++) {
    const chunk = children.slice(i * chunkSize, (i + 1) * chunkSize);

    if (chunk.length !== 0) {
      chunks.push(chunk);
    }
  }

  return (
    <div className={cn('overflow-hidden', className)} {...rest}>
      {chunks.map((chunk, index) => (
        <Marquee
          key={index}
          direction={index % 2 ? 'left' : 'right'}
          pauseOnHover={pauseOnHover}
          speed={speed}
        >
          {chunk}
          {index === chunks.length - 1 && chunk}
        </Marquee>
      ))}
    </div>
  );
}

MarqueeRows.Rows = MarqueeRows;
