import clsx from 'clsx';
import { useMDXComponents as useDocsMDXComponents } from 'nextra-theme-docs';

const docsComponents = useDocsMDXComponents({
  source({ src, type, ...props }) {
    if (!src) {
      throw new Error('Must provide `src` prop');
    }
    let ext = src.replace(/.*\./, '');
    if (ext === 'mov') {
      ext = 'quicktime';
    }
    return <source {...props} src={src} type={type || `video/${ext}`} />;
  },
  video: ({ className, children, ...props }) => (
    <video className={clsx('mt-6 w-full', className)} autoPlay loop muted {...props}>
      {children}
      Your browser does not support HTML video.
    </video>
  ),
  iframe: ({ className, ...props }) => (
    <iframe
      className={clsx('mt-6 aspect-video w-full', className)}
      title="YouTube Video Player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      {...props}
    />
  ),
});

export const useMDXComponents: typeof useDocsMDXComponents = components => ({
  ...docsComponents,
  ...components,
});
