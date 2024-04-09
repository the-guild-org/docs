import { MenuItem, PageItem } from 'nextra/normalize-pages';
import { PRODUCTS } from '../products';

export const productsItems = Object.fromEntries(
  Object.values(PRODUCTS).map(product => {
    const url = new URL(product.href);
    return [
      product.name,
      {
        title: (
          <span className="flex items-center gap-2">
            <product.logo className="size-7 shrink-0" />
            {product.name}
          </span> // todo: fix type in nextra
        ) as any,
        href: url.host === 'the-guild.dev' ? url.pathname : url.href,
      },
    ];
  }),
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
