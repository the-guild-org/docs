import { useConfig } from 'nextra-theme-docs';
import { cn } from '../../cn';
import {
  FOUR_MAIN_PRODUCTS,
  ProductInfo,
  PRODUCTS,
  SIX_HIGHLIGHTED_PRODUCTS,
} from '../../products';
import { CallToAction } from '../call-to-action';
import { HighlightDecoration } from '../decorations';
import { Heading } from '../heading';
import { ArrowIcon } from '../icons';
import { ReactComponent as HiveDecoration } from './hive-decoration.svg';
import { ReactComponent as HiveGatewayDecoration } from './hive-gateway-decoration.svg';
import { ReactComponent as MeshDecoration } from './mesh-decoration.svg';
import { ReactComponent as YogaDecoration } from './yoga-decoration.svg';

const cardDecorations = {
  [PRODUCTS.HIVE.name]: HiveDecoration,
  [PRODUCTS.YOGA.name]: YogaDecoration,
  [PRODUCTS.MESH.name]: MeshDecoration,
  [PRODUCTS.HIVE_GATEWAY.name]: HiveGatewayDecoration,
};

export function ToolsAndLibrariesCards({
  className,
  isHive,
}: {
  className?: string;
  isHive?: boolean;
}) {
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
      <CallToAction
        href={isHive ? '/ecosystem' : 'https://the-guild.dev/graphql/hive/ecosystem'}
        variant="primary"
      >
        Explore the Ecosystem
      </CallToAction>
    </section>
  );
}

export function MainProductCard({ as: Root, product, className, ...rest }: ProductCardProps) {
  const Decoration = cardDecorations[product.name];
  const Icon = product.logo;

  const isHive = product.name === PRODUCTS.HIVE.name;

  return (
    <Root
      key={product.name}
      className={cn(
        'hive-focus-within group relative flex-1 shrink-0 basis-[283.5px] overflow-hidden rounded-2xl bg-blue-400 text-green-1000 max-md:w-[283.5px]',
        isHive && 'bg-green-1000 text-white',
        className,
      )}
      {...rest}
    >
      <a
        className="relative z-10 block flex-1 p-8 outline-none focus-visible:outline-none"
        href={product.href}
      >
        <p className="font-medium">{product.name}</p>
        <Icon className="mt-8" />
        <ArrowIcon className="absolute bottom-8 right-8" />
      </a>
      <Decoration
        strokeWidth="0.5px"
        className={cn(
          'pointer-events-none absolute bottom-0 right-0 h-full fill-blue-200 opacity-0 transition-opacity duration-500 group-focus-within:opacity-100 group-hover:opacity-100',
          isHive && 'fill-blue-700',
        )}
        preserveAspectRatio="xMidYMid meet"
      />
      <HighlightDecoration className="pointer-events-none absolute left-0 top-[-15%] h-[150%] w-full opacity-0 transition-opacity duration-1000 group-focus-within:opacity-100 group-hover:opacity-100" />
    </Root>
  );
}

export function AncillaryProductCard({ product, as: Root, className, ...rest }: ProductCardProps) {
  const Logo = product.logo;
  return (
    <Root
      key={product.name}
      className={cn(
        'hive-focus-within shrink-0 basis-[283.5px] rounded-2xl bg-beige-200 text-green-1000 transition-colors duration-500 hover:bg-beige-400 max-sm:min-w-[283.5px]',
        className,
      )}
      {...rest}
    >
      <a
        href={product.href}
        className="relative flex h-full flex-col rounded-[inherit] p-8 focus:outline-none focus-visible:outline-none"
      >
        <p className="font-medium">{product.name}</p>
        <p className="mt-2 text-sm text-green-800">{product.title}</p>
        <div className="h-8 grow" />
        <div
          role="presentation"
          className="flex size-8 items-center justify-center rounded bg-green-1000 p-[5px] text-sm/5 font-medium text-white"
        >
          <Logo />
        </div>
        <ArrowIcon className="absolute bottom-8 right-8" />
      </a>
    </Root>
  );
}

export interface ProductCardProps extends React.HTMLAttributes<HTMLElement> {
  as: 'div' | 'li';
  product: ProductInfo;
}

export function ProductCard(props: ProductCardProps) {
  const isMainProduct = FOUR_MAIN_PRODUCTS.map(p => p.name).includes(props.product.name);

  return isMainProduct ? <MainProductCard {...props} /> : <AncillaryProductCard {...props} />;
}
