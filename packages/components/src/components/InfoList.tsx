import { FC } from 'react';
import { IInfoListProps } from '../types/components';

export const InfoList: FC<IInfoListProps> = ({ title, items, ...restProps }) => (
  <section className="bg-white font-default dark:bg-gray-900" {...restProps.wrapperProps}>
    <div className="py-12 container-min" {...restProps.containerProps}>
      {title && (
        <h2 className="mt-0 mb-4 text-2xl font-bold text-black dark:text-gray-50 md:text-3xl" {...restProps.titleProps}>
          {title}
        </h2>
      )}
      <div className="flex flex-wrap">
        {items.map((item, index) => (
          <article
            className="
              mb-9
              box-border
              flex
              w-full
              max-w-lg
              flex-col
              pr-10
              last:mb-0
              md:w-1/2
              lg:mb-0
              lg:w-1/3
          "
            key={`info-${index}`}
          >
            <h3 className="m-0 text-base font-semibold text-black dark:text-gray-50" {...restProps.itemTitleProps}>
              {item.title}
            </h3>
            <p className="mt-2 mb-4 grow text-sm text-gray-500 dark:text-gray-400" {...restProps.itemDescriptionProps}>
              {item.description}
            </p>
            {item.link && (
              <a
                className="
                  mt-auto
                  w-max
                  text-sm
                  text-cyan-400
                  no-underline
                  transition
                  hover:text-cyan-300
                "
                {...item.link}
                {...restProps.itemLinkProps}
              />
            )}
          </article>
        ))}
      </div>
    </div>
  </section>
);
