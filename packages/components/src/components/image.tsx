import NextImage, { ImageProps } from 'next/future/image.js';
import { ReactElement } from 'react';

export function Image(props: ImageProps): ReactElement {
  return <NextImage placeholder="blur" {...props} />;
}
