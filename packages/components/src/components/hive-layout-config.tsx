// eslint-disable-next-line @typescript-eslint/consistent-type-imports, @typescript-eslint/no-unused-vars
import type { HiveLayout } from '../server/hive-layout';

/**
 * @internal
 */
export const __LANDING_WIDTHS_ID = 'hive-l-widths';

export interface HiveLayoutConfigProps {
  widths: 'landing-narrow' | 'docs-wide';
}

/**
 * @see {@link HiveLayout} for documentation.
 */
export function HiveLayoutConfig({ widths }: HiveLayoutConfigProps) {
  return widths === 'landing-narrow' ? <div id={__LANDING_WIDTHS_ID} /> : null;
}
