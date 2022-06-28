import { FC } from 'react';
import { IFeatureListProps } from '../types/components';

export const FeatureList: FC<IFeatureListProps> = ({ title, titleDescription, items, link, ...restProps }) => (
  <section className="bg-white font-default dark:bg-gray-900" {...restProps.wrapperProps}>
    <div className="py-14 container" {...restProps.containerProps}>
      {title && (
        <div className="mb-6 flex flex-wrap justify-center px-24" {...restProps.titleProps}>
          <h2 className="mt-0 mb-1.5 text-center text-2xl font-bold text-black dark:text-gray-50 md:text-3xl">
            {title}
          </h2>
          {titleDescription && (
            <p
              className="mt-1 mb-1.5 text-center text-base text-gray-500 dark:text-gray-400"
              {...restProps.titleDescriptionProps}
            >
              {titleDescription}
            </p>
          )}
          {link && (
            <a
              className="mt-auto w-max text-sm text-cyan-400 no-underline transition hover:text-cyan-300"
              {...link}
              {...restProps.linkProps}
            />
          )}
        </div>
      )}
      <div className="flex flex-wrap justify-center">
        {items.map((item, index) => (
          <article
            className="mx-5 mb-1 flex w-56 flex-col items-center text-center last:mb-0 md:mb-0"
            key={`feature-${index}`}
          >
            <img src={item.image.src} alt={item.image.alt} className="w-28" {...restProps.itemImageProps} />
            <h3 className="m-0 text-lg font-bold text-black dark:text-gray-50" {...restProps.itemTitleProps}>
              {item.title}
            </h3>
            <p className="m-0 text-sm text-gray-500 dark:text-gray-400" {...restProps.itemDescriptionProps}>
              {item.description}
            </p>
            {item.link && (
              <a
                className="mt-auto w-max pt-2 text-sm text-cyan-400 no-underline transition hover:text-cyan-300"
                {...item.link}
                {...restProps.linkProps}
              />
            )}
          </article>
        ))}
      </div>
    </div>
  </section>
);
