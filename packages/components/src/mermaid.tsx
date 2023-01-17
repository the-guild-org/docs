import { ReactElement, useEffect, useId, useState } from 'react';
import mermaid from 'mermaid';
import { useTheme } from 'nextra-theme-docs';

let initialized = false;

export const Mermaid = ({ chart }: { chart: string }): ReactElement => {
  const { resolvedTheme } = useTheme();
  const id = useId();
  const [svg, setSvg] = useState('');

  // must use useEffect because mermaid needs the browser
  useEffect(() => {
    // init is needed only once
    if (!initialized) {
      initialized = true;
      mermaid.initialize({
        fontFamily: 'inherit',
      });
    }

    const isDark = resolvedTheme === 'dark';

    // see https://mermaid-js.github.io/mermaid/#/theming?id=theme-variables-reference-table
    const theme = JSON.stringify({
      theme: 'base',
      themeVariables: {
        fontSize: '1.125rem', // text-lg
        lineColor: isDark ? 'white' : 'black',

        primaryColor: isDark
          ? '#1e293b' // slate-800
          : '#cbd5e1', // slate-300
        primaryTextColor: isDark ? 'white' : 'black',
        primaryBorderColor: isDark
          ? '#cbd5e1' // slate-300
          : '#1e293b', // slate-800

        secondaryColor: isDark
          ? '#475569' // slate-600
          : '#f1f5f9', // slate-100
        secondaryBorderColor: isDark
          ? '#f1f5f9' // slate-100
          : '#475569', // slate-600

        tertiaryColor: isDark
          ? '#475569' // slate-600
          : '#f1f5f9', // slate-100
        tertiaryBorderColor: isDark
          ? '#f1f5f9' // slate-100
          : '#475569', // slate-600
      },
    });

    try {
      const svg = mermaid.render(
        id.replace(/[^a-zA-Z]+/g, ''), // strip special chars from useId
        `%%{init:${theme}}%%\n${chart}`, // apply theme and supply chart
      );
      setSvg(svg);
    } catch (error) {
      // eslint-disable-next-line no-console -- show error
      console.error('Error while rendering mermaid', error);
    }
  }, [resolvedTheme, id, chart]);

  return <div className="mt-6 flex justify-center" dangerouslySetInnerHTML={{ __html: svg }} />;
};
