// interface CustomMatchers<R = unknown> {
//   toMatchImageSnapshot(): R;
// }

// declare global {
//   namespace Vi {
//     type Assertion = CustomMatchers;
//
//     type AsymmetricMatchersContaining = CustomMatchers;
//   }
//
//   // Note: augmenting jest.Matchers interface will also work.
// }

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchImageSnapshot(): R;
    }
  }
}
