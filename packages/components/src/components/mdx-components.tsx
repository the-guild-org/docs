import { ComponentProps, ReactElement } from 'react';
import { addBasePath } from 'next/dist/client/add-base-path';
import NextImage from 'next/image';
import clsx from 'clsx';

export const mdxComponents: {
  [tag: string]: (props: object) => ReactElement;
} = {
  source({ src, type, ...props }: ComponentProps<'source'>) {
    if (!src) {
      throw new Error('Must provide `src` prop');
    }
    let ext = src.replace(/.*\./, '');
    if (ext === 'mov') {
      ext = 'quicktime';
    }
    return <source {...props} src={addBasePath(src)} type={type || `video/${ext}`} />;
  },
  video: ({ className, children, ...props }: ComponentProps<'video'>) => (
    <video className={clsx('mt-6 w-full', className)} autoPlay loop muted {...props}>
      {children}
      Your browser does not support HTML video.
    </video>
  ),
  iframe: ({ className, ...props }: ComponentProps<'iframe'>) => (
    <iframe
      className={clsx('mt-6 aspect-video w-full', className)}
      title="YouTube Video Player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      {...props}
    />
  ),
  img(props: ComponentProps<'img'>) {
    const ComponentToUse = typeof props.src === 'object' ? NextImage : 'img';
    if (typeof props.src === 'string' && !props.src.startsWith('http')) {
      // eslint-disable-next-line no-console -- just for debug to notice that NextImage was not used
      console.warn('Image', props.src, "doesn't use NextImage");
    }
    // @ts-expect-error -- fixme
    return <ComponentToUse {...props} />;
  },
};
