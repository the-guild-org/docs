import { cn } from '../../cn';

export { ReactComponent as ArchDecoration } from './arch-decoration.svg';
export { ReactComponent as ArchDecorationGradientDefs } from './arch-decoration-gradient-defs.svg';
export { ReactComponent as HighlightDecoration } from './highlight-decoration.svg';
export { ReactComponent as LargeHiveIconDecoration } from './large-hive-icon-decoration.svg';

export type DecorationIsolationProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Decorations must be isolated, as clicking id links scrolls the container with overflow: hidden.
 */
export function DecorationIsolation(props: DecorationIsolationProps) {
  return (
    <div
      {...props}
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', props.className)}
    />
  );
}
