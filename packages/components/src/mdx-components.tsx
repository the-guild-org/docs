import fs from 'node:fs/promises';
import path from 'node:path';
import clsx from 'clsx';
import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs';

const docsComponents = getDocsMDXComponents({
  async source({ src, type, ...props }) {
    if (!src) {
      throw new Error('Must provide `src` prop');
    }
    if (src.startsWith('/')) {
      const filePath = path.join(process.cwd(), 'public', src);
      try {
        await fs.access(filePath);
      } catch (error) {
        const relativePath = path.relative(process.cwd(), filePath);
        if ((error as any).code === 'ENOENT') {
          throw new Error(`File doesn't exist: ${relativePath}`);
        }
        throw new Error(`Error checking file: ${relativePath}`);
      }
    }

    let ext = path.extname(src).slice(1); // remove dot;
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

export const useMDXComponents: typeof getDocsMDXComponents = components => ({
  ...docsComponents,
  ...components,
});
