import { FC, isValidElement } from 'react';
import clsx from 'clsx';
import { IHeroGradientProps } from '../types/components';
import { Button } from './Button';

const Shadow: FC<{ className: string }> = ({ className }) => {
  return (
    <span
      className={clsx(
        'absolute h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl',
        className
      )}
    />
  );
};

export const HeroGradient: FC<IHeroGradientProps> = ({
  title,
  description,
  link,
  version,
  colors = [],
  image,
  ...restProps
}) => (
  <section
    className="overflow-hidden bg-white font-default dark:bg-gray-900 md:pt-14"
    {...restProps.wrapperProps}
  >
    <div className="relative container-min" {...restProps.containerProps}>
      <div
        className="absolute inset-0 overflow-hidden bg-black dark:bg-gray-900 md:mx-6 md:rounded-3xl"
        style={{ '--colorA': colors[0], '--colorB': colors[1] }}
        {...restProps.gradientProps}
      >
        <Shadow className="-top-24 -left-10 [background:var(--colorA)]" />
        <Shadow className="right-[-450px] -top-5 hidden [background:var(--colorA)] md:block" />
        <Shadow className="right-[-350px] bottom-[-500px] [background:var(--colorB)]" />
        <Shadow className="-left-12 bottom-[-600px] [background:var(--colorB)]" />
      </div>
      <div
        className={clsx(
          'md:px-10 md:pt-24 md:pb-14',
          image ? 'mb-32 pt-8 pb-72 md:mb-4' : 'py-20'
        )}
      >
        <div className="relative z-1">
          <h1
            className="mb-2.5 max-w-lg text-2xl font-bold text-white md:text-3xl"
            {...restProps.titleProps}
          >
            {title}
          </h1>
          <p
            className="max-w-md text-base text-white opacity-70 md:text-lg"
            {...restProps.descriptionProps}
          >
            {description}
          </p>
        </div>
        <div className="relative z-1 mt-4 flex items-center gap-x-3 text-xs md:mt-9">
          {link &&
            toArray(link).map((link) => (
              <Button
                className="!px-8"
                variant="secondary"
                key={`${link.href}${link.children}`}
                {...link}
                {...restProps.linkProps}
              />
            ))}
          {version && isValidElement(version) ? (
            version
          ) : (
            <span
              className="text-gray-50 opacity-60"
              {...restProps.versionProps}
            >
              {version}
            </span>
          )}
        </div>
        {image &&
          (isValidElement(image) ? (
            image
          ) : (
            <img
              src={image.src}
              alt={image.alt}
              className="
                absolute
                -bottom-36
                -right-4
                w-full
                max-w-sm
                sm:max-w-md
                md:-top-14 md:-right-16
              "
              {...restProps.imageProps}
            />
          ))}
      </div>
    </div>
  </section>
);

function toArray<T>(input: T | T[]) {
  return Array.isArray(input) ? input : [input];
}
