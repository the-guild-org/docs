import { ReactElement } from 'react';
import clsx from 'clsx';
import { IFeatureListProps } from '../types/components';
import { Anchor } from './anchor';
import { Image } from './image';

export const FeatureList = ({
  title,
  description,
  items,
  link,
  className,
}: IFeatureListProps): ReactElement => (
  <section className={clsx('bg-white dark:bg-dark', className)}>
    <div className="container py-14">
      {title && (
        <div className="mb-6 flex flex-col items-center">
          <h2 className="mb-1.5 mt-0 text-center text-2xl font-bold text-black dark:text-gray-50 md:text-3xl">
            {title}
          </h2>
          {description && (
            <div className="mb-1.5 mt-1 text-center text-base text-gray-500 dark:text-gray-400">
              {description}
            </div>
          )}
          {link && (
            <Anchor
              {...link}
              className={clsx('w-max text-sm text-cyan-400 hover:text-cyan-300', link.className)}
            />
          )}
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-12">
        {items.map(item => (
          <div className="flex w-56 flex-col items-center" key={item.title}>
            <Image {...item.image} className={clsx('w-28', item.image.className)} />
            <h3 className="m-0 text-lg font-bold text-black dark:text-gray-50">{item.title}</h3>
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              {item.description}
            </div>
            {item.link && (
              <Anchor
                {...item.link}
                className={clsx(
                  'mt-2 w-max text-sm text-cyan-400 hover:text-cyan-300',
                  item.link.className,
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);
