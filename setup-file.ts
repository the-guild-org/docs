import { toMatchImageSnapshot } from 'jest-image-snapshot';

interface CustomMatchers<R = unknown> {
  toMatchImageSnapshot(): R;
}

declare global {
  namespace Vi {
    interface Assertion extends CustomMatchers {}

    interface AsymmetricMatchersContaining extends CustomMatchers {}
  }

  // Note: augmenting jest.Matchers interface will also work.
}

expect.extend({ toMatchImageSnapshot });
