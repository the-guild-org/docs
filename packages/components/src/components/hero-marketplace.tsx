import { ReactElement } from 'react';
import clsx from 'clsx';
import IllustrationDesktop from '../static/illustrations/marketplace-desktop.png';
import IllustrationMobile from '../static/illustrations/marketplace-mobile.png';
import CubeTL from '../static/illustrations/marketplace-cube-tl.png';
import CubeTR from '../static/illustrations/marketplace-cube-tr.png';
import CubeBL from '../static/illustrations/marketplace-cube-bl.png';
import CubeBR from '../static/illustrations/marketplace-cube-br.png';
import { IHeroMarketplaceProps } from '../types/components';
import { Button } from './button';
import NextImage from 'next/future/image';

const Shadow = ({ className }: { className: string }): ReactElement => {
  return (
    <span
      className={clsx(
        `absolute
        h-[750px]
        w-[750px]
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        opacity-40
        blur-3xl`,
        className
      )}
    />
  );
};

const Cube = ({ className, src }: { className: string; src: string }): ReactElement => {
  return <NextImage className={clsx(`absolute -translate-x-1/2 -translate-y-1/2`, className)} src={src} alt="Cube" />;
};

export const HeroMarketplace = ({ title, description, link, ...restProps }: IHeroMarketplaceProps): ReactElement => (
  <section className="overflow-hidden bg-white dark:bg-[#111]" {...restProps.wrapperProps}>
    <div className="relative" {...restProps.containerProps}>
      <div
        className="
         absolute
         inset-0
         overflow-hidden
         bg-black
         dark:bg-[#111]
        "
        style={{ '--colorA': '#ff34ae', '--colorB': '#1cc8ee' }}
      >
        <Shadow className="top-[-175px] left-[-30px] [background:var(--colorA)] md:top-[-150px] md:left-[-60px]" />
        <Shadow className="right-[-700px] bottom-[-800px] hidden [background:var(--colorA)] md:block" />
        <Shadow className="left-[-30px] bottom-[-600px] [background:var(--colorB)] md:left-5 md:bottom-[-700px]" />
      </div>
      <div>
        <Cube src={CubeTL} className="-top-2.5 left-6 md:top-6 md:left-10" />
        <Cube src={CubeTR} className="-bottom-60 -right-52 [top:auto] md:top-20 md:[bottom:auto]" />
        <Cube src={CubeBR} className="-right-20 -bottom-32 hidden md:block" />
        <Cube src={CubeBL} className="-bottom-40 left-10 hidden md:block" />
      </div>
      <div className="container mt-16 mb-28 flex max-w-[90rem] flex-wrap items-center pt-20 pb-1 md:mt-7 md:mb-20 md:flex-nowrap md:pt-0">
        <picture
          className="
            z-[1]
            order-last
            -ml-8
            -mb-20
            mt-5
            w-full
            max-w-md
            md:order-first
            md:-ml-12
            md:-mb-24
            md:mt-0
            md:w-auto
            md:max-w-none
            lg:-ml-14
            lg:w-2/3
          "
          {...restProps.imageProps}
        >
          <source media="(min-width:768px)" srcSet={IllustrationDesktop} />
          <NextImage className="w-full" src={IllustrationMobile} alt="Products List" />
        </picture>
        <div className="relative z-[1]">
          <h2
            className="mb-2.5 max-w-lg text-2xl font-bold text-white dark:text-gray-50 md:text-3xl"
            {...restProps.titleProps}
          >
            {title}
          </h2>
          <p className="max-w-lg text-base text-gray-300 opacity-70" {...restProps.descriptionProps}>
            {description}
          </p>
          {link && (
            <div className="relative z-[1] mt-4 hidden items-center text-xs md:mt-9 md:flex">
              <Button {...link} {...restProps.linkProps} />
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);
