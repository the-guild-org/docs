import { ReactElement } from 'react';
import clsx from 'clsx';
import { IInfoListProps } from '../types/components';
import { Anchor } from './anchor';

export const InfoList = ({ title, items, className }: IInfoListProps): ReactElement => (
  <section className={clsx('bg-white dark:bg-[#111]', className)}>
    <div className="container max-w-[90rem] py-12">
      {title && (
        <h2 className="mb-4 mt-0 text-2xl font-bold text-black dark:text-gray-50 md:text-3xl">
          {title}
        </h2>
      )}
      <div className="flex flex-wrap">
        {items.map((item, index) => (
          <section
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
            <h3 className="m-0 text-base font-semibold text-black dark:text-gray-50">
              {item.title}
            </h3>
            <p className="mb-4 mt-2 grow text-sm text-gray-500 dark:text-gray-400">
              {item.description}
            </p>
            {item.link && (
              <Anchor
                className="
                  mt-auto
                  w-max
                  text-sm
                  text-cyan-400
                  hover:text-cyan-300
                "
                {...item.link}
              />
            )}
          </section>
        ))}
      </div>
    </div>
  </section>
);
