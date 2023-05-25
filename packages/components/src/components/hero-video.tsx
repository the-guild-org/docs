import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { useMounted } from 'nextra/hooks';
import ReactPlayer from 'react-player/lazy';
import { IHeroVideoProps } from '../types/components';
import { Anchor } from './anchor';

export const HeroVideo = ({
  title,
  description,
  link,
  video,
  flipped,
  className,
  videoProps,
}: IHeroVideoProps): ReactElement => {
  const { basePath } = useRouter();
  // fixes Hydration failed error
  const mounted = useMounted();
  return (
    <section className={clsx('bg-gray-100 dark:bg-neutral-800', className)}>
      <div
        className={clsx(
          `
      container
      flex
      flex-wrap
      py-8
      md:flex-nowrap
      md:items-center
      md:justify-center
      `,
          flipped && 'md:flex-row-reverse',
        )}
      >
        <div className="mb-16 mt-8 md:my-0">
          <h2 className="m-0 max-w-sm text-2xl font-bold text-black dark:text-gray-50 md:text-3xl">
            {title}
          </h2>
          <p className="mb-3 mt-1 max-w-md text-base text-gray-500 dark:text-gray-400">
            {description}
          </p>
          {link && (
            <Anchor
              {...link}
              className={clsx(
                `
              mt-auto
              w-max
              text-sm
              text-cyan-400
              hover:text-cyan-300`,
                link.className,
              )}
            />
          )}
        </div>
        <div
          className={clsx(
            `
            h-72
            w-full
            overflow-hidden
            rounded-xl
            bg-white
            shadow-xl
            sm:h-96
            md:h-72
            md:w-3/5
            lg:h-96
            `,
            flipped ? 'md:mr-8' : 'md:ml-8',
          )}
        >
          {mounted && (
            <ReactPlayer
              url={video.src}
              light={
                video.placeholder.startsWith('/') ? basePath + video.placeholder : video.placeholder
              }
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
              {...videoProps}
            />
          )}
        </div>
      </div>
    </section>
  );
};
