import { ReactElement } from 'react';
import NextImage from 'next/future/image';
import clsx from 'clsx';
import { IFeatureListProps } from '../types/components';

export const FeatureList = ({
  title,
  description,
  items,
  linkProps,
  ...restProps
}: IFeatureListProps): ReactElement => (
  <section className="bg-white dark:bg-[#111]" {...restProps.wrapperProps}>
    <div className="container py-14" {...restProps.containerProps}>
      {title && (
        <div className="mb-6 flex flex-col items-center">
          <h2
            className="mt-0 mb-1.5 text-center text-2xl font-bold text-black dark:text-gray-50 md:text-3xl"
            {...restProps.titleProps}
          >
            {title}
          </h2>
          {description && (
            <div
              className="mt-1 mb-1.5 text-center text-base text-gray-500 dark:text-gray-400"
              {...restProps.descriptionProps}
            >
              {description}
            </div>
          )}
          {linkProps && (
            <a className="w-max text-sm text-cyan-400 no-underline transition hover:text-cyan-300" {...linkProps} />
          )}
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-12">
        {items.map(item => (
          <div className="flex w-56 flex-col items-center" key={title}>
            <NextImage {...item.image} className={clsx('w-28', item.image.className)} />
            <h3 className="m-0 text-lg font-bold text-black dark:text-gray-50" {...restProps.itemTitleProps}>
              {item.title}
            </h3>
            <div className="text-center text-sm text-gray-500 dark:text-gray-400" {...restProps.itemDescriptionProps}>
              {item.description}
            </div>
            {item.linkProps && (
              <a
                className="mt-auto w-max pt-2 text-sm text-cyan-400 no-underline transition hover:text-cyan-300"
                {...item.linkProps}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);
