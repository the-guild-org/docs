import { MenuItem, PageItem } from 'nextra/normalize-pages';
import { PRODUCTS } from '../products';

export const productsItems = Object.fromEntries(
  Object.values(PRODUCTS).map(product => [
    product.name,
    {
      title: (
        <span className="flex items-center gap-2">
          <product.logo className="h-7 w-auto" />
          {product.name}
        </span> // todo: fix type in nextra
      ) as any,
      href: new URL(product.href).pathname,
    },
  ]),
);

export function addGuildCompanyMenu(items: (PageItem | MenuItem)[]): (PageItem | MenuItem)[] {
  return [
    {
      type: 'menu',
      title: 'Company',
      items: {
        about: {
          title: 'About',
          href: 'https://the-guild.dev/about-us',
          newWindow: true,
        },
        blog: {
          title: 'Blog',
          href: 'https://the-guild.dev/blog',
          newWindow: true,
        },
        contact: {
          title: 'Contact',
          href: 'https://the-guild.dev/#get-in-touch',
          newWindow: true,
        },
      },
      name: 'company',
      route: '#',
    } satisfies MenuItem,
    {
      type: 'menu',
      title: 'Products',
      items: productsItems,
      name: 'products',
      route: '#',
    } satisfies MenuItem,
    ...items,
  ];
}
