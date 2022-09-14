import { ReactElement } from 'react';
import ReactPlayerImport from 'react-player/lazy/index.js';
import clsx from 'clsx';
import { IHeroVideoProps } from '../types/components';
import { getDefault } from '../helpers/utils.js';
import { Anchor } from './anchor.js';
import { useRouter } from 'next/router.js';

const ReactPlayer = getDefault(ReactPlayerImport);

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
          flipped && 'md:flex-row-reverse'
        )}
      >
        <div className="mt-8 mb-16 md:my-0">
          <h2 className="m-0 max-w-sm text-2xl font-bold text-black dark:text-gray-50 md:text-3xl">{title}</h2>
          <p className="mt-1 mb-3 max-w-md text-base text-gray-500 dark:text-gray-400">{description}</p>
          {link && (
            <Anchor
              {...link}
              className={clsx(
                `
              mt-auto
              w-max
              text-sm
              text-cyan-400
              no-underline
              transition
              hover:text-cyan-300`,
                link.className
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
            flipped ? 'md:mr-8' : 'md:ml-8'
          )}
        >
          <ReactPlayer
            url={video.src}
            light={video.placeholder.startsWith('/') ? basePath + video.placeholder : video.placeholder}
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
        </div>
      </div>
    </section>
  );
};
