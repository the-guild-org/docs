import { FC, ReactNode } from 'react';
import { cn } from '../../cn';
import { Heading } from '../heading';
import { CheckIcon } from '../icons';
import { HeroGradientDefs } from './hero-gradient-defs';

export { HeroLogo } from './hero-logo';
export { HeroDecorationFromLogo } from './hero-decoration-from-logo';

export interface HeroProps {
  className?: string;
  heading: string;
  text: string;
  checkmarks: string[];
  children?: ReactNode;
  top?: ReactNode;
}

export const Hero: FC<HeroProps> = props => {
  return (
    <div
      className={cn(
        'relative isolate flex max-w-[90rem] flex-col items-center justify-center gap-6 overflow-hidden rounded-3xl bg-blue-400 px-4 py-6 max-sm:mt-2 sm:py-12 md:gap-8 lg:py-24',
        props.className,
      )}
    >
      {props.top}
      <Heading as="h1" size="xl" className="mx-auto max-w-3xl text-balance text-center">
        {props.heading}
      </Heading>
      <p className="mx-auto w-[512px] max-w-[80%] text-center leading-6 text-green-800">
        {props.text}
      </p>
      <ul className="mx-auto flex list-none gap-x-6 gap-y-2 text-sm font-medium max-md:flex-col">
        {props.checkmarks.map(text => (
          <li key={text} className="flex items-center gap-2">
            <CheckIcon className="text-green-800" />
            {text}
          </li>
        ))}
      </ul>
      <div className="flex w-full justify-center gap-2 px-0.5 max-sm:flex-col sm:gap-4">
        {props.children}
      </div>
      <HeroGradientDefs />
    </div>
  );
};
