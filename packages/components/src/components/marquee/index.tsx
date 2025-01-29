import React, { ReactElement, ReactNode, useRef } from 'react';
import { cn } from '@theguild/components';

const PresetSpeedToMs = {
  fast: 20_000,
  normal: 40_000,
  slow: 80_000,
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
  pauseOnHover = true,
  className,
  children,
  pauseDurationSeconds = 1,
  ...rest
}: MarqueeProps) {
  const animationDuration =
    typeof speed === 'number' ? speed : PresetSpeedToMs[speed as keyof typeof PresetSpeedToMs];

  const slowingHandle = useRef<number | null>(null);
  const resumingHandle = useRef<number | null>(null);
  const time = useRef<number | null>(null);

  function tweenPlaybackRate(animation: Animation, step: number) {
    const currentHandle = step > 0 ? resumingHandle : slowingHandle;
    const oppositeHandle = step > 0 ? slowingHandle : resumingHandle;

    if (oppositeHandle.current) {
      cancelAnimationFrame(oppositeHandle.current);
      oppositeHandle.current = time.current = null;
    }

    const now = performance.now();

    if (time.current) {
      const deltaTime = now - time.current;
      const { playbackRate } = animation;

      const newValue = Math.min(Math.max(playbackRate + step * deltaTime, 0), 1);
      if (newValue === playbackRate) return;

      animation.updatePlaybackRate(newValue);
    }

    time.current = now;
    currentHandle.current = requestAnimationFrame(() => tweenPlaybackRate(animation, step));
  }

  const STEP = 1 / (pauseDurationSeconds * 1000);

  return (
    <div
      className={cn(
        '[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className,
      )}
      {...rest}
    >
      <ul
        className={cn(
          'flex w-max animate-[marquee_var(--animation-duration)_var(--animation-direction)_linear_infinite] gap-2 py-1',
        )}
        style={{
          '--animation-duration': `${animationDuration}ms`,
          '--animation-direction': direction === 'left' ? 'forwards' : 'reverse',
        }}
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
      </ul>
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
    chunks.push(children.slice(i * chunkSize, (i + 1) * chunkSize));
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
