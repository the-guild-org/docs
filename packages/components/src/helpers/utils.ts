export const DEFAULT_PATH_PROPS = {
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

export function getDefault<T>(module: T & { default?: T }): T {
  return module.default || module;
}
