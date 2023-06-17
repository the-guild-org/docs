export const PACKAGE_MANAGERS = ['npm', 'pnpm', 'yarn'] as const;

export type PackageManager = (typeof PACKAGE_MANAGERS)[number];
