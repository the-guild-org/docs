import { forwardRef, ReactElement } from 'react';
import { PRODUCTS } from '../helpers/products';
import { Anchor } from '@theguild/components';

const productCategories = [
  {
    title: 'Build GraphQL servers',
    items: PRODUCTS.filter(p =>
      ['Yoga', 'Modules', 'Envelop', 'Mesh', 'Dataloader', 'LiveQuery', 'Scalars', 'SOFA'].includes(p.children)
    ),
  },
  {
    title: 'Supercharge your workflow',
    items: PRODUCTS.filter(p =>
      ['Code Generator', 'Tools', 'Hive', 'Inspector', 'ESLint', 'Config', 'CLI'].includes(p.children)
    ),
  },
  // {
  //   title: 'Manage your schemas',
  //   items: PRODUCTS.filter((p) => ['Hive', 'Inspector'].includes(p.children)),
  // },
  {
    title: 'Build great user experience',
    items: PRODUCTS.filter(p => ['Swift', 'Angular', 'Stencil', 'KitQL'].includes(p.children)),
  },
];

export const EcosystemList = forwardRef<HTMLDivElement>((_, forwardedRef): ReactElement => {
  return (
    <div
      className="max-h-[calc(100vh-70px)] min-h-[300px] w-[800px] overflow-y-auto rounded-lg bg-white p-5 dark:bg-neutral-800"
      style={{
        boxShadow: 'hsl(206 22% 7% / 35%) 0 10px 38px -10px, hsl(206 22% 7% / 20%) 0 10px 20px -15px',
      }}
      ref={forwardedRef}
    >
      {productCategories.map(category => (
        <div key={category.title} className="mb-6 last:mb-0">
          <h3 className="mt-1 mb-5 w-full text-base font-normal text-gray-600 dark:text-gray-400">{category.title}</h3>
          <div className="flex flex-wrap">
            {category.items.map(product => (
              <Anchor
                key={product.children}
                href={product.href}
                newWindow
                className="
                  flex
                  h-[70px]
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  p-2
                  !no-underline
                  opacity-60
                  outline-none
                  hover:bg-gray-100
                  hover:opacity-100
                  dark:hover:bg-gray-700
                  md:w-1/2
                "
              >
                <product.logo className="h-9 w-9 shrink-0" />
                <span className="flex flex-col justify-center">
                  <h4 className="m-0 text-sm font-semibold text-black dark:text-gray-300">{product.children}</h4>
                  <p className="!mt-0 text-xs font-medium text-gray-900 dark:text-gray-400">{product.title}</p>
                </span>
              </Anchor>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});
