import NextImage, { ImageProps } from 'next/image';
import { ReactElement } from 'react';

export function Image(props: ImageProps): ReactElement {
  return <NextImage placeholder="blur" {...props} />;
}
