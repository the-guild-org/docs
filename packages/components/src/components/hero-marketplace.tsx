import { ReactElement } from 'react';
import { StaticImageData } from 'next/image';
import clsx from 'clsx';
import { IHeroMarketplaceProps } from '../types/components';
import { Button } from './button';
import { Image } from './image';
import CubeBL from '../static/illustrations/marketplace-cube-bl.png';
import CubeBR from '../static/illustrations/marketplace-cube-br.png';
import CubeTL from '../static/illustrations/marketplace-cube-tl.png';
import CubeTR from '../static/illustrations/marketplace-cube-tr.png';
import IllustrationDesktop from '../static/illustrations/marketplace-desktop.png';
import IllustrationMobile from '../static/illustrations/marketplace-mobile.png';

const Shadow = ({ className }: { className: string }): ReactElement => {
  return (
    <span
      className={clsx(
        'absolute size-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl',
        className,
      )}
    />
  );
};

const Cube = ({ className, src }: { className: string; src: StaticImageData }): ReactElement => {
  return (
    <Image
      className={clsx('absolute -translate-x-1/2 -translate-y-1/2', className)}
      src={src}
      alt="Cube"
    />
  );
};

export const HeroMarketplace = ({
  title,
  description,
  link,
  className,
  image,
}: IHeroMarketplaceProps): ReactElement => (
  <section className={clsx('overflow-hidden bg-white dark:bg-dark', className)}>
    <div className="relative">
      <div
        className="absolute inset-0 overflow-hidden bg-black dark:bg-dark"
        style={{ '--colorA': '#ff34ae', '--colorB': '#1cc8ee' }}
      >
        <Shadow className="left-[-30px] top-[-175px] [background:var(--colorA)] md:left-[-60px] md:top-[-150px]" />
        <Shadow className="bottom-[-800px] right-[-700px] hidden [background:var(--colorA)] md:block" />
        <Shadow className="bottom-[-600px] left-[-30px] [background:var(--colorB)] md:bottom-[-700px] md:left-5" />
      </div>
      <div>
        <Cube src={CubeTL} className="-top-2.5 left-6 md:left-10 md:top-6" />
        <Cube src={CubeTR} className="-bottom-60 -right-52 top-auto md:bottom-auto md:top-20" />
        <Cube src={CubeBR} className="-bottom-32 -right-20 hidden md:block" />
        <Cube src={CubeBL} className="-bottom-40 left-10 hidden md:block" />
      </div>
      <div className="container mb-28 mt-16 flex max-w-[90rem] flex-wrap items-center pb-1 pt-20 md:mb-20 md:mt-7 md:flex-nowrap md:pt-0">
        <picture
          className="z-[1] order-last -mb-20 -ml-8 mt-5 w-full max-w-md md:order-first md:-mb-24 md:-ml-12 md:mt-0 md:w-auto md:max-w-none lg:-ml-14 lg:w-2/3"
          {...image}
        >
          <source media="(min-width:768px)" srcSet={IllustrationDesktop} />
          <Image className="mx-auto w-auto" src={IllustrationMobile} alt="Products List" />
        </picture>
        <div className="relative z-[1]">
          <h2 className="mb-2.5 max-w-lg text-2xl font-bold text-white md:text-3xl dark:text-gray-50">
            {title}
          </h2>
          <p className="max-w-lg text-base text-gray-300 opacity-70">{description}</p>
          {link && (
            <div className="relative z-[1] mt-4 hidden items-center text-xs md:mt-9 md:flex">
              <Button {...link} />
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);
