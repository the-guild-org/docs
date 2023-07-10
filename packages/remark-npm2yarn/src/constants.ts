export const PACKAGE_MANAGERS = ['npm', 'pnpm', 'yarn'] as const;

export type PackageManager = (typeof PACKAGE_MANAGERS)[number];

export const KEY_VALUE_REGEX = /\w+="(.*?)"/g;

export const CHARS_REGEX = /\/(.*?)\/((#[a-z])|([\d-,])+)?/g;

export const LINES_REGEX = /\{(.*?)}/g;

export function cleanMeta(meta: string): string {
  return meta
    .replaceAll(KEY_VALUE_REGEX, '')
    .replaceAll(CHARS_REGEX, '')
    .replaceAll(LINES_REGEX, '');
}
