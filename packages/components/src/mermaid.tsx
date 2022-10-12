import { ReactElement, useEffect, useState } from 'react';
import mermaid, { Config } from 'mermaid';
import { useTheme } from 'nextra-theme-docs';

/**
 * Assign a unique ID to each mermaid svg as per requirements of `mermaid.render`.
 */
let id = 0;

export const Mermaid = ({ chart }: { chart: string }): ReactElement => {
  const { resolvedTheme } = useTheme();
  const [svg, setSVG] = useState('');

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: resolvedTheme as Config['theme'],
      fontFamily: 'inherit',
    });
    try {
      const renderedSvg = mermaid.render(`mermaid-svg-${(id += 1)}`, chart);
      setSVG(renderedSvg);
    } catch (error) {
      console.error('Error while rendering mermaid', error);
    }
  }, [resolvedTheme, chart]);

  return <div className="mt-6 flex justify-center" dangerouslySetInnerHTML={{ __html: svg }} />;
};
