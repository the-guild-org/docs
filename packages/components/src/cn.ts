import { clsx, ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type { ClassValue };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
