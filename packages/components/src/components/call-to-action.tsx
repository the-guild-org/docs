import { cn } from '../cn';
import { Anchor } from './anchor';

const variantStyles = {
  primary: cn(
    'bg-primary hover:bg-green-800 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-800 dark:bg-neutral-100 dark:text-neutral-800 dark:hover:bg-white dark:hover:text-neutral-900',
  ),
  'primary-inverted': cn(
    'bg-primary hover:bg-white focus-visible:outline-4 focus-visible:outline-offset-0 focus-visible:outline-white/40',
  ),
  secondary: cn(
    'bg-green-300 hover:bg-green-200 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-300/40',
  ),
  'secondary-inverted': cn(
    'bg-green-800 text-white hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-800/40',
  ),
  tertiary: cn(
    'bg-transparent text-green-1000 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-800',
  ),
};

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace CallToActionProps {
  export type Variant = keyof typeof variantStyles;

  export interface BaseProps {
    variant: Variant;
  }

  export interface AnchorProps extends BaseProps, React.ComponentPropsWithoutRef<typeof Anchor> {
    href: string;
  }

  export interface ButtonProps
    extends BaseProps,
      React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    href?: never;
  }
}

export type CallToActionProps = CallToActionProps.AnchorProps | CallToActionProps.ButtonProps;

/**
 * This is called `Button` in Figma in the new Hive brand design system.
 * It's a styled variant of {@link Anchor}.
 *
 * // TODO: Consider renaming it to `Button`.
 */
export function CallToAction(props: CallToActionProps) {
  const className = cn(
    'relative flex items-center justify-center gap-2 text-nowrap rounded-lg px-6 py-3 font-medium leading-6 text-green-1000 focus-visible:outline focus-visible:ring-0 focus-visible:ring-offset-0 sm:w-fit dark:text-neutral-200 [&:hover>:first-child]:-inset-px [&:hover>:first-child]:rounded-[9px]',
    variantStyles[props.variant],
    props.className,
  );

  if ('href' in props && typeof props.href === 'string') {
    const { className: _1, variant: _2, children, ...rest } = props;

    return (
      <Anchor className={className} {...rest}>
        <div className="absolute inset-0 rounded-lg border border-green-800 dark:border-neutral-200" />
        {children}
      </Anchor>
    );
  }

  const { className: _1, variant: _2, children, ...rest } = props;

  return (
    <button className={className} {...rest}>
      <div className="absolute inset-0 rounded-lg border border-green-800 dark:border-neutral-200" />
      {children}
    </button>
  );
}
