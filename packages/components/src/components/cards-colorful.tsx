import { ReactElement } from 'react';
import clsx from 'clsx';
import { ILink } from '../types/components';
import { Anchor } from './anchor';

export type CardsColorfulProps = {
  className?: string;
  cards: {
    title: string;
    description: string;
    category: string;
    color: string;
    link: Omit<ILink, 'children'>;
  }[];
};

export const CardsColorful = ({ cards, className }: CardsColorfulProps): ReactElement => (
  <section className={clsx('bg-white py-8 dark:bg-[#111]', className)}>
    <div
      className="
        container
        flex
        flex-wrap
        space-y-6
        md:flex-nowrap
        md:space-x-8
        md:space-y-0
    "
    >
      {cards.map(card => (
        <Anchor
          key={card.title}
          className="
            relative
            min-h-[200px]
            w-full
            rounded-3xl
            p-8
            text-white
            [background:var(--color)]
            after:absolute
            after:right-0
            after:top-0
            after:h-full
            after:w-[calc(30%-1rem)]
            after:rounded-3xl
            after:bg-white/10
            after:content-['']
            md:h-72
            md:w-1/2
            md:hover:scale-105
            md:hover:shadow-xl
            lg:after:w-[calc(50%-1rem)]
          "
          style={{ '--color': card.color }}
          {...card.link}
        >
          <div className="w-3/4 lg:w-1/2">
            <h2 className="pb-1.5 text-xs font-semibold uppercase opacity-60">{card.category}</h2>
            <h3 className="pb-2.5 text-2xl font-bold md:text-3xl">{card.title}</h3>
            <p className="text-xs font-medium opacity-60">{card.description}</p>
          </div>
        </Anchor>
      ))}
    </div>
  </section>
);
