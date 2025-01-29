import React, { Children, ReactElement, ReactNode } from 'react';
import { cn } from '@theguild/components';

const TimeToSeconds = {
  fast: '20s',
  normal: '40s',
  slow: '80s',
};

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'left' | 'right';
  speed?: keyof typeof TimeToSeconds & (string & {});
  pauseOnHover?: boolean;
  children: ReactNode;
}

export function Marquee({
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
  className,
  children,
  ...rest
}: MarqueeProps) {
  const animationDuration = TimeToSeconds[speed] || speed;

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
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
        style={{
          '--animation-duration': animationDuration,
          '--animation-direction': direction === 'left' ? 'forwards' : 'reverse',
        }}
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

export function MarqueeRows({ children, rows, pauseOnHover, speed, ...rest }: MarqueeRowsProps) {
  const chunkSize = Math.ceil(children.length / rows);
  const chunks: ReactElement[][] = [];

  for (let i = 0; i < rows; i++) {
    chunks.push(children.slice(i * chunkSize, (i + 1) * chunkSize));
  }

  return (
    <div {...rest}>
      {chunks.map((chunk, index) => (
        <Marquee
          key={index}
          direction={index % 2 ? 'left' : 'right'}
          pauseOnHover={pauseOnHover}
          speed={speed}
        >
          {chunk}
        </Marquee>
      ))}
    </div>
  );
}

MarqueeRows.Rows = MarqueeRows;
