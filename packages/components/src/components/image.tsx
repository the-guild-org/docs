import { ReactElement } from 'react';
import NextImage, { ImageProps } from 'next/image';

export function Image(props: ImageProps): ReactElement {
  return <NextImage placeholder="blur" {...props} />;
}
