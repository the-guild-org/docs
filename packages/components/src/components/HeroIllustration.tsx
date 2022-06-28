import { FC } from 'react';
import { IHeroIllustrationProps } from '../types/components';
import clsx from 'clsx';

export const HeroIllustration: FC<IHeroIllustrationProps> = ({
  title,
  description,
  link,
  image,
  flipped,
  ...restProps
}) => (
  <section className="bg-white font-default dark:bg-gray-900" {...restProps.wrapperProps}>
    <div
      className={clsx(
        `
      flex
      flex-wrap
      items-center
      justify-center
      py-8
      container-min
      md:flex-nowrap
      md:justify-between
    `,
        flipped && 'md:flex-row-reverse'
      )}
      {...restProps.containerProps}
    >
      <img
        className={clsx('mb-6 flex w-full max-w-md md:mb-0 md:w-2/5', flipped ? 'md:ml-8' : 'md:mr-8')}
        src={image.src}
        alt={image.alt}
        {...restProps.imageProps}
      />
      <div className="mb-6 md:mb-0">
        <h2
          className="m-0 max-w-sm text-2xl font-bold text-black dark:text-gray-50 md:text-3xl"
          {...restProps.titleProps}
        >
          {title}
        </h2>
        <p className="mt-1 mb-3 max-w-md text-base text-gray-500 dark:text-gray-400" {...restProps.descriptionProps}>
          {description}
        </p>
        {link && (
          <a
            className="mt-auto w-max text-sm text-cyan-400 no-underline transition hocus:text-cyan-300"
            {...link}
            {...restProps.linkProps}
          />
        )}
      </div>
    </div>
  </section>
);
