import { ReactElement } from 'react';
import NextImage from 'next/future/image';
import NextLink from 'next/link';
import clsx from 'clsx';
import { IHeroIllustrationProps } from '../types/components';

export const HeroIllustration = ({
  title,
  description,
  link,
  image,
  flipped,
  className,
}: IHeroIllustrationProps): ReactElement => (
  <section className={clsx('bg-white dark:bg-[#111]', className)}>
    <div
      className={clsx(
        `
      container
      flex
      flex-wrap
      items-center
      justify-center
      py-8
      md:flex-nowrap
      md:justify-between`,
        flipped && 'md:flex-row-reverse'
      )}
    >
      <NextImage
        {...image}
        className={clsx('mb-6 flex w-full max-w-md md:mb-0 md:w-2/5', flipped ? 'md:ml-8' : 'md:mr-8', image.className)}
      />
      <div className="mb-6 md:mb-0">
        <h2 className="m-0 max-w-sm text-2xl font-bold text-black dark:text-gray-50 md:text-3xl">{title}</h2>
        <p className="mt-1 mb-3 max-w-md text-base text-gray-500 dark:text-gray-400">{description}</p>
        {link && (
          <NextLink
            {...link}
            className={clsx(
              'mt-auto w-max text-sm text-cyan-400 no-underline transition hover:text-cyan-300',
              link.className
            )}
          />
        )}
      </div>
    </div>
  </section>
);
