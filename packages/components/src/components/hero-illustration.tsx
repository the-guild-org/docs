import { ReactElement } from 'react';
import clsx from 'clsx';
import { IHeroIllustrationProps } from '../types/components';
import { Button } from './button';
import { Image } from './image';

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
      gap-8
      py-8
      md:flex-nowrap
      md:justify-around`,
        flipped && 'md:flex-row-reverse'
      )}
    >
      <Image {...image} className={clsx('w-full max-w-md md:w-2/5', image.className)} />
      <div className="flex flex-col items-start gap-3">
        <h2 className="max-w-sm text-2xl font-bold text-black dark:text-gray-50 md:text-3xl">{title}</h2>
        <p className="max-w-md text-base text-gray-500 dark:text-gray-400">{description}</p>
        {link && <Button {...link} />}
      </div>
    </div>
  </section>
);
