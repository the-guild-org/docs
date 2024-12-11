import { HTMLAttributes } from 'react';
import { cn } from '../cn';
import { FOUR_MAIN_PRODUCTS } from '../products';
import { Heading } from './heading';
import { ArrowIcon } from './icons';
import { TextLink } from './text-link';
import { MainProductCard } from './tools-and-libraries-cards';

export type ExploreMainProductCardsProps = HTMLAttributes<HTMLDivElement>;

export function ExploreMainProductCards({ className, ...rest }: ExploreMainProductCardsProps) {
  return (
    <section
      className={cn(
        'relative isolate flex flex-wrap gap-6 px-4 py-6 lg:gap-12 lg:py-24 xl:px-[120px]',
        className,
      )}
      {...rest}
    >
      <div className="[@media(min-width:1490px)]:w-[293px]">
        <Heading as="h2" size="xs" className="text-pretty">
          Explore Hive 360° GraphQL Ecosystem to reach full potential
        </Heading>
        <TextLink href="https://the-guild.dev/graphql/hive/ecosystem" className="mt-4 lg:mt-6">
          Learn more
          <ArrowIcon />
        </TextLink>
      </div>
      <ul className="-mx-12 -my-2 flex shrink-0 grow gap-[22px] overflow-auto px-12 py-2 [@media(max-width:1490px)]:w-full [@media(min-width:1490px)]:overflow-visible [&>:nth-child(n+4)]:[@media(min-width:1490px)]:hidden">
        {FOUR_MAIN_PRODUCTS.map(product => (
          <MainProductCard key={product.name} as="li" product={product} />
        ))}
      </ul>
    </section>
  );
}
