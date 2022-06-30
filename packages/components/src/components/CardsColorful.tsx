import { ReactElement, ComponentProps } from 'react';
import { ILink } from '../types/components';

export type CardsColorfulProps = {
  cards: {
    title: string;
    description: string;
    category: string;
    color: string;
    link: ILink;
  }[];

  wrapperProps?: ComponentProps<'section'>;
  containerProps?: ComponentProps<'div'>;
  cardProps?: ComponentProps<'a'>;
  cardCategoryProps?: ComponentProps<'h2'>;
  cardTitleProps?: ComponentProps<'h3'>;
  cardDescriptionProps?: ComponentProps<'p'>;
};

export const CardsColorful = ({ cards, ...restProps }: CardsColorfulProps): ReactElement => (
  <section className="bg-white py-8 font-default dark:bg-gray-900" {...restProps.wrapperProps}>
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
      {...restProps.containerProps}
    >
      {cards.map(card => (
        <a
          key={card.title}
          className="
            relative
            min-h-[200px]
            w-full rounded-3xl
            p-8
            text-white
            no-underline
            transition
            [background:var(--color)]
            after:absolute
            after:top-0
            after:right-0
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
          {...restProps.cardProps}
        >
          <div className="w-3/4 lg:w-1/2">
            <h2 className="pb-1.5 text-xs font-semibold uppercase opacity-60" {...restProps.cardCategoryProps}>
              {card.category}
            </h2>
            <h3 className="pb-2.5 text-2xl font-bold md:text-3xl" {...restProps.cardTitleProps}>
              {card.title}
            </h3>
            <p className="text-xs font-medium opacity-60" {...restProps.cardDescriptionProps}>
              {card.description}
            </p>
          </div>
        </a>
      ))}
    </div>
  </section>
);
