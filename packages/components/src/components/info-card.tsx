import { ReactNode } from 'react';
import { cn } from '../cn';
import { UnionToIntersection } from '../types/utility';
import { Anchor, AnchorProps } from './anchor';
import { Stud } from './stud';

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace InfoCardProps {
  interface InfoCardBaseProps {
    icon: ReactNode;
    heading: ReactNode;
    scheme?: 'neutral' | 'green';
  }

  interface InfoCardLinkProps extends InfoCardBaseProps, Omit<AnchorProps, 'as'> {
    href: AnchorProps['href'];
  }

  interface InfoCardInertProps extends InfoCardBaseProps, React.HTMLAttributes<HTMLElement> {
    as: 'div' | 'li';
  }
}

export type InfoCardProps = InfoCardProps.InfoCardLinkProps | InfoCardProps.InfoCardInertProps;

export function InfoCard({
  icon,
  heading,
  className,
  children,
  scheme = 'neutral',
  ...rest
}: InfoCardProps) {
  let Root: InfoCardProps.InfoCardInertProps['as'] | typeof Anchor;

  if ('href' in rest) {
    Root = Anchor;
  } else {
    Root = rest.as || 'div';
    delete (rest as { as?: unknown }).as;
  }

  return (
    <Root
      className={cn(
        'p-6 md:p-12',
        scheme === 'neutral' &&
          'bg-beige-100 [--color-h:theme(colors.green.1000)] [--color-text:theme(colors.green.800)] [--hover-bg:theme(colors.beige.200)] dark:bg-neutral-900 dark:[--color-h:theme(colors.white)] dark:[--color-text:theme(colors.white)] dark:[--hover-bg:theme(colors.neutral.800)]',
        scheme === 'green' &&
          'bg-green-900 [--color-h:theme(colors.white)] [--color-text:theme(colors.white)] [--hover-bg:theme(colors.green.800)]',
        Root === Anchor &&
          'hive-focus block cursor-pointer duration-300 hover:bg-[--hover-bg] focus-visible:bg-[--hover-bg]',
        className,
      )}
      {...(rest as UnionToIntersection<InfoCardProps>)}
    >
      <Stud>{icon}</Stud>
      <h3 className="mt-4 text-xl font-medium leading-[1.4] text-[--color-h] md:mt-6">{heading}</h3>
      <div className="mt-2 space-y-2 text-[--color-text] md:mt-4">{children}</div>
    </Root>
  );
}
