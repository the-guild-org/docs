import { MenuItem, PageItem } from 'nextra/normalize-pages';

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
        solutions: {
          title: 'Solutions',
          href: 'https://the-guild.dev/solutions',
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
    ...items,
  ];
}
