import { cn } from '../../cn';
import { FOUR_MAIN_PRODUCTS, ProductInfo, PRODUCTS } from '../../products';
import { HighlightDecoration } from '../decorations';
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

export function MainProductCard({ as: Root, product, className, ...rest }: ProductCardProps) {
  const Decoration = cardDecorations[product.name];
  const Icon = product.logo;

  const isHive = product.name === PRODUCTS.HIVE.name;

  return (
    <Root
      className={cn(
        'hive-focus-within group relative flex-1 shrink-0 basis-[283.5px] overflow-hidden rounded-2xl bg-blue-400 text-green-1000 max-md:w-[283.5px]',
        isHive && 'bg-green-1000 text-white',
        className,
      )}
      {...rest}
    >
      <a
        className="relative z-10 flex h-full flex-1 flex-col justify-between p-8 outline-none focus-visible:outline-none"
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
      className={cn(
        'hive-focus-within shrink-0 basis-[283.5px] rounded-2xl bg-beige-200 text-green-1000 transition-colors duration-500 hover:bg-beige-400 max-sm:min-w-[283.5px]',
        className,
      )}
      {...rest}
    >
      <a
        href={product.href}
        className="relative flex h-full flex-col justify-between rounded-[inherit] p-8 focus:outline-none focus-visible:outline-none"
      >
        <div>
          <p className="font-medium">{product.name}</p>
          <p className="mt-2 text-sm text-green-800">{product.title}</p>
        </div>
        <div
          role="presentation"
          className="mt-8 flex size-8 items-center justify-center rounded bg-green-1000 p-[5px] text-sm/5 font-medium text-white"
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
  const isMainProduct = FOUR_MAIN_PRODUCTS.some(p => p.name === props.product.name);

  return isMainProduct ? <MainProductCard {...props} /> : <AncillaryProductCard {...props} />;
}
