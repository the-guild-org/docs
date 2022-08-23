import { ReactElement, useCallback, useState } from 'react';
import clsx from 'clsx';
import { ISubheaderProps } from '../types/components';
import { toggleLockBodyScroll } from '../helpers/modals';
import { CaretSlimIcon } from './icons';
import { Nav } from './nav';
import { Button } from './button';
import { Anchor } from './anchor';
import { Image } from './image';

export const Subheader = ({ product, activeLink, links, cta, className }: ISubheaderProps): ReactElement => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleNav = useCallback(() => {
    setMobileNavOpen(prev => {
      toggleLockBodyScroll(!prev);
      return !prev;
    });
  }, []);

  const nav = (
    <Nav isOpen={mobileNavOpen} setOpen={setMobileNavOpen}>
      {links.map(link => {
        const isActiveLink = link.href === '/' ? activeLink === link.href : activeLink?.startsWith(link.href);

        return (
          <Anchor
            key={link.href}
            {...link}
            className={clsx(
              `
              mx-auto
              w-max
              py-3
              text-center
              text-base
              font-medium
              no-underline
              transition
              hover:text-black
              hover:dark:text-gray-100
              sm:py-5
              sm:text-lg
              md:mx-2.5
              md:mr-1
              md:py-0
              md:text-left
              md:text-xs
            `,
              isActiveLink ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400',
              link.className
            )}
          />
        );
      })}
    </Nav>
  );

  return (
    <header
      className={clsx(
        `
        sticky
        top-0
        z-10
        bg-white
        py-5
        shadow-xl
        shadow-gray-400/10
        dark:bg-[#111]`,
        className
      )}
    >
      <div className="container flex max-w-[90rem] items-center md:justify-end">
        <Anchor
          href="/"
          onClick={product.onClick}
          title={`${product.title} - ${product.description}`}
          className="mr-auto flex"
        >
          {product.image && <Image {...product.image} className={clsx('w-12', product.image.className)} />}
          <span className="ml-2 -mt-1 flex flex-col justify-center">
            <p className="font-semibold text-black dark:text-white">{product.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-300">{product.description}</p>
          </span>
        </Anchor>
        {nav}
        {cta && <Button className="mx-1 md:mr-0 md:ml-3" {...cta} />}
        <button onClick={handleNav} className="mx-2.5 dark:text-white md:hidden">
          <CaretSlimIcon />
        </button>
      </div>
    </header>
  );
};
