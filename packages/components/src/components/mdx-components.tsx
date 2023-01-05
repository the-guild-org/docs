import { ComponentProps, ReactElement } from 'react';
import { useRouter } from 'next/router';
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
    return <source {...props} src={src} type={type || `video/${ext}`} />;
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
  img({ src = '', ...props }: ComponentProps<'img'>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- false positive
    const { basePath } = useRouter();
    if (!src.startsWith('http')) {
      console.warn('Image', src, "doesn't use NextImage");
    }
    return <img {...props} src={src.startsWith('/') ? basePath + src : src} />;
  },
};
