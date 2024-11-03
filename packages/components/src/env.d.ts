declare module '*.svg' {
  import { FC, SVGProps } from 'react';
  export const ReactComponent: FC<SVGProps<SVGElement>>;
  const src: string;
  export default src;
}

declare module '*.png';

interface Window {
  $crisp?: {
    push(cmd: string[]): void;
  };
}
