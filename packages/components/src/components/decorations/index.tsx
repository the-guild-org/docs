import { cn } from '../../cn';

export { ReactComponent as ArchDecoration } from './arch-decoration.svg';
export { ReactComponent as ArchDecorationGradientDefs } from './arch-decoration-gradient-defs.svg';
export { ReactComponent as HighlightDecoration } from './highlight-decoration.svg';
export { ReactComponent as LargeHiveIconDecoration } from './large-hive-icon-decoration.svg';

/**
 * Decorations must be isolated, as clicking id links scrolls the container with overflow: hidden.
 */
export function DecorationIsolation(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', props.className)}
    />
  );
}
