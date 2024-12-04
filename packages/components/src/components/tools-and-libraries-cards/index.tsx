import { cn } from '../../cn';
import { FOUR_MAIN_PRODUCTS, SIX_HIGHLIGHTED_PRODUCTS } from '../../products';
import { CallToAction } from '../call-to-action';
import { Heading } from '../heading';
import { AncillaryProductCard, MainProductCard } from '../product-card';

export function ToolsAndLibrariesCards({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        'isolate flex flex-col gap-6 px-4 py-6 lg:gap-12 lg:py-24 xl:px-[120px]',
        className,
      )}
    >
      <Heading as="h2" size="md" className="text-green-1000">
        Discover the complete ecosystem of tools and libraries
      </Heading>
      <p className="text-green-800">Complete GraphQL Federation Stack</p>
      <ul className="-mx-12 -my-2 flex grid-cols-2 gap-[22px] overflow-auto px-12 py-2 lg:grid xl:grid-cols-4">
        {FOUR_MAIN_PRODUCTS.map(product => (
          <MainProductCard key={product.name} as="li" product={product} />
        ))}
      </ul>
      <p className="text-green-800">Our libraries to support all your GraphQL needs</p>
      <ul className="-mx-12 -my-2 flex h-max grid-cols-6 gap-[22px] overflow-x-auto overflow-y-hidden px-12 py-2 max-sm:-mx-8 max-sm:px-8 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {SIX_HIGHLIGHTED_PRODUCTS.map(product => (
          <AncillaryProductCard key={product.name} as="li" product={product} />
        ))}
      </ul>
      <CallToAction href="https://github.com/the-guild-org" variant="primary">
        Explore the Ecosystem
      </CallToAction>
    </section>
  );
}
