import { forwardRef, ReactElement } from 'react';
import { PRODUCTS } from '../products';
import { Anchor } from './anchor';

const productCategories = [
  {
    title: 'Build GraphQL servers',
    items: [
      PRODUCTS.YOGA,
      PRODUCTS.MODULES,
      PRODUCTS.ENVELOP,
      PRODUCTS.MESH,
      PRODUCTS.SCALARS,
      PRODUCTS.SOFA,
      PRODUCTS.WS,
      PRODUCTS.SSE,
    ],
  },
  {
    title: 'Supercharge your workflow',
    items: [
      PRODUCTS.CODEGEN,
      PRODUCTS.TOOLS,
      PRODUCTS.STITCHING,
      PRODUCTS.HIVE,
      PRODUCTS.CONDUCTOR,
      PRODUCTS.INSPECTOR,
      PRODUCTS.ESLINT,
      PRODUCTS.CONFIG,
      PRODUCTS.FETS,
    ],
  },
  // {
  //   title: 'Manage your schemas',
  //   items: [PRODUCTS.HIVE, PRODUCTS.INSPECTOR],
  // },
  {
    title: 'Build great user experience',
    items: [PRODUCTS.ANGULAR, PRODUCTS.KITQL],
  },
  {
    title: 'Our solutions',
    items: [PRODUCTS.HELTIN],
  },
];

export const EcosystemList = forwardRef<HTMLDivElement>((_, forwardedRef): ReactElement => {
  return (
    <div
      className="max-h-[calc(100vh-70px)] min-h-[300px] w-[800px] overflow-y-auto rounded-lg bg-white p-5 dark:bg-neutral-800"
      style={{
        boxShadow:
          'hsl(206 22% 7% / 35%) 0 10px 38px -10px, hsl(206 22% 7% / 20%) 0 10px 20px -15px',
      }}
      ref={forwardedRef}
    >
      {productCategories.map(category => (
        <div key={category.title} className="mb-6 last:mb-0">
          <h3 className="mb-5 mt-1 w-full text-base font-normal text-gray-600 dark:text-gray-400">
            {category.title}
          </h3>
          <div className="flex flex-wrap">
            {category.items.map(product => (
              <Anchor
                key={product.name}
                href={product.href}
                className="
                  flex
                  h-[70px]
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  p-2
                  opacity-60
                  hover:bg-gray-100
                  hover:opacity-100
                  dark:hover:bg-gray-700
                  md:w-1/2
                "
              >
                <product.logo className="h-9 w-9 shrink-0" />
                <span className="flex flex-col justify-center">
                  <h4 className="m-0 text-sm font-semibold text-black dark:text-gray-300">
                    {product.name}
                  </h4>
                  <p className="!mt-0 text-xs font-medium text-gray-900 dark:text-gray-400">
                    {product.title}
                  </p>
                </span>
              </Anchor>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

EcosystemList.displayName = 'EcosystemList';
