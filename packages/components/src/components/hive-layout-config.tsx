/**
 * @internal Don't expose this to websites.
 */
export const __LANDING_WIDTHS_ID = 'hive-l-widths';

export interface HiveLayoutConfigProps {
  widths: 'landing-narrow' | 'docs-wide';
}

/**
 * @see {@link HiveLayout} from `@theguild/components/server` for documentation.
 */
export function HiveLayoutConfig({ widths }: HiveLayoutConfigProps) {
  return widths === 'landing-narrow' ? <div id={__LANDING_WIDTHS_ID} /> : null;
}
