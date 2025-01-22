import { cloneElement, ReactElement } from 'react';
import { cn } from '../../cn';
import { DecorationIsolation, DecorationIsolationProps } from '../decorations';
import { GRADIENT_WHITE_2_ID, GRADIENT_WHITE_ID } from './hero-gradient-ids';

export interface HeroDecorationFromLogoProps extends DecorationIsolationProps {
  logo: ReactElement;
}

export function HeroDecorationFromLogo({ logo, ...rest }: HeroDecorationFromLogoProps) {
  return (
    <DecorationIsolation {...rest} className={cn('-z-10', rest.className)}>
      {cloneElement(logo, {
        className: cn(
          'absolute stroke-white/10 max-lg:hidden',
          '-left-1/2 top-1/2 -translate-y-1/2',
        ),
        fill: `url(#${GRADIENT_WHITE_ID})`,
        strokeWidth: '0.1',
        width: 'auto',
        height: '50%',
      })}
      {cloneElement(logo, {
        className: cn(
          'absolute top-1/2 -translate-y-1/2 stroke-white/10',
          '-right-1/2 lg:-right-1/3',
          'h-2/3 lg:h-[calc(100%-5%)]',
        ),
        fill: `url(#${GRADIENT_WHITE_2_ID})`,
        strokeWidth: '0.1',
        width: 'auto',
      })}
    </DecorationIsolation>
  );
}
