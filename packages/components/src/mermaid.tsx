import { ReactElement, useEffect, useId, useState } from 'react';
import mermaid from 'mermaid';
import { useTheme } from 'nextra-theme-docs';

let initialized = false;

export const Mermaid = ({ chart }: { chart: string }): ReactElement => {
  const { resolvedTheme } = useTheme();
  const id = useId();
  const [svg, setSvg] = useState('');

  // must use useEffect bacause mermaid needs the browser
  useEffect(() => {
    // init is needed only once
    if (!initialized) {
      initialized = true;
      mermaid.initialize({
        fontFamily: 'inherit',
      });
    }

    // see https://mermaid-js.github.io/mermaid/#/theming?id=theme-variables-reference-table
    const theme = JSON.stringify({
      theme: 'base',
      themeVariables: {
        fontSize: '1.125rem', // text-lg
        lineColor: resolvedTheme === 'dark' ? 'white' : 'black',

        primaryColor:
          resolvedTheme === 'dark'
            ? '#1e293b' // slate-800
            : '#cbd5e1', // slate-300
        primaryTextColor: resolvedTheme === 'dark' ? 'white' : 'black',
        primaryBorderColor:
          resolvedTheme === 'dark'
            ? '#cbd5e1' // slate-300
            : '#1e293b', // slate-800

        secondaryColor:
          resolvedTheme === 'dark'
            ? '#475569' // slate-600
            : '#f1f5f9', // slate-100
        secondaryBorderColor:
          resolvedTheme === 'dark'
            ? '#f1f5f9' // slate-100
            : '#475569', // slate-600

        tertiaryColor:
          resolvedTheme === 'dark'
            ? '#475569' // slate-600
            : '#f1f5f9', // slate-100
        tertiaryBorderColor:
          resolvedTheme === 'dark'
            ? '#f1f5f9' // slate-100
            : '#475569', // slate-600
      },
    });

    try {
      const svg = mermaid.render(
        id.replace(/[^a-zA-Z]+/g, ''), // strip special chars from useId
        `%%{init:${theme}}%%\n${chart}` // apply theme and supply chart
      );
      setSvg(svg);
    } catch (error) {
      console.error('Error while rendering mermaid', error);
    }
  }, [resolvedTheme, id, chart]);

  return <div className="mt-6 flex justify-center" dangerouslySetInnerHTML={{ __html: svg }} />;
};
