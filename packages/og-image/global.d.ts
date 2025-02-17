import { toMatchImageSnapshot } from 'jest-image-snapshot';

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchImageSnapshot(options?: Parameters<typeof toMatchImageSnapshot>[0]): R;
    }
  }
}

declare module 'react' {
  interface HTMLAttributes {
    tw?: string;
  }

  interface SVGProps {
    tw?: string;
  }

  interface CSSProperties {
    // This isn't a valid CSS property supported by browsers yet
    textWrap?: 'balance' | '';
  }
}

export {};
