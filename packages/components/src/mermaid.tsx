import { ReactElement, useEffect, useState } from 'react';
import mermaid from 'mermaid';
import mermaidAPI from 'mermaid/mermaidAPI';
import { useTheme } from 'nextra-theme-docs';

/**
 * Assign a unique ID to each mermaid svg as per requirements of `mermaid.render`.
 */
let id = 0;

export const Mermaid = ({ chart }: { chart: string }): ReactElement => {
  const { theme } = useTheme();
  const [svg, setSVG] = useState('');

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true, theme: theme as mermaidAPI.Theme });
    mermaid.render(`mermaid-svg-${id}`, chart, renderedSvg => {
      setSVG(renderedSvg);
    });
    id++;
  }, [theme, chart]);

  return <div className="flex justify-center" dangerouslySetInnerHTML={{ __html: svg }} />;
};
